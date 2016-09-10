require 'twilio-ruby'

# put your own credentials here
account_sid = ENV["twillo_account_sid"]
auth_token = ENV["twillo_auth_token"]

# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new account_sid, auth_token 

@client.account.messages.create(
  from: '+16158002190',
  to: '+16154989018',
  body: 'Robot invasion! Reply back with any sightings.'
)