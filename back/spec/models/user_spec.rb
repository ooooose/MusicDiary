require 'rails_helper'

RSpec.describe User, type: :model do
  # validationのテスト
  describe 'validation' do
    context 'when normal' do
      # 名前とメールアドレスがあれば、有効であること
      it 'is valid with a name and email' do
        user = build(:user)
        expect(user).to be_valid
      end
    end

    context 'when abnormal' do
      # 名前がなければ、無効であること
      it 'is invalid without a name' do
        user = build(:user, name: nil)
        expect(user).not_to be_valid
      end

      # メールアドレスがなければ、無効であること
      it 'is invalid without a email' do
        user = build(:user, email: nil)
        expect(user).not_to be_valid
      end

      # 重複したメールアドレスなら無効であること
      it 'is invalid with a duplicate email address' do
        create(:user, email: 'test@gmail.com')
        user = build(:user, email: 'test@gmail.com')
        expect(user).not_to be_valid
      end
    end
  end

  # associationのテスト
  describe 'association' do
    it { is_expected.to have_many(:diaries).dependent(:destroy) }
  end
end