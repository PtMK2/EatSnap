package controller

import (
	"log"
	"net/http"
	"os"

	"github.com/PtMK2/EatSnap/backend/model"
	model_redis "github.com/PtMK2/EatSnap/backend/model/redis"
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
		user, err := model.GetOneUser(userId.(string))
		if err != nil {
			log.Println("Failed to get user:", err)
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
	}

	c.HTML(http.StatusOK, templateName, gin.H{"user": user})
}
