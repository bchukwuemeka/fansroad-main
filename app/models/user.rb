class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :authy_authenticatable
  
  def self.find_for_facebook_oauth(auth)
      email = auth['email']
      password = Devise.friendly_token[0,20]
      name = auth['name']
      # provider = auth['graphDomain']
      user = {email: email, password: password, name: name}
  end

   def self.find_for_google_oauth(auth)
      email = auth['profileObj']['email']
      password = Devise.friendly_token[0,20]
      name = auth['profileObj']['name']
      # provider = auth['graphDomain']
      user = {email: email, password: password, name: name}
  end
  # def self.find_or_create_by_omniauth(auth_hash)
  #   self.where(email: auth_hash['info']['email']).first_or_create do |u|
  #     u.name = auth_hash['info']['name']
  #     u.password = SecureRandom.hex
  #   end
  # end
end
