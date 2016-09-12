class FavoritesController < ApplicationController
  include PlacesHelper
  include MapsHelper

	def create
    @client = GooglePlaces::Client.new(ENV["googleWebAPI"])

    user = current_user.id
	 	place = params["place"];
		Favorite.create(user_id: user, place_id: place, unique_id: "#{place}_#{user}")
    new_fav = @client.spot(place)
    if (MapsHelper.index_by_place_id(new_fav.place_id) == nil)
      MapsHelper.push(new_fav)
      @dup = false;
      @favresults = MapsHelper.get
      respond_to do |format|
        format.js
      end
    else
      puts "DUPLICATE!"
      @dup = true
      @favresults = MapsHelper.get

      respond_to do |format|
        format.js
      end

    end


  end

	def delete


	end




end
