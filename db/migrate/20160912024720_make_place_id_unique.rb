class MakePlaceIdUnique < ActiveRecord::Migration[5.0]
  def change
    Favorite.delete_all
    add_index :favorites, :place_id, :unique => true
  end
end
