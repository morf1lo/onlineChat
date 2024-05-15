package handler

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) userLogin(c *gin.Context) {
	roomID := c.PostForm("roomid")
	username := c.PostForm("username")

	if len(roomID) > 16 || len(username) > 12 {
		c.Redirect(500, "/")
		return
	}

	c.Redirect(302, fmt.Sprintf("/chat/%s?username=%s", roomID, username))
}
