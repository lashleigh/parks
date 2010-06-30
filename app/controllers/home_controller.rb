class HomeController < ApplicationController
  def index
    @parks = Park.find(:all).collect do |p|
      {"id" => p.id,
        "url" => p.site_url,
        "latitude" => p.latitude,
        "longitude" => p.longitude,
        "name" => p.name
      }
    end
  end

end
