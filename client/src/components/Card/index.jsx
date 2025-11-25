import React from "react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      key={movie.id}
      className="
        p-3 rounded-xl 
        transition duration-300 
        hover:bg-gray-200 
        hover:scale-105
    "
    >
      <img
        src={`http://localhost:8080/public/images/${movie.id}.jpeg`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-xl mb-3"
      />
      <div className="">{movie.title}</div>
      <div className="">{movie.year}</div>
    </Link>
  );
};

export default Card;
