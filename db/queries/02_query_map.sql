SELECT north, south, east, west, zoom, center_lat AS lat, center_lng AS lng
FROM maps
WHERE creator_id = 1;