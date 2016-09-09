class Favorite < ApplicationRecord
  belongs_to :user, optional: true
 
end


