class FavoritesController < ApplicationController

	def create
    user = current_user.id
	 	place = params["place"];
		Favorite.create(user_id: user, place_id: place)
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
