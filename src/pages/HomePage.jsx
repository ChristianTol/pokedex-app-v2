import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { PokemonList } from "../components/PokemonList";

export const HomePage = () => {
  return (
    <>
      <div className="container-filter container">
        <div className="icon-filter">
          <AdjustmentsHorizontalIcon className="icon" />
          <span>Filter</span>
        </div>
      </div>
      <PokemonList />
    </>
  );
};
