class DiarySerializer
  include JSONAPI::Serializer
  set_type :diary
  attributes :uid, :body, :created_at

  belongs_to :user, serializer: UserSerializer
  has_many :tracks, serializer: TrackSerializer
end
