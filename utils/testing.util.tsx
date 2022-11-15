import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

// Wrap our tests in a component which adds our providers
const TestWrapper: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => ({ ...children });

// Use the custom render function to add our wrapper to the tested component
const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: TestWrapper, ...options });

/**
 * Helper function to return an object with all the meta elements in the baseElement
 *
 * @param baseElement HTML element which is queried for our meta elements
 * @returns { object } Key:value object which has either the element or null
 */
const getAllMeta = (
  baseElement: Element
): { [key: string]: Element | null } => {
  const title = baseElement.querySelector("title");
  const description = baseElement.querySelector('[name="description"]');
  const robots = baseElement.querySelector('[name="robots"]');
  const ogTitle = baseElement.querySelector('[property="og:title"]');
  const ogDescription = baseElement.querySelector(
    '[property="og:description"]'
  );
  const ogUrl = baseElement.querySelector('[property="og:url"]');
  const ogSiteName = baseElement.querySelector('[property="og:site_name"]');
  const ogType = baseElement.querySelector('[property="og:type"]');
  const twitterTitle = baseElement.querySelector('[name="twitter:title"]');
  const twitterDescription = baseElement.querySelector(
    '[name="twitter:description"]'
  );
  const icon = baseElement.querySelector('link[rel="icon"]');
  //const ogImage = baseElement.querySelector('[property="og:image"]');
  //const twitterImage = baseElement.querySelector('[name="twitter:image"]');
  //const twitterSite = baseElement.querySelector('[name="twitter:site"]');
  //const twitterCreator = baseElement.querySelector('[name="twitter:creator"]');
  //const twitterCard = baseElement.querySelector('[name="twitter:card"]');
  return {
    title,
    description,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogSiteName,
    twitterTitle,
    twitterDescription,
    ogType,
    icon,
    //ogImage,
    //twitterImage,
    //twitterSite,
    //twitterCreator,
    //twitterCard,
  };
};
export * from "@testing-library/react";

export { customRender as render, getAllMeta };
