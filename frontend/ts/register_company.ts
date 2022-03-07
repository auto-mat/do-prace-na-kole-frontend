$("#fm-modal").on('click', '#id_ico', function () {
    let midVal = $('#id_ico').val();
    console.log(midVal);
});

$.get('/registrovat_spolecnost/', function(data){
    $('#fm-modal').append($(data).fadeIn());
    console.log('GET METHOD RAN')

});

// Select the target node.
var target = document.getElementById('fm-modal')
console.log('TARRGET', target)
