module Openai
  class UnauthorizedError < StandardError; end
  class TooManyRequestsError < StandardError; end
  class InternalServerError < StandardError; end
  class ServiceUnavailableError < StandardError; end
  class TimeoutError < StandardError; end

  class BaseService
    attr_reader :model

    def initialize(model: 'gpt-3.5-turbo', timeout: 10)
      @model = model
      @connection = Faraday.new(url: 'https://api.openai.com') do |f|
        f.headers['Authorization'] = "Bearer #{ENV['OPENAI_API_KEY']}"
        f.headers['Content-Type'] = 'application/json'
        f.options[:timeout] = timeout
        f.adapter Faraday.default_adapter
      end
    end

    protected
      
      def post_request(url: '/', body: '{}')
        response = @connection.post(url) { |req| req.body = body }

        handle_response_errors(response)
        response
      rescue Faraday::TimeoutError
        raise TimeoutError, 'リクエストがタイムアウトしました。もう一度お試しください。'
      end

    private

      def handle_response_errors(response)
        case response.status
        when 200
          nil
        when 401
          raise UnauthorizedError, 'APIキーが無効です。'
        when 429
          raise TooManyRequestsError, 'リクエストが多すぎます。'
        when 500
          raise InternalServerError, 'サーバーエラーが発生しました。'
        when 503
          raise ServiceUnavailableError, 'サービスが利用できません。'
        else
          raise StandardError, '予期せぬエラーが発生しました。'
        end
      end
  end
end
