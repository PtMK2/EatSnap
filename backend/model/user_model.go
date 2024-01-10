package model

import (
	"errors"
	"fmt"

	"github.com/PtMK2/EatSnap/backend/crypto"
	"github.com/PtMK2/EatSnap/backend/database"
)

type User struct {
	// gorm.Model
	// ID       uint `gorm:"primaryKey"`
	UserId   string
	UserPass string
}

// func init() {
// 	database.DB.Set("gorm:table_options", "ENGINE = InnoDB").AutoMigrate(User{})
// 	db := database.DB
// 	db.Set("gorm:table_options", "ENGINE=InnoDB")
// 	db.AutoMigrate(&User{})
// }

func SetupDB() {
	db := database.DB
	db.Set("gorm:table_options", "ENGINE=InnoDB")
	db.AutoMigrate(&User{})
}

func (u *User) LoggedIn() bool {
	return u.UserId != ""
}

func Signup(userId, password string) (*User, error) {
	user := User{}
	database.DB.Where("user_id = ?", userId).First(&user)
	if user.UserId != "" {
		err := errors.New("同一名のUserIdが既に登録されています。")
		fmt.Println(err)
		return nil, err
	}

	encryptPw, err := crypto.PasswordEncrypt(password)
	if err != nil {
		fmt.Println("パスワード暗号化中にエラーが発生しました。：", err)
		return nil, err
	}
	user = User{UserId: userId, UserPass: encryptPw}
	database.DB.Create(&user)
	return &user, nil
}

func Login(userId, password string) (*User, error) {
	user := User{}
	database.DB.Where("user_id = ?", userId).First(&user)
	if user.UserId == "" {
		err := errors.New("UserIdが一致するユーザーが存在しません。")
		fmt.Println(err)
		return nil, err
	}

	err := crypto.CompareHashAndPassword(user.UserPass, password)
	if err != nil {
		fmt.Println("パスワードが一致しませんでした。：", err)
		return nil, err
	}

	return &user, nil
}
