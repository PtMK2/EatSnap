package database

import (
	"log"
	
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
    dsn := "root:password@tcp(db:3306)/eatsnapDB?charset=utf8mb4&parseTime=True&loc=Asia%2FTokyo"
	var err error
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to open database: %v", err)
    }
}

