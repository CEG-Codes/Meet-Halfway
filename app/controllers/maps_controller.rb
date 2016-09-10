class MapsController < ApplicationController
  include PlacesHelper
  include MapsHelper

    def index
     @client = GooglePlaces::Client.new(ENV["googleWebAPI"])


      if current_user
       @favorites = Favorite.where(:user_id => current_user.id)
       @favorites.each do |favorite|
         spot = @client.spot(favorite.place_id)
         MapsHelper.push(spot)
      end
      @favresults = MapsHelper.get
    end


  # def index
  #   @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
  #   if current_user
  #     @favorites = Favorite.where(:user_id => current_user.id)
  #   end
  # end
  end
end
