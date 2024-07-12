class Diary < ApplicationRecord
  belongs_to :user
  has_many :tracks, dependent: :destroy

  validates :body, presence: true
  validates :uid, presence: true, uniqueness: true

  scope :sorted_by_date, -> { order(created_at: :desc) }

  scope :created_on, ->(date) {
    where(created_at: date.beginning_of_day..date.end_of_day)
  }
end
