# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_07_12_110830) do
  create_table "diaries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "uid", null: false
    t.text "body", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_diaries_on_created_at"
    t.index ["uid"], name: "unique_uid", unique: true
    t.index ["user_id"], name: "index_diaries_on_user_id"
  end

  create_table "tracks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title", null: false
    t.string "artist", null: false
    t.string "spotify_id", null: false
    t.string "image", null: false
    t.bigint "diary_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["diary_id"], name: "index_tracks_on_diary_id"
    t.index ["spotify_id"], name: "index_tracks_on_spotify_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", limit: 40, null: false
    t.string "uid", null: false
    t.string "email", null: false
    t.string "image"
    t.integer "role", default: 1, null: false
    t.boolean "deleted_flag", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_flag"], name: "index_users_on_deleted_flag"
    t.index ["email"], name: "unique_emails", unique: true
    t.index ["uid"], name: "unique_uid", unique: true
  end

  add_foreign_key "diaries", "users"
  add_foreign_key "tracks", "diaries"
end
