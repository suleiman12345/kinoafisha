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

func GetAllEvents() ([]Event, error) {
	data, err := os.ReadFile("data/events.json")
	if err != nil {
		return nil, err
	}

	var events []Event
	if err := json.Unmarshal(data, &events); err != nil {
		return nil, err
	}

	return events, nil
}

func SaveAllEvents(events []Event) error {
	data, err := json.MarshalIndent(events, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile("data/events.json", data, 0644)
}

func UpdateEventByID(event Event) error {
	events, err := GetAllEvents()
	if err != nil {
		return err
	}

	updated := false
	for i, e := range events {
		if e.ID == event.ID {
			events[i] = event
			updated = true
			break
		}
	}

	if !updated {
		return errors.New("событие не найдено")
	}

	return SaveAllEvents(events)
}

func AddTakenSeat(eventID string, seat int) error {
	event, err := GetOneByID(eventID)
	if err != nil {
		return err
	}

	for _, s := range event.TakenSeats {
		if s == seat {
			return errors.New("место уже занято")
		}
	}

	event.TakenSeats = append(event.TakenSeats, seat)

	return UpdateEventByID(*event)
}
