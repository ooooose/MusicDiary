class Api::V1::DiariesController < ApplicationController
  before_action :set_diary, only: %i[show update destroy]

  # GET /diaries
  def index
    @diaries = current_user.diaries.includes(:user)

    render json: @diaries, includes: :user
  end

  # GET /diaries/{uid}
  def show
    render json: @diary
  end

  # POST /diaries
  def create
    @diary = current_user.build(diary_params)

    if @diary.save
      render json: @diary, status: :created, location: @diary
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

  private

    def set_diary
      @diary = Diary.find_by(uid: params[:id])
    end

    def diary_params
      params.require(:diary).permit(:body)
    end
end
