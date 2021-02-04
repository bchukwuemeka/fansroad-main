class Api::V1::LikesController < ApplicationController
    # before_action :authenticate_user!,  only: [:index, :current, :update, :destroy]
      # before_action :attach, only: [:update]

    def create
      @like = Like.new(like_params)
      if @like.save
        render json: {
          messages: "Liked successfully",
          is_success: true,
          data:  @like
        }, status: 200
      else 
        render json: 'like unsuccessful', status: 401
      end
    end

    def index 
      @likes = Like.all 
      render json: @likes
    end
    def destroy
      @like = Like.find_by(id: params[:id])
      @like.destroy
      head :no_content
    end
  
    private
    
    def like_params
      params.permit(:likeable_type, :likeable_id, :user_id)
    end

  end