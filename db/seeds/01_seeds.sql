INSERT INTO users (email)
VALUES 
('jesse@telus.com'),
('jade@telus.com'),
('john@telus.com')
;

INSERT INTO icons (icon_name, img_src)
VALUES 
('action', 'https://i.imgur.com/dcnlvb8.png'),
('horror', 'https://img.icons8.com/offices/2x/jason-voorhees.png'),
('ghost', 'https://i.imgur.com/iRf7vKp.png'),
('dino', 'https://i.imgur.com/sJITgiy.png'),
('scifi', 'https://i.imgur.com/hoYUNsR.png')
;

INSERT INTO markers_info (location_name, info, img_link)
VALUES
  ('Coney Island', 'Home turf for 1979s The Warriors, famous for its amusement park on the beach', 'https://www.bkmag.com/wp-content/uploads/2017/02/the-warriors-coney-island-wonder-wheel.jpg'), 
  ('Times Square', 'Jason Takes Manhattan! The hockey masked killer stalked his victims in this tourist hotspot', 'https://media.gq.com/photos/5ace1aee240ad94792587238/3:2/w_1079,h_719,c_limit/friday-the-13th-jason-takes-manhattan.jpg'),
  ('Hook and Ladder 8', 'The real-life firehouse used as headquarters for the Ghostbusters!', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Ghostbusters_Headquarters_-_Firehouse%2C_Hook_%26_Ladder_Company_8_%2852142207393%29.jpg'),
  ('Museum of Natural History', 'Best known from the Night at the Museum franchise', 'https://c8.alamy.com/zooms/9/e78fc4b3e62f4576bf0b0a7c100d8374/2jh2pe7.jpg'),
  ('The Unisphere', 'Will Smith and Tommy-lee Jones shot down a UFO into this during the climax of Men in Black', 'https://images.squarespace-cdn.com/content/v1/5b9ffe0f1137a680c2c08250/1546554958337-1N34XUMWDBTSJRHS6H3S/MIB.jpg')
;

INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
VALUES
  (1, 'New York City', 40.89616039605397, 40.47792645871874, -73.66206301791668, -74.26642371757031, 11, 40.78179630392257, -73.94733313852576)
;

INSERT INTO markers (map_id, lat, lng, marker_info_id, icon_id)
VALUES
  (1, 40.57344620639121, -73.97945438586295, 1, 1),
  (1, 40.75912745350073, -73.98517989368833, 2, 2),
  (1, 40.71954, -74.00654, 3, 3),
  (1, 40.7813713439256, -73.97396417194389, 4, 4),
  (1, 40.74647828981718, -73.84509442425463, 5, 5)
;

