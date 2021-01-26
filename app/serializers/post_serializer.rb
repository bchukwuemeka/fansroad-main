class PostSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers
  include CloudinaryHelper
  attributes :id, :description, :created_at, :images, :user
  def images
    return unless object.images.attachments
    image_urls = object.images.map do |image|        
        cl_image_path(image.key, secure: true)
    end
    image_urls
  end
  def user
    object.user
  end
  def created_at
    object.created_at.strftime("%Y-%m-%d")
  end
end