package router

import (
	"net/http"
	"os"

	"github.com/gin-contrib/sessions"
   	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/PtMK2/EatSnap/backend/controller"
	
)

func GetRouter() *gin.Engine {
	router := gin.Default()

	router.LoadHTMLGlob("view/*.html")

	// こんな感じでルーティングを追加していく
	//ただフロントがどうなっているかわからないのでコメントアウトしとく

	router.GET("/", controller.GetHome)

	loginCheckGroup := router.Group("/", checkLogin())
	{
		loginCheckGroup.GET("/mypage", controller.GetMypage)
		loginCheckGroup.GET("/logout", controller.GetLogout)
		loginCheckGroup.GET("/map", controller.GetMapHome)
	}
	logoutCheckGroup := router.Group("/", checkLogout())
	{
		logoutCheckGroup.GET("/signup", controller.GetSignup)
		logoutCheckGroup.POST("/signup", controller.PostSignup)
		logoutCheckGroup.GET("/login", controller.GetLogin)
		logoutCheckGroup.POST("/login", controller.PostLogin)
	}

	// router.GET("/signup", controller.GetSignup)
	// router.POST("/signup", controller.PostSignup)
	// router.GET("/login", controller.GetLogin)
	// router.POST("/login", controller.PostLogin)
	// router.GET("/", controller.GetTop)
	// router.GET("/top", controller.GetTop)
	// router.GET("/home", controller.GetHome)
	// router.GET("/logout", controller.GetLogout)
	// router.GET("/comment/:comment_id", controller.GetComment)
	// router.POST("/comment", controller.PostComment)

	return router
}

