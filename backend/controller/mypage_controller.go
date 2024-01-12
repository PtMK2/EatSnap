package controller

import (
	"net/http"
	"os"

	"github.com/PtMK2/EatSnap/backend/model"
	model_redis "github.com/PtMK2/EatSnap/backend/model/redis"
	"github.com/gin-gonic/gin"
)

func GetMypage(c *gin.Context) {
	user := model.User{}
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	userId := model_redis.GetSession(c, cookieKey)
	if userId != nil {
		user = model.GetOneUser(userId.(string))
	}

	c.HTML(http.StatusOK, "mypage.html", gin.H{"user": user})
}
