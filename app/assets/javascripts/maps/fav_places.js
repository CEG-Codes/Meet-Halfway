function createFavorite (place_id) {

//create a data object to send to rails

	var fav_place = {
    place: place_id
    };

  var success = function()
  {
      navbarListeners();

  }
	var error = function() {

	}

	ajax_this('/favorites', 'post', fav_place, success, error)


}

