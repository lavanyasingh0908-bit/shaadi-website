"""
Prepares the raw photos in public/images for the site and writes optimised
WebP copies to public/images/opt/.

  * crops away photographer watermarks / Instagram UI chrome
  * keys white / checkerboard backgrounds out of the line-art & watercolours
  * applies one consistent warm-ivory grade to every photograph
  * resizes to sensible display sizes

Run again whenever a source image changes:   python scripts/prepare-images.py
Missing sources are skipped, so the site keeps using its fallbacks.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
OUT = SRC / "opt"
OUT.mkdir(exist_ok=True)


def warm_ivory(im: Image.Image, strength: float = 1.0) -> Image.Image:
    """Gentle warm grade: lifted, creamy shadows, warm mids, soft highlights."""
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
    ivory = np.array([250, 246, 240], dtype=np.float32) / 255.0
    # warm white balance
    a = a * np.array([1.035, 1.012, 0.955], dtype=np.float32)
    # soft "matte" lift in the shadows toward a warm brown
    lift = np.array([0.045, 0.035, 0.025], dtype=np.float32)
    a = lift + a * (1 - lift)
    # a whisper of ivory screened over everything
    a = 1 - (1 - a) * (1 - ivory * 0.05 * strength)
    a = np.clip(a, 0, 1)
    return Image.fromarray((a * 255).round().astype(np.uint8), "RGB")


def fit(im: Image.Image, long_edge: int) -> Image.Image:
    w, h = im.size
    scale = long_edge / max(w, h)
    if scale >= 1:
        return im
    return im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def white_to_alpha(im: Image.Image) -> Image.Image:
    """Classic 'colour to alpha' against white: keeps soft watercolour edges."""
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
    alpha = np.max(1 - a, axis=2)
    alpha = np.clip((alpha - 0.02) / 0.98, 0, 1)
    safe = np.where(alpha > 1e-4, alpha, 1)[..., None]
    rgb = (a - (1 - alpha[..., None])) / safe
    rgb = np.clip(rgb, 0, 1)
    out = np.dstack([rgb, alpha])
    return Image.fromarray((out * 255).round().astype(np.uint8), "RGBA")


def tint_line_art(im: Image.Image, color=(214, 180, 122)) -> Image.Image:
    """Dark line art on white -> champagne-gold strokes on transparency."""
    g = np.asarray(im.convert("L")).astype(np.float32) / 255.0
    alpha = np.clip((1 - g - 0.12) / 0.6, 0, 1)
    h, w = g.shape
    rgb = np.broadcast_to(np.array(color, dtype=np.uint8), (h, w, 3))
    out = np.dstack([rgb, (alpha * 255).astype(np.uint8)])
    return Image.fromarray(out, "RGBA")


def remove_checkerboard(im: Image.Image) -> Image.Image:
    """Drops a baked-in 'fake transparency' checkerboard connected to the edges."""
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    spread = a.max(axis=2) - a.min(axis=2)
    light = a.min(axis=2) > 214
    neutral = spread < 12
    candidate = light & neutral
    labels, _ = ndimage.label(candidate)
    edge = np.unique(
        np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])
    )
    bg = np.isin(labels, edge[edge > 0])
    # Checker squares also show through the translucent petal tips: repaint
    # those strictly-neutral pixels with the nearest real petal colour.
    inner = ~bg & (spread < 9) & (a.min(axis=2) > 200)
    inner = ndimage.binary_dilation(inner, iterations=1) & ~bg
    _, (iy, ix) = ndimage.distance_transform_edt(inner, return_indices=True)
    filled = a[iy, ix]
    filled = np.asarray(
        Image.fromarray(filled.astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))
    ).astype(np.int16)
    a = np.where(inner[..., None], filled, a)
    im = Image.fromarray(a.astype(np.uint8), "RGB")
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    # feather the cut so petal edges don't look jagged
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(1.2))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha_img)
    return rgba


def patch_from_left(im: Image.Image, box, shift: int) -> Image.Image:
    """Covers a small UI element with the pixels just to its left."""
    x0, y0, x1, y1 = box
    im = im.copy()
    patch = im.crop((x0 - shift, y0, x1 - shift, y1)).filter(ImageFilter.GaussianBlur(1.5))
    im.paste(patch, (x0, y0))
    return im


def save(im: Image.Image, name: str, quality: int = 80):
    path = OUT / f"{name}.webp"
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}  {path.stat().st_size // 1024} KB")


def load(name: str):
    path = SRC / name
    if not path.exists():
        print(f"  (skipped, not found) {name}")
        return None
    return Image.open(path)


print("Preparing images ->", OUT.relative_to(ROOT))

# --- photographs -----------------------------------------------------------
# Crops remove the "Raj Photography" watermarks (always in the top-right).

if (im := load("hero.jpeg")) is not None:
    im = im.crop((0, 64, im.width, im.height))  # watermark sits in the top 55px
    save(fit(warm_ivory(im), 1600), "hero", 82)

if (im := load("couple-main.jpeg")) is not None:
    im = im.crop((0, 84, im.width, im.height))  # watermark + phone no. in top 75px
    save(fit(warm_ivory(im), 1400), "couple-main")

if (im := load("portrait-standing.jpeg")) is not None:
    im = im.crop((0, 62, im.width, im.height))
    save(fit(warm_ivory(im), 1600), "portrait-standing")

if (im := load("kiss.jpeg")) is not None:
    save(fit(warm_ivory(im), 1400), "kiss")

if (im := load("bw-love.jpeg")) is not None:
    # already monochrome; keep it neutral black & white
    save(fit(im.convert("L").convert("RGB"), 1400), "bw-love")

if (im := load("love-story.png")) is not None:
    # Instagram screenshot: trim black frame + carousel dots, hide the arrow
    im = im.convert("RGB").crop((10, 10, 477, 612))
    im = patch_from_left(im, (432, 296, 467, 332), 40)
    save(fit(warm_ivory(im), 1200), "love-story")

if (im := load("shiv-blessing.png")) is not None:
    # Instagram screenshot: trim the carousel arrow on the right edge
    im = im.convert("RGB").crop((6, 0, 588, 590))
    save(fit(warm_ivory(im), 1200), "shiv-blessing")

if (im := load("portrait-close.jpg")) is not None:
    save(fit(warm_ivory(im.convert("RGB")), 1600), "portrait-close")

if (im := load("venue.jpg")) is not None:
    save(fit(warm_ivory(im.convert("RGB")), 1600), "venue")

if (im := load("map-preview.png")) is not None:
    save(fit(im.convert("RGB"), 1000), "map-preview", 85)

# --- illustrations ---------------------------------------------------------

if (im := load("ganesh-line.png")) is not None:
    im = im.convert("RGB").crop((4, 6, im.width - 4, im.height - 4))
    save(fit(white_to_alpha(im), 600), "ganesh-line", 90)

if (im := load("lotus.png")) is not None:
    save(fit(remove_checkerboard(im), 640), "lotus", 88)

if (im := load("floral-bottom.png")) is not None:
    save(fit(white_to_alpha(im.convert("RGB")), 700), "floral-bottom", 88)

if (im := load("shiv-parvati.png")) is not None:
    save(fit(tint_line_art(im), 1200), "shiv-parvati-gold", 90)

if (im := load("palace-bg.webp")) is not None:
    save(fit(im.convert("RGB"), 1200), "palace-bg", 80)

print("Done.")
