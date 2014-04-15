import glob = require('../../classes/Global');


class PaperPosition {
    public EXTENSION_NAME: string = "com.paintjs.PaperPosition";
    paint: glob.Paint;
    private indicator: HTMLElement;

    public constructor(paint: glob.Paint) {
        this.paint = paint;
    }

    init() {
        this.indicator = this.paint.barManager.addTextIndicatorItem("extensions/PaperCoordinates/PaperPosition.png", 0, false);
    }
    
    onPaperMouseEnter(pt) {
        var $ = this.paint.$;
        
        $(this.indicator).show();
    }
    
    onPaperMouseMove(pt) {
        var $ = this.paint.$;
                
        $(this.indicator).html(pt.X + " &times; " + pt.Y + "px");
    }
    
    onPaperMouseLeave(pt) {
        var $ = this.paint.$;
        
        $(this.indicator).hide();        
    }
}

class PaperSize {
    public EXTENSION_NAME: string = "com.paintjs.PaperSize";
    paint: glob.Paint;
    private indicator: HTMLElement;

    public constructor(paint: glob.Paint) {
        this.paint = paint;

    }

    init() {
        this.indicator = this.paint.barManager.addTextIndicatorItem("extensions/PaperCoordinates/PaperSize.png", 0, false);
        this.onResize();
    }

    onResize() {
        var $ = this.paint.$;
        var baseCanvas = this.paint.currentPaper.baseLayer.canvas;

        $(this.indicator).html(baseCanvas.width + " &times; " + baseCanvas.height + "px");
    }
}

exports.Extensions = new Array();
exports.Extensions.push(PaperPosition);
exports.Extensions.push(PaperSize);