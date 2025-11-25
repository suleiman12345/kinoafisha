package movie

import (
	"net/http"

	"kinoafisha/pkg/response"
	"github.com/go-chi/chi/v5"
)

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) GetAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := GetAll()
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "не удалось загрузить фильмы")
		return
	}

	response.JSON(w, http.StatusOK, movies)
}

func (h *Handler) GetMovieByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	movie, err := GetByID(id)
	if err != nil {
		response.Error(w, http.StatusNotFound, err.Error())
		return
	}

	response.JSON(w, http.StatusOK, movie)
}
