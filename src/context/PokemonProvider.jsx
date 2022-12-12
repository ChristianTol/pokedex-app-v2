import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  // Utilize Custom Hooks - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  // Call 50 pokemons from the API
  const getAllPokemons = async (limit = 50) => {
    const res = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      return data;
    });

    const results = await Promise.all(promises);

    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  // Call all pokemons from the API
  const getGlobalPokemons = async () => {
    const res = await fetch(`${baseUrl}?limit=10000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      return data;
    });

    const results = await Promise.all(promises);

    setGlobalPokemons(results);
    setLoading(false);
  };

  // Call a pokemon by ID from the API
  const getPokemonById = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
