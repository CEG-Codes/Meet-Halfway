class MapsController < ApplicationController
  include PlacesHelper

  def index
    @client = GooglePlaces::Client.new(ENV["googleWebAPI"])
    if current_user
      @favorites = Favorite.where(:user_id => current_user.id)
    end
  end



end
