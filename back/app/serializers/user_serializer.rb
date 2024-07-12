class UserSerializer
  include JSONAPI::Serializer
  set_type :user
  attributes :name, :email, :image

  belongs_to :diary, serializer: DiarySerializer
end
