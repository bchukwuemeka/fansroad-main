class Api::V1::SessionsController < ApplicationController
  # include CurrentUserConcern
  # before_action :set_current_user
  before_action :sign_in_params, only: :create
  skip_before_action :verify_authenticity_token, :only => [:create, :destroy, :logged_in]
  
  # sign in
  def create
    user = User.find_by(email: sign_in_params[:email])
    if user.valid_password?(sign_in_params[:password])
      session[:user_id] = user.id
      render json: {
          messages: "Sign Up Successfully",
          is_success: true,
          data: {user: user}
        }, status: 200
    else
      head{:unauthorized}
    end
  end

  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    session[:user_id] = nil
    head :no_content
  end

  def logged_in
    
    if session[:user_id]
      @current_user = User.find(session[:user_id])
      render json: {
        logged_in: true,
        user: @current_user
      }, status: 200
    else
      render json: {
        logged_in: false
      }, status: 401
    end
  end

  private
  def sign_in_params
    params.permit(:email, :password)
  end

  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

end