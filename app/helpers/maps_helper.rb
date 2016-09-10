module MapsHelper
  @favresults = [];
  def self.get
    @favresults
  end

  def self.push(item)
    @favresults.push(item)
  end



  end
