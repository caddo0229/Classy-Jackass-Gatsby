import React from "react";
import PropTypes from "prop-types";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

const TeamItem = ({ image, alt }) => {
  return (
    <div className="basis-1/3">
      {image && image.asset && (
        <img
          src={imageUrlFor(buildImageObj(image))
            .fit("crop")
            .auto("format")
            .url()}
            width="512"
          className="width-full hover:scale-[1.1] duration-[300ms]"
          alt={image.alt}
        />
      )}
    </div>
  );
};

TeamItem.propTypes = {
  alt: PropTypes.string.isRequired,
};

export default TeamItem;
