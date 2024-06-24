class User < ApplicationRecord
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

  def self.find_with_jwt(encoded_token)
    begin
      Rails.logger.debug "Encoded token: #{encoded_token}"
      decoded_token = JWT.decode(encoded_token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
      payload = decoded_token.first
      Rails.logger.debug "Decoded token payload: #{payload}"
      find(payload['user_id'])
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT decode error: #{e.message}"
      nil
    rescue JWT::ExpiredSignature
      Rails.logger.error "JWT token has expired"
      nil
    rescue JWT::VerificationError
      Rails.logger.error "JWT verification error"
      nil
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
