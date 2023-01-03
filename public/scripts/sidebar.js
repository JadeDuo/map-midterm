const views = {
  '/': viewMapView,
  '/myMaps': myMapsView,
  '/edit': editView,
  '/login': loginView,
};

$(document).ready(() => {
  const path = window.location.pathname;
  const startingView = views[path];
  $('.side-content').html(startingView)


  $(".nav a").on('click', function(e) {
    console.log(e);
    e.preventDefault();
    const href = $(this).attr('href');
    const view = views[href];
    $('.side-content').html(view)
  });
})
