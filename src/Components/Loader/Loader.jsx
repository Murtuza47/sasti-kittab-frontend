import React from "react";
import Lottie from "react-lottie";
import loaderIcon from "../../assets/loader.json";

export const Loader = ({ height, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      height={height || 200}
      width={width || 200}
    />
  );
};
