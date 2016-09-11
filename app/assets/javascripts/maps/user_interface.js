var ui;

$(document).ready(function(){
  console.log('Buttons, reporting in!');
  $('select').material_select();
  ui = new DOM_Stuff;
  navbarListeners();
  deleteFavorites();
});



function DOM_Stuff(){
  this.dest1 = (document.getElementById('dest1'));
  this.dest2 = (document.getElementById('dest2'));
  this.submit = $('#destSubmitBtn');
  this.submit.on('click', function(e){
    e.preventDefault();

    var start = ui.dest1.value;
    var end = ui.dest2.value;
    deleteMarkers();
    calcRoute(start, end, true);
    $('.search_box').toggle(); //toggles search box out
    $('.results_container').toggle(); //toggles results in

    if (validate_search())

    {
      var start = ui.dest1.value;
      var end = ui.dest2.value;
      calcRoute(start, end, true);
    }

  });
};

function navbarListeners() {
  $('.button-collapse').sideNav({
      menuWidth: 400, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('.button-collapse').sideNav('hide');
   $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  $('.collection').on('click', function(e)
  {
    var parent = $(e.target).parent()
    var lat = $(e.target).attr('lat');
    var lng = $(e.target).attr('lng');
    var latLng = (lat == undefined) ? {lat: parent.attr('lat'), lng: parent.attr('lng')} : {lat:lat, lng:lng}
    console.log(latLng)
  })
};

<<<<<<< HEAD
function deleteFavorites(){
  $('.delete_favorite').on('click', function(){
    $.ajax({
      type: "DELETE",
      url: "/", //double check this url
      data: {"_method": "delete"},
      success: function(places_data)
      {
        console.log(places_data)
        success(places_data);
      }

    })

  })
}

// $("#button").click(function(){
//     $.ajax({
//         type: "DELETE",
//         url: "/slot_allocations/" + slotallocation_id,
//         dataType: "json",
//         data: {"_method":"delete"},
//         complete: function(){
//             alert("it's gone!");
//         }
//     });
// });
=======
function resultListeners()
{
  $('.result_item').on('click', function(e)
  {
    var parent = $(e.target).parent();
    var lat = parent.parent().attr('lat');
    var lng = parent.parent().attr('lng');
    var latLng = (lat == undefined) ? {lat: parent.attr('lat'), lng: parent.attr('lng')} : {lat:lat, lng:lng}
    console.log(latLng);
  });
}
>>>>>>> 77eb17bb55420e9c0399bdecf106738559d70f57
