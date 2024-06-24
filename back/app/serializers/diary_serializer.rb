class DiarySerializer
  include JSONAPI::Serializer
  attributes :uid, :body, :created_at

  belongs_to :user
end
