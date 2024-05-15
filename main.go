package main

import (
	"log"

	"github.com/morf1lo/online-chat/internal/handler"
)

func main() {
	handlers := handler.New()
	
	server, err := handlers.InitRoutes()
	if err != nil {
		log.Fatalf("error initializing routes: %s", err.Error())
	}

	if err := server.Run(":5000"); err != nil {
		log.Fatalf("error occured while running server: %s", err.Error())
	}
}
