// ---- ADD DEFAULT OPTIONS --- //

const options = {
  center: { lat: 49.406001356798896, lng: -96.07921114305863 },
  zoom: 4
}

// generate google map with pre-set lat/long and zoom for NYC
const initMap = () => {
  testmap = new google.maps.Map(document.getElementById('map'), options);
 
};

app.onLoad(() => {
  initMap();
})
