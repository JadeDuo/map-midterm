DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS icons CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS userMaps CASCADE;
DROP TABLE IF EXISTS markersInfo CASCADE;
DROP TABLE IF EXISTS markers CASCADE;
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  faveMaps INTEGER,
  contributedMaps INTEGER
);

CREATE TABLE icons (
  id SERIAL PRIMARY KEY NOT NULL,
  iconName VARCHAR(255) NOT NULL,
  imgSrc VARCHAR(255) NOT NULL
);

CREATE TABLE markersInfo (
  id SERIAL PRIMARY KEY NOT NULL,
  locationName VARCHAR(255) NOT NULL,
  info TEXT NOT NULL,
  imgLink VARCHAR(255)
);

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  north DECIMAL NOT NULL,
  south DECIMAL NOT NULL,
  east DECIMAL NOT NULL,
  west DECIMAL NOT NULL,
  zoom INTEGER NOT NULL,
  centerLat DECIMAL NOT NULL,
  centerLong DECIMAL NOT NULL
);

CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id),
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL,
  markerInfo_id INTEGER REFERENCES markersInfo(id) ON DELETE CASCADE,
  icon_id INTEGER REFERENCES icons(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id)
);

CREATE TABLE userMaps (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id)
);