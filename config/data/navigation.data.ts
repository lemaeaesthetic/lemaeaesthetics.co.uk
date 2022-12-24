export interface NavLink {
  href: string;
  title: string;
  label: string;
  isExternal?: boolean;
  rel?: string;
  target?: string;
}

export const navLinks: NavLink[] = [
  {
    href: "/services",
    title: "View our services",
    label: "Services",
  },
  {
    href: "/about",
    title: "View our about page",
    label: "About",
  },
  {
    href: "/contact",
    title: "View our contact page",
    label: "Contact",
  },
];
