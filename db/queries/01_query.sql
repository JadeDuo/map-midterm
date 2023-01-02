SELECT markers.lat AS lat, markers.lng AS lng, location_name, info, img_link, img_src
FROM markers
JOIN markers_info ON markers_info.id = marker_info_id
JOIN icons ON icons.id = icon_id;