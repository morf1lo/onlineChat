package handler

import "github.com/gin-gonic/gin"

func (h *Handler) pageChat(c *gin.Context) {
	h.templates.ExecuteTemplate(c.Writer, "chat.html", nil)
}

func (h *Handler) pageLogin(c *gin.Context) {
	h.templates.ExecuteTemplate(c.Writer, "login.html", nil)
}
