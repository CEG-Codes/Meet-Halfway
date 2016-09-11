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
end
