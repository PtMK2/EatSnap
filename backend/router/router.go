package router

import (
	"log"
	"net/http"

	sessioninfo "github.com/PtMK2/EatSnap/backend/sessioninfo"

	"github.com/PtMK2/EatSnap/backend/controller"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

var LoginInfo sessioninfo.SessionInfo
var sessionKey = "user_id" // セッションキーを変数として定義

func GetRouter() *gin.Engine {
	router := gin.Default()
	router.LoadHTMLGlob("view/*.html")
	store := cookie.NewStore([]byte("select"))
	router.Use(sessions.Sessions("mysession", store))
	// こんな感じでルーティングを追加していく
	//ただフロントがどうなっているかわからないのでコメントアウトしとく

	loginCheckGroup := router.Group("/", sessionCheck())
	{
		loginCheckGroup.GET("/home", controller.GetHome)
		loginCheckGroup.GET("/mypage", controller.GetMypage)
		loginCheckGroup.GET("/logout", controller.GetLogout)
		loginCheckGroup.GET("/map", controller.GetMapHome)
	}

	router.GET("/signup", controller.GetSignup)
	router.POST("/signup", controller.PostSignup)
	router.GET("/login", controller.GetLogin)
	router.POST("/login", controller.PostLogin)

	return router
}

func sessionCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		LoginInfo.UserId = session.Get(sessionKey)

		log.Println("セッション情報:", session)
		log.Println("セッションキーから取得したユーザID:", LoginInfo.UserId)

		if LoginInfo.UserId == nil {
			log.Println("ログインしていません")
			c.Redirect(http.StatusMovedPermanently, "/login")
			c.Abort()
		} else {
			c.Set(sessionKey, LoginInfo.UserId)
			log.Println("セッションをセット")
			c.Next()
		}
		log.Println("ログインチェック終わり")
	}
}
