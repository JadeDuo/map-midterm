// Client facing scripts here
$(document).ready(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();
      for(const user of response.users) {
        $(`<li class="user">`).text(user.email).appendTo($usersList);
      }
    })
  });
});

// const listUsers = () => {
//   return $.ajax({
//     method: 'GET',
//     url: '/api/users'
//   })
//   .done((response) => {
//     console.log('we got here')
//     const $usersList = $('#users');
//     $usersList.empty();
//     for(const user of response.users) {
//       $(`<li class="user">`).text(user.name).appendTo($usersList);
//     }
//   });
// };