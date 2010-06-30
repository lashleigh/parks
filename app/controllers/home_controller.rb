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

  def new_park
    @park = Park.new
    @park.latitude = params[:lat]
    @park.longitude = params[:lng]
    unless @park.latitude and @park.longitude
      render :text => "<h3>Please provide the coordinates of your park.</h3>"
    else
      render :layout => false
    end
  end

end
