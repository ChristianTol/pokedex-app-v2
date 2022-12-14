import React, { useContext } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { PokemonList } from "../components/PokemonList";
import FilterBar from "../components/FilterBar";
import { PokemonContext } from "../context/PokemonContext";

export const HomePage = () => {
  const { loadMore } = useContext(PokemonContext);
  return (
    <>
      <div className="container-filter container">
        <div className="icon-filter">
          <AdjustmentsHorizontalIcon className="icon" />
          <span>Filter</span>
        </div>
      </div>
      <PokemonList />
      <FilterBar />
      <div className="container-btn-load-more container">
        <button className="btn-load-more" onClick={loadMore}>
          Load more
        </button>
      </div>
    </>
  );
};
