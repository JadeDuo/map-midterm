// Client facing scripts here
$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });
});

$(() => {

  $.ajax({
    method: 'GET',
    url: '/api/markers'
  })
  .done((response) => {
    const $markersList = $('#markers');
    $markersList.empty();

    for(const marker of response.marker) {
      $(`<li class="marker">`).text(marker.name).appendTo($markersList);
    }
  });

});
