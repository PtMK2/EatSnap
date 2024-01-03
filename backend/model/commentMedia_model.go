package model

type CommentMedia struct {
    MediaID     int    `json:"media_id" gorm:"primaryKey"`
    CommentID   int    `json:"comment_id"`
    MediaURL    string `json:"media_url"`
    MediaType   string `json:"media_type"` // 'image' または 'video'
}
