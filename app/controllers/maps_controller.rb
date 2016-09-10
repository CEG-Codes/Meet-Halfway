class MapsController < ApplicationController
  include PlacesHelper

  def index
    @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
    if current_user
      @favorites = Favorite.where(:user_id => current_user.id)

      respond_to do |format|
        format.html
        format.js {render :partial => "maps/navbar"}
      end
    end
  end



end
