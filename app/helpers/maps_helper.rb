module MapsHelper

  @favresults = [];

  def self.get
    @favresults
  end

  def self.iget(index)
    @favresults[index]
  end

  def self.unshift(item)
    @favresults.unshift(item)
  end

  def self.push(item)
    @favresults.push(item)
  end

  def self.index_by_name(value)
    @favresults.index{|item| item.name == value}
  end

  def self.index_by_place_id(value)
    @favresults.index{|item| item.place_id == value}
  end

  def self.delete_at(index)
    @favresults.delete_at(index)
  end

  def self.include?(item)
    @favresults.include?(item)
  end

  def self.clear
    @favresults=[]
  end

  # def get_opening_time(place)
  #   place.opening_hours["periods"][@time.wday]["open"]["time"]
  # end

  # def get_closing_time(place)
  #   place.opening_hours["periods"][@time.wday]["close"]["time"]
  # end

  # def get_final_hour(place)
  #   place.opening_hours["periods"][@time.wday]["close"]["time"][0,2].to_i
  # end

  # def isOpen?(place)
  #   place.opening_hours["open"]
  # end

   def get_weekday_text(place)
      place.opening_hours["weekday_text"]
   end

end












