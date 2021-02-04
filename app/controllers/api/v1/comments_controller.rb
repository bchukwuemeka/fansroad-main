class Api::V1::CommentsController < ApplicationController
    # before_action :authenticate_user!,  only: [:index, :current, :update, :destroy]
      # before_action :attach, only: [:update]

    def create
      comment = Comment.new(comment_params)
      if comment.save
        render json: {
          messages: "comment Successfully",
          is_success: true,
          data: comment,
        }, status: 200
      else
        render json: {
          messages: "comment creation Failded",
          is_success: false,
          data: {}
        }, status: :unprocessable_entity
      end
    end

    def update
      comment = Comment.find_by(id: params[:id])
      if comment.update(comment_params)
        render json: {
          messages: "comment Successfully Updated",
          is_success: true,
          data:  comment
        }, status: :ok
      else
        render json: {
          messages: "Updating Failded",
          is_success: false,
          data:  comment.error.messages
        }, status: :unprocessable_entity
      end
    end

    def index 
      @comments = Comment.all
      render json: @comments
    end
    def destroy 
      @comment = Comment.find_by(id: params[:id])
      if @comment.destroy
        head :no_content
      else 
        render json: {error: "problem deleting comment" }, status: 422
      end
    end
   

   private
   def comment_params
      params.permit(:content, :user_id, :post_id)
    end
  end