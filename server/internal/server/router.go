package server

import (
	"kinoafisha/internal/event"
	"kinoafisha/internal/movie"
	"kinoafisha/pkg/email"

	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)



func InitRouter(smtpClient *email.SMTPClient) http.Handler {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
    AllowedOrigins:   []string{"http://localhost:5173"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    AllowCredentials: true,
}))

	movieHandler := movie.NewHandler()
	eventHandler := event.NewHandler(smtpClient)

	r.Get("/", movieHandler.GetAllMovies)
	r.Get("/movie/{id}", movieHandler.GetMovieByID)
	r.Get("/movie/{id}/events", eventHandler.GetFilmEvents)
	r.Post("/booking/event", eventHandler.BuyTicket)
	r.Get("/booking/event/{id}", eventHandler.GetEventByID)

	r.Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

	return r
}
