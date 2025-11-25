package movie

type Movie struct {
    Title          string    `json:"title"`
    ID             string    `json:"id"`
    Year           int       `json:"year"`
    Description    string    `json:"description"`
    Director       string    `json:"director"`
    RuntimeMinutes int       `json:"runtime_minutes"`
    Rating         float64   `json:"rating"`
}

