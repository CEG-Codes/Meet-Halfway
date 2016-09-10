class MapsController < ApplicationController

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
  
       puts @favresults
    end
end
end