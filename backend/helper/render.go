package helper

import (
	"net/http"

	"github.com/PtMK2/EatSnap/backend/model"
	"github.com/gin-gonic/gin"
)

func RenderPage(c *gin.Context, templateName string) {
	user := &model.User{}

	c.HTML(http.StatusOK, templateName, gin.H{"user": user})
}
