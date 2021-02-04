class PostSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers
  include CloudinaryHelper
  attributes :id, :description, :created_at, :images, :user, :comments, :commentsCount, :likes, :getLikes
  def images
    return unless object.images.attachments
    image_urls = object.images.map do |image|           
        {
        url: cl_image_path(image.key, secure: true),
        signed_id: image.signed_id
        }
    end
    image_urls
  end
  def user
    object.user
  end
  def comments
    object.comments
  end
  def commentsCount
    object.comments.count
  end
  def likes
    object.likes.count
  end
  def getLikes
    object.likes
  end
  def created_at
    object.created_at.strftime("%Y-%m-%d")
  end
end