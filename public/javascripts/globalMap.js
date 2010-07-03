
var gLocalSearch;
var gMap;
var gInfoWindow;
var lastEvent;

jQuery(function() {
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
  jQuery("#dosearch").click(doSearch);
  jQuery("#map_canvas").click( function(event) {
    var $target = jQuery(event.target);
    if( $target.is('.addParkFromSearch') ) {
      createParkFromSearch(event);
      return false;
    }
  }); 
});

function createParkFromSearch(event) {
  lastEvent = event;
  var parkLatLng = jQuery(lastEvent.originalTarget).parents(".unselected").find(".hiddenLatLng").html().split(', ');
  var suggestedName = jQuery(lastEvent.originalTarget).parents(".unselected").find("a.gs-title").text();
  jQuery.get("/home/new_park", { lat: parkLatLng[0], lng: parkLatLng[1], name: suggestedName }, function(stuff) {
    jQuery.fancybox({ content: stuff, scrolling: "no" });
  });
}
