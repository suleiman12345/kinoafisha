import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((err) => console.error("Ошибка при загрузке фильмов:", err));

    fetch(`http://localhost:8080/movie/${id}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.error("Ошибка при загрузке событий:", err));
  }, [id]);

  if (isLoading) return <div className="p-6">Загрузка..</div>;

  if (!movie && !isLoading) return <div className="p-6">Фильм не найден</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="w-full flex justify-center mb-6">
        <img
          src={`http://localhost:8080/public/images/${id}.jpeg`}
          alt={movie?.title}
          className="w-64 h-96 object-cover rounded-xl shadow"
        />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center">{movie?.title}</h1>
      <div className="text-gray-600 text-center mb-4">{movie?.year}</div>

      <p className="mb-6 text-lg leading-relaxed text-center">
        {movie?.description}
      </p>

      <div className="space-y-2 text-lg">
        <div>
          <span className="font-semibold">Режиссёр:</span> {movie?.director}
        </div>

        {movie?.runtime_minutes && (
          <div>
            <span className="font-semibold">Длительность:</span>{" "}
            {movie?.runtime_minutes} мин
          </div>
        )}

        {movie?.budget_usd && (
          <div>
            <span className="font-semibold">Бюджет:</span> $
            {movie?.budget_usd.toLocaleString()}
          </div>
        )}

        <div>
          <span className="font-semibold">Рейтинг:</span> {movie?.rating}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Где можно посмотреть
        </h2>

        <div className="space-y-3">
          {events?.map((s, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 rounded-xl flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-gray-600 text-sm">Начало: {s.time}</div>
              </div>

              <button
                onClick={() => navigate(`/booking/event/${s.id}`)}
                className="
                    bg-custom-lightblue cursor-pointer text-white px-4 py-2 rounded-lg
                    hover:bg-blue-400 active:scale-95 transition
                "
              >
                Забронировать
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
