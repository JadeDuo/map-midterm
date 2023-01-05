app.onLoad(() => {
  //initMap();
})


// ------------- LOGIN TO USER / SET COOKIES --------------//

$(document).ready(() => {
  console.log(loggedInUser)
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
      $('#user-name').text(loggedInUser).appendTo(loggedInUser);
    }); // <--- remember to remove!
    //login .then here 
  }) 
});
