require 'sinatra'

require './rdio'
require './rdio_creds'

rdio = Rdio.new([RDIO_CONSUMER_KEY, RDIO_CONSUMER_SECRET])

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end

get '/user/:vanityName' do |vanityName|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('findUser', { :vanityName => vanityName })['result'].to_json
end

get '/albums/:key' do |key|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('getAlbumsInCollection', { :user => key, :sort => 'playCount', :count => 20, :extras => 'tracks,Track.playCount' })['result'].to_json
end

get '/popular/:key/:year/:page' do |key, year, page|
  content_type 'application/json', :charset => 'utf-8'
  heavy_rotation = rdio.call('getHeavyRotation', { :user => key, :type => 'albums', :count => 20, :start => 20 * page.to_i })['result']
  return heavy_rotation.select { |s| s['releaseDate'].match year }.to_json
end
