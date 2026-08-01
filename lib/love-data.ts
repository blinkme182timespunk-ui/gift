// Personalize everything about your love story right here.

export const config = {
  herName: 'My Love',
  yourName: 'Yours, forever Aryan',
  // The date of your anniversary (used by the countdown). Update the year to a future one.
  anniversary: '2026-08-01T00:00:00',
}

export const loveLetter = [
  'From the very first moment our paths crossed, my world became softer, warmer, and infinitely more beautiful.',
  'You are my calm in every storm, my favorite hello, and my hardest goodbye.',
  'On this International Girlfriend Day, I just want you to know — being loved by you is the greatest thing that has ever happened to me.',
]

export const memories = [
  { src: '/images/moment-1.png', alt: 'The two of us cheek to cheek at brunch', caption: 'Just us, and nowhere else to be.' },
  { src: '/images/moment-2.png', alt: 'A soft kiss on the cheek at night', caption: 'A little kiss that says everything.' },
  { src: '/images/moment-3.png', alt: 'Cozied up together under the string lights', caption: 'Under the lights, close to you.' },
  { src: '/images/moment-4.png', alt: 'Smiling together with a peace sign', caption: 'Peace, love, and you.' },
]

export type TimelineItem = {
  title: string
  date: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    title: 'First Meeting',
    date: 'The beginning',
    description: 'The moment I saw you, it felt like we could be something.',
  },
  {
    title: 'First Date',
    date: 'Our first spark',
    description: 'Nervous laughter, endless conversation, and a day I never wanted to end.',
  },
  {
    title: 'Favorite Memories',
    date: 'Countless moments',
    description: 'Warm hugs, fun conversations, cuddling and watching a movie together.',
  },
  {
    title: 'Adventures',
    date: 'Everywhere with you',
    description: 'Every place feels like home as long as your hand is in mine.',
  },
  {
    title: 'Future Dreams',
    date: 'Forever ahead',
    description: 'A lifetime of sunrises, laughter, and love — all of it, with you.',
  },
]

export const reasons = [
  { title: 'Your Smile', detail: 'It lights up every room and every corner of my heart.' },
  { title: 'Your Kindness', detail: 'The gentle way you care for everyone around you.' },
  { title: 'Your Laugh', detail: 'My favorite sound in the entire universe.' },
  { title: 'Your Strength', detail: 'You face the world with a grace that inspires me daily.' },
  { title: 'Your Heart', detail: 'The safest, warmest place I have ever known.' },
  { title: 'Simply You', detail: 'Every little thing that makes you unmistakably you.' },
]

export const surpriseMessage =
  'You found it. Here is my secret: no matter how many days pass, I will keep choosing you — today, tomorrow, and always. Happy International Girlfriend Day, my everything.'
