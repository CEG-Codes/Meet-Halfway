var ui;

$(document).ready(function(){
  console.log('Buttons, reporting in!');
  $('select').material_select();
  ui = new DOM_Stuff;
  navbarListeners();
});

function DOM_Stuff(){
  this.dest1 = (document.getElementById('dest1'));
  this.dest2 = (document.getElementById('dest2'));
  this.submit = $('#destSubmitBtn');
  this.submit.on('click', function(e){
    e.preventDefault();
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
    latLng = {lat: parseFloat(latLng.lat), lng: parseFloat(latLng.lng)}
    console.log(latLng);
    if (latLng.lat >= 0 || latLng.lat <= 0 )
    {
      home_map.map.setZoom(16);
      home_map.map.panTo(latLng);
    } else {
      console.log('Cant center')
    }
  })
  $('.delete_button').on('click',function(e)
  {
    console.log($(e.target))
  });
};

function resultListeners()
{
  $('.result_item').on('click', function(e)
  {
    var parent = $(e.target);
    var saveButton = parent.parent();
    console.log(saveButton)
    if (saveButton.hasClass('save_button'))
    {
      var place_id = parent.parent().attr('pid');
      console.log(place_id)
      createFavorite(place_id);
    }

    //console.log(parent.parents('div'))
    var lat = parent.closest('.result_item').attr('lat');
    var lng = parent.closest('.result_item').attr('lng');
    var mkid = parent.closest('.result_item').attr('mkid');
    var latLng = {lat:lat, lng:lng};
    var infowindow = home_map.infoboxes[mkid]
    latLng = {lat: parseFloat(latLng.lat), lng: parseFloat(latLng.lng)}
    if (latLng.lat >= 0 || latLng.lat <= 0 )
    {
      home_map.map.setZoom(16);
      home_map.map.panTo(latLng);
      closeInfoBoxes();
      infowindow.open(home_map.map, home_map.markers[mkid]);
    } else {
      console.log('Cant center')
    }

  });
  $('#backButton').on('click',function(e)
  {
    toggleMenu();
  });

  var clip = new ZeroClipboard($(".my_clip_button"));
}

function closeInfoBoxes()
{
  home_map.infoboxes.forEach(function(box)
    {
      box.close(home_map.map);
    })
}

function deleteInfoBoxes()
{
  home_map.infoboxes = [];
}
