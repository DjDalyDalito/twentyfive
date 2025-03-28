$(document).ready(function() {
    // Build multiple rows of the wheel
    initWheel();
    
    $('button').on('click', function(){
        var outcome = parseInt($('input').val());
        spinWheel(outcome);
    });
});

function initWheel(){
    var $wheel = $('.roulette-wrapper .wheel'),
        row = "";

    // Single row definition
    row += "<div class='row'>";
    row += "  <div class='card red'>1</div>";
    row += "  <div class='card black'>14</div>";
    row += "  <div class='card red'>2</div>";
    row += "  <div class='card black'>13</div>";
    row += "  <div class='card red'>3</div>";
    row += "  <div class='card black'>12</div>";
    row += "  <div class='card red'>4</div>";
    row += "  <div class='card green'>0</div>";
    row += "  <div class='card black'>11</div>";
    row += "  <div class='card red'>5</div>";
    row += "  <div class='card black'>10</div>";
    row += "  <div class='card red'>6</div>";
    row += "  <div class='card black'>9</div>";
    row += "  <div class='card red'>7</div>";
    row += "  <div class='card black'>8</div>";
    row += "</div>";

    // Repeat the row many times to simulate a large wheel
    for(var x = 0; x < 29; x++){
        $wheel.append(row);
    }
}

function spinWheel(roll){
    var $wheel = $('.roulette-wrapper .wheel'),
        // The order array determines the position of each number on the wheel
        order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
        position = order.indexOf(roll);

    // Distance calculations
    var rows = 12,                        // how many times we repeat
        cardWidth = 75 + (3 * 2),         // width of each card + margins
        landingPosition = (rows * 15 * cardWidth) + (position * cardWidth);

    // Slight randomness to avoid looking too predictable
    var randomize = Math.floor(Math.random() * 75) - (75/2);
    landingPosition += randomize;

    // Create a random cubic-bezier for some variety in spin
    var object = {
        x: Math.floor(Math.random() * 50) / 100,
        y: Math.floor(Math.random() * 20) / 100
    };

    // Spin the wheel with CSS transitions
    $wheel.css({
        'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
        'transition-duration':'6s',
        'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
    });

    // After 6s, reset position
    setTimeout(function(){
        $wheel.css({
            'transition-timing-function':'',
            'transition-duration':''
        });
        var resetTo = -(position * cardWidth + randomize);
        $wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
    }, 6000);
}
