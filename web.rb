require 'sinatra'

require './lib/rdio'
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

get '/albums/:key/:page' do |key, page|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('getAlbumsInCollection', { :user => key, :sort => 'playCount', :count => 20, :extras => 'tracks,Track.playCount', :start => 20 * page.to_i })['result'].to_json
end

# This should probably replace the call to /albums eventually
get '/popular/:key/:year/:page' do |key, year, page|
  content_type 'application/json', :charset => 'utf-8'
  pop = rdio.call('getAlbumsInCollection', { :user => key, :sort => 'playCount', :count => 25, :start => 25 * page.to_i, :extras => 'bigIcon' })['result']
  #return pop.select { |s| s['releaseDate'].match year }.to_json
  return pop.to_json
end
