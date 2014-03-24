/// <reference path="../libs/jquery/jquery.d.ts" />

import glob = require('./Global');

export class Paper {
    
    private _paint : glob.Paint;
    private _context : CanvasRenderingContext2D;
    
    private _isDrawing = false;
    private _started = false;
    
    public canvas : HTMLCanvasElement;
    
    
    constructor(paint : glob.Paint) {

        this._paint = paint;
        
        this.canvas = <HTMLCanvasElement> this._paint.$('#paper')[0];
        this._context = this.canvas.getContext('2d');
    }
    
    getContext():CanvasRenderingContext2D {
        return this._context;
    }
    
    isDrawing():boolean {
        return this._isDrawing;
    }
    
    startDrawing():void {
        this._isDrawing = true;
        this._started = false;
        
        this._context.lineWidth = this._paint.currentPen.width;
        this._context.strokeStyle = this._paint.currentPen.brush.color;
    }
    
    draw(x:number, y:number):void {
        if (this._isDrawing) {
            var parentOffset = this._paint.$(this.canvas).parent().offset();
            
            x = x - parentOffset.left;
            y = y - parentOffset.top;
        
            if (!this._started) {
              this._context.moveTo(x, y);
              this._context.beginPath();
              this._started = true;
                
            } else {
              this._context.lineTo(x, y);
              this._context.stroke();
            }
        }
    }
    
    stopDrawing():void {
        this._isDrawing = false;
        this._context.closePath();
    }
}