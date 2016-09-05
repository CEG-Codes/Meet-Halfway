#**Documentation**

##[Creating a map](README.md)
From [google maps API docs](https://developers.google.com/maps/documentation/javascript/tutorial)

* In the maps/index.html.erb file add div with the ID of "map" to the body.
* copy and paste google's map script to the body, including your API **BROWSER** key

```html
<html>
<body>
    <div id="map"></div>
</body>

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
async defer></script>

</html>
```

* in a javacsript file, create a new map with this method

```js
var map = new google.maps.Map(document.getElementById("map"), {<options>});
```

* This method takes two arguments
    *   the ID of the HTML element to show the map on
    *   the map options (passed as an object)

* We can set the options above the method and pass it in with a variable.
    * The center and zoom options are required. All others are optional.
    * A full list of interesting options can be found at the [Google Maps API Reference Page](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)

```js
var map_options = {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8,
  mapTypeId: HYBRID,
  backgroundColor: teal
}

var map = new google.maps.Map(document.getElementById("map"), {map_options});

```

##Finding a route between two points

##Finding the halfway point

##Creating a marker at halfway point

##Creating a draggable circle

##Methods Reference
