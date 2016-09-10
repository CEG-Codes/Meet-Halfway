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
  this.infoboxes = [];
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
  var directionsDisplay1 = new google.maps.DirectionsRenderer({suppressMarkers:true});
  var directionsDisplay2 = new google.maps.DirectionsRenderer({suppressMarkers:true});
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
  console.log(travel_mode, place_type)

  var request = {
    origin: start,
    destination: end,
    travelMode: transit,

    // travelMode will eventually be a varible from user input
  };

  home_map.directionsService.route(request, function(result, status) {
    if (status == 'OK' && findhalf == true) {
      //don't render results
      findHalfway(result);
      console.log(result);
      // status is the api suceeding or failing
    } else if (status == 'OK' && findhalf == false) {
      //do render results
      renderRoute(renderer, result);
      placeMarker(result.routes[0].overview_path[0], null, undefined, image)
    } else {
      console.log('No direct route found!')
    }
  });
}


function findHalfway(result){
  var place_type = $('input[name=group2]:checked', '#place_type').val();
  var coordinates_array = result.routes[0].overview_path
  var half = Math.floor(coordinates_array.length / 2)
  var halfway_point = coordinates_array[half]
  console.log(place_type)

  for (var i = 0; i < coordinates_array.length; i++){

    var startingToHalfway = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[0], coordinates_array[i])
    var halfwayToDestination = google.maps.geometry.spherical.computeDistanceBetween(coordinates_array[coordinates_array.length - 1], coordinates_array[i])

    if (halfwayToDestination <= startingToHalfway){
      halfway_point = coordinates_array[i];
      placeMarker(halfway_point, null);
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

function deleteMarkers()
{

   for (var i = 0; i < home_map.markers.length; i++)
    {
      home_map.markers[i].setMap(null);
    }
  home_map.markers = [];
}

function placeMarker(latLng, markerGroup, place, image)
{
  var marker = new google.maps.Marker({
     position: latLng,
     map: home_map.map,
     icon: image
  });

  if (markerGroup !== null)
  {
    markerGroup.push(marker);
  };
  if (place !== undefined)
  {

    var contentString = '<div class="infoContainer">'+
  '<h5 class="infoName">'+place.name+'</h5>'+
  '<div class="infoContent">'+
    '<ul class = "infoList">'+
      '<li>'+place.vicinity+'</li>'+
      '<li>Price: '+place.price_level+'</li>'+
      '<li>Rating: '+place.rating+'</li>'+
    '</ul>'+
  '</div>'+
  '<a class="btn-floating waves-effect waves-light red darken-3"><i class="tiny material-icons">star</i></a>'+
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

function saveFavorite(place_id)
{
  console.log("PLACE ID =", place_id)
  createFavorite(place_id)
}
//pass the halfway point latLng to this method
function searchPlaces (latLng, place_type) {

  var place;
  var exclude;
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
    radius: 1000, // how big of a search area in meters
    center: latLng
  };

  var process_places = function(data) {

    if (data.results.length > 0)
    {
      $('#results_list').empty();
    } else {
      $('#results_list').append($('<div style = "text-align: center;">No results found.</div>'))
    }

    data.results.forEach(function(place){
      var latLng = {
        lat: place.lat,
        lng: place.lng
      };
      placeMarker(latLng, home_map.markers, place);


      if(place.photos.length > 0)
      {
        var photo_reference = place.photos[0].photo_reference;
        var apiKey = place.photos[0].api_key;
        var width = 400;
        var photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth="+width+"&photoreference=" + photo_reference + "&key=" + apiKey;
      } else {
        var photoURL = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
      }


      var $result_card = $(
        //////////////new stuff below here//////////////////////////////
        // '<div class="result">'+




      '<div class="divider"></div>'+
      '<div class="hoverable">'+

        '<div class="card-stacked">'+
        '<div class="valign-wrapper">'+
        '<img class="valign" src="'+photoURL+'">'+
        '<h6 class="title place-title valign">'+place.name+'</h6>'+
        '</div>'+
        '<div class="card-content valign-wrapper">'+
          '<p class="place-info">'+
           place.vicinity+ '<br>'+

          'Rating: '+place.rating+
          'Price: '+place.price_level+
          '</p>'+
          '<a class="valign favorite-button btn-floating waves-effect waves-light red darken-3"><i class="tiny material-icons">star</i></a>'+

          '</div>'+
      '</div>'

      );

      $('.results_container').append($result_card);

    });
    }


        ////////////stuff above here is new/////////////////////////////



        /////////this stuff below works uncomments if things get fucky///////

  //       '<div class="result">'+
  //         '<h4 class="place_name">'+place.name+'</h4>'+
  //         '<img src="'+photoURL+'" alt="" />'+
  //         '<ul>'+
  //         '<li class="hours">'+place.opening_hours+'</li>'+
  //         '<li class="address">'+place.formatted_address+'</li>'+
  //         '<li class="rating">'+place.rating+'</li>'+
  //         '<li class="price">'+place.price_level+'</li>'+
  //         '<button class = "favoriteButton">Fav!</button>'+
  //       '</div>'
  //     );
  //     $('#results_list').append($result_card);
  //
  //   });
  // }
  ///////////////////////////////////////////////////////////////////////////

  var error = function() {

  }
  //make an ajax POST to /places route
  ajax_this('/places', 'post', places_data, process_places, error)
}
