# app/serializers/track_serializer.rb
class TrackSerializer
  include JSONAPI::Serializer
  attributes :spotify_id, :title, :artist, :image
end
