package email

import (
	"fmt"
	"net/smtp"
)

type SMTPClient struct {
	Host     string
	Port     int
	Username string
	Password string
	Auth     smtp.Auth
}

func NewSMTPClient(host string, port int, username, password string) *SMTPClient {
	auth := smtp.PlainAuth("", username, password, host)
	return &SMTPClient{
		Host:     host,
		Port:     port,
		Username: username,
		Password: password,
		Auth:     auth,
	}
}

func (c *SMTPClient) SendEmail(to []string, subject, body string) error {
	msg := fmt.Sprintf("To: %s\r\nSubject: %s\r\nMIME-version: 1.0;\r\nContent-Type: text/plain; charset=\"UTF-8\";\r\n\r\n%s", to[0], subject, body)
	addr :=fmt.Sprintf("%s:%d", c.Host, c.Port)
	return smtp.SendMail(addr, c.Auth, c.Username, to, []byte(msg))
}

