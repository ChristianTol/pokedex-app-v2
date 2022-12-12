import React from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Navigation = () => {
  return (
    <>
      <header className="container">
        <Link to="/" className="logo">
          <img
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="Logo Pokédex"
          />
        </Link>
        <form>
          <div className="form-group">
            <MagnifyingGlassIcon className="icon-search" />
            <input
              type="search"
              name="valueSearch"
              id=""
              placeholder="Search for a pokemon"
            />
          </div>
        </form>
      </header>
    </>
  );
};

export default Navigation;
