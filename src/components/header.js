import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
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
    allSanitySiteSettings {
      edges {
        node {
          logoimage {
            ...SanityImage
            alt
          }
        }
      }
    }
    allSanitySocials {
      edges {
        node {
          icon {
            ...SanityImage
            alt
          }
          name
          link
        }
      }
    }
  }
`;

const Header = () => {
  const data = useStaticQuery(query) || {};
  const logoimage = data.allSanitySiteSettings.edges[0].node.logoimage;
  const socialIcon = data.allSanitySocials.edges;

  return (
    <header className="bg-black w-full px-[60px] py-7 flex md:flex-row flex-col gap-4">
      <div className="basis-1/2">
        <Link to="/">
          {logoimage && logoimage.asset && (
            <img
              src={imageUrlFor(buildImageObj(logoimage))
                .fit("crop")
                .auto("format")
                .url()}
              className=""
              alt={logoimage.alt}
            />
          )}
        </Link>
      </div>
      <div className="basis-1/2">
        <div className="flex flex-row justify-end gap-8">
          {socialIcon.map((item) => (
            <a
              href={item.node.link}
              key={item.node.name}
              target="_blank"
              rel="noreferrer"
              className="bg-black h-7 w-7"
            >
              {item.node.icon && item.node.icon.asset && (
                <img
                  src={imageUrlFor(buildImageObj(item.node.icon))
                    .fit("crop")
                    .auto("format")
                    .url()}
                  width=""
                  className="m-auto"
                  alt={item.node.icon.alt}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
