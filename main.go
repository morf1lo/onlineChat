package main

import (
	"log"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"

	"github.com/morf1lo/online-chat/socket"
	"github.com/morf1lo/online-chat/routes"
)

func main() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()

	router.SetTrustedProxies(nil)

	router.LoadHTMLFiles("client/login.html", "client/chat.html")

	router.Static("/public", "client")
	
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	socket.SocketSetup(server)

	router.GET("/", routes.HandleIndex)
	router.GET("/chat/:id", routes.HandleChatPage)

	router.POST("/api/login", routes.HandleLogin)

	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	log.Fatal(router.Run(":5000"))
}
