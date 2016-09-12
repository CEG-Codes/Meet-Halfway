class Favorite < ApplicationRecord
  belongs_to :user
  validates_uniqueness_of :place_id, :scope => [:user_id]
  validates :user_id, presence: true
end


