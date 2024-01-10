package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTop(c *gin.Context) {
	c.HTML(http.StatusOK, "home.html", nil)
}
