package helper

import (
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func RenderPage(c *gin.Context, templateName string) {
	user := &model.User{}
	session := sessions.Default(c)
	userID := session.Get("user_id")

	if userID != nil {
		user.UserId = userID.(string)
	}
	c.HTML(http.StatusOK, templateName, gin.H{"user_id": user.UserId})
}
