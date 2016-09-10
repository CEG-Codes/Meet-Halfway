function validate_this()
{
  var valid_response = /\s/;
  var input1 = ui.dest1.value;
  var input2 = ui.dest2.value;
  console.log(ui.dest1.value, ui.dest2.value)

  if (input1.substr(' ', '') == "" || input2.substr(' ', '') == "")
  {
    return false
  } else
  {
    return true;
  }

}
