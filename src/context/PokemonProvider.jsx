import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);

  // call 50 pokemons from the API
  const getAllPokemons = async (limit = 50) => {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon";

    const res = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  return (
    <PokemonContext.Provider
      value={{
        number: 0,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
