FactoryBot.define do
  factory :track do
    sequence(:title) {|n| "title_#{n}" }
    sequence(:artist) {|n| "artist_#{n}" }
    sequence(:spotify_id) { |n| "spotify_id_#{n}" }
    sequence(:image) {|n| "image_key_#{n}" }
    association :diary
  end
end
