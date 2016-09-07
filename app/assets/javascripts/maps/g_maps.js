$(document).ready(function()
{
  console.log('Hi Sarah!')



  $(".button-collapse").sideNav();
  // Initialize collapse button for nav
  
  // Show sideNav
  $('.button-collapse').sideNav('show');
  // Hide sideNav
  $('.button-collapse').sideNav('hide');

  buttonlistener();
}); // end of doc ready 

// google variables 
var directionsDisplay
var directionsService
var request


function buttonlistener() {
  $('#destSubmitBtn').on('click', function(){
    // display list 
    calcRoute();
  })
}

function initMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  // init map part one calls up google maps API
<<<<<<< HEAD

=======
>>>>>>> ffc6a095592f5cb441e10a3178faf6322aceea06
  var map_options = {
    center: {lat: 40.750671, lng: -73.985239},
    zoom: 14,
    disableDefaultUI: false,
    mapTypeId: 'roadmap'
  }

<<<<<<< HEAD
  map = new google.maps.Map(document.getElementById('map'), map_options);
  directionsDisplay.setMap(map);
}; // end initMap
=======
 map = new google.maps.Map(document.getElementById('map'), map_options);
 directionsDisplay.setMap(map);

  var input1 = (document.getElementById('dest1'));
  var input2 = (document.getElementById('dest2'));

  var autocomplete1 = new google.maps.places.Autocomplete(input1, {types: ['geocode', 'establishment']});
      autocomplete1.bindTo('bounds', map);
  var autocomplete2 = new google.maps.places.Autocomplete(input2, {types: ['geocode', 'establishment']});
      autocomplete2.bindTo('bounds', map);
>>>>>>> ffc6a095592f5cb441e10a3178faf6322aceea06


// we are going to do directions here -
function calcRoute() {

	var start = document.getElementById('dest1').value;
	var end = document.getElementById('dest2').value;
  var travel_mode = $('#travel_mode').val();
  var places_type = $('#place_type').val();
  var transit;

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

	request = {
    	origin: start,
    	destination: end,
    	travelMode: transit
    	// travelMode will eventually be a varible from user input
  	};

    directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
      findHalfway(result);
      console.log(result);
      // status is the api suceeding or failing
    }
  }); // end of directionService.route function

} // end of calcRoute function


function findHalfway(result){
  var coordinates_array = result.routes[0].overview_path
  var half = (coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  console.log(halfway_point)

  for (var i = 0; i < coordinates_array.length; i++)
  {
    var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], coordinates_array[i])
    var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length - 1], coordinates_array[i])
    if (halfwayToDestination <= startingToHalfway)
    {
      halfway_point = coordinates_array[i];
      placeMarker(halfway_point);
      console.log("Are they equal?", startingToHalfway/1000+"km", halfwayToDestination/1000+"km");

<<<<<<< HEAD
  var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], halfway_point)
  console.log(startingToHalfway)
  var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length -1], halfway_point)
  console.log(halfwayToDestination)

  var marker = new google.maps.Marker({
   position: halfway_point,
   map: map,
   title: 'Hello World!'
  });

  var latLng = {
    lat: halfway_point.lat(),
    lng: halfway_point.lng()   
  };

  searchPlaces(latLng);
}; // end of findHalfWay 
=======
      var latLng = { lat: halfway_point.lat(), lng: halfway_point.lng() };
      searchPlaces(latLng);
      break
    }
  }
};

function placeMarker(latLng)
{
  var marker = new google.maps.Marker({
     position: latLng,
     map: map,
     title: 'Hello World!'
 });
}
>>>>>>> ffc6a095592f5cb441e10a3178faf6322aceea06

// computeDistanceBetween(starting_point, halfway_point)


//pass the halfway point latLng to this method
function searchPlaces (latLng) {

//create a data object to send to rails
  var places_data = {
    search: 'restauraunt',
    radius: 1000, // how big of a search area in meters
    center: latLng
  };

//make an ajax POST to /places route
  $.ajax({
    url: '/places',
    method:'post',
    data: places_data,
    success: function(data)
    {
      console.log('success', data)
    },
    error: function(data)
    {
      console.log('error');
    }
  }) // end of ajax for places 

} // end of searchPlaces function



