class PlacesController < ApplicationController
	def create
		@client = GooglePlaces::Client.new(ENV["googleWebAPI"])

	 	search = params["search"]
	    radius = params["radius"].to_i
	    center = params["center"]

	    lat = center["lat"].to_f
	    lng = center["lng"].to_f

		results = @client.spots(lat, lng, :radius => radius, :types => search)
		render :json => { :results => results }

	end

end
