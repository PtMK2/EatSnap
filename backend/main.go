package main

import (
	//"gorm.io/driver/mysql"
	//"gorm.io/gorm"
    "github.com/gin-gonic/gin"
    //"github.com/PtMK2/EatSnap/backend/controller"
    "github.com/PtMK2/EatSnap/backend/database"
	"github.com/PtMK2/EatSnap/backend/model"
)

func main() {
	// データベースに接続
    database.ConnectDB()

	// gorm.DBインスタンスに依存する操作を行う
	model.SetupDB()
	router := gin.Default()

	//コメント関連のルート
    // comment := router.Group("/comment")
    // {
    //     comment.POST("/",           controller.PostComment)
    //     comment.GET("/:comment_id", controller.GetComment)
    // }
	
	// サーバー起動
	router.Run(":8080")
}

