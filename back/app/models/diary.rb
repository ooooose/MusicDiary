class Diary < ApplicationRecord
  belongs_to :user

  validates :body, presence: true
  validates :uid, presence: true, uniqueness: true
end
