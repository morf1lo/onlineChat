package main

import (
	"log"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"

	"server/socket"
	"server/routes"
)

func main() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	
	router.SetTrustedProxies(nil)
	router.LoadHTMLFiles("../client/login.html", "../client/chat.html")
	router.Static("/public/", "../client")

	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
		return
	}

	socket.SocketSetup(server)

	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	router.GET("/", routes.HandleIndex)
	router.POST("/login", routes.HandleLogin)
	router.GET("/chat/:id", routes.HandleChat)

	log.Fatal(router.Run(":5000"))
}
