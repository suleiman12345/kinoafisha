package event

type Event struct {
	Time    string `json:"time"`
    Price   int    `json:"price"`
    ID 		string `json:"id"`
	MovieID string `json:"movieId"`
	TakenSeats []int `json:"takenSeats"`
}