class Api::V1::DiariesController < ApplicationController
  before_action :set_diary, only: %i[show update destroy set_music]

  # GET /diaries
  def index
    diaries = current_user.diaries.includes([:tracks])
    render json: DiarySerializer.new(diaries, include: [:tracks]).serializable_hash, status: :ok
  end

  # GET /diaries/{uid}
  def show
    render json: DiarySerializer.new(@diary, include: [:tracks]).serializable_hash, status: :ok
  end

  # POST /diaries
  def create
    @diary = current_user.diaries.build(diary_params)

    if @diary.save && RecommendMusicJob.perform_later(@diary.id, current_user.id)
      render json: DiarySerializer.new(@diary, include: [:tracks]).serializable_hash, status: :created
    else
      render json: { errors: @diary.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diaries/{uid}
  def update
    if @diary.update(diary_params)
      render json: @diary
    else
      render json: { errors: @diary.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /diaries/{uid}
  def destroy
    @diary.destroy!
  rescue ActiveRecord::RecordNotDestroyed => e
    render json: { error: e.message }, status: :unprocessable_entity
  else
    render json: { message: "日記の削除に成功しました" }, status: :ok
  end

  # GET /diaries/{date}
  def dairy_index
    date = Date.parse(params[:date])
    diaries = current_user.diaries.created_on(date).sorted_by_date
    render json: DiarySerializer.new(diaries).serializable_hash, status: :ok
  end

  private

    def set_diary
      @diary = Diary.includes(:tracks).find_by(uid: params[:uid])
    end

    def diary_params
      params.require(:diary).permit(:uid, :body)
    end
end
