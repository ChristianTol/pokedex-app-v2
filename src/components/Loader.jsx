import { DotSpinner } from "@uiball/loaders";
import React from "react";
import pokeball from "../assets/pokeball-2.png";

export const Loader = () => {
  return (
    <div className="container-loader">
      {/* <DotSpinner size={40} speed={0.9} color="black" /> */}
      <figure id="loader">
        <img src={pokeball} alt="Loading..." height="100px" width="100px" />
      </figure>
    </div>
  );
};
