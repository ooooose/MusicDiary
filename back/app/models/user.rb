class User < ApplicationRecord
  has_many :diaries

  ROLES = { general: 1, admin: 9 }.freeze

  enum role: ROLES

  validates :name, presence: true, length: { maximum: 40 }
  validates :uid, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, presence: true
  validates :deleted_flag, inclusion: { in: [true, false] }

  scope :active, -> { where(deleted_flag: false) }
  scope :deleted, -> { where(deleted_flag: true) }

  before_validation :set_default_role, on: :create

  private

  def set_default_role
    self.role ||= :general
  end
end

