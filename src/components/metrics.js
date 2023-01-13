import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query {
    allSanityStatistics {
      nodes {
        info
        label
      }
    }
  }
`;

const Metrics = () => {
  const data = useStaticQuery(query) || {};
  const metricsData = data.allSanityStatistics.nodes;
  return (
    <div className="metrics">
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col gap-10">
          {metricsData.map((node) => (
            <div className="basis-1/3 border-2 border-white rounded-[18px] py-[25px] px-[34px]" key={node.info}>
              <p className="text-[100px] font-bold leading-[143px] text-center text-white">
                {node.info}
              </p>
              <p className="font-normal text-[20px] leading-[32px] text-center text-white">
                {node.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Metrics;
