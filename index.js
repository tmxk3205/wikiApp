function ajaxCall() {
  $.ajax({
    url:
      'https://wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' +
      $('#search').val(),
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) {
      $('#update').empty();
      var data = JSON.stringify(data);
      data = JSON.parse(data);
      //look through data and output
      var output = '';
      data.query.search.forEach(data => {
        var title = '<h2>' + data.title + '</h2>' + '<br>';
        var snippet = '<p>' + data.snippet + '</p>';
        var url =
          '<a href="https://en.wikipedia.org/wiki/' +
          data.title +
          '"target=_blank">';
        var endUrl = '</a>';
        output += url + title + endUrl + snippet + '<hr>';
      });
      $('#update').append(output);
    }
  });
}

function randomFunction() {
  $('#update').empty();
  $('.search').empty();
  $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {
  $('#search').focus();
  $('#search').off('keyup');
  $('#search').on('keyup', () => {
    ajaxCall();
    $('iframe').attr('src', '');
  });
  $('.random').on('click', () => {
    $('.random').text('Show me another one!');
    randomFunction();
  });
});
