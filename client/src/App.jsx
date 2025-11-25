import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import MoviePage from "./page/movie";
import BookingPage from "./page/Booking";
import Catalog from "./page/Catalog";



const App = () => {
  return (
    <Routes>
      <Route path="/booking/event/:eventId" element={<BookingPage />} />
      <Route path="/" element={<Catalog />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
