// I got this code from SO and have tried to make it api v3 
// compliant. However the getLength() method does not exist 
// in version 3 yet.

jQuery(function() {
   Number.prototype.toRad = function() {
      return this * Math.PI / 180;
   }

   Number.prototype.toDeg = function() {
      return this * 180 / Math.PI;
   }

   google.maps.LatLng.prototype.moveTowards = function(point, distance) {   
      var lat1 = this.lat().toRad();
      var lon1 = this.lng().toRad();
      var lat2 = point.lat().toRad();
      var lon2 = point.lng().toRad();         
      var dLon = (point.lng() - this.lng()).toRad();

      // Find the bearing from this point to the next.
      var brng = Math.atan2(Math.sin(dLon) * Math.cos(lat2),
                            Math.cos(lat1) * Math.sin(lat2) -
                            Math.sin(lat1) * Math.cos(lat2) * 
                            Math.cos(dLon));

      var angDist = distance / 6371000;  // Earth's radius.

      // Calculate the destination point, given the source and bearing.
      lat2 = Math.asin(Math.sin(lat1) * Math.cos(angDist) + 
                       Math.cos(lat1) * Math.sin(angDist) * 
                       Math.cos(brng));

      lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angDist) *
                               Math.cos(lat1), 
                               Math.cos(angDist) - Math.sin(lat1) *
                               Math.sin(lat2));

      if (isNaN(lat2) || isNaN(lon2)) return null;

      return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
   }

   function moveAlongPath(points, distance, index) {        
      index = index || 0;  // Set index to 0 by default.

      // This -1 is very important for use with the extendedApi
      if (index < points.length - 1) {
         // There is still at least one point further from this point.

         // Construct a google.maps.Polyline to use the getLength() method.
         var polyline = new google.maps.Polyline({ 
            path: [points[index], points[index + 1]],
            });

         // Get the distance from this point to the next point in the polyline.
         var distanceToNextPoint = polyline.getLength();

         if (distance <= distanceToNextPoint) {
            // distanceToNextPoint is within this point and the next. 
            // Return the destination point with moveTowards().
            return points[index].moveTowards(points[index + 1], distance);
         }
         else {
            // The destination is further from the next point. Subtract
            // distanceToNextPoint from distance and continue recursively.
            return moveAlongPath(points,
                                 distance - distanceToNextPoint,
                                 index + 1);
         }
      }
      else {
         // There are no further points. The distance exceeds the length  
         // of the full path. Return null.
         return null;
      }  
   }

   //var map = new GMap2(document.getElementById('map_canvas'));

   var points = [
      new google.maps.LatLng(47.656, -122.360),
      new google.maps.LatLng(47.656, -122.343),
      new google.maps.LatLng(47.690, -122.310),
      new google.maps.LatLng(47.690, -122.270)
   ];

   var polyline = new google.maps.Polyline({
      path: points, 
      strokeColor: '#f00', 
      strokeWeight: 6
      });

   var nextMarkerAt = 0;     // Counter for the marker checkpoints.
   var nextPoint = null;     // The point where to place the next marker.

   // Draw the path on the map.
   polyline.setMap(gMap);

   // Draw the checkpoint markers every 1000 meters.
   while (true) {
      // Call moveAlongPath which will return the google.maps.LatLng with the next
      // marker on the path.
      nextPoint = moveAlongPath(points, nextMarkerAt);

      if (nextPoint) {
         // Draw the marker on the map.
         new google.maps.Marker({
            position: nextPoint,
            map: gMap, 
            });

         // Add +1000 meters for the next checkpoint.
         nextMarkerAt += 1000;    
      }
      else {
         // moveAlongPath returned null, so there are no more check points.
         break;
      }            
   }
})
