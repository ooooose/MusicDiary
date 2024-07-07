class UserSerializer
  include JSONAPI::Serializer
  set_type :user
  attributes :name, :email, :image
end
