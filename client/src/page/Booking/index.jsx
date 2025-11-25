import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { eventId } = useParams();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [event, setEvent] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
console.log(event);

  const rows = 5;
  const seatsPerRow = 8;

  // Загружаем событие с сервера
  useEffect(() => {
    fetch(`http://localhost:8080/booking/event/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Событие не найдено");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch(() => setEvent(null));
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/booking/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          eventId,
          seat: selectedSeat,
        }),
      });

      if (!response.ok) throw new Error();

      setSubmitted(true);
    } catch {
      console.error("Ошибка бронирования");
    }
  };

  if (event === null) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl mb-4">Событие не найдено</h2>
      </div>
    );
  }

  if (!event) return <div>Загрузка...</div>;

const occupiedSeats = event.takenSeats || [];

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
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Выберите место</h3>

          <div className="grid grid-cols-8 gap-2 p-4 bg-gray-100 rounded-lg">
            {Array.from({ length: rows * seatsPerRow }, (_, index) => {
              const seatNumber = index + 1;
              const isOccupied = occupiedSeats.includes(seatNumber);

              return (
                <button
                  key={seatNumber}
                  onClick={() => !isOccupied && setSelectedSeat(seatNumber)}
                  disabled={isOccupied}
                  className={`
                    p-2 rounded text-sm border 
                    ${
                      isOccupied
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : ""
                    }
                    ${
                      !isOccupied && selectedSeat === seatNumber
                        ? "bg-blue-400 text-white border-blue-400"
                        : ""
                    }
                    ${
                      !isOccupied && selectedSeat !== seatNumber
                        ? "bg-white hover:bg-gray-200 cursor-pointer"
                        : ""
                    }
                  `}
                >
                  {seatNumber}
                </button>
              );
            })}
          </div>

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
              disabled={!selectedSeat}
              className={`py-3 rounded-lg transition active:scale-95 ${
                selectedSeat
                  ? "bg-custom-lightblue text-white hover:bg-blue-400"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Забронировать
            </button>
          </form>
        </>
      ) : (
        <div className="mt-6 text-center text-green-600 font-medium text-lg">
          Бронирование подтверждено!
          <br />
          Место: <b>{selectedSeat}</b>
          <br />
          Билет отправлен на <b>{email}</b>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
