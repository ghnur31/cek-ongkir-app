$('select[name="origin_province"]').on('change', function() {
  let province_id = $(this).val();
  if (province_id) {
    jQuery.ajax({
      url: '/api/province/'+province_id+'/cities',
      type: "GET",
      dataType: "json",
      success:function(data) {
        $('select[name="origin_city"]').empty();
        $.each(data, function(key, value) {
          $('select[name="origin_city"]').append(`<option value="${key}"> ${value}</option>`);
        });
      }
    })   
  } else {
    $('select[name="origin_city"]').empty();
  }
});

$('#destination_city').select2({
  ajax: {
    url: '/api/cities',
    type: "POST",
    dataType: "JSON",
    delay: 150,
    data: function (params) {
      return {
        _token: $('meta[name="csrf-token"]').attr('content'),
        search: $.trim(params.term)
      }
    },
    processResults: function (response) {
      return {
        results: response
      };
    },
    cache: true
  }
});