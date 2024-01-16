package database

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	//(db:3306)はdocker-compose.ymlのmysqlのポート番号でdocker用の書き方。
	dsn := "root:password@tcp(db:3306)/eatsnapDB?charset=utf8mb4&parseTime=True&loc=Asia%2FTokyo&collation=utf8mb4_unicode_ci"
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
}
