require 'rspotify'

module Spotify
  class RequestRecommendationService
    def initialize(params)
      @genre = params.genre
      @danceability = params.danceability
      @valence = params.valence
      @popularity = params.popularity
      @acousticness = params.acousticness
      @energy = params.energy
      @instrumentalness = params.instrumentalness
      @liveness = params.liveness
      @speechiness = params.speechiness
    end

    def request()
      recommendations = RSpotify::Recommendations.generate(
        seed_genres: [@genre],
        target_danceability: @danceability,
        target_valence: @valence,
        target_popularity: @popularity,
        target_acousticness: @acousticness,
        target_energy: @energy ,
        target_instrumentalness: @instrumentalness,
        target_liveness: @liveness,
        target_speechiness: @speechiness
      )
      return recommendations.tracks.map {|track| [track.artists.first.name, track.name].join('/')}
    end
  end
end