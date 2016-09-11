var ui;

$(document).ready(function(){
  console.log('Buttons, reporting in!');
  $('select').material_select();
  ui = new DOM_Stuff;
  navbarListeners();
});


function backButton(){
  $('.back-button').on('click', function(){
    $('.search_box').toggle(); //toggles search box out
  })

}
function DOM_Stuff(){
  this.dest1 = (document.getElementById('dest1'));
  this.dest2 = (document.getElementById('dest2'));
  this.submit = $('#destSubmitBtn');
  this.submit.on('click', function(e){
    e.preventDefault();

    var start = ui.dest1.value;
    var end = ui.dest2.value;
    function deleteMarkers();
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


// function deleteFavorites(){
//   $('.delete_favorite').on('click', function(){
//     $.ajax({
//       type: "DELETE",
//       url: "/", //double check this url
//       data: {"_method": "delete"},
//       success: function(places_data)
//       {
//         console.log(places_data)
//         success(places_data);
//       }
//
//     })
//
//   })
// }



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
