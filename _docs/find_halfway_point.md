#**Documentation**
##Finding the Halfway Point || [Back to Table of Contents](_table_of_contents.md)

####Intro
Using [Google Maps API Reference](https://developers.google.com/maps/documentation/javascript/reference#DirectionsRoute)

Once we have get the route JSON object back from google, we have access to a lot of information including the distance between the two points.
```js
results.routes[0].legs[0].distance
```

The challenge is to show the user a halfway point on the map that is halfway between the origin and destination and along the *route*, not halfway between a straight line. This means that if the route curves around a lake, then the halfway point appears on the *road* and not in the middle of the lake.

Luckily, the route JSON object includes something called the overview_path

```js
results.routes[0].overview_path
```

The overview_path is an array of lat/lng coordinates along the route. We should be able to iterate through the array and find the single lat/lng coordinate the represents the halfway point of the route.

So how do we do this? Good question, Jeff.

One idea is to simply take the overview_path array and divide it by 2 to get the center of the array. 

For example:
```js
coordinates_array = results.routes[0].overview_path
half = (coordinates_array.length / 2)
halfway_point = coordinates_array[half]

> halfway_point = {lat: XX, lng: XX}

```

This might work? But there's no way to know if this point is actually halfway between the origin and destination, just that it's in the center of the array that google gave us.

Luckily, we have a method to check the distance of one point to another.
[From Google Reference](https://developers.google.com/maps/documentation/javascript/reference#spherical) use the computeDistanceBetween(LatLng, LatLng) method.

We can calculate the distance from the starting point to the halfway point and also the distance from the ending point to the halfway point. If these numbers are about equal, then we have a good halfway point.
```js
//Distance from starting point to halfway_point

computeDistanceBetween(starting_point, halfway_point)


//Distance from ending point to halfway_point

computeDistanceBetween(ending_point, halfway_point)

//If these two numbers are about equal, then we have a good halfway point.
```

####Coding
