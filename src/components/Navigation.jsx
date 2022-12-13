import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PokemonContext } from "../context/PokemonContext";

export const Navigation = () => {
  const { onInputChange, valueSearch, onResetForm } =
    useContext(PokemonContext);

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: valueSearch });

    onResetForm();
  };

  return (
    <>
      <header className="container">
        <Link to="/" className="logo">
          <img
            // src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Logo Pokédex"
          />
        </Link>
        <form onSubmit={onSearchSubmit}>
          <div className="form-group">
            <MagnifyingGlassIcon className="icon-search" />
            <input
              type="search"
              name="valueSearch"
              id=""
              value={valueSearch}
              onChange={onInputChange}
              placeholder="Search for a pokemon"
            />
          </div>

          <button className="btn-search">Search</button>
        </form>
      </header>

      <Outlet />
    </>
  );
};
