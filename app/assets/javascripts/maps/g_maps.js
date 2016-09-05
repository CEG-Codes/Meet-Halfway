$(document).ready(function()
{
  console.log('Hi Sarah!')
});

function initMap() {

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
 calcRoute();
};

// we are going to do directions here - 



function calcRoute() { 

	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();

	// var start = document.getElementById('start').value;
	// var end = document.getElementById('end').value;

	var request = {
    	origin: "Brooklyn, NY",
    	destination: "Nashville, TN",
    	travelMode: 'DRIVING'
    	// travelMode will eventually be a varible from user input
  	};

    directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      console.log(result);
      // status is the api suceeding or failing
    }
  });

}


