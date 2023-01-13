import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
  query {
    allSanityAbout {
      edges {
        node {
          aboutimage {
            ...SanityImage
            alt
          }
          title
          description
        }
      }
    }
  }
`;

const About = () => {
  const data = useStaticQuery(query) || {};
  const aboutData = data.allSanityAbout.edges[0].node;
  return (
    <div id="about">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-20 lg:py-32 py-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-8">
            {aboutData ? (
              <img
                src={imageUrlFor(buildImageObj(aboutData?.aboutimage))
                  .fit("crop")
                  .auto("format")
                  .url()}
                className=""
                alt={aboutData?.aboutimage?.alt}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-bold sm:text-[72px] text-[50px] leading-[92px] text-white">
              {aboutData.title}
            </h2>
            <p className="font-normal text-[18px] text-white">
              {aboutData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
