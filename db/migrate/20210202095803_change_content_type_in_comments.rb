class ChangeContentTypeInComments < ActiveRecord::Migration[6.1]
  def up
    change_column :comments, :content, :text
  end

  def down
    change_column :comments, :content, :string
  end
end
