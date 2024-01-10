package main

import (
	"github.com/PtMK2/EatSnap/backend/database"
	"github.com/PtMK2/EatSnap/backend/router"
)

func main() {
	// データベースに接続
	database.ConnectDB()

	// gorm.DBインスタンスに依存する操作を行う
	// model.SetupDB()

	router := router.GetRouter()
	router.Run(":8080")
}
