package controller

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/PtMK2/EatSnap/backend/model"
    "github.com/PtMK2/EatSnap/backend/database"
)

func ShowAllCommentsByUserID(c *gin.Context) {
    userID := c.Param("user_id")
    comments, err := model.GetCommentsByUserID(userID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, comments)
}

func ShowAllCommentsByShopID(c *gin.Context) {
    shopID := c.Param("shop_id")
    comments, err := model.GetCommentsByShopID(shopID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, comments)
}

func CreateComment(c *gin.Context) {
    comment := model.Comment{}
    if err := c.BindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := model.CreateComment(&comment); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, comment)
}

func UpdateComment(c *gin.Context) {
    comment := model.Comment{}
    if err := c.BindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := model.UpdateComment(&comment); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, comment)
}

func DeleteCommentByUserID(c *gin.Context) {
    commentID := c.Param("comment_id")
    err := model.DeleteCommentByID(commentID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})
}

