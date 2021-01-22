class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :description, :images
  def images
    return unless object.images.attachments
    image_urls = object.images.map do |image| 
       rails_blob_url(image)
    end
    image_urls
  end
end