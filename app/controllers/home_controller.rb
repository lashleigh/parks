class HomeController < ApplicationController
  def index
    @parks = Park.find(:all).collect do |p|
      {"id" => p.id,
        "url" => p.site_url,
        "name" => p.name,
        "latitude" => p.latitude,
        "longitude" => p.longitude,
        "description" => p.description,
      }
    end
  end

  def new_park
    @park = Park.new
    @park.latitude = params[:lat]
    @park.longitude = params[:lng]
    @park.name = params[:name]
    unless @park.latitude and @park.longitude
      render :text => "<h3>Please provide the coordinates of your park.</h3>"
    else
      render :layout => false
    end
  end

end
