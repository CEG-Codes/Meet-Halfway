class PlacesController < ApplicationController
	def create
		@client = GooglePlaces::Client.new(ENV["googleWebAPI"])

	 	search = params["search"]
	    radius = params["radius"].to_i
	    center = params["center"]
      exclude = params["exclude"]
	    lat = center["lat"].to_f
	    lng = center["lng"].to_f

		results = @client.spots(lat, lng, :radius => radius, :types => search, :exclude => exclude)
		render :json => { :results => results }

	end

end
