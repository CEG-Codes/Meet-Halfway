#**Documentation**
##Setting up with Ajax || [Back to Table of Contents](_table_of_contents.md)

####Intro
So, you wanna surf with the big dogs, do you?

This guide will use information from the [Google Places API](https://developers.google.com/maps/documentation/javascript/places) but it will mostly rely on information from the [Ruby Google Places Gem](https://github.com/qpowell/google_places)

The goal we have here is to take the halfway point we found in the previous section and find all of the cool places around that point using the Google Places API.

To do this we need to:

* Grab the halfway coordinates the front-end
* Send them with an AJAX call to the rails back-end
* Hit the Places API from the rails backend and get data back
* Send that data back to the front-end and render the map markers

This section will cover sending the coordinates from the front-end to the rails back-end.

####Code

So when we last left off, we found the midpoint coordinates inside of an array Google sent back to us.

```js

var coordinates_array = results.routes[0].overview_path
var halfway_point = coordinates_array[i];//i represents *whichever* element it is

```

The halfway_point element is an object that contains a latitude and longitude generated from a function. To actually tease these numbers out, we need to invoke the functions. The next step then is to save the latitude and longitude of the halfway_point in a separate variable.

```js
var coordinates_array = results.routes[0].overview_path
var halfway_point = coordinates_array[i];//i represents *whichever* element it is

var latLng = {
    lat: halfway_point.lat();
    lng: halfway_point.lng();
}
```

Great! Now we can send this new latLng object to the rails backend. The [Ruby Google Places Gem](https://github.com/qpowell/google_places) asks for a latitude and longitude, a radius, and finally, some search categories (restauraunt, bar, etc).

So we should construct an ajax call that passes that information to Rails.


```js

//pass the halfway point latLng to this method
function searchPlaces (latLng)
{

//create a data object to send to rails
  var places_data = {
    search: 'restauraunt',
    radius: 1000, // how big of a search area in meters
    center: latLng
  }
 
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
  })
}
```

[Next, we'll cover how rails will receive this data and make an API request with it.
](places_api.md)
