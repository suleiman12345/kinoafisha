package main

import (
	"kinoafisha/internal/server"
	"kinoafisha/pkg/email"
	"log"
	"net/http"
)

func main() {
    smtpClient := email.NewSMTPClient(
        "smtp.ethereal.email",
        587,
        "alfredo60@ethereal.email",
        "NcGKqYaW6qTm5h5uMG",
    )

    r := server.InitRouter(smtpClient)

    log.Println("Server started on :8080")
    if err := http.ListenAndServe(":8080", r); err != nil {
        log.Fatal(err)
    }
}
