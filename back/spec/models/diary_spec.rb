require "rails_helper"

RSpec.describe Diary, type: :model do
  # バリデーションのテスト
  describe "validations" do
    subject { create(:diary) }

    it { is_expected.to validate_presence_of(:body) }
    it { is_expected.to validate_presence_of(:uid) }
    it { is_expected.to validate_uniqueness_of(:uid).case_insensitive }
  end

  # validationのテスト
  describe "validation" do
    context "when normal" do
      # ユーザーIDと日記の内容があれば、有効であること
      it "is valid with a name and email" do
        diary = build(:diary)
        expect(diary).to be_valid
      end
    end

    context "when abnormal" do
      # ユーザーIDがなければ、無効であること
      it "is invalid without user" do
        diary = build(:diary, user_id: nil)
        expect(diary).not_to be_valid
      end

      # 日記の内容がなければ、無効であること
      it "is invalid without body" do
        diary = build(:diary, body: nil)
        expect(diary).not_to be_valid
      end
    end
  end

  # アソシエーションのテスト
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:tracks).dependent(:destroy) }
  end

  # スコープのテスト
  describe "scopes" do
    let!(:old_diary) { create(:diary, created_at: 2.days.ago) }
    let!(:yesterday_diary) { create(:diary, created_at: 1.day.ago) }
    let!(:today_diary) { create(:diary, created_at: Time.current) }

    describe ".sorted_by_date" do
      it "returns diaries in descending order of creation date" do
        expect(Diary.sorted_by_date).to eq([today_diary, yesterday_diary, old_diary])
      end
    end

    describe ".created_on" do
      it "returns diaries created on the given date" do
        date = 1.day.ago.to_date
        expect(Diary.created_on(date)).to eq([yesterday_diary])
      end
    end
  end
end
