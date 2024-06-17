class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  include DeviseTokenAuth::Concerns::User

  has_many :diaries, dependent: :destroy

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
  before_create :set_uid

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
    end
  end

  private

    def set_default_role
      self.role ||= :general
    end

    def set_uid
      self.uid = SecureRandom.uuid
    end

end
