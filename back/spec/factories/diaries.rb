FactoryBot.define do
  factory :diary do
    sequence(:uid) {|n| "uuid_#{n}" }
    sequence(:body) { |n| "body_#{n}" }
    association :user
  end
end
