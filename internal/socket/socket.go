package socket

import (
	"encoding/json"

	socketio "github.com/googollee/go-socket.io"
)

type ChatMsg struct {
	Message		string	`json:"message"`
	Author		string	`json:"author"`
}

func Socket(server *socketio.Server) {
	server.On("connection", func(so socketio.Socket) {
		so.On("join-room", func(roomID string) {
			so.Join(roomID)
	
			so.On("greeting-message", func(msg ChatMsg) {
				msgJSON, _ := json.Marshal(msg)
				server.BroadcastTo(roomID, "greeting-message", string(msgJSON))
			})
	
			so.On("chat-message", func(msg ChatMsg) {
				msgJSON, _ := json.Marshal(msg)
				server.BroadcastTo(roomID, "chat-message", string(msgJSON))
			})
		})
	})
}
