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

  def delete_fav

    place = Favorite.find_by_place_id(params[:place_id])
    place.destroy


    #render :nothing => true
    respond_to do |format|
      format.html { redirect_to root }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

end
