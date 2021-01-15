class Api::V1::UsersController < ApplicationController
    # before_action :authenticate_user!,  only: [:index, :current, :update, :destroy]

    def index
     @users = User.all 
     render json: @users
    end

    def index
     @users = User.all 
     render json: @users
    end

    def update
      @user = User.find_by(id: params[:id])
      if @user.update(user_params)
        render json: {
          messages: "Info Successfully Updated",
          is_success: true,
          data: {user: @user}
        }, status: :ok
      else
        render json: {
          messages: "Updating Failded",
          is_success: false,
          data: {error: @user.error.messages}
        }, status: :unprocessable_entity
      end
    end

    def show 
      @user = User.find_by(id: params[:id])
      render json: @user
    end
  
    private
    def user_params
      params.permit(:email, :name, :password, :username, :bio, :location, :website, :amazon)
    end
  
    def ensure_params_exist
      return if params[:user].present?
      render json: {
          messages: "Missing Params",
          is_success: false,
          data: {}
        }, status: :bad_request
    end
  end