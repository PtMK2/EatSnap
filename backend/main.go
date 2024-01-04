package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()
	
	// ルートハンドラの定義
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	// サーバー起動
	router.Run(":8080")
}
