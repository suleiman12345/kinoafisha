package event

import (
	"encoding/json"
	"errors"
	"os"
)

func GetOneByID(id string) (*Event, error) {
	events := []Event{}
	data, err := os.ReadFile("data/events.json")
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(data, &events)
	if err != nil {
		return nil, err
	}


	for _, e := range events {
		if e.ID == id {
			return &e, nil
		}
	}
	return nil, errors.New("событие не найдено")
}

func GetManyByID(id string) ([]Event, error) {
	events := []Event{}
	data, err := os.ReadFile("data/events.json")
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(data, &events)
	if err != nil {
		return nil, err
	}

	res := []Event{}
	for _, e := range events {
		if e.MovieID == id {
			res = append(res, e)
		}
	}
	return res, nil
}