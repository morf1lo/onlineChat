package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

// Login page "/"
func HandleIndex(c *gin.Context) {
	c.HTML(200, "login.html", gin.H{})
}

// Login to the chat controller POST "/login"
func HandleLogin(c *gin.Context) {
	roomID := c.PostForm("roomid")
	username := c.PostForm("username")

	if len(roomID) > 16 || len(username) > 12 {
		c.Redirect(500, "/")
		return
	}

	c.Redirect(302, fmt.Sprintf("/chat/%s?username=%s", roomID, username))
}

// Chat page "/chat"
func HandleChat(c *gin.Context) {
	c.HTML(200, "chat.html", gin.H{})
}
