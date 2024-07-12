class Track < ApplicationRecord
  belongs_to :diary

  validates :title, presence: true
  validates :artist, presence: true
  validates :spotify_id, presence: true
  validates :image, presence: true
end
