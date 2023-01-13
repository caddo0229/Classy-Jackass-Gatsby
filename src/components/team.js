import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
// import TeamItem from "./teamItem";

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
    allSanityTeams {
      edges {
        node {
          image {
            ...SanityImage
            alt
          }
        }
      }
    }
  }
`;

const Team = () => {
  const data = useStaticQuery(query) || {};
  const teamsData = data.allSanityTeams.edges;
  let defaultTransform = 0;

  const goNext = () => {
    defaultTransform = defaultTransform - 780;
    let slider = document.getElementById("slider");
    if (Math.abs(defaultTransform) >= slider.scrollWidth)
      defaultTransform = 0;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  };
  function goPrev() {
    let slider = document.getElementById("slider");

    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 300;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
  }

  return (
    <div id="team">
      <div className="container mx-auto lg:pt-32 pt-12">
        <div className="flex items-center justify-center h-full py-24 sm:py-1">
          <div className="relative flex items-center justify-center">
            <button
              aria-label="slide backward"
              className="absolute z-30 sm:left-[-50px] sm:ml-0 left-0 ml-5 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
              onClick={goPrev}
            >
              <svg
                className="text-white"
                width="24"
                height="24"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden bg-white ">
              <div
                id="slider"
                className="h-full flex lg:gap-6 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
              >
                {teamsData && teamsData.length > 0 ? (
                  teamsData.map((team, index) => (
                    <div
                      className="flex flex-shrink-0 relative w-full sm:w-auto"
                      key={index}
                    >
                      <img
                        src={imageUrlFor(buildImageObj(team.node.image))
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={team.node.image.alt}
                        className="object-cover object-center w-[286px]"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <button
              aria-label="slide forward"
              className="absolute z-30 sm:right-[-50px] right-0 sm:mr-0 mr-5 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
              onClick={goNext}
            >
              <svg
                className="text-white"
                width="24"
                height="24"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Team;
