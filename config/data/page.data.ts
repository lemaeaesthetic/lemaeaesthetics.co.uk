type PageData = {
  title: string;
  description: string;
  favicon?: string;
  socialImage?: string;
  slug: string;
};

const homePage: PageData = {
  title: "Home | This is the home page",
  description: "A bit of information about this home page",
  slug: "/",
};

const aboutPage: PageData = {
  title: "About | This is the about us page",
  description: "A bit of information about this about us page",
  slug: "/about",
};

export default { homePage, aboutPage };
