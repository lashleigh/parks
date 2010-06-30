# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_parks_session',
  :secret      => '2050cb23eca96e05a22e3294c64189546fd0095f589b959d63bc1e2e2c177e9e45155a29de9accabd5b5bae37843640ad07b801cfb0db1b547255db0a4314908'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
