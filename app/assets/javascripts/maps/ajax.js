function ajax_this(url, method, data, success, error)
{

  $.ajax({
    url: url,
    method: method,
    data: data,
    success: function(data)
    {
      console.log('success', data)
      success(data);
    },
    error: function(data)
    {
      console.log('error');
      error();
    }
  })
}
