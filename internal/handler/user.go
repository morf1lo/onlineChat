package handler

import (
	"fmt"
	"net/http"
	"net/url"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
)

func (h *Handler) userLogin(c *gin.Context) {
	roomID := c.PostForm("roomId")
	username := c.PostForm("username")

	if utf8.RuneCountInString(roomID) > 16 || utf8.RuneCountInString(username) > 12 {
		c.Redirect(http.StatusFound, "/")
		return
	}

	c.Redirect(http.StatusFound, fmt.Sprintf("/chat/%s?username=%s", url.PathEscape(roomID), url.QueryEscape(username)))
}
