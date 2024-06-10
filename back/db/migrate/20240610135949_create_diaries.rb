class CreateDiaries < ActiveRecord::Migration[7.0]
  def change
    create_table :diaries do |t|
      t.text :body, null: false
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
