package main
import "github.com/PtMK2/EatSnap/backend/database"
import "github.com/PtMK2/EatSnap/backend/controller"
import (
	"github.com/gin-gonic/gin"
    // "backend/database"
    // "backend/controller"
    //"github.com/PtMK2/EatSnap/backend/database"
    //"github.com/PtMK2/EatSnap/backend/controller"
    //"github.com/PtMK2/EatSnap/backend/database"

)

func main() {
	router := gin.Default()

	// データベースに接続
    database.ConnectDB()

	//コメント関連のルート
    comment := router.Group("/comment")
    {
        comment.POST("/",           controllers.PostComment)
        comment.GET("/:comment_id", controllers.GetComment)
    }
	
	// サーバー起動
	router.Run(":8080")
}
