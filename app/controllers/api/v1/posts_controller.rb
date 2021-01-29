class Api::V1::PostsController < ApplicationController
    # before_action :authenticate_user!,  only: [:index, :current, :update, :destroy]
      # before_action :attach, only: [:update]

    def create
      post = Post.new(post_params)
      if post.save
        render json: {
          messages: "Post Successfully",
          is_success: true,
          data: post,
        }, status: 200
      else
        render json: {
          messages: "Post creation Failded",
          is_success: false,
          data: {}
        }, status: :unprocessable_entity
      end
    end

    def index
     @posts = Post.all
     render json: @posts
    end
  
    def update
      post = Post.find_by(id: params[:id])
      if post.update(update_params)
        render json: {
          messages: "Post Successfully Updated",
          is_success: true,
          data:  post
        }, status: :ok
      else
        render json: {
          messages: "Updating Failded",
          is_success: false,
          data:  @post.error.messages
        }, status: :unprocessable_entity
      end
    end

    def show 
      @post = Post.find_by(id: params[:id])
      render json: @post
    end
  
    private
    def attach 
      post = Post.find_by(id: params[:id])
      if post_params[:images] 
        params[:images].each do |image|
         if  !image.instance_of?(String)
          post.images.attach(image) 
         end
        end
      end
    end
    def post_params
      params.permit(:description, :user_id, :id, images: [])
    end

     def update_params
      params.permit(:description, :user_id, :id, images: [])
    end
   
  end