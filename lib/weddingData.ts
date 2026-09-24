import { IMG } from "@/lib/assets";

export const couple = {
  bride: "Sejal",
  groom: "Himanshu",
  weddingDate: "21 November 2026",
  tagline: "A Celebration of Love, Family & Forever",
};

export const families = {
  bride: {
    title: "Bride's Side",
    parents: [
      { name: "श्री सुरेन्द्र मोहन सिंह", note: "" },
      { name: "श्रीमती सुमिता सिंह", note: "" },
    ],
  },
  groom: {
    title: "Groom's Side",
    parents: [
      { name: "श्री विवेक सिंह बैस", note: "" },
      { name: "स्वर्गीय श्रीमती सीता सिंह बैस", note: "सदैव हमारे हृदय में" },
    ],
  },
};

export const venue = {
  name: "Heaven's Feel Farm",
  addressLines: [
    "Heaven's Feel Farm",
    "Behind Gomatgiri",
    "Jhambudi Hapsi",
    "Gandhi Nagar",
    "Indore",
    "Madhya Pradesh — 453112",
  ],
  mapsUrl:
    "https://www.google.com/maps/place/Heavens+feel/@22.7452471,75.7272825,746m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39630100570bca03:0xcee3fdcf39875eef!8m2!3d22.7452471!4d75.7272825!16s%2Fg%2F11y51vn7sp?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D",
};

export const events = {
  haldi: {
    title: "Carnival & Haldi",
    date: "20 November 2026",
    time: "3:00 PM",
    venue: venue.name,
    line: "Colours of Love",
  },
  sangeet: {
    title: "Sangeet",
    date: "20 November 2026",
    time: "6:00 PM",
    line: "Music • Dance • Family • Forever",
  },
  baraat: {
    title: "बारात",
    date: "21 नवम्बर 2026",
    departure: "3:00 PM",
    arrival: "4:00 PM",
    from: "Fun O Farm",
    to: "Heaven's Feel Farm",
    address: "Behind Gomatgiri, Gandhi Nagar, Indore",
  },
  wedding: {
    title: "Wedding Ceremony",
    date: "21 November 2026",
    time: "5:30 PM",
    venue: venue.name,
    line: "Sacred • Eternal • Ours",
  },
};

export const loveStoryMoments = [
  { caption: "Our Beginning", image: IMG.casual, tall: false },
  { caption: "You & Me", image: IMG.coupleMain, tall: true },
  { caption: "Forever Starts Here", image: IMG.foreheadKiss, tall: false },
  { caption: "My Favourite Place Is You", image: IMG.kiss, tall: true },
  { caption: "Every Step With You", image: IMG.stairs, tall: true },
  { caption: "One Lifetime Isn't Enough", image: IMG.hero, tall: false },
  { caption: "Always & Forever", image: IMG.sv, tall: true },
];

export const music = {
  title: "Khwabida",
  artist: "Asheesh Kulkarni & Shantanu Ravindra Pandey",
  src: "/music/khwabida.mp3",
};
