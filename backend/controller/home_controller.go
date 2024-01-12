package controller

import (
	"github.com/PtMK2/EatSnap/backend/helper"
	"github.com/gin-gonic/gin"
)

func GetHome(c *gin.Context) {
	helper.RenderPage(c, "home.html")
}

func GetMapHome(c *gin.Context) {
	helper.RenderPage(c, "map.html")
}
