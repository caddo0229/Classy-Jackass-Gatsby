import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import MuxVideo from "@mux/mux-video-react";

const query = graphql`
  query {
    allSanitySiteSettings {
      nodes {
        herovideo {
          title
          vimeoId
          description
        }
      }
    }
  }
`;

const Hero = () => {
  const data = useStaticQuery(query) || {};
  const herovideo = data.allSanitySiteSettings?.nodes[0]?.herovideo;
  console.log("----------", herovideo)
  return (
    <div id="hero">
      <div className="relative pt-[56.25%]">
        {herovideo ? (
          <iframe
            src={`https://player.vimeo.com/video/${herovideo.vimeoId}?loop=1&autoplay=1&controls=0`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <></>
        )}

        <div
          className="relative flex overflow-x-hidden text-outline-marquee text-white uppercase 
        bg-black text-[40px] font-normal leading-[80px] border-2 border-white"
        >
          <div className="animate-marquee whitespace-nowrap">
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
            <span>COMING SOON - </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
