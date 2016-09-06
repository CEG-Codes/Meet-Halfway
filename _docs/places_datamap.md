#**Documentation**
##Rendering Places data on Map || [Back to Table of Contents](_table_of_contents.md)

####Intro

So, you have a ton of JSON data from rails returned to your AJAX call's success function. We've all been there. What do you do with it now?

Presumably, the JSON data contains an array of restauraunts and stuff. Each restauraunt should have a latitude and longitude attached to it. All we need to do then is send every restauraunt to a method which will create a map marker at the latitude and longitude found in the restauraunt's data. 

[I already wrote about how to create a marker](create_marker.md), so check out that page again!

####Code

