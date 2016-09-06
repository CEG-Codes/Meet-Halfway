class User < ApplicationRecord

  has_many :favorites
  validates :first_name, :last_name, :email, :uid, :provider, presence: true #must have a username to create
  validates :uid, :email, :uniqueness => true #two users cannot have same uid

  def self.create_with_omniauth(auth)



    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"] #user's github user id
      user.first_name = auth["info"]["first_name"]
      user.last_name = auth["info"]["last_name"]
      user.email = auth["info"]["email"]
      user.image = auth["info"]["image"]
    end
  end

end

