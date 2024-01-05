package controller

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/PtMK2/EatSnap/backend/model"
    "github.com/PtMK2/EatSnap/backend/database"
)

func PostComment(c *gin.Context) {
    var newComment models.Comment
    // リクエストボディからコメントデータをバインドする
    if err := c.ShouldBindJSON(&newComment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // コメントをデータベースに保存
    result := database.DB.Create(&newComment)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, newComment)
}

func GetComment(c *gin.Context) {
	var comment models.Comment
	commentID := c.Param("comment_id")

	// コメントIDを指定してコメントを取得
	result := database.DB.Preload("Media").First(&comment, commentID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, comment)
}