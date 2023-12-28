import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
)

func connectDB() *sql.DB {
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