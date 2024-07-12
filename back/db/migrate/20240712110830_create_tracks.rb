class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.string :spotify_id, null: false, index: true
      t.string :image, null: false
      t.references :diary, null: false, foreign_key: true

      t.timestamps
    end
  end
end
