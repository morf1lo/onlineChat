package handler

import (
	"html/template"

	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
	"github.com/morf1lo/online-chat/internal/socket"
)

type Handler struct {
	templates *template.Template
}

func New() *Handler {
	return &Handler{
		templates: template.Must(template.ParseGlob("templates/*.html")),
	}
}

func (h *Handler) InitRoutes() (*gin.Engine, error) {
	router := gin.New()

	router.SetTrustedProxies(nil)

	router.Static("/static", "static")

	server, err := socketio.NewServer(nil)
	if err != nil {
		return nil, err
	}

	socket.Socket(server)

	router.GET("/", h.pageLogin)
	router.GET("/chat/:id", h.pageChat)

	router.POST("/auth/login", h.userLogin)

	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	return router, nil
}
