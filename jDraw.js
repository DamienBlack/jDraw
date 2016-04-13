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

$.fn.drawRectangle = function(settings) {
    settings = $.extend({
        color: 'grey',
        stroke: 'transparent',
        width: 10,
        height: 10,
        position: [0,0]
    }, settings);

    console.log(settings.width, settings.height);

    this.each(function() {
        var context = this.getContext('2d');
        context.fillStyle = settings.color;
        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;
        context.rect(settings.position[0], settings.position[1], settings.width, settings.height);
        context.fill()
        context.stroke()
    })
};

$.fn.clearCanvas = function(newWidth, newHeight, rotation) {
    this.each(function() {
        var width = this.width;
        if (newWidth) {
            width = newWidth;
        }
        var height = this.height;
        if (newHeight) {
            height = newHeight;
        }

        if (rotation) {
            var halfWidth = width/2;
            var halfHeight = width/2;
            var width = (halfWidth*Math.cos(rotation*Math.PI/2) + halfHeight*Math.sin(rotation*Math.PI/2)) * 2;
            var height = (halfHeight*Math.cos(rotation*Math.PI/2) + halfWidth*Math.sin(rotation*Math.PI/2)) * 2;
        }

        this.width = width;
        this.height = height;
    })
};

$.fn.hasPixel = function(x, y) {
    var context = this[0].getContext('2d');
    var pixel = context.getImageData(x, y, 1, 1).data;
    if (pixel[3] == 0) {
        return false;
    } else {
        return true;
    }
}