class MapsController < ApplicationController
  include PlacesHelper
  include MapsHelper

    def index
     @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
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
    data = params[:place].split('&array_id=')
    place_id = data[0].to_s
    index = data[1].to_i

    place = Favorite.find_by_place_id(place_id)
    place.destroy
    MapsHelper.delete_at(index)

    #render :nothing => true
    respond_to do |format|
      format.html { redirect_to root }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

end
