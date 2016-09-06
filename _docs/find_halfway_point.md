#**Documentation**
##Finding the Halfway Point || [Back to Table of Contents](_table_of_contents.md)

####Intro
Using [Google Maps API Reference](https://developers.google.com/maps/documentation/javascript/reference#DirectionsRoute)

The challenge is to show the user a halfway point on the map that is halfway between the origin and destination and along the *route*, not halfway between a straight line. This means that if the route curves around a lake, then the halfway point appears on the *road* and not in the middle of the lake.


####Coding

Once we have get the route JSON object back from google, we have access to a lot of information including the distance between the two points.
```js
results.routes[0].legs[0].distance
```

So how do we find the half-way point along the *road*?

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


If the tests show this is not a good halfway point, then we'll have to use a method to find the actual half-way point in the array based off of distance.

This will require us to iterate throughout the array, computing the distance from both ends each time until the distance of the two points are equal.

I've come up with a method that should do that here.
```js
var coordinates_array = results.routes[0].overview_path

//gives us the midpoint in the *array*, not necessarily midpoint in the *route*
var half = (coordinates_array.length / 2)
var halfway_point = coordinates_array[half]

var starting_point = coordinates_array[0]
var ending_point = coordinates_array[coordinates_array.length - 1]

for (var i = 0; startDistance < endDistance; i++)
{
    startDistance = computeDistanceBetween(starting_point, coordinates_array[i])
    endDistance = computeDistanceBetween(ending_point, coordinates_array[i])
    halfway_point = coordinates_array[i];
    //Imagine the route's distance is 100 meters and we want the midpoint.
    //So we'll check each coordinate in the array and get the distance from starting and ending points to the coordinate that's being checked.

    //For the first point, startDistance will = 0 and the endDistance = 100 meters
    //For the second point, startDistance will = 1 and the endDistance == 99 meters
    //When this loop reaches the point that startDistance = 50 and endDistance = 50, the loop will end and the halfway_point variable will equal the array element that it ended on. This should actually be the halfway point!
}
```
