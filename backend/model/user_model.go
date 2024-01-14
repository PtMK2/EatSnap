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
	UserId   string `gorm:"column:user_id;type:varchar(191)"`
	UserPass string `gorm:"column:user_pass;type:varchar(191)"`
	UserName string `gorm:"column:user_name;type:varchar(191)"`
	UserMail string `gorm:"column:user_mail;type:varchar(191)"`
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

func Signup(username, userId, usermail, password string) (*User, error) {
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

	user = User{UserId: userId, UserPass: encryptPw, UserName: username, UserMail: usermail}
	fmt.Println(user.UserName)
	database.DB.Create(&user)
	return &user, nil
}

func Login(id, password string) (*User, error) {
	user := User{}
	database.DB.Where("user_id = ?", id).First(&user)
	if user.UserId == "" {
		err := errors.New("メールアドレス又はパスワードが違います。")
		fmt.Println(err)
		return nil, err
	}

	err := crypto.CompareHashAndPassword(user.UserPass, password)
	if err != nil {
		fmt.Println("ID又はパスワードが違います。", err)
		return nil, err
	}

	return &user, nil
}

func GetOneUser(userId string) (*User, error) {
	user := User{}
	database.DB.Where("user_id = ?", userId).First(&user)
	if user.UserId != "" {
		err := errors.New("子のユーザーIDは使用されていません。")
		fmt.Println(err)
		return nil, err
	}
	return &user, nil
}
