package movie

import (
	"encoding/json"
	"errors"
	"os"
)

func GetAll() ([]Movie, error) {
	data, err := os.ReadFile("data/movies.json")
	if err != nil {
		return nil, err
	}

	var movies []Movie
	err = json.Unmarshal(data, &movies)
	if err != nil {
		return nil, err
	}

	return movies, nil
}

func GetByID(id string) (*Movie, error) {
	movies, err := GetAll()
	if err != nil {
		return nil, err
	}

	for _, m := range movies {
		if m.ID == id {
			return &m, nil
		}
	}
	return nil, errors.New("фильм не найден")
}