function validate_this()
{
  //var valid_response = /\s/;
  var input1 = ui.dest1.value;
  var input2 = ui.dest2.value;
  console.log(input1, input2)

  if (input1.replace(" ", "") === "" || input2.replace(" ", "") === "")
  {
    console.log(input1.replace(" ", ""), input2.replace(" ", ""), 'false')
    return false
  } else
  {
    console.log('true')
    return true;
  }

}
