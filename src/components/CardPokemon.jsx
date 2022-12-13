import React from "react";
import { Link } from "react-router-dom";

export const CardPokemon = ({ pokemon }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
      <div className="card-img">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={`Pokemon ${pokemon.name}`}
        />
      </div>
      <div className="card-info">
        <span className="pokemon-id">
          {(pokemon.id <= 10 && `No. 00${pokemon.id}`) ||
            (pokemon.id > 10 && pokemon.id < 100
              ? `No. 0${pokemon.id}`
              : `No. ${pokemon.id}`)}
        </span>
        <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
        <div className="card-types">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={type.type.name}>
              {capitalizeFirstLetter(type.type.name)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
