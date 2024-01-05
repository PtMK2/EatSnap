package model

import(
    "time"
    "gorm.io/gorm"

    "github.com/PtMK2/EatSnap/backend/database"
)

type Comment struct {
    gorm.Model
    CommentID     int    `json:"comment_id" gorm:"primaryKey"`
    Score         int    `json:"score"`
    CommentIntro  string `json:"comment_intro"`
    UserID        string `json:"user_id"`
    ShopID        string `json:"shop_id"`
    PostTime      time.Time `json:"post_time"`
    // 関連するメディア情報を含める
    Media         []CommentMedia `json:"media" gorm:"foreignKey:CommentID"`
}

var db = database.DB

func GetCommentsByUserID(userID string) ([]Comment, error) {
    var comments []Comment
    result := db.Preload("Media").Where("user_id = ?", userID).Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}

func GetCommentsByShopID(shopID string) ([]Comment, error) {
    var comments []Comment
    result := db.Preload("Media").Where("shop_id = ?", shopID).Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}

func GetAllComments() ([]Comment, error) {
    var comments []Comment
    result := db.Preload("Media").Find(&comments)
    if result.Error != nil {
        return nil, result.Error
    }
    return comments, nil
}

func CreateComment(comment *Comment) error {
    result := db.Create(comment)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func UpdateComment(comment *Comment) error {
    result := db.Save(comment)
    if result.Error != nil {
        return result.Error
    }
    return nil
}

func DeleteCommentByUserID(commentID int) error {
    result := db.Delete(&Comment{}, commentID)
    if result.Error != nil {
        return result.Error
    }
    return nil
}