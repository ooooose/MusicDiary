class Diary < ApplicationRecord
  belongs_to :user

  validates :body, presence: true
  validates :uid, presence: true, uniqueness: true

  before_create :set_uid

  private

    def set_uid
      self.uid = SecureRandom.uuid
    end
end
