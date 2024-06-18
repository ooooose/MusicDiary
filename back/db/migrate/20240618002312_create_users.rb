class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false, limit: 40
      t.string :uid, null: false, index: { unique: true, name: 'unique_uid' }
      t.string :email, null: false, index: { unique: true, name: 'unique_emails' }
      t.string :image
      t.integer :role, null: false, default: 1
      t.boolean :deleted_flag, null: false, default: false, index: true

      t.timestamps null: false
      t.datetime :deleted_at
    end
  end
end
