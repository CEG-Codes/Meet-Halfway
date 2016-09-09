function createFavorite (place_id) {

//create a data object to send to rails

	var fav_place = {
    place: place_id
    };

  var success = function(data)
  {
    console.log(data);
    var fav_item = $('<li class="favorite_item">'+
            '<div class="favLeft">'+data.new.user_id+'</div>'+
            '<br>'+
            '<div class="favLeft">'+data.new.place_id+'</div>'+
            '<br>'+
            '<div class="favLeft">'+data.spot.name+'</div>'+
            '<div class="favRight">Hours</div>'+
            '<div class="" style="clear:both">'+data.spot.vicinity+'</div>'+
            '<div class="">'+data.spot.formatted_phone_number+'</div>'+
          '</li>');
    $('#fav_restaurant').append(fav_item)
  }

	var error = function()
  {

	}

	ajax_this('/favorites', 'post', fav_place, success, error)
}



