class MapsController < ApplicationController

  def index
    @client = GooglePlaces::Client.new(ENV["googleWebAPI"])

    if current_user
      @results = [];
      @favorites = Favorite.where(:user_id => current_user.id)

      end

    end
  end



end
