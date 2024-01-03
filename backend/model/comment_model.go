package model

import "time"

type Comment struct {
    CommentID     int    `json:"comment_id" gorm:"primaryKey"`
    Score         int    `json:"score"`
    CommentIntro  string `json:"comment_intro"`
    UserID        string `json:"user_id"`
    ShopID        string `json:"shop_id"`
    PostTime      time.Time `json:"post_time"`
    // 関連するメディア情報を含める
    Media         []CommentMedia `json:"media" gorm:"foreignKey:CommentID"`
}
