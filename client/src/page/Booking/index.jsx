import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { eventId } = useParams();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [event, setEvent] = useState(null); // <-- исправлено

  useEffect(() => {
    fetch(`http://localhost:8080/booking/event/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Событие не найдено");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке события:", err);
        setEvent(null); // чтобы отобразить ошибку
      });
  }, [eventId]);

  if (event === null) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl mb-4">Событие не найдено</h2>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/booking/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, eventId }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке запроса");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  if (!event) return <div>Загрузка...</div>; // на время загрузки

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">
        Бронирование билета
      </h1>

      <div className="border rounded-xl p-4 bg-gray-50">
        <h2 className="text-xl font-semibold">{event.movieTitle}</h2>
        <p className="text-gray-700">
          Время сеанса: <span className="font-medium">{event.time}</span>
        </p>
        <p className="mt-2 text-gray-700">
          Цена: <span className="font-medium">{event.price}</span>
        </p>
      </div>

      {!submitted ? (
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="font-medium">Ваш email</span>
            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            className="bg-custom-lightblue cursor-pointer text-white py-3 rounded-lg hover:bg-blue-400 transition active:scale-95"
          >
            Забронировать
          </button>
        </form>
      ) : (
        <div className="mt-6 text-center text-green-600 font-medium text-lg">
          Бронирование подтверждено!
          <br />
          Билет отправлен на <b>{email}</b>
        </div>
      )}
    </div>
  );
};

export default BookingPage