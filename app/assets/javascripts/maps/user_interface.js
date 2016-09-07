
var ui;

$(document).ready(function()
{
  console.log('Buttons, reporting in!')
  ui = new DOM_Stuff;

});

function DOM_Stuff()
{
  this.dest1 = (document.getElementById('dest1'));
  this.dest2 = (document.getElementById('dest2'));
  this.submit = $('#destSubmitBtn');
  this.submit.on('click', function(e){
    e.preventDefault();
    var start = ui.dest1.value;
    var end = ui.dest2.value;
    calcRoute(start, end, true);
  });
}

