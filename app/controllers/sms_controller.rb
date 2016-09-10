class SmsController < ApplicationController
	def create
        puts "YO"
	end

	def index
    if current_user
      puts "wow"
    end
  end

end
