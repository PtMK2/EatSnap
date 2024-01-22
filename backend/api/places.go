package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func HandlePlaces(w http.ResponseWriter, r *http.Request) {
	lat := r.URL.Query().Get("lat")
	lng := r.URL.Query().Get("lng")
	radius := r.URL.Query().Get("radius")
	placeType := r.URL.Query().Get("type")
	apiKey := os.Getenv("GOOGLE_MAPS_API_KEY")

	url := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=%s,%s&radius=%s&type=%s&key=%s", lat, lng, radius, placeType, apiKey)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}
