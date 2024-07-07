module Openai
  class ChatResponseService < BaseService
    def call(input)
      body = build_body(input)
      response = post_request(url: '/v1/chat/completions', body: body)
      extract_message_content(response)
    end

    private
      
      def build_body(input)
        prompt_path = Rails.root.join('lib/data/prompts.yml')
        prompts = YAML.load_file(prompt_path).deep_symbolize_keys
        prompt = prompts[:measure_emotion_prompt_template]

        {
          model: @model,
          temperature: 1.0,
          message: [
            { role: "system", content: prompt },
            { role: "user", content: input }
          ]
        }.to_json
      end

      def extract_message_content(response)
        response_hash = JSON.parse(response.body)
        content = response_hash.dig("choices", 0, "message", "content")
        raise StandardError, 'チャットの返信を取得できませんでした。' unless content.present?

        content

      rescue JSON::ParserError
        raise StandardError, 'チャットの返信を取得できませんでした。'
      end
  end
end
