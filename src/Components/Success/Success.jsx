import React from "react";
import Lottie from "react-lottie";
import successIcon from "../../assets/success.json";

export default function Success({ height, width }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successIcon,
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
}
