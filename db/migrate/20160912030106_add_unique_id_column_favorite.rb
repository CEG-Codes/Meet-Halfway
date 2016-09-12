class AddUniqueIdColumnFavorite < ActiveRecord::Migration[5.0]
  def change
    Favorite.delete_all
    add_column :favorites, :unique_id, :string, :unique => true
  end
end
