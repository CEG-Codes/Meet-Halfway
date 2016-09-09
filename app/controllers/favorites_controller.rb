class FavoritesController < ApplicationController

	def create
    @client = GooglePlaces::Client.new(ENV["googleWebAPI"])

    user = current_user.id
    place = params["place"]

    new_favorite = Favorite.create(user_id: user, place_id: place)
    @favorites = Favorite.all

     respond_to do |format|
      format.js
    end

  end

	def delete
		place = Favorite.find_by_id(params["place"])
		place.destroy

	end


end
