function createFavorite (place_id) {

//create a data object to send to rails

	var fav_place = {
      place: place_id
    };

  var success = function()
  {
<<<<<<< HEAD
      navbarListeners();
=======

    navbarListeners();

>>>>>>> 161b291c6f61c248b0a8a7c4df18bb424ad3a15c
  }
	var error = function()
  {

  }
	ajax_this('/favorites', 'post', fav_place, success, error)
}



