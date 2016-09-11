var home_map;

$(document).ready(function(){
  console.log('Hi Sarah!')
});

function NewMap(map, directionsService, directionsDisplays){
  this.map = map;
  this.directionsService = directionsService;
  this.directionsDisplay1 = directionsDisplays[0];
  this.directionsDisplay2 = directionsDisplays[1];
  this.markers = [];
  this.originMarkers = [];
  this.infoboxes = [];
  this.radius = 750;
  this.circle = undefined;
};


function initMap(){
  var map_options = {
    center: {lat: 40.750671, lng: -73.985239},
    zoom: 14,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: 'roadmap',
    styles: style //calls mapstyle.js
  };

  var map = new google.maps.Map(document.getElementById('map'), map_options);

  //Place custom appearance options here!
  var route1Line = {
      strokeColor: "red"
    }
  var route2Line = {
      strokeColor: "red"
    }
  var directionsDisplay1 = new google.maps.DirectionsRenderer({suppressMarkers:true, preserveViewport: true, polylineOptions: route1Line});
  var directionsDisplay2 = new google.maps.DirectionsRenderer({suppressMarkers:true, preserveViewport: true, polylineOptions: route2Line});
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay1.setMap(map);
  directionsDisplay2.setMap(map);

  var input1 = (document.getElementById('dest1'));
  var input2 = (document.getElementById('dest2'));
  var autocomplete1 = new google.maps.places.Autocomplete(ui.dest1, {types: ['geocode', 'establishment']});
      autocomplete1.bindTo('bounds', map);
  var autocomplete2 = new google.maps.places.Autocomplete(ui.dest2, {types: ['geocode', 'establishment']});
      autocomplete2.bindTo('bounds', map);

  var directionsDisplays = [directionsDisplay1, directionsDisplay2]
  //Construct new map object
  home_map = new NewMap(map, directionsService, directionsDisplays);
};


function calcRoute(start, end, findhalf, renderer, image) {
  var transit = $('input[name=group1]:checked', '#travel_mode').val();
  var request = {
    origin: start,
    destination: end,
    travelMode: transit,

    // travelMode will eventually be a varible from user input
  };

  home_map.directionsService.route(request, function(result, status) {
    if (status == 'OK' && findhalf == true) {
      //don't render results


      var distance = result.routes[0].legs[0].distance.value
      if (distance <= 1500)
      {
        home_map.radius = (distance / 2);
      } else {home_map.radius = 750}

      findHalfway(result);
      routeFound();

      console.log("Radius = " +home_map.radius, "Route Distance = " + distance);


      // status is the api suceeding or failing
    } else if (status == 'OK' && findhalf == false) {
      //do render results
      renderRoute(renderer, result);
      placeMarker(result.routes[0].overview_path[0], home_map.originMarkers, undefined, image)
    } else {
      //console.log('No direct route found!')
      $('#textFlash1').text('Sorry, no route found.')
      $('#textFlash1').css('opacity', 0);
      $('#textFlash1').animate({
        'opacity': 1}, 500)
    }
  });
}

function routeFound()
{
 for (var i = 0; i < home_map.markers.length; i++)
  {
    deleteMarker(home_map.markers[i]);
  }

for (var i = 0; i < home_map.originMarkers.length; i++)
  {
    deleteMarker(home_map.originMarkers[i]);
  }
  clearMarkerArray(home_map.markers);
  clearMarkerArray(home_map.originMarkers);
  toggleMenu();
}

function toggleMenu()
{
  $('.search_container').toggle(); //toggles search box out
  $('.results_container').toggle(); //toggles results in
}

function findHalfway(result){
  var place_type = $('input[name=group2]:checked', '#place_type').val();
  var coordinates_array = result.routes[0].overview_path
  var half = Math.floor(coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  var image = ""; //Place custom halfway marker image link here!

  for (var i = 0; i < coordinates_array.length; i++){

    var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], coordinates_array[i])
    var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length - 1], coordinates_array[i])
    if (halfwayToDestination <= startingToHalfway){
      halfway_point = coordinates_array[i];
      placeMarker(halfway_point, home_map.originMarkers, undefined, image);
      console.log("Are they equal?", startingToHalfway/1000+"km", halfwayToDestination/1000+"km");

      var latLng = { lat: halfway_point.lat(), lng: halfway_point.lng() };
      searchPlaces(latLng, place_type);
      bothWays(latLng);
      break
    }
  }
};


function renderRoute(renderer, result){
  renderer.setDirections(result);
}

function bothWays(halfway_point){
  calcRoute(ui.dest1.value, halfway_point, false, home_map.directionsDisplay1, 'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  calcRoute(ui.dest2.value, halfway_point, false, home_map.directionsDisplay2, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
};

function deleteMarker(marker)
{
   marker.setMap(null);
}

function clearMarkerArray(markerGroup)
{
  markerGroup = [];
}

function placeMarker(latLng, markerGroup, place, image)
{
  var marker = new google.maps.Marker({
     position: latLng,
     map: home_map.map,
     icon: image
  });

  if (markerGroup !== undefined)
  {
    markerGroup.push(marker);
  };
  if (place !== undefined)
  {

    var contentString = '<div class="infoContainer">'+
  '<h5 class="infoName">'+place.name+'</h5>'+
  '<div class="infoContent">'+
    '<ul class = "infoList ">'+
      '<li>'+place.vicinity+'</li>'+
      '<li>Price: '+place.price_level+'</li>'+ ''+
      '<li>Rating: '+place.rating+ '</li>'+
    '</ul>'+
  '</div>'+
  '<a class="btn-floating waves-effect waves-light red darken-3" onclick =saveFavorite("'+place.place_id+'")><i class="tiny material-icons">star</i></a>'+
'</div>'


    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    home_map.infoboxes.push(infowindow);

    marker.addListener('click', function() {
        home_map.infoboxes.forEach(function(box)
        {
          box.close(home_map.map, marker);
        })
        infowindow.open(home_map.map, marker);
      });


    // home_map.map.addListener('click', function() {
    //   infowindow.close(home_map.map, marker);
    // });


  }
};

function createCircle(center, radius)
{
  var circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.15,
      map: home_map.map,
      center: center,
      radius: radius,
      draggable: true
    });

  home_map.circle = circle;
}

function saveFavorite(place_id)
{
  console.log("PLACE ID =", place_id)
  createFavorite(place_id)
}
//pass the halfway point latLng to this method
function searchPlaces (latLng, place_type) {
  var place;
  var exclude;
  var radius;

  //createCircle(latLng, home_map.radius);
  home_map.map.setZoom(14)
  home_map.map.setCenter(latLng)

  switch (place_type) {
    case "1":
    place = ["restaurant", "food"];
    exclude = []//["night_club", "bar", "bakery", "cafe"]
    break;
    case "2":
    place = ["bar", "night_club"]
    exclude = []//["restaurant","cafe","bakery"]
    break;

    case "3":
    place = ["cafe", "bakery"]
    exclude = []//["bar", "night_club", ]
    break;
  }

//create a data object to send to rails
  var places_data = {
    search: place,
    exclude: exclude,
    radius: home_map.radius, // how big of a search area in meters
    center: latLng
  };
  //make an ajax POST to /places route
  ajax_this('/places', 'post', places_data, process_places, error_function)
}

var process_places = function(data) {
  $('#preloader').css('display', 'flex')
  var image = "" //Place custom places markers here!
  data.results.forEach(function(place)
  {
    var latLng = {
      lat: place.lat,
      lng: place.lng
    };
    placeMarker(latLng, home_map.markers, place, image);
    });

   var success = function(data)
    {
      $('#preloader').hide();
      resultListeners();
    }

    var send_data = {data: JSON.stringify(data)};
    ajax_this('/results', 'post', send_data, success, error_function)

  }


