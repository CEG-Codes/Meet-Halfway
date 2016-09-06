#**Documentation**
##Creating a Marker || [Back to Table of Contents](_table_of_contents.md)

####Intro
Adding a marker is just a matter of following the [Google Docs](https://developers.google.com/maps/documentation/javascript/markers#add)

The Google marker is an object that requires a position and a map to add it to.
The position is a lat/lng coordinate.

There are a lot of other options you can add to your marker listed in the docs. 

####Coding
```js

//we just need a latLng to pass to the marker constructor. This can be an object we write ourselves (see below) or it can also be a special Google Maps object (like an array element from the overview_path) that contains a lat/lng inside of it.

latLng = {lat: XX.XX, lng: XX.XX}

var marker = new google.maps.Marker({
   position: latLng,
   map: map,
   title: 'Hello World!'
 });

```
