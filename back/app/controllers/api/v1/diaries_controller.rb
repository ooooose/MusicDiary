class Api::V1::DiariesController < ApplicationController
  before_action :set_diary, only: %i[show update destroy]

  # GET /diaries
  def index
    diaries = current_user.diaries

    json_string = DiarySerializer.new(diaries).serializable_hash.to_json
    render json: json_string, status: :ok
  end

  # GET /diaries/{uid}
  def show
    render json: DiarySerializer.new(@diary).serializable_hash.to_json, status: :ok
  end

  # POST /diaries
  def create
    @diary = current_user.diaries.build(diary_params)

    if @diary.save
      render json: @diary, status: :created
    else
      render json: @diary.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diaries/{uid}
  def update
    if @diary.update(diary_params)
      render json: @diary
    else
      render json: @diary.errors, status: :unprocessable_entity
    end
  end

  # DELETE /diaries/{uid}
  def destroy
    @diary.destroy
  end

  # GET /diaries/{date}
  def dairy_index
    date = Date.parse(params[:date])
    @diaries = current_user.diaries.created_on(date).sorted_by_date
    json_string = DiarySerializer.new(@diaries).serializable_hash.to_json
    render json: json_string, status: :ok
  end

  private

    def set_diary
      @diary = Diary.find_by(uid: params[:uid])
    end

    def diary_params
      params.require(:diary).permit(:uid, :body)
    end
end
