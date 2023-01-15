import { Header } from "components/Header/Header";
import React from "react";
import {
  HeroHeaderSection,
  GenericPageSection,
  ContentSection,
  GallerySectionData,
} from "types/cms";
import { AboutUsSection } from "./AboutUs/AboutUs";
import { Content } from "./Content/Content";
import { EnquireSection } from "./Enquire/EnquireSection";
import { FeaturedTreatmentsSection } from "./FeaturedTreatments/FeaturedTreatments";
import { FollowUs } from "./FollowUs/FollowUs";
import { GallerySection } from "./Gallery/GallerySection";
import { TreatmentsGrid } from "./TreatmentsGrid/TreatmentsGrid";

interface SectionsProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  testId?: string;
  sections: (GenericPageSection | HeroHeaderSection | ContentSection)[];
}

const Sections: React.FC<SectionsProps> = ({
  testId,
  className,
  id,
  style,
  sections,
}) => {
  return (
    <div data-testid={testId} style={style} className={className} id={id}>
      {sections.map((section) => {
        switch (section.id) {
          case "Enquire":
            return (
              <EnquireSection
                key={Math.random().toString(36).substring(2, 9)}
                data={section as GenericPageSection}
              />
            );
          case "Hero Header":
            return (
              <Header
                type="hero"
                key={Math.random().toString(36).substring(2, 9)}
                data={section as HeroHeaderSection}
              />
            );
          case "Generic Header":
            return (
              <Header
                type="normal"
                key={Math.random().toString(36).substring(2, 9)}
                data={section as GenericPageSection}
              />
            );
          case "About":
            return (
              <AboutUsSection
                data={section as GenericPageSection}
                key={Math.random().toString(36).substring(2, 9)}
              />
            );
          case "Treatments":
            return (
              <FeaturedTreatmentsSection
                key={Math.random().toString(36).substring(2, 9)}
                data={section as GenericPageSection}
              />
            );
          case "Treatments Grid":
            return (
              <TreatmentsGrid
                key={Math.random().toString(36).substring(2, 9)}
                data={section as GenericPageSection}
              />
            );
          case "Content Section":
            return (
              <Content
                key={Math.random().toString(36).substring(2, 9)}
                data={section as ContentSection}
              />
            );
          case "Gallery Section":
            return (
              <GallerySection
                key={Math.random().toString(36).substring(2, 9)}
                data={section as GallerySectionData}
              />
            );
          case "Follow Us":
            return (
              <FollowUs key={Math.random().toString(36).substring(2, 9)} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

Sections.defaultProps = {
  className: undefined,
  style: undefined,
  id: undefined,
  testId: undefined,
};

export { Sections };
