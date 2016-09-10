class PlacesController < ApplicationController
  include PlacesHelper
  results = nil

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

  def list_results
    @results = []
    results = params[:results]
    byebug


    results.each do |result|
      spot = @client.spot(result.place_id)
      @results.push(spot)
    end

    respond_to do |format|
      format.js #places/create.js.erb
    end
  end

end
