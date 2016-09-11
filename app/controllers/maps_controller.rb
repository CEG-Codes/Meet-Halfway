class MapsController < ApplicationController
  include PlacesHelper
  include MapsHelper

    def index
     @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
     @time = Time.new
      if current_user
        MapsHelper.clear
        @favorites = Favorite.where(:user_id => current_user.id)
        @favorites.each do |favorite|
          spot = @client.spot(favorite.place_id)
          MapsHelper.unshift(spot)
          # puts @time.hour < get_final_hour(spot)
          # puts @time.hour
          # puts get_final_hour(spot)
        end
      @favresults = MapsHelper.get
    end
  end


end
