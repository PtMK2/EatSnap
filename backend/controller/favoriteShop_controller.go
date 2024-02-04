package controller

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/PtMK2/EatSnap/backend/model"
)

func AddFavoriteShop(c *gin.Context) {
    userID := c.PostForm("user_id")
    shopID := c.PostForm("shop_id")
    err := model.AddFavoriteShop(userID, shopID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Shop added to favorites successfully"})
}

func GetAllFavoriteShopsByUserId(c *gin.Context) {
    userID := c.Param("user_id")
    favoriteShops, err := model.GetAllFavoriteShopsByUserId(userID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, favoriteShops)
}

func DeleteFavoriteShop(c *gin.Context) {
    userID := c.Param("user_id")
    shopID := c.Param("shop_id")
    err := model.DeleteFavoriteShop(userID, shopID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Shop removed from favorites successfully"})
}