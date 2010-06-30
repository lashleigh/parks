
// Park global state
var parkInfoWindow;
var parkList = [];

// Initialize the parks with one info window
$(function() {
  parkInfoWindow = new google.maps.InfoWindow;

  for( var i = 0; i < parks.length; i++) {
    parkList.push( new Park(parks[i]) );
  }
  
/*  $(parks).each(function f(i, park) {
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
*/
 
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

      var p = e.latLng;
      $.get("/home/new_park", { lat: p.lat(), lng: p.lng() }, function(stuff) {
        $.fancybox({ content: stuff, scrolling: "no" });
      });
    }
  }); 
});

// Park class
function Park(somepark) {
  var me = this;
  me.park_ = somepark;
  me.name = somepark.name;
  me.lat = somepark.latitude;
  me.lng = somepark.longitude;
  me.description = somepark.description;
  me.marker_ = me.marker();
  console.log("new park created " + me.name + " " + me.description);
}

Park.prototype.marker = function() {
  var me = this;
  if (me.marker_) return me.marker_;
  var marker = me.marker_ = new google.maps.Marker({
      position: new google.maps.LatLng(me.lat, me.lng),
      map: gMap,
      title: me.name,
      draggable: false,
    });
    google.maps.event.addListener(marker, "click", function() {
      me.select();
    });
    console.log("create marker " + me.lat + ", " + me.lng);
  return marker;
};

Park.prototype.select = function() {
  unselectMarkers();
  this.selected_ = true;
  //this.highlight(true);
  parkInfoWindow.setContent(this.name); //this.html(true));
  parkInfoWindow.open(gMap, this.marker());
};


