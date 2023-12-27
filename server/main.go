package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"

	"server/socket"
)

func handleIndex(c *gin.Context) {
	c.HTML(200, "login.html", gin.H{})
}

func handleLogin(c *gin.Context) {
	roomID := c.PostForm("roomid")
	username := c.PostForm("username")

	if len(roomID) > 16 || len(username) > 12 {
		c.Redirect(500, "/")
		return
	}

	c.Redirect(302, fmt.Sprintf("/chat/%s?username=%s", roomID, username))
}

func handleChat(c *gin.Context) {
	c.HTML(200, "chat.html", gin.H{})
}

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

	router.GET("/", handleIndex)
	router.POST("/login", handleLogin)
	router.GET("/chat/:id", handleChat)

	log.Fatal(router.Run(":5000"))
}
