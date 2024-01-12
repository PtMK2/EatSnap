package controller

import (
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-gonic/gin"
)

func GetHome(c *gin.Context) {
	renderPage(c, "home.html")
}

func GetMapHome(c *gin.Context) {
	renderPage(c, "map.html")
}

func renderPage(c *gin.Context, templateName string) {
	user := model.User{}
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	userId := model_redis.GetSession(c, cookieKey)
	if userId != nil {
		user = model.GetOneUser(userId.(string))
	}

	c.HTML(http.StatusOK, templateName, gin.H{
		"user": user,
	})
}