module MapsHelper

  @favresults = [];
  def self.get
    @favresults
  end

  def self.unshift(item)
    @favresults.unshift(item)
  end

  def self.push(item)
    @favresults.push(item)
  end

  def self.clear
    @favresults=[]
  end

  def get_opening_time(place)
    place.opening_hours["periods"][@time.wday]["open"]["time"]
  end

  def get_closing_time(place)
    place.opening_hours["periods"][@time.wday]["close"]["time"]
  end

  def get_final_hour(place)
    place.opening_hours["periods"][@time.wday]["close"]["time"][0,2].to_i
  end

  def isOpen?(place)
    place.opening_hours["open"]
  end
end
