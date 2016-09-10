module PlacesHelper

  def get_photo(photo_arr)


    if (photo_arr.length > 0)
        photo_reference = photo_arr[0].photo_reference
        apiKey = ENV["googleWebAPI"]
        width = "400";
        return photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth="+width+"&photoreference=" + photo_reference + "&key=" + apiKey
       else
        return photoURL = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    end
  end


  # def get_link



end
