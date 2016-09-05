#**Documentation**
##Creating a Route || [Back to Table of Contents](_table_of_contents.md)

####Intro
Using the [Google Maps Directions API](https://developers.google.com/maps/documentation/javascript/directions)

Finding the route seems to be just a matter of sending Google an origin, destination, and travel method. 

####Coding

#####Javascript
######/app/assets/javascripts/maps/*file.js*

* Initialize the directions service
    * this uses Google's DirectionsService() method.

```js
var directionsService = new google.maps.DirectionsService();
```

* Then calculate the route with a method
    * needs to get information like origin and destination from the DOM
    * needs to put that information into an object with other options defined.
    * needs to pass that object into Google's [route() method](https://developers.google.com/maps/documentation/javascript/directions#DirectionsRequests) to get information back.

```js
var directionsService = new google.maps.DirectionsService();

calcRoute();

function calcRoute() {
//needs to get information like origin and destination from the DOM
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

//needs to put that information into an object with the travelMode defined.
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };

//needs to pass that information object into Google's route() method to get information back.
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      console.log(result);
    }
  });
}
```

* Then show the result
    * this uses Google's DirectionsRenderer();

```js

var directionsDisplay = new google.maps.DirectionsRenderer();

//Put this line inside the <status == 'OK'> callback function from the code above

        directionsDisplay.setDirections(result);
        console.log(result);

```

* Now we have a [DirectionsRoute JSON object](https://developers.google.com/maps/documentation/javascript/directions#Routes) with important information like the distance of the route which we can use to calculate the halfway point from.

