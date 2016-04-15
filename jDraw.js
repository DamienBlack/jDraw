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
        position: [0,0],
        rotation: 0
    }, settings);

    this.each(function() {
        var context = this.getContext('2d');
        context.fillStyle = settings.color;
        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;

        var rotation = settings.rotation;
        var halfWidth = settings.width/2;
        var halfHeight = settings.height/2;
        var widthA = Math.abs(halfWidth*Math.cos(-rotation*Math.PI/180) - halfHeight*Math.sin(-rotation*Math.PI/180)) * 2;
        var widthB = Math.abs(halfWidth*Math.cos(rotation*Math.PI/180) - halfHeight*Math.sin(rotation*Math.PI/180)) * 2;
        var width = Math.max(widthA, widthB);
        var heightA = Math.abs(halfHeight*Math.cos(-rotation*Math.PI/180) + halfWidth*Math.sin(-rotation*Math.PI/180)) * 2;
        var heightB = Math.abs(halfHeight*Math.cos(rotation*Math.PI/180) + halfWidth*Math.sin(rotation*Math.PI/180)) * 2;
        var height = Math.max(heightA, heightB);

        var additionX = (width - settings.width)/2;
        var translateX = additionX + halfWidth;
        var additionY = (height - settings.height)/2;
        var translateY = additionY + halfHeight;

        context.translate(translateX+settings.position[0], translateY+settings.position[1]);
        context.rotate(settings.rotation*Math.PI/180);
        context.rect(additionX-translateX, additionY-translateY, settings.width, settings.height);
        context.fill();
        context.stroke();
        context.setTransform(1, 0, 0, 1, 0, 0);
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
            var halfHeight = height/2;
            var widthA = Math.abs(halfWidth*Math.cos(-rotation*Math.PI/180) - halfHeight*Math.sin(-rotation*Math.PI/180)) * 2;
            var widthB = Math.abs(halfWidth*Math.cos(rotation*Math.PI/180) - halfHeight*Math.sin(rotation*Math.PI/180)) * 2;
            width = Math.max(widthA, widthB);
            var heightA = Math.abs(halfHeight*Math.cos(-rotation*Math.PI/180) + halfWidth*Math.sin(-rotation*Math.PI/180)) * 2;
            var heightB = Math.abs(halfHeight*Math.cos(rotation*Math.PI/180) + halfWidth*Math.sin(rotation*Math.PI/180)) * 2;
            height = Math.max(heightA, heightB);
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
};