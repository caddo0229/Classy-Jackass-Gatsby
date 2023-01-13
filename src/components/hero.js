import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import MuxVideo from "@mux/mux-video-react";

const query = graphql`
  query {
    allSanitySiteSettings {
      nodes {
        herovideo {
          asset {
            _key
            _type
            status
            assetId
            playbackId
            filename
            thumbTime
            __typename
          }
        }
      }
    }
  }
`;

const Hero = () => {
  const data = useStaticQuery(query) || {};
  const herovideo = data.allSanitySiteSettings?.nodes[0]?.herovideo?.asset;
  return (
    <div id="hero">
      <div className="relative">
        {herovideo ? (
          <MuxVideo
            style={{ width: "100%" }}
            playbackId={herovideo?.playbackId}
            src={`https://stream.mux.com/${herovideo?.playbackId}.m3u8`}
            poster={`https://image.mux.com/${herovideo?.playbackId}/thumbnail.png`}
            metadata={{
              video_id: herovideo?.assetId,
              video_title: "Hero Video",
              viewer_user_id: "1",
            }}
            streamType="on-demand"
            loop
            autoPlay
            muted
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
