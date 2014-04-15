import glob = require('./Global');
import point = require('./Point');

export class EventEmitter {
    
    public static paint : glob.Paint;
    
    /**
     * Get the list of extensions on which trigger some events
     */
    static getExtensionList(list) {
        
        var l = new Array();
        
        if (!list) { 
            var extList = this.paint.Extensions;
            for (var ext in extList) {
                if (extList.hasOwnProperty(ext))
                    l.push(extList[ext]);
            }
        } else if (list.contructor === Array)
          
            l = list;
        
        else 
            l = [list];
        
        return l;
    }
    
    static triggerOnStartDrawing(pt : point.Point, dest) {
        
        var list = this.getExtensionList(dest),
            paint = this.paint;
        
        this.triggerForEach(list, function(ext) {
            if (ext.onStartDrawing) {
                ext.drawing = true;
                ext.onStartDrawing(paint.currentPaper, pt); 
            }
        });
    }
    
    /**
     * get triggere when click on Paper
     */
    static triggerOnPaperClick(pt : point.Point, dest) {
        
        var list = this.getExtensionList(dest);
        
        this.triggerForEach(list, function(ext) {
            if (ext.onPaperClick)
                ext.onPaperClick(pt);
        });
    }
    
    static triggerOnZoom(dest) {
        
       var list = this.getExtensionList(dest);
       
       this.triggerForEach(list, function (ext) {
            if (ext.onZoom) {
                ext.onZoom();
            }
        });
    }

    static triggerForEach(list, callback) {
        list.forEach(callback);
    }
}