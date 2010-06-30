
// Park global state
var parkInfoWindow;
var parkList = [];

// Initialize the parks with one info window
$(function() {
  parkInfoWindow = new google.maps.InfoWindow;
  $(parks).each(function f(i, park) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(park.latitude, park.longitude),
      map: gMap,
      title: park.name,
      draggable: false
    });
    parkInfoWindow.setContent(marker.title)
    google.maps.event.addListener(marker, 'click',
      function() { parkInfoWindow.open(gMap, marker); });
  });
  $("#addParkButton").click();
});

// Park class
function Park(somepark) {
  var me = this;
  me.park_ = somepark;
  me.name = somepark.name;
}

