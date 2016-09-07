var the_map;

$(document).ready(function()
{
  $('select').material_select();
  console.log('Hi Sarah!')

});

function NewMap(map, directionsService, directionsDisplays) {
  this.map = map;
  this.directionsService = directionsService;
  this.directionsDisplay1 = directionsDisplays[0];
  this.directionsDisplay2 = directionsDisplays[1];
  this.markers = [];
};

function initMap()
{

  var map_options = {
    center: {lat: 40.750671, lng: -73.985239},
    zoom: 14,
    disableDefaultUI: false,
    mapTypeId: 'roadmap'
  }

  map = new google.maps.Map(document.getElementById('map'), map_options);
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay2 = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(map);
  directionsDisplay2.setMap(map);

  var input1 = (document.getElementById('dest1'));
  var input2 = (document.getElementById('dest2'));
  var autocomplete1 = new google.maps.places.Autocomplete(ui.dest1, {types: ['geocode', 'establishment']});
      autocomplete1.bindTo('bounds', map);
  var autocomplete2 = new google.maps.places.Autocomplete(ui.dest2, {types: ['geocode', 'establishment']});
      autocomplete2.bindTo('bounds', map);

  var directionsDisplays = [directionsDisplay, directionsDisplay2]
  //Construct new map object
  the_map = new NewMap(map, directionsService, directionsDisplays);
};

function calcRoute(start, end, findhalf, renderer) {


  var travel_mode = $('input[name=group1]:checked', '#travel_mode').val()
  var place_type = $('#place_type').val();
  var transit;
  console.log(travel_mode, place_type)

  switch (travel_mode) {
    case '1':
    transit = "WALKING"
    break;
    case '2':
    transit = "DRIVING"
    break;
    case '3':
    transit = "TRANSIT"
    break;

  }

	var request = {
    	origin: start,
    	destination: end,
    	travelMode: transit
    	// travelMode will eventually be a varible from user input
  	};

    directionsService.route(request, function(result, status) {
    if (status == 'OK' && findhalf == true) {
      //don't render results
      findHalfway(result);
      console.log(result);
      // status is the api suceeding or failing
    } else if (status == 'OK' && findhalf == false) {
      //do render results
      renderRoute(renderer, result);

    } else {
      console.log('No direct route found!')
    }
  });
}

function findHalfway(result){
  var coordinates_array = result.routes[0].overview_path
  var half = Math.floor(coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  console.log(halfway_point)

  for (var i = 0; i < coordinates_array.length; i++)
  {
    var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], coordinates_array[i])
    var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length - 1], coordinates_array[i])
    if (halfwayToDestination <= startingToHalfway)
    {
      halfway_point = coordinates_array[i];
      placeMarker(halfway_point, null);
      console.log("Are they equal?", startingToHalfway/1000+"km", halfwayToDestination/1000+"km");

      var latLng = { lat: halfway_point.lat(), lng: halfway_point.lng() };
      searchPlaces(latLng);
      bothWays(latLng);
      break
    }
  }
};

function renderRoute(renderer, result)
{
  renderer.setDirections(result);
}

function bothWays(halfway_point){

  calcRoute(ui.dest1.value, halfway_point, false, the_map.directionsDisplay1);
  calcRoute(ui.dest2.value, halfway_point, false, the_map.directionsDisplay2);

};

function placeMarker(latLng, markerGroup)
{
  var marker = new google.maps.Marker({
     position: latLng,
     map: map,
     title: 'Hello World!'
 });

  if (markerGroup !== null)
  {
    markerGroup.push(marker);
  }
}

//pass the halfway point latLng to this method
function searchPlaces (latLng) {

//create a data object to send to rails
  var places_data = {
    search: ['restauraunt','food'],
    radius: 1000, // how big of a search area in meters
    center: latLng
  };

  var process_places = function(data) {
    data.results.forEach(function(place)
      {
        var latLng = {
          lat: place.lat,
          lng: place.lng
        }
        placeMarker(latLng, the_map.markers);
      });
  }

  var error = function() {

  }
  //make an ajax POST to /places route
  ajax_this('/places', 'post', places_data, process_places, error)
}
