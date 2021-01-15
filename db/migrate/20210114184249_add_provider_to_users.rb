class AddProviderToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :bio, :string
    add_column :users, :location, :string
    add_column :users, :website, :string
    add_column :users, :amazon, :string
    add_column :users, :image, :text
    add_column :users, :provider, :string, default: "email",  null: false
  end
end
