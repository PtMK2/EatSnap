package controller

import (
	"log"
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetSignup(c *gin.Context) {
	// c.HTML(http.StatusOK, "signup.html", nil)
	c.JSON(http.StatusOK, gin.H{"redirect": "/signup"})
}

func PostSignup(c *gin.Context) {
	id := c.PostForm("id")
	pw := c.PostForm("password")
	name := c.PostForm("name")
	mail := c.PostForm("mail")
	_, err := model.Signup(id, pw, name, mail)

	if err != nil {
		c.Redirect(301, "/signup")
		return
	}
	// c.HTML(http.StatusOK, "home.html", gin.H{"user": user})
	PostLoginHub(c, id, pw)
}

func GetLogin(c *gin.Context) {
	// c.HTML(http.StatusOK, "login.html", nil)
	c.JSON(http.StatusOK, gin.H{"redirect": "/signin"})
}

func PostLogin(c *gin.Context) {
	id := c.PostForm("id")
	pw := c.PostForm("password")
	PostLoginHub(c, id, pw)
	// user, err := model.Login(id, pw)
	// if err != nil {
	// 	c.Redirect(301, "/login")
	// 	return
	// }
	// session := sessions.Default(c)
	// session.Set("user_id", id)
	// session.Save()
	// c.HTML(http.StatusOK, "mypage.html", gin.H{"user": user})
}

func PostLoginHub(c *gin.Context, id, pw string) {
	user, err := model.Login(id, pw)
	if err != nil {
		c.Redirect(301, "/login")
		return
	}
	session := sessions.Default(c)
	session.Set("user_id", id)
	session.Save()
	log.Println("セッションセーブ")

	userID := session.Get("user_id")

	if userID != nil {
		user.UserId = userID.(string)
	}

	// c.HTML(http.StatusOK, "mypage.html", gin.H{"user_id": user.UserId})
	c.JSON(http.StatusOK, gin.H{"redirect": "/mappage"})
}

func GetLogout(c *gin.Context) {
	session := sessions.Default(c)
	log.Println("セッション取得")
	session.Clear()
	log.Println("クリア処理")
	session.Save()
	c.Redirect(http.StatusFound, "/login")
}
