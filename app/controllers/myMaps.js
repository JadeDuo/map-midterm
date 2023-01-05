//load list of maps using ajax request
//will need a query for all maps created by current user
//build HTML for list of maps data,
//using jQuery insert HTML into <div id="my-map-list">

app.onLoad(() => {
  //initMap();

})


// Client facing scripts here
$(document).ready(() => {
    $.ajax({
      method: 'GET',
      url: '/api/mapsdata/my_maps'
    })
    .done((response) => {
      console.log('front-end:', response)
      const $usersList = $('#my-map-list');
      $usersList.empty();

      for(const map of response.maps) {
        $(`<a href="view/:${map.id}">`).text(map.title).appendTo('#my-map-list');
      }
    })
});
