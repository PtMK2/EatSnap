package router

import (
	"net/http"
	"os"

	"github.com/PtMK2/EatSnap/backend/controller"
	model_redis "github.com/PtMK2/EatSnap/backend/model/redis"
	"github.com/gin-gonic/gin"
)

func GetRouter() *gin.Engine {
	router := gin.Default()

	router.LoadHTMLGlob("view/*.html")

	// こんな感じでルーティングを追加していく
	//ただフロントがどうなっているかわからないのでコメントアウトしとく

	loginCheckGroup := router.Group("/", checkLogin())
	{
		loginCheckGroup.GET("/mypage", controller.GetMypage)
		loginCheckGroup.GET("/logout", controller.GetLogout)
	}
	logoutCheckGroup := router.Group("/", checkLogout())
	{
		logoutCheckGroup.GET("/signup", controller.GetSignup)
		logoutCheckGroup.POST("/signup", controller.PostSignup)
		logoutCheckGroup.GET("/login", controller.GetLogin)
		logoutCheckGroup.POST("/login", controller.PostLogin)
	}

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

func checkLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
		id := model_redis.GetSession(c, cookieKey)
		if id == nil {
			c.Redirect(http.StatusFound, "/login")
			c.Abort()
		} else {
			c.Next()
		}
	}
}

func checkLogout() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
		id := model_redis.GetSession(c, cookieKey)
		if id != nil {
			c.Redirect(http.StatusFound, "/")
			c.Abort()
		} else {
			c.Next()
		}
	}
}
