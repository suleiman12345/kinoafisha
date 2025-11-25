import React, { useEffect, useState } from "react";

import Card from "../../components/Card";

function Catalog() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Ошибка при загрузке фильмов:", err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
      {movies?.map((m) => (
        <Card movie={m} />
      ))}
    </div>
  );
}

export default Catalog;
