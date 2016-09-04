class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true
      t.string :place_id
      t.string :name
      t.string :location
      t.string :hours
      t.string :phone

      t.timestamps
    end
  end
end
