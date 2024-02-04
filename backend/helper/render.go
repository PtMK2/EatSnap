package helper

import (
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func RenderPage(c *gin.Context, redirectname string) {
	user := &model.User{}
	session := sessions.Default(c)
	userID := session.Get("user_id")

	if userID != nil {
		user.UserId = userID.(string)
	}
	c.JSON(http.StatusOK, gin.H{"redirect": redirectname, "user_id": user.UserId})
}
