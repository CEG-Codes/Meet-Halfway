class RemoveColumnsFromFavorites < ActiveRecord::Migration[5.0]
  def change
    remove_column :favorites, :name, :string
    remove_column :favorites, :location, :string
    remove_column :favorites, :hours, :string
    remove_column :favorites, :phone, :string
  end
end
