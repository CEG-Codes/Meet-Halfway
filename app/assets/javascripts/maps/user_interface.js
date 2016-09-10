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
<<<<<<< HEAD
// <<<<<<< HEAD
//     // var start = ui.dest1.value;
//     // var end = ui.dest2.value;
//     // deleteMarkers();
//     // calcRoute(start, end, true);
//     // $('.search_box').toggle(); //toggles search box out

//     // //try appending the Results word at the top of the div through
//     // //the function
//     // $('.results_container').toggle(); //toggles results in
// =======

    if (validate_this())
=======
   if (validate_search())
>>>>>>> d2d3d061fe7d60460233a59c04e70f33c37a71f4
    {
      var start = ui.dest1.value;
      var end = ui.dest2.value;
      calcRoute(start, end, true);
    }
<<<<<<< HEAD
// >>>>>>> f74e1aa25f228062340e2ae37f66bf9a7f5248e0
=======
>>>>>>> d2d3d061fe7d60460233a59c04e70f33c37a71f4
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
};
