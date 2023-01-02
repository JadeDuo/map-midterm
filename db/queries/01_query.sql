SELECT markers.lat AS lat, markers.long AS lng, locationName, info, imgLink, imgSrc
FROM markers
JOIN markersInfo ON markersInfo.id = markerInfo_id
JOIN icons ON icons.id = icon_id;
