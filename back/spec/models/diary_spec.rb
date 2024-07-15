require 'rails_helper'

RSpec.describe Diary, type: :model do
  # validationのテスト
  describe 'validation' do
    context 'when normal' do
      # ユーザーIDと日記の内容があれば、有効であること
      it 'is valid with a name and email' do
        diary = build(:diary)
        expect(diary).to be_valid
      end
    end

    context 'when abnormal' do
      # ユーザーIDがなければ、無効であること
      it 'is invalid without user' do
        diary = build(:diary, user_id: nil)
        expect(diary).not_to be_valid
      end

      # 日記の内容がなければ、無効であること
      it 'is invalid without body' do
        diary = build(:diary, body: nil)
        expect(diary).not_to be_valid
      end
    end
  end

  # associationのテスト
  describe 'association' do
    it { is_expected.to have_many(:tracks).dependent(:destroy) }
  end
end
