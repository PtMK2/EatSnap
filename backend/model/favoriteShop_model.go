package model	

import (
	"gorm.io/gorm"

	"github.com/PtMK2/EatSnap/backend/database"
)


type FavoriteShop struct {
	gorm.Model
	UserID string `json:"user_id"`
	ShopID string `json:"shop_id"`
}

func AddFavoriteShop(userID, shopID string) error {
	db := database.DB
	favoriteShop := FavoriteShop{UserID: userID, ShopID: shopID}
	result := db.Create(&favoriteShop)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func GetAllFavoriteShopsByUserId(userID string) ([]FavoriteShop, error) {
	db := database.DB
	var favoriteShops []FavoriteShop
	result := db.Where("user_id = ?", userID).Find(&favoriteShops)
	if result.Error != nil {
		return nil, result.Error
	}
	return favoriteShops, nil
}

func DeleteFavoriteShop(userID, shopID string) error {
	db := database.DB
	result := db.Where("user_id = ? AND shop_id = ?", userID, shopID).Delete(&FavoriteShop{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}