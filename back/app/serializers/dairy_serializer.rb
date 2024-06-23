class DairySerializer
  include JSONAPI::Serializer
  attributes :diary
  attributes :uid, :body, :created_at

  belongs_to :user
end
