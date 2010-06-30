
var gLocalSearch;
var gMap;
var gInfoWindow;

$(function() {
  // Initialize the map with default UI.
  gMap = new google.maps.Map(document.getElementById("map_canvas"), {
    center: new google.maps.LatLng(30.4419, -90.1419),
    zoom: 3,
    mapTypeId: 'roadmap'
  });
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
});
