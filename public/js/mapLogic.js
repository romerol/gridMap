function onPolygonClick(polygon, id){
  var infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(polygon, 'click', function(){
    var contentString = '<b>Polygon ' + id +' clicked.</b><br>';
    var map = polygon.getMap();
    infoWindow.setContent(contentString);
    var lat = polygon.getPath().getAt(0).k;
    var lon = polygon.getPath().getAt(0).A;
    var googleCoord = new google.maps.LatLng(lat, lon);
    infoWindow.setPosition(googleCoord);
    infoWindow.open(map);
  });
}


function onPolygonMouseOver(polygon){
  google.maps.event.addListener(polygon, 'mouseover', function(){
    polygon.setOptions({    fillOpacity: 1.0,
                              fillColor: 'yellow'});    
  });
}

function onPolygonMouseOut(polygon){
  google.maps.event.addListener(polygon, 'mouseout', function(){
    polygon.setOptions({fillOpacity: 0.35,
                        fillColor: 'red'});  
  });
}

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(-26.67675069250885,-54.25906357713928),
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var polygons = coordinates.split('|');

  for(var i=0; i<polygons.length; i++){
    var polygon = polygons[i];
    var points = polygon.split('_');
    var coordinatesArray = [];
    
    for(var j=0; j<points.length; j++){
      var latLng = points[j].split(',');
      var latitude = latLng[1];
      var longuitude = latLng[0];
      var googleCoord = new google.maps.LatLng(latitude, longuitude);

      coordinatesArray.push(googleCoord);
    }

    var googlePolygon = new google.maps.Polygon({
      paths: coordinatesArray,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      zIndex: i
    });

    googlePolygon.setMap(map);

    onPolygonClick(googlePolygon, i);
    onPolygonMouseOver(googlePolygon);
    onPolygonMouseOut(googlePolygon);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);