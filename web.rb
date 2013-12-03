require 'sinatra'
require 'json'

require './rdio'
require './rdio_creds'

rdio = Rdio.new([RDIO_CONSUMER_KEY, RDIO_CONSUMER_SECRET])

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end

get '/user/:vanityName' do |vanityName|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('findUser', { :vanityName => vanityName }).to_json
end

get '/albums/:key' do |key|
  content_type 'application/json', :charset => 'utf-8'
  return rdio.call('getAlbumsInCollection', { :user => key, :sort => 'playCount', :count => 20 }).to_json
end
