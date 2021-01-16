class Api::V1::OmniauthsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_user

  def redirect_callbacks
    if params['email'] 
      user_params = User.find_for_facebook_oauth(params)
      @user = User.new user_params
      if @user.save
        session[:user_id] = @user.id
        render json: {
          messages: "Sign Up Successfully",
          is_success: true,
          data: {user: @user}
        }, status: 200
      elsif User.find_by(email:  params[:email])
        user = User.find_by(email:  params[:email])
        session[:user_id] = user.id
        render json: {
          messages: "Sign in Successfully",
          is_success: true,
          data: {user: user}
        }, status: 200
      else  
         render json: {
          logged_in: false
        }, status: 401
      end
    end
  end
  

  private
  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end
end

