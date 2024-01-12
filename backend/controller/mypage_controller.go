package controller

import (
	"github.com/gin-gonic/gin"
)

func GetMypage(c *gin.Context) {
	renderPage(c, "mypage.html")
}
