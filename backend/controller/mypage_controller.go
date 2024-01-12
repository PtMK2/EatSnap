package controller

import (
	"github.com/PtMK2/EatSnap/backend/helper"
	"github.com/gin-gonic/gin"
)

func GetMypage(c *gin.Context) {
	helper.RenderPage(c, "mypage.html")
}
