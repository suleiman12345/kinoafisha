package event

import (
	"encoding/json"
	"kinoafisha/pkg/email"
	"kinoafisha/pkg/response"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type BuyTicketRequest struct {
	Email string `json:"email"`
}

type Handler struct {
	smtpClient *email.SMTPClient
}


func NewHandler(smtpClient *email.SMTPClient) *Handler {
	return &Handler{smtpClient: smtpClient}
}

func (h *Handler) GetEventByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	e, err := GetOneByID(id)
	if err != nil {
    	response.Error(w, http.StatusNotFound, err.Error())
    	return
	}

	response.JSON(w, http.StatusOK, e)
}

func (h *Handler) GetFilmEvents(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	e, err := GetManyByID(id)
	if err != nil {
    	response.Error(w, http.StatusNotFound, err.Error())
    	return
	}

	response.JSON(w, http.StatusOK, e)
}

func (h *Handler) BuyTicket(w http.ResponseWriter, r *http.Request) {
	var req BuyTicketRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Email == "" {
		response.Error(w, http.StatusBadRequest, "email is required")
		return
	}

	subject := "Подтверждение бронирования"
	body := "Спасибо за бронирование билета!"

	err := h.smtpClient.SendEmail([]string{req.Email}, subject, body)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to send email")
		return
	}
	println(3)
	response.JSON(w, http.StatusOK, map[string]string{"message": "Email отправлен"})

}