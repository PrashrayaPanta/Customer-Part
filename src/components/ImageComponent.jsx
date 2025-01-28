import React from "react";

const ImageComponent = ({ url }) => {
  return (
    <>
      <img src={url} className="slider-img" srcSet="" />
    </>
  );
};

export default ImageComponent;
