require 'rails_helper'

RSpec.describe Track, type: :model do
  # validationのテスト
  describe 'validation' do
    context 'when normal' do
      it 'is valid with a name and email' do
        track = build(:track)
        expect(track).to be_valid
      end
    end

    context 'when abnormal' do
      # タイトルがなければ、無効であること
      it 'is invalid without title' do
        track = build(:track, title: nil)
        expect(track).not_to be_valid
      end
      
      # アーティストがなければ、無効であること
      it 'is invalid without artist' do
        track = build(:track, artist: nil)
        expect(track).not_to be_valid
      end

      # SpotifyIDがなければ、無効であること
      it 'is invalid without spotifyID' do
        track = build(:track, spotify_id: nil)
        expect(track).not_to be_valid
      end

      # イメージがなければ、無効であること
      it 'is invalid without image' do
        track = build(:track, image: nil)
        expect(track).not_to be_valid
      end

      # diaryIDがなければ、無効であること
      it 'is invalid without diaryID' do
        track = build(:track, diary_id: nil)
        expect(track).not_to be_valid
      end
    end
  end
end
