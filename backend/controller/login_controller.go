package controller

import (
	"net/http"

	"github.com/PtMK2/EatSnap/model"
	"github.com/gin-gonic/gin"
)

func GetSignup(c *gin.Context) {
	c.HTML(http.StatusOK, "signup.html", nil)
}

func PostSignup(c *gin.Context) {
	id := c.PostForm("user_id")
	pw := c.PostForm("password")
	user, err := model.Signup(id, pw)
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
	id := c.PostForm("user_id")
	pw := c.PostForm("password")

	user, err := model.Login(id, pw)
	if err != nil {
		c.Redirect(301, "/login")
		return
	}
	c.HTML(http.StatusOK, "top.html", gin.H{"user": user})
}
