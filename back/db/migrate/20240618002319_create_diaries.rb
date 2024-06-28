class CreateDiaries < ActiveRecord::Migration[7.0]
  def change
    create_table :diaries do |t|
      t.string :uid, null: false, index: { unique: true, name: 'unique_uid' }
      t.text :body, null: false
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end

    add_index :diaries, :created_at
  end
end
