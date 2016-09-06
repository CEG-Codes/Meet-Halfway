#**Documentation**
##Creating a Marker || [Back to Table of Contents](_table_of_contents.md)

####Intro
Adding a marker is just a matter of following the [Google Docs](https://developers.google.com/maps/documentation/javascript/markers#add)

The Google marker is an object that requires a position and a map to add it to.
The position is a lat/lng coordinate.

There are a lot of other options you can add to your marker listed in the docs. 

####Coding
```js
var coordinates_array = result.routes[0].overview_path
var half = (coordinates_array.length / 2)
var halfway_point = coordinates_array[half]
var map = new google.maps.Map(document.getElementById('map'), map_options);

//This code adds the marker.
var marker = new google.maps.Marker({
   position: halfway_point,
   map: map,
   title: 'Hello World!'
 });

```
