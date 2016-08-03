function encode(str, shift) {
    if (!shift) {shift = 1}
    str = str.toString().split('');
    
    for(var i = 0, curCharCode, shfCharCode; i < str.length; i++) {
    
        curCharCode = str[i].charCodeAt(0);
        shfCharCode = curCharCode + shift;
        
        if (curCharCode >= 48 && curCharCode <= 57) { //0-9
            if (shfCharCode < 48) {shfCharCode += 10}
            else if (shfCharCode > 57) {shfCharCode -= 10}
        }
        else if (curCharCode >= 65 && curCharCode <= 90) { //A-Z
            if (shfCharCode < 65) {shfCharCode += 26}
            else if (shfCharCode > 90) {shfCharCode -= 26}
        }
        else if (curCharCode >= 97 && curCharCode <= 122) { //a-z
            if (shfCharCode < 97) {shfCharCode += 26}
            else if (shfCharCode > 122) {shfCharCode -= 26}
        }
        else { //other
            shfCharCode = curCharCode;
        }
        
        str[i] = String.fromCharCode(shfCharCode);
    }
    return str.join('');
}

function makeItRain(n) {
	
    var colors = ['red', 'yellow', 'purple', 'cyan', 'pink', 'crimson', 'hotpink', 'fuchsia']
    if (!n) {n=100}
	
    for (var i=0; i<n; i++) {
        
        var confetti = $('<div class="confetti"></div>')
        
        confetti.css({
            'left': + Math.floor($(window).width() * Math.random()) + 'px',
            'background-color' : colors[Math.floor(Math.random()*colors.length)],
            'animation' : ' confetti_fall '   + ((Math.random() * 2) + 3) + 's' + ' linear infinite,'+
                          ' confetti_rotate ' + ((Math.random() * 2) + 1) + 's' + ' linear infinite,'+
                          ' confetti_flip '   + ((Math.random() * 2) + 1) + 's' + ' linear infinite',
            'animation-delay' : Math.random()*2 + 's'
            
        })
				
        $('body').append(confetti)
    }
    
}

$('document').ready(function() {
    
    $('#btn-animate').on('click', function(e) {
        
        /* Audio */
        var fanfareAudio = document.getElementById('fanfare');
        fanfareAudio.currentTime = 150;
        fanfareAudio.volume = 0.20;
        fanfareAudio.play();
        
        /* Animation */
        $(this).animate({
            opacity: 0,
        }, 200, function() {
            $(this).hide();
            $('#res-text').animate({
                opacity: 1,
                top: '35%'
            }, 400);
        });
        
        makeItRain();
    });
    
    $('#open-menu').on('click', function(e) {
        $('.menu').css({'display': 'inherit'});
        $('#open-menu').css({'display': 'none'});
    });
    
    $('#close').on('click', function(e) {
        $('.menu').css({'display': 'none'});
        $('#open-menu').css({'display': 'inherit'});
    });
    
    function submit(e) {
        if (e.type != 'click' && e.which != 13) {return;}
        var message = $('#msg-input').val();
        if (message) {
            $('#url-encoded').text('https://mehssager.herokuapp.com/msg/' + encodeURIComponent(encode(message, 3)));
        }
        else {
            $('#url-encoded').text('Get your custom message URL');
        }
    }
    
    $('#btn-submit').on('click', submit);
    $('#msg-input').on('keypress', submit);
});