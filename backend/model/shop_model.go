package models

// Shop は店舗の情報を表す構造体です。
type Shop struct {
    ID      string  `json:"id" gorm:"primaryKey"`
    Name    string  `json:"name"`
	
    Address string  `json:"address"`
    // その他の必要なフィールド...
}