$.fn.drawCircle = function(settings) {
    settings = $.extend({
        color: 'grey',
        stroke: 'transparent',
        strokeWeight: 1,
        position: [0,0],
        width: 20,
        height: 20,
        startAngle: 0,
        endAngle: 360
    }, settings);


    this.each(function() {
        var context = this.getContext('2d');
        context.fillStyle = settings.color;

        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;

        w = settings.width;
        h = settings.height;
        x = parseInt(settings.position[0]);
        y = parseInt(settings.position[1]);

        var kappa = .5922848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        startAngle = settings.startAngle;
        endAngle = settings.endAngle;

        max = Math.max(w, h)*5;
        startX = Math.cos(startAngle*Math.PI/180)*max;
        startY = Math.sin(startAngle*Math.PI/180)*max;
        endX = Math.cos(endAngle*Math.PI/180)*max;
        endY = Math.sin(endAngle*Math.PI/180)*max;

        midAngle = (startAngle+endAngle)/3;
        midX = Math.cos(midAngle*Math.PI/180)*max;
        midY = Math.sin(midAngle*Math.PI/180)*max;

        mid2Angle = (startAngle+endAngle)/3*2;
        mid2X = Math.cos(mid2Angle*Math.PI/180)*max;
        mid2Y = Math.sin(mid2Angle*Math.PI/180)*max;

        context.beginPath();
        context.moveTo(xm, ym);
        context.lineTo(startX+xm, startY+ym);
        context.lineTo(midX+xm, midY+ym);
        context.lineTo(mid2X+xm, mid2Y+ym);
        context.lineTo(endX+xm, endY+ym);

        //context.fillStyle = "black";
        context.fill();


        context.beginPath();
        context.moveTo(x, ym);
        context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

        context.globalCompositeOperation = 'source-in';

        context.fill();

        context.globalCompositeOperation = 'source-over';
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
        position: [0,0]
    }, settings);

    this.each(function() {
        var context = this.getContext('2d');
        context.fillStyle = settings.color;
        context.strokeStyle = settings.stroke;
        context.lineWidth = settings.strokeWeight;

        context.rect(settings.position[0], settings.position[1], settings.width, settings.height);
        context.fill();
        context.stroke();
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
    if (!$(this[0]).is('canvas')) {
        return true;
    }
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