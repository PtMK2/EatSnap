package controller

import (
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-gonic/gin"
)

func getHome(c *gin.Context) {
	user := model.User{}
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	userId := model_redis.GetSession(c, cookieKey)
	if userId != nil {
		user = model.GetOneUser(userId.(string))
	}

	c.HTML(http.StatusOK, "home.html", gin.H{
		"user": user,
	})
}
