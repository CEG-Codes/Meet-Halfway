$(document).ready(function()
{
  console.log('Hi Sarah!')
});


var directionsDisplay
var directionsService
var request

function initMap() {
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
 calcRoute();
};

// we are going to do directions here -



function calcRoute() {


	// var start = document.getElementById('start').value;
	// var end = document.getElementById('end').value;

	request = {
    	origin: "Sunset Park, Brooklyn, NY",
    	destination: "Meat Packing, Manhattan, NY",
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
  var half = (coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  console.log(halfway_point)


  var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], halfway_point)
  console.log(startingToHalfway)
  var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length -1], halfway_point)
  console.log(halfwayToDestination)

  var marker = new google.maps.Marker({
   position: halfway_point,
   map: map,
   title: 'Hello World!'
 });

};
// computeDistanceBetween(starting_point, halfway_point)
