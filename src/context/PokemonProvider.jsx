import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "../hook/useForm";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";

  const [nextUrl, setNextUrl] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);
  // const [offset, setOffset] = useState(0);

  // Utilize Custom Hooks - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          nextUrl &&
          allPokemons.length <= 1140
        ) {
          setTimeout(() => {
            getAllPokemons(nextUrl);
          }, 1000);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextUrl, allPokemons]
  );

  const fetchPokemonDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  };

  // Call 50 pokemons from the API
  const getAllPokemons = useCallback(
    async (url) => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        const { next } = data;
        console.log(next);
        if (next) {
          setNextUrl(next);
        }

        const promises = data.results.map(
          async (pokemon) => await fetchPokemonDetail(pokemon.url)
        );

        await Promise.all(promises).then((detailResults) => {
          setAllPokemons([...allPokemons, ...detailResults]);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, nextUrl, allPokemons]
  );

  // Call all pokemons from the API
  const getGlobalPokemons = async () => {
    const res = await fetch(`${baseUrl}?limit=100000&offset=0`);
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
    getAllPokemons(baseUrl);
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  // BTN Load More

  // const loadMore = () => {
  //   setOffset(offset + 12);
  // };

  // Filter Function
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknown: false,
    shadow: false,
  });

  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handleCheckbox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types.map((type) => type.type.name).includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults]);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById,
        loading,
        active,
        setActive,
        handleCheckbox,
        filteredPokemons,
        lastElementRef,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
