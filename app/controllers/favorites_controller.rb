class FavoritesController < ApplicationController

	def create

	 	place = params["place"]
	 	debugger
		Favorite.create( place_id: place)	 	
	end

	def delete
		place = Favorite.find_by_id(params["place"])
		place.destroy

	end


end
