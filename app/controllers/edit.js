//MAP FORM DATA /////////////////////////

$(document).ready(() => {

  const getData = form => {
    let formData = new FormData(form);
    let arr = []

    const genre = $("#genre-id option:checked").val();

    for (let pair of formData.entries()) {
      arr.push(pair[1])
    }

    globalMarkerInfo.location_name = [...arr][0]
    globalMarkerInfo.info = [...arr][1]
    globalMarkerInfo.img_link = [...arr][2]
    globalMarkerInfo.icon_name = genre
  }

  document.getElementById("new-marker-form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
    submitData(globalMarkerInfo);
  });

});

const submitData = (data) => {
  $.ajax({
    type: 'post',
    url: '/api/markers/newmarker',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log('post success')
    }
  })
}

app.onLoad(() => {
  initMap();
})
