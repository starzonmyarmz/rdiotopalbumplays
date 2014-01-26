require 'sinatra'

require './lib/rdio'

rdio = Rdio.new([ENV['RDIO_CONSUMER_KEY'], ENV['RDIO_CONSUMER_SECRET']])

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end

get '/user/:vanityName' do |vanityName|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('findUser', { :vanityName => vanityName })['result'].to_json
end

get '/popular/:key/:year/:page' do |key, year, page|
  content_type 'application/json', :charset => 'utf-8'

  pop = rdio.call('getAlbumsInCollection', {
    :user => key,
    :sort => 'playCount',
    :count => 100,
    :start => 100 * page.to_i,
    # Add bigIcon and remove as many unnecessary
    # fields as necessary to speed things up
    :extras => 'bigIcon,-artistKey,-albumKey,-albumUrl,-artistUrl,-url,-price,-embedUrl,-icon,-baseIcon,-canSample,-duration,-userKey,-type,-key,-userName,-canSample,-length,-canTether,-rawArtistKey,-trackKeys,-itemTrackKeys' }
  )['result']

  # Only return those from the matched year
  return pop.select { |s| s['releaseDate'].match year }.to_json
end
