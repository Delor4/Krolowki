/**
 * Created by Delor on 2015-03-23.
 */


function DelorGraph(_cs) {

    this.canvas=null;
    this.context=null;

    //bindowanie canvasu do obiektu
    this.setCanvas = function(cs){
        if(_cs===undefined || _cs===null) return;

        this.canvas=cs;
        //dane z canvas
        this.width=this.canvas.width;
        this.height=this.canvas.height;

        this.context=this.canvas.getContext("2d");

        //dane z context
        this.fillStyle=this.context.fillStyle;//ok
        this.font=this.context.font;//ok
        this.globalAlpha=this.context.globalAlpha;
        this.globalCompositeOperation=this.context.globalCompositeOperation;
        this.imageSmoothingEnabled=this.context.imageSmoothingEnabled;
        this.lineCap=this.context.lineCap;
        this.lineDashOffset=this.context.lineDashOffset;
        this.lineJoin=this.context.lineJoin;
        this.lineWidth=this.context.lineWidth;
        this.miterLimit=this.context.miterLimit;
        this.shadowBlur=this.context.shadowBlur;
        this.shadowColor=this.context.shadowColor;
        this.shadowOffsetX=this.context.shadowOffsetX;
        this.shadowOffsetY=this.context.shadowOffsetY;
        this.strokeStyle=this.context.strokeStyle;//ok
        this.textAlign=this.context.textAlign;
        this.textBaseline=this.context.textBaseline;
        //funkcje z context
        this.arc=function(a,b,c,d,e,f){return this.context.arc(a,b,c,d,e,f);};
        this.arcTo=function(a,b,c,d,e){return this.context.arcTo(a,b,c,d,e)};
        this.beginPath=function(){return this.context.beginPath();};
        this.bezierCurveTo=function(a,b,c,d,e,f){return this.context.bezierCurveTo(a,b,c,d,e,f)};
        this.clearRect=function(a,b,c,d){return this.context.clearRect(a,b,c,d);};
        this.clip=function(){return this.context.clip()};
        this.closePath=function(){return this.context.closePath();};
        this.createImageData=function(a){return this.context.createImageData(a)};
        this.createLinearGradient=function(a,b,c,d){return this.context.createLinearGradient(a,b,c,d)};
        this.createPattern=function(a,b){return this.context.createPattern(a,b)};
        this.createRadialGradient=function(a,b,c,d,e,f){return this.context.createRadialGradient(a,b,c,d,e,f);};
        this.drawFocusIfNeeded=function(a){return this.context.drawFocusIfNeeded(a)};
        this.drawImage=function(a,b,c){return this.context.drawImage(a,b,c);};
        this.ellipse=function(a,b,c,d,e,f,g){return this.context.ellipse(a,b,c,d,e,f,g)};
        this.fillRect=function(a,b,c,d){
            this.context.fillStyle=this.fillStyle;
            return this.context.fillRect(a,b,c,d)};
        this.fillText=function(a,b,c){
            this.context.fillStyle=this.fillStyle;
            this.context.font=this.font;
            return this.context.fillText(a,b,c);};
        this.fill=function(){
            this.context.fillStyle=this.fillStyle;
            return this.context.fill();};
        this.getContextAttributes=function(){return this.context.getContextAttributes()};
        this.getImageData=function(a,b,c,d){return this.context.getImageData(a,b,c,d);};
        this.getLineDash=function(){return this.context.getLineDash()};
        this.isPointInPath=function(a,b){return this.context.isPointInPath(a,b)};
        this.isPointInStroke=function(a,b){return this.context.isPointInStroke(a,b)};
        this.lineTo=function(a,b){return this.context.lineTo(a,b);};
        this.measureText=function(a){
            this.context.font=this.font;
            return this.context.measureText(a)};
        this.moveTo=function(a,b){return this.context.moveTo(a,b);};
        this.putImageData=function(a,b,c){return this.context.putImageData(a,b,c);};
        this.quadraticCurveTo=function(a,b,c,d){return this.context.quadraticCurveTo(a,b,c,d)};
        this.rect=function(a,b,c,d){return this.context.rect(a,b,c,d);};
        this.resetTransform=function(){return this.context.resetTransform()};
        this.restore=function(){return this.context.restore();};
        this.rotate=function(a){return this.context.rotate(a);};
        this.save=function(){return this.context.save();};
        this.scale=function(a,b){return this.context.scale(a,b);};
        this.setLineDash=function(a){return this.context.setLineDash(a)};
        this.setTransform=function(a,b,c,d,e,f){return this.context.setTransform(a,b,c,d,e,f)};
        this.strokeRect=function(a,b,c,d){
            this.context.strokeStyle=this.strokeStyle;
            return this.context.strokeRect(a,b,c,d)};
        this.strokeText=function(a,b,c){
            this.context.strokeStyle=this.strokeStyle;
            this.context.font=this.font;
            return this.context.strokeText(a,b,c);};
        this.stroke=function(){
            this.context.strokeStyle=this.strokeStyle;
            return this.context.stroke();};
        this.transform=function(a,b,c,d,e,f){return this.context.transform(a,b,c,d,e,f)};
        this.translate=function(a,b){return this.context.translate(a,b);};

        //reszta
        this.getCanvas = function(){
            return this.canvas;
        };
        this.getContext = function(){
            return this.context;
        };
        //Tryb punktowy
        this.pointMode=false;
        this.startPointMode = function(){
            this._width=this.canvas.width;
            this._height=this.canvas.height;
            this.imageData = this.context.getImageData(0, 0, this._width, this._height);
            this.data = this.imageData.data;
            this.pointMode=true;
        };
        this.endPointMode = function(){
            if(this.pointMode){
                this.context.putImageData(this.imageData,0, 0);
                this.pointMode=false;
                this.imageData=null;
                this.data=null;
            }
        };
        this.drawPoint = function(x,y,r,g,b,a){
            if(this.pointMode){
                if(x<0 || x>this._width || y<0 || y>this._height) return;
                var z=4*(Math.floor(x)+(Math.floor(y)*this._width));
                this.data[z++]=r;
                this.data[z++]=g;
                this.data[z++]=b;
                this.data[z++]=a;
            }
        };
        this.getPoint = function(x,y){
            if(this.pointMode){
                if(x<0 || x>this._width || y<0 || y>this._height) return {r:0,g:0,b:0,a:0};
                var z=4*(Math.floor(x)+(Math.floor(y)*this._width));
                if(this.data[z+3]==0) return {r:255,g:255,b:255,a:0};
                return {r:this.data[z],g:this.data[z+1],b:this.data[z+2],a:this.data[z+3]};
            }
        };
        this.drawLine = function(x1,y1,x2,y2,r,g,b,a){
            if(this.pointMode){
                //tu dopisać rysowanie linii z punktów

            }else{
                this.moveTo(x1,y1);
                this.lineTo(x2,y2);
            }

        };
        this.invRect = function(x1,y1,_width,_height){
            if(this.pointMode){
                var p;
                if(_width<0){
                    x1+=_width;
                    _width=-_width;
                }
                if(_height<0){
                    y1+=_height;
                    _height=-_height;
                }
                for(var x=x1;x<=((x1+_width));x++){
                    p=this.getPoint(x,y1);
                    this.drawPoint(x,y1, 255-p.r, 255-p.g, 255-p.b, 255);
                    p=this.getPoint(x,y1+_height);
                    this.drawPoint(x,y1+_height, 255-p.r, 255-p.g, 255-p.b, 255);
                }
                for(var y=y1+1;y<=((y1+_height)-1);y++){
                    p=this.getPoint(x1,y);
                    this.drawPoint(x1,y, 255-p.r, 255-p.g, 255-p.b, 255);
                    p=this.getPoint(x1+_width,y);
                    this.drawPoint(x1+_width,y, 255-p.r, 255-p.g, 255-p.b, 255);
                }

            }

        };
        //this.drawElipse;
        //this.drawArcElipse;
        this.circle=function(a,b,c){this.context.arc(a,b,c,0,2*Math.PI);};

        //ustawianie wielkości okna
        this.setWidth = function(w){
            //if(!this.pointMode)
            {
                this.canvas.width=w;
                this.width=this.canvas.width;
            }
        };
        this.setHeight = function(h){
            //if(!this.pointMode)
            {
                this.canvas.height=h;
                this.height=this.canvas.height;
            }
        };
        this.setSize=function(w,h){
            this.setWidth(w);
            this.setHeight(h);
        }

    };
    this.bindCanvas = this.setCanvas;

    this.setCanvas(_cs);
}