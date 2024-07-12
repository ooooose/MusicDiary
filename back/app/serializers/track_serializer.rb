class TrackSerializer
  include JSONAPI::Serializer
  set_type :track
  attributes :title, :artist, :spotify_id, :image

  belongs_to :diary, serializer: DiarySerializer
end
