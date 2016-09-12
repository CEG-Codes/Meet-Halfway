function validate_search()
{
  var reg = /\s/ig; //reg ex, all whitespace
  var input1 = ui.dest1.value.replace(reg, "");
  var input2 = ui.dest2.value.replace(reg, "");
  if (input1 == "" || input2 == "")
  {
    resetErrorFlash();
    if (input1 == "")
    {
      $('#textFlash1').text('Please Enter a Valid Location')
    }

    if (input2 == "")
    {
      $('#textFlash2').text('Please Enter a Valid Location')
    }
    return false
  } else if (input1 == input2)
  {
    $('#textFlash1').text('Step out the door. You\'re there.');
    return false
  } else
  {
    return true;
  }


}

function resetErrorFlash()
{
  $('#textFlash1').text('')
  $('#textFlash2').text('')
  $('#textFlash3').text('')
}
