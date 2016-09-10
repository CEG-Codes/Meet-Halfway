class MapsController < ApplicationController
  include PlacesHelper
  include MapsHelper

    def index

     puts what_day_is_it
     @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
     @favresults = [];

      if current_user
       @favorites = Favorite.where(:user_id => current_user.id)
       @favorites.each do |favorite|
         spot = @client.spot(favorite.place_id)
         @favresults.push(spot)
      end
    end

       puts @favresults
  # def index
  #   @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
  #   if current_user
  #     @favorites = Favorite.where(:user_id => current_user.id)
  #   end
  # end
  end
end
