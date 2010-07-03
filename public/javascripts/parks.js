
// Park global state
var parkInfoWindow;
var parkList = [];

// Initialize the parks with one info window
$(function() {
  parkInfoWindow = new google.maps.InfoWindow;

  for( var i = 0; i < parks.length; i++) {
    parkList.push( new Park(parks[i]) );
  }
  
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(gMap);

  var addingPark = false;
  $("#addPark").click(function() {
    addingPark = true;
    $("#addPark").html("Click on the map to show us where your suggestion resides");
  });

  google.maps.event.addListener(gMap, 'click', function(e) {
    if(addingPark) {
      $("#addPark").html("Add a park?");
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
  return marker;
};

Park.prototype.select = function() {
  parkInfoWindow.setContent(this.html(true));
  parkInfoWindow.open(gMap, this.marker());
};

Park.prototype.html = function() {
  var me = this;
  var container = document.createElement("div");
  container.className = "parkInfo";
  var name = document.createElement("h3");
  name.appendChild(document.createTextNode(me.name));
  var moreContent = document.createElement("h4");
  moreContent.appendChild(document.createTextNode(me.description));
  container.appendChild(name);
  container.appendChild(moreContent);
  return container;
}

