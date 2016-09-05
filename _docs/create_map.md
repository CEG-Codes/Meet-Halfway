#**Documentation**
##Creating a map || [Back to Table of Contents](_table_of_contents.md)

####Intro
Based off the [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/tutorial)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The maps use a javascript library and are easiest to manipulate from the front end.This means we won't need a gem to create the map itself, but we may need one for the
more complicated stuff we want to do such as Google Places.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The map requires an API *browser* key to use. The browser key is a type of Google API key that simply tracks the amount of requests you make to google maps. This key doesn't need to be kept secret (it's placed in the HTML template) but it needs to be setup to only accept requests from certain URLs in the developer's console.

####Coding

#####HTML
######/app/views/maps/index.html.erb
* add div with the ID of "map" to the body.
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

#####Javascript
######/app/assets/javascripts/maps/*name of file.js*
* in a javacsript file, use this method to create a new map

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

