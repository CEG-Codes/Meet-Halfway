class MapsController < ApplicationController
  include PlacesHelper
  include MapsHelper

    def index
      if current_user
      @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
        MapsHelper.clear
        @favorites = Favorite.where(:user_id => current_user.id)
        @favorites.each do |favorite|
          spot = @client.spot(favorite.place_id)
          MapsHelper.unshift(spot)
        end
      @favresults = MapsHelper.get
    end
    render :index
  end

  def delete_fav
    data = params[:place].split('&array_id=')
    place_id = data[0].to_s
    name = data[1].to_s
    index = MapsHelper.index_by_name(name)
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
