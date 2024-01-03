package database

import (
	"database/sql"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/go-sql-driver/mysql"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func ConnectDB() {
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Fatalf("Failed to load location: %v", err)
	}
	c := mysql.Config{
		DBName:    "eatsnapDB",
		User:      "root",
		Passwd:    "password",
		Addr:      "localhost:3306",
		Net:       "tcp",
		ParseTime: true,
		Collation: "utf8mb4_unicode_ci",
		Loc:       jst,
	}
	db, err := sql.Open("mysql", c.FormatDSN())
	if err != nil {
        log.Fatalf("Failed to open database: %v", err)
    }
    DB = db
}