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

function Confetti() {
    this.e = $('<div></div>').addClass('confetti').appendTo($('body'));
    
    this.x      = Math.random()*$(window).width();
    this.y      = -Math.floor(Math.random()*100);
    console.log(this.y);
    this.angle  = 0;
    this.rspeed = (Math.random()*10)-5;
    this.vspeed = 7;
    this.hspeed = (Math.random()*10)-5;
    this.width  = Math.random()*8 + 2 + 'px';
    this.height = Math.random()*8 + 2 + 'px';
    
    this.e.css({
        width: this.width, 
        height: this.height,
        'background-color': ['red', 'green', 'blue', 'yellow'][Math.floor(Math.random()*4)]
    });
    
    this.step = function() {
        
        this.y      += this.vspeed;
        this.x      += this.hspeed;
        this.angle  += this.rspeed;
        this.vspeed -= 0.1;
        this.hspeed -= this.hspeed/20;
        this.e.css({
            'top': this.y + 'px', 'left': this.x + 'px',
            'transform': 'rotate('+this.angle+'deg)'
        });
        
        if (this.vspeed < 4) {
            
            this.rspeed = (Math.random()*10)-5;
            this.hspeed = (Math.random()*10)-5;
            this.vspeed = 7;
            this.width  = Math.random()*8 + 2 + 'px';
            this.height = Math.random()*8 + 2 + 'px';
            
            this.e.animate({
                width: this.width,
                height: this.height,
                transform: 'rotate('+ Math.floor(Math.random()*360) + 'deg)'
            });
        }
        
        if (this.y >= $(window).height() || this.x >= $(window).width() || this.x <= 0) {
            this.e.remove();
            return false;
        }
        return true;
    };
}

function makeItRain() {
    var confAry = [];
    for (var i=0; i<10; i++) {
        confAry.push(new Confetti());
    }
    var confLoop = window.setInterval(function(e){
        for (var i=0; i<confAry.length; i++) {
            if (!confAry[i].step()) {confAry.splice(i,1); i--};
        }
    },50);
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
            $('#url-encoded').text('https://martian-cerebr4l.c9users.io/msg/' + encodeURIComponent(encode(message, 3)));
        }
        else {
            $('#url-encoded').text('Get your custom message URL');
        }
    }
    
    $('#btn-submit').on('click', submit);
    $('#msg-input').on('keypress', submit);
});