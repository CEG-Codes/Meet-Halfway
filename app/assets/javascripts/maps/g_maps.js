$(document).ready(function()
{
  $('select').material_select();
  console.log('Hi Sarah!')
  // initAutocomplete();
  buttonlistener();
});

var map
var directionsDisplay
var directionsService
var request
var predictor

var autocomplete, placeSearch;

function buttonlistener() {
  $('#destSubmitBtn').on('click', function(){
    calcRoute();
  })
}

function initMap()
{
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  // init map part one calls up google maps API

// var directionsService = new google.maps.DirectionsService;
// var directionsDisplay = new google.maps.DirectionsRenderer;

  var map_options = {
    center: {lat: 40.750671, lng: -73.985239},
    zoom: 14,
    disableDefaultUI: false,
    mapTypeId: 'roadmap'
  }

 map = new google.maps.Map(document.getElementById('map'), map_options);
 directionsDisplay.setMap(map);
  var input1 = (document.getElementById('dest1'));
  var input2 = (document.getElementById('dest2'));

  var autocomplete1 = new google.maps.places.Autocomplete(input1);
      autocomplete1.bindTo('bounds', map);
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
      autocomplete2.bindTo('bounds', map);


 // calcRoute();
};

// we are going to do directions here -



function calcRoute() {


	var start = document.getElementById('dest1').value;
	var end = document.getElementById('dest2').value;

	request = {
    	origin: start,
    	destination: end,
    	travelMode: 'DRIVING'
    	// travelMode will eventually be a varible from user input
  	};

    directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
      findHalfway(result);
      console.log(result);
      // status is the api suceeding or failing
    }
  });


}


function findHalfway(result){
  var coordinates_array = result.routes[0].overview_path
  var half = Math.floor(coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  console.log(halfway_point)


  var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], halfway_point)
  console.log(startingToHalfway)
  var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length -1], halfway_point)
  console.log(halfwayToDestination)

  placeMarker(halfway_point);

  var latLng = {
    lat: halfway_point.lat(),
    lng: halfway_point.lng()
  };

  searchPlaces(latLng);
};
// computeDistanceBetween(starting_point, halfway_point)


function placeMarker(latLng)
{
  var marker = new google.maps.Marker({
     position: latLng,
     map: map,
     title: 'Hello World!'
 });
}



//pass the halfway point latLng to this method
function searchPlaces (latLng) {

//create a data object to send to rails
  var places_data = {
    search: ['restauraunt','food'],
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

      data.results.forEach(function(place)
      {
        var latLng = {
          lat: place.lat,
          lng: place.lng
        }

        placeMarker(latLng);


      });


    },
    error: function(data)
    {
      console.log('error');
    }
  })

}
