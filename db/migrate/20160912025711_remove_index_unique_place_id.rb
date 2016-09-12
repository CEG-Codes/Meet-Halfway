class RemoveIndexUniquePlaceId < ActiveRecord::Migration[5.0]
  def change
    Favorite.delete_all
    remove_index :favorites, :place_id
  end
end
