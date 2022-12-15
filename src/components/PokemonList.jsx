import React, { useContext, useRef, useCallback } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { CardPokemon } from "./CardPokemon";
import { Loader } from "./Loader";

export const PokemonList = () => {
  const { allPokemons, loading, filteredPokemons, lastElementRef } =
    useContext(PokemonContext);
  return (
    <>
      <div className="card-list-pokemon container">
        {filteredPokemons.length ? (
          <>
            {filteredPokemons.map((pokemon) => (
              <CardPokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </>
        ) : (
          <>
            {allPokemons.map((pokemon, i) =>
              i === allPokemons.length - 1 ? (
                <CardPokemon
                  lastElementRef={lastElementRef}
                  pokemon={pokemon}
                  key={pokemon.id}
                />
              ) : (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              )
            )}
          </>
        )}
      </div>
      {allPokemons.length < 1154 && <Loader />}
    </>
  );
};
