// Cider for Android, shared by its product page and the home page.

// Cider for Android's page on Taproom takes pre-orders and lets owners and supporters into
// the beta; the download page is where they get the app.
export const androidTaproomUrl = "https://taproom.cider.sh/android";
export const androidDownloadUrl = "https://taproom.cider.sh/android/download";

// Screenshots live in public/android/ (720 x 1603 WebP from a Pixel). An empty src shows a
// labelled placeholder frame. The Quest capture is a 12.6s muted loop at 1600 x 900: AV1 WebM
// with an H.264 MP4 fallback, and its first frame as the poster.
export const androidShots = {
  hero: { src: "/android/now-playing.webp", alt: "Now playing, with the artwork filling the screen" },
  gallery: [
    { src: "/android/home.webp", alt: "Home, with top picks and recently played" },
    { src: "/android/album.webp", alt: "An album page, colored to match its artwork" },
    { src: "/android/new.webp", alt: "New, with the latest releases" },
    { src: "/android/radio.webp", alt: "Radio stations" },
  ],
  quest: {
    src: "/android/quest-poster.webp",
    video: { webm: "/android/quest.webm", mp4: "/android/quest.mp4" },
    alt: "Cider as a panel on Meta Quest: browsing an album, playing music, and moving the window",
  },
};
