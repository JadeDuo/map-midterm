// Client facing scripts here
$(document).ready(() => {
  $('#fetch-users').on('click', () => {
    console.log('first')
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      console.log('we got here')
      const $usersList = $('#users');
      $usersList.empty();
      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    })
    .always(()=>{console.log('here')})
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