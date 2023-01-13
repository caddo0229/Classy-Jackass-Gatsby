import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Button from "./button";
import MapIcon from "../images/map-pin.svg";
import LinkIcon from "../images/link.svg";
import CalendarDays from "../images/calendar-days.svg";
import { format } from "date-fns";

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
    allSanitySocialfeed {
      edges {
        node {
          socialaccount
          name
          content
          socialtags
          location
          openseaurl
          joineddate
          following
          follower
          socialfeedimage {
            ...SanityImage
            alt
          }
        }
      }
    }
  }
`;

const Feed = () => {
  const data = useStaticQuery(query) || {};
  const socialfeedimage =
    data.allSanitySocialfeed.edges[0].node.socialfeedimage;
  console.log(data);

  return (
    <div id="feed">
      <div className="sm:ml-18 mx-12 mt-16 mb-16">
        <div className="bg-black sm:h-[100px] h-[60px] relative">
          {socialfeedimage && socialfeedimage.asset && (
            <img
              src={imageUrlFor(buildImageObj(socialfeedimage))
                .fit("crop")
                .auto("format")
                .url()}
              width="512"
              className="absolute left-4 top-[100%] translate-y-[-50%] rounded-full object-contain border-solid border-white border-[5px] max-w-[190px] w-[25%]"
              alt={socialfeedimage.alt}
            />
          )}
        </div>
        <div className="flex justify-end">
          <Button
            label="Follow"
            link="#"
            className="sm:w-[100px] w-[60px] sm:py-3 py-1 rounded-[20px] sm:mr-4 sm:mt-4 mr-2 mt-1 bg-black"
          />
        </div>
        <div className="flex mt-14 ml-4 text-[1.5rem] font-black">
          <h3 className="">{data.allSanitySocialfeed.edges[0].node.name}</h3>
        </div>
        <div className="flex text-[1.5rem] ml-4 font-thin">
          <h4 className="">
            {data.allSanitySocialfeed.edges[0].node.socialaccount}
          </h4>
        </div>
        <div className="ml-4 font-[400] mt-6 text-[1.1rem]">
          {data.allSanitySocialfeed.edges[0].node.content}&nbsp;
          {data.allSanitySocialfeed.edges[0].node.socialtags.map((tag) => (
            <a href={`#${tag}`} key={tag} className="text-[#2293ee]">
              {`#${tag}`}{" "}
            </a>
          ))}
        </div>

        <div className="flex md:flex-row flex-col  ml-4 font-[400] mt-2 text-[1rem]">
          <div className="basis-1/4 flex items-center">
            <img className="w-[15px] h-[15px] mr-1" src={MapIcon} alt="map" />{" "}
            {data.allSanitySocialfeed.edges[0].node.location}
          </div>
          <div className="basis-5/12 flex items-center">
            <img className="w-[15px] h-[15px] mr-1" src={LinkIcon} alt="map" />
            <a href="#stayclassy" className="text-[#2293ee] truncate ...">
              {data.allSanitySocialfeed.edges[0].node.openseaurl}
            </a>
          </div>
          <div className="basis-1/3 flex items-center">
            <img
              className="w-[15px] h-[15px] mr-1"
              src={CalendarDays}
              alt="map"
            />
            Joined{" "}
            {format(
              new Date(data.allSanitySocialfeed.edges[0].node.joineddate),
              "MMMM yyyy"
            )}
          </div>
        </div>

        <div className="ml-4 font-[400] mt-2 text-[1rem]">
          <div className="basis-1/2 flex gap-5">
            <p>
              <b>{data.allSanitySocialfeed.edges[0].node.following}</b>{" "}
              Following
            </p>
            <p>
              <b>{data.allSanitySocialfeed.edges[0].node.follower}</b> Followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feed;

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
  />
</svg>;
