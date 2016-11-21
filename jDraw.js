$.fn.drawCircle = function(settings) {
    settings = $.extend({
        color: 'grey',
        stroke: 'transparent',
        strokeWeight: 1,
        position: [0,0],
        width: 20,
        height: 20
    }, settings);


    this.each(function() {

        var context = this.getContext('2d');
        context.fillStyle = settings.color;

        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;

        console.log(settings);

        w = settings.width;
        h = settings.height;
        x = parseInt(settings.position[0]);
        y = parseInt(settings.position[1]);

        console.log(x, y, w, h);

        var kappa = .5922848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        context.beginPath();
        context.moveTo(x, ym);
        context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        context.fill();
        context.stroke();
    });
};

function drawEllipseByCenter(ctx, cx, cy, w, h) {
    drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
}


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

$.fn.rotation = function() {
    var matrix = this.css('transform');
    if (matrix == 'none') {
        return 0;
    }
    var values = matrix.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var angle = Math.atan2(b, a) * (180/Math.PI);
    return (angle < 0) ? angle +=360 : angle;
};