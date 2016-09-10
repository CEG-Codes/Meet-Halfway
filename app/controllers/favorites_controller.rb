class FavoritesController < ApplicationController

	def create
    user = current_user.id
	 	place = params["place"];
		Favorite.create(user_id: user, place_id: place)

  end

	def delete
		place = Favorite.find_by_id(params["place"])
		place.destroy

	end


end
