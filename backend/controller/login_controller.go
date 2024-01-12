package controller

import (
	"net/http"
	"os"

	"github.com/PtMK2/EatSnap/backend/model"
	model_redis "github.com/PtMK2/EatSnap/backend/model/redis"
	"github.com/gin-gonic/gin"
)

func GetSignup(c *gin.Context) {
	c.HTML(http.StatusOK, "signup.html", nil)
}

func PostSignup(c *gin.Context) {
	id := c.PostForm("user_id")
	pw := c.PostForm("password")
	name := c.PostForm("user_name")
	mail := c.PostForm("user_mail")
	user, err := model.Signup(id, pw, name, mail)
	if err != nil {
		c.Redirect(301, "/signup")
		return
	}
	c.HTML(http.StatusOK, "home.html", gin.H{"user": user})
}

func GetLogin(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", nil)
}

func PostLogin(c *gin.Context) {
	mail := c.PostForm("user_mail")
	pw := c.PostForm("password")

	user, err := model.Login(mail, pw)
	if err != nil {
		c.Redirect(301, "/login")
		return
	}
	c.HTML(http.StatusOK, "top.html", gin.H{"user": user})
}

func GetLogout(c *gin.Context) {
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	model_redis.DeleteSession(c, cookieKey)
	c.Redirect(http.StatusFound, "/")
}
