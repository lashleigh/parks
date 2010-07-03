
var gLocalSearch;
var gMap;
var gInfoWindow;
var lastEvent;

$(function() {
  // Initialize the map with default UI.
  gMap = new google.maps.Map(document.getElementById("map_canvas"), {
    center: new google.maps.LatLng(30.4419, -90.1419),
    zoom: 3,
    mapTypeId: 'roadmap'
  });
  initialize();
  // Create one InfoWindow to open when a marker is clicked.
  gInfoWindow = new google.maps.InfoWindow;
  google.maps.event.addListener(gInfoWindow, 'closeclick', function() {
    unselectMarkers();
  });

  // Initialize the local searcher
  gLocalSearch = new GlocalSearch();
  gLocalSearch.setSearchCompleteCallback(null, OnLocalSearch);

  // dosearch is the div id of the button
  $("#dosearch").click(doSearch);
  $("#map_canvas").click( function(event) {
    var $target = $(event.target);
    if( $target.is('.addParkFromSearch') ) {
      createParkFromSearch(event);
      return false;
    }
  }); 
});

function createParkFromSearch(event) {
  lastEvent = event;
  var parkLatLng = $(lastEvent.originalTarget).parents(".unselected").find(".hiddenLatLng").html().split(', ');
  var suggestedName = $(lastEvent.originalTarget).parents(".unselected").find("a.gs-title").text();
  $.get("/home/new_park", { lat: parkLatLng[0], lng: parkLatLng[1], name: suggestedName }, function(stuff) {
    $.fancybox({ content: stuff, scrolling: "no" });
  });
}
