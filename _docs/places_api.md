#**Documentation**
##Using Places API with Rails Gem || [Back to Table of Contents](_table_of_contents.md)

####Intro

So we've sent a POST request to '/places' in rails from the front-end. Now we need to set up how we receive this data and send it to the Google Places API. 

We'll be doing this using the [Google Places Ruby Gem](https://github.com/qpowell/google_places)

####Code

We already created our places controller in rails and set up the routes that go along with it. So now we need to define what happens when a POST request hits /places. Rails will automatically send the Post request to the create method in this controller, so let's set it up.

```rb

class PlacesController < ApplicationController

# this sets up the Google Places Gem according to the docs
  @client = GooglePlaces::Client.new(ENV["googleWebAPI"])

  def create

  #The places_data object we passed from the front-end will be send here
  #We can access the different keys in it using params["key_name"]

    search = params["places_type"]
    radius = params["radius"].to_i
    center = params["center"]

    #then because the Ruby gem asks us to separate lat and lng, we do that here.
    lat = center["lat"].to_f
    lng = center["lng"].to_f

  end
end


```

So now we've received the places_data object in Rails. To send it to the Google Places API, we follow the gem's instructions.

```rb
results = @client.spots(lat, lng, :radius => radius, :types => search)
```

Finally, we send the data back to to the front end page with a JSON command

```rb
render :json => { :results => results }
```

This JSON will appear in the 'Success' function of our ajax call (hopefully!). So let's return to the javascript front-end and [render the data onto the map.](places_datamap.md)
