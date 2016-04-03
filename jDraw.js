$.fn.drawCircle = function(settings) {

    settings = $.extend({
        color: 'grey',
        stroke: 'transparent',
        strokeWeight: 1,
        position: [0,0],
        radius: 10
    }, settings);

    this.each(function() {
        var context = this.getContext('2d');
        context.fillStyle = settings.color;
        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;
        context.beginPath();
        var x = parseInt(settings.radius) + parseInt(settings.position[0]);
        var y = parseInt(settings.radius) + parseInt(settings.position[1]);
        context.arc(x, y, settings.radius, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    });
};

$.fn.clearCanvas = function(newWidth, newHeight) {
    this.each(function() {
        var width = this.width;
        if (newWidth) {
            width = newWidth;
        }
        var height = this.height;
        if (newHeight) {
            height = newHeight;
        }
        this.width = width;
        this.height = height;
    })
};