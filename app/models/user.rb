class User < ApplicationRecord
  acts_as_token_authenticatable
  before_create :set_username
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :authy_authenticatable
  
  def self.find_for_facebook_oauth(auth)
      email = auth['email']
      password = Devise.friendly_token[0,20]
      name = auth['name']
      provider = 'facebook'
      image = auth['picture']['data']['url']
      user = {email: email, password: password, name: name, 
            provider: provider, image: image }
  end

   def self.find_for_google_oauth(auth)
      email = auth['profileObj']['email']
      password = Devise.friendly_token[0,20]
      name = auth['profileObj']['name']
      provider = 'google'
      image = auth['profileObj']['imageUrl']
      user = {email: email, password: password, 
            name: name, provider: provider, image: image}
  end

  private
  def set_username
    self.username = "#{self.email[/^[^@]+/]}_#{SecureRandom.hex(1)}"
  end
end
