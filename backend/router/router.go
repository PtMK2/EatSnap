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

	}

	router.GET("/mypage", controller.GetMypage)
	router.GET("/logout", controller.GetLogout)
	router.GET("/map", controller.GetMapHome)
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
		// セッションがない場合、ログインフォームをだす
		if LoginInfo.UserId == nil {
			log.Println(session)
			c.Redirect(http.StatusMovedPermanently, "/login")
			log.Println("ログインしていません")
			c.Abort() // これがないと続けて処理されてしまう
		} else {
			c.Set(sessionKey, LoginInfo.UserId) // ユーザidをセット
			log.Println("セッションをセット。")
			log.Println(session)
			c.Next()
		}
		log.Println("ログインチェック終わり")
	}
}
