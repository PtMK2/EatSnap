package router

import (
	"github.com/PtMK2/EatSnap/backend/controller"
	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	router := gin.Default()

	router.LoadHTMLGlob("view/*.html")

	// こんな感じでルーティングを追加していく
	//ただフロントがどうなっているかわからないのでコメントアウトしとく

	router.GET("/signup", controller.GetSignup)
	router.POST("/signup", controller.PostSignup)
	router.GET("/login", controller.GetLogin)
	router.POST("/login", controller.PostLogin)
	router.GET("/", controller.GetTop)
	// router.GET("/top", controller.GetTop)
	// router.GET("/home", controller.GetHome)
	// router.GET("/logout", controller.GetLogout)
	// router.GET("/comment/:comment_id", controller.GetComment)
	// router.POST("/comment", controller.PostComment)

	return router
}
