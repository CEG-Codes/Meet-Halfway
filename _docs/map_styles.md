#**Documentation**
##Add Map Styling || [Back to Table of Contents](_table_of_contents.md)

####Code

We created mapstyle.js, and declared a variable style, which contains the styling info for the map.

Then, in our g_maps.js file, we added styles in the object and referenced the variable:

```js
function initMap(){
  var map_options = {
    center: {lat: 40.750671, lng: -73.985239},
    zoom: 14,
    disableDefaultUI: false,
    mapTypeId: 'roadmap',
    styles: style //calls mapstyle.js
  };
```



####Some alternative style options to pick from:
https://snazzymaps.com/style/1861/two-tone-with-labels
https://snazzymaps.com/style/20560/dbi
https://snazzymaps.com/style/4105/brokka-map
https://snazzymaps.com/style/7943/desaturated-blues
https://snazzymaps.com/style/9470/muted
https://snazzymaps.com/style/27/shift-worker
https://snazzymaps.com/style/83/muted-blue
