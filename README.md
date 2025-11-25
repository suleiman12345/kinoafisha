## Хранилище данных

Все данные лежат локально в `data/`:

* `movies.json` — список фильмов
* `events.json` — список сеансов (`takenSeats` хранит занятые места)

Файлы читаются и перезаписываются напрямую через `os.ReadFile` / `os.WriteFile`.

---

## Порты

* **Backend:** `localhost:8080`
* **Frontend:** `localhost:5173`
* SMTP — по настройкам, указанным в конфиге SMTP-клиента.

---

## API

### Фильмы

**GET /movie**
Возвращает все фильмы.

**GET /movie/{id}**
Возвращает фильм по ID.

### Сеансы

**GET /movie/{id}/events**
Возвращает все сеансы фильма.

**GET /booking/event/{id}**
Возвращает данные сеанса (включая `takenSeats`).

### Бронирование

**POST /booking/event**
Тело:

```json
{
  "email": "user@example.com",
  "eventId": "id",
  "seat": 12
}
```

Логика: проверка → добавление места в `takenSeats` → запись в `events.json` → отправка письма → ответ OK.