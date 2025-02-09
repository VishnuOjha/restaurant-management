import { faker } from "@faker-js/faker";
import coverImg from "../assets/images/covers/cover_1.jpg";
import avatarImg from "../assets/images/avatars/avatar_1.jpg";

// ----------------------------------------------------------------------

const POST_TITLES = [
  "Whiteboard Templates By Industry Leaders",
  "Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!",
  "Designify Agency Landing Page Design",
  "✨What is Done is Done ✨",
  "Fresh Prince",
  "Six Socks Studio",
  "vincenzo de cotiis’ crossing over showcases a research on contamination",
  "Simple, Great Looking Animations in Your Project | Video Tutorial",
  "40 Free Serif Fonts for Digital Designers",
  "Examining the Evolution of the Typical Web Design Client",
  "Katie Griffin loves making that homey art",
  "The American Dream retold through mid-century railroad graphics",
  "Illustration System Design",
  "CarZio-Delivery Driver App SignIn/SignUp",
  "How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna",
  "Tylko Organise effortlessly -3D & Motion Design",
  "RAYO ?? A expanded visual arts festival identity",
  "Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover",
  "Inside the Mind of Samuel Day",
  "Portfolio Review: Is This Portfolio Too Creative?",
  "Akkers van Margraten",
  "Gradient Ticket icon",
  "Here’s a Dyson motorcycle concept that doesn’t ‘suck’!",
  "How to Animate a SVG with border-image",
];

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `${coverImg}`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: avatarImg,
  },
}));
