class MapsController < ApplicationController

include MapsHelper

    def index
 
     puts what_day_is_it
     @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
     @results = [];
  
      if current_user
       @favorites = Favorite.where(:user_id => current_user.id)
       @favorites.each do |favorite|
         spot = @client.spot(favorite.place_id)
         @results.push(spot)
      end
  
       puts @results
    end
end
end