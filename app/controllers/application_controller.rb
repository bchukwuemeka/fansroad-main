class ApplicationController < ActionController::Base
   protect_from_forgery unless: -> { request.format.json? }
  #  skip_before_action :verify_authenticity_token
  protect_from_forgery with: :null_session
 
  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end
end

