class PlacesController < ApplicationController
  include PlacesHelper

	def create
		@client = GooglePlaces::Client.new(ENV["googleWebAPI"])
    @results = []
	 	search = params["search"]
	    radius = params["radius"].to_i
	    center = params["center"]
      exclude = params["exclude"]
	    lat = center["lat"].to_f
	    lng = center["lng"].to_f

		results = @client.spots(lat, lng, :radius => radius, :types => search, :exclude => exclude)


    results.each do |result|
      spot = @client.spot(result.place_id)
      @results.push(spot)
    end

    respond_to do |format|
      format.js #places/create.js.erb
    end



	end

  def show_markers
    #render :json => { :results => results }
  end

end
