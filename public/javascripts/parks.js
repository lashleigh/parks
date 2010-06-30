
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
 
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(gMap);

  var addingPark = false;
  $("#addPark").click(function() {
    addingPark = true;
    $("#addPark").html("Click on the map to show us where your suggestion resides");
  });

  google.maps.event.addListener(gMap, 'click', function(e) {
    if(addingPark) {
      $("#addPark").html("make a suggestion");
      addingPark = false;

      /*var p = e.latLng;
      $.get("/park/new", { lat: p.lat(), lng: p.lng() }, function(stuff) {
        $.fancybox({ content: stuff, scrolling: "no" });
      });*/
      alert("add a park");
    }
  }); 
});

// Park class
function Park(somepark) {
  var me = this;
  me.park_ = somepark;
  me.name = somepark.name;
}

function createPark() {
  alert("create a park");
}

