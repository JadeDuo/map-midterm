
// ------------- LOGIN TO USER / SET COOKIES --------------//

$(document).ready(() => {
  document.getElementById("login-form").addEventListener("submit", event => {
    event.preventDefault();
    const loginEmail = { email: $("#login-email").val()}

    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(loginEmail),
      contentType: "application/json; charset=utf-8",
      success: () => console.log('post success')
    })
    .then((response) => {
      loggedInUser = response.email
      $('#user-name').text(`logged-in as: ${loggedInUser}`);
      $('.logged-in').show();
      $('.logged-out').hide();
      $(".nav a[href='/myMaps']").click();
    });
  })
});
