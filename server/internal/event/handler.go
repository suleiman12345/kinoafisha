package event

import (
	"encoding/json"
	"fmt"
	"kinoafisha/pkg/email"
	"kinoafisha/pkg/response"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type BuyTicketRequest struct {
    Email   string `json:"email"`
    EventID string `json:"eventId"`
    Seat    int    `json:"seat"`
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

func (h *Handler) BookTicket(w http.ResponseWriter, r *http.Request) {
    var req BuyTicketRequest

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        response.Error(w, http.StatusBadRequest, "invalid request body")
        return
    }

    if req.Email == "" || req.EventID == "" || req.Seat <= 0 {
        response.Error(w, http.StatusBadRequest, "email, eventId and seat are required")
        return
    }

    if err := AddTakenSeat(req.EventID, req.Seat); err != nil {
        response.Error(w, http.StatusBadRequest, err.Error())
        return
    }

    subject := "Подтверждение бронирования"
    body := fmt.Sprintf(
        "Ваш билет забронирован!\nСеанс: %s\nМесто: %d\nСпасибо за бронирование!",
        req.EventID, req.Seat,
    )

    if err := h.smtpClient.SendEmail([]string{req.Email}, subject, body); err != nil {
        response.Error(w, http.StatusInternalServerError, "failed to send email")
        return
    }

    response.JSON(w, http.StatusOK, map[string]interface{}{
        "message": "Бронирование подтверждено",
        "eventId": req.EventID,
        "seat":    req.Seat,
        "email":   req.Email,
    })
}

