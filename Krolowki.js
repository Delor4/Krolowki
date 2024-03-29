var gf;
var pion=0;
var poziom=0;

function Szachownica() {
	this.pola = [];
	this.krolowki = [];
	for (var i = 0; i < 8; i++) {
		this.pola[i] = [];
		for (var j = 0; j < 8; j++) {
			this.pola[i][j] = 0;
		}
	}

	this.addKrolowka=function(x,y){
		if(this.pola[x][y]==1) return false;

		for(var i=0;i<8;i++) {
			this.pola[i][y]=1;
			this.pola[x][i]=1;
			if(x-i>=0 && x-i<8 && y-i>=0 && y-i<8 ) this.pola[x-i][y-i]=1;
			if(x+i>=0 && x+i<8 && y-i>=0 && y-i<8 ) this.pola[x+i][y-i]=1;
			if(x-i>=0 && x-i<8 && y+i>=0 && y+i<8 ) this.pola[x-i][y+i]=1;
			if(x+i>=0 && x+i<8 && y+i>=0 && y+i<8 ) this.pola[x+i][y+i]=1;
		}
		this.krolowki.push({x:x,y:y});
		return true;
	};
	this.clone=function(){
		var sz=new Szachownica();
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				sz.pola[i][j]=this.pola[i][j];
			}
		}
		for(var i=0;i<this.krolowki.length;i++){
			sz.krolowki.push(this.krolowki[i]);
		}
		return sz;
	};
	this.equals=function(sz){
		if(sz.krolowki.length!=this.krolowki.length) return false;
		for(var i=0;i<sz.krolowki.length;i++){
			var zg=false;
			for(var j=0;j<this.krolowki.length;j++){
				if(this.krolowki[j].x==sz.krolowki[i].x && this.krolowki[j].y==sz.krolowki[i].y){
					zg=true;
					break;
				}
			}
			if(zg==false) return false;
		}
		return true;
	}
}
function rysujSzachownice(sz,gdziex,gdziey){
	var alfabet=[["A","B","C","D","E","F","G","H","błąd"],
		["1","2","3","4","5","6","7","8","błąd"]];
	var odstep=30;
	var szerPola=30;
	var fontSize=12;
	var startx=gdziex*(szerPola*10+odstep/2)+odstep/2;
	var starty=gdziey*(szerPola*10+odstep/2)+odstep/2;
	gf.beginPath();
	gf.rect(startx,starty,szerPola*10,szerPola*10);
	gf.closePath();
	gf.fillStyle="black";
	gf.fill();

	for (var i = 0; i < 8; i++) {
		gf.strokeStyle="white";
		gf.font=fontSize+"px sans-serif";
		gf.strokeText(alfabet[0][i],startx+(i+1)*szerPola+szerPola/2-gf.measureText(alfabet[0][i]).width/2,starty+szerPola/2+fontSize/2);
		gf.strokeText(alfabet[0][i],startx+(i+1)*szerPola+szerPola/2-gf.measureText(alfabet[0][i]).width/2,starty+9*szerPola+szerPola/2+fontSize/2);
		gf.strokeText(alfabet[1][i],startx+szerPola/2-fontSize/2,starty+(8-i)*szerPola+szerPola/2+gf.measureText(alfabet[1][i]).width/2);
		gf.strokeText(alfabet[1][i],9*szerPola+startx+szerPola/2-gf.measureText(alfabet[1][i]).width/2,starty+(8-i)*szerPola+szerPola/2+fontSize/2);
		for (var j = 0; j < 8; j++) {
			gf.beginPath();
			gf.rect(startx+(i+1)*szerPola,starty+((j+1)*szerPola),szerPola,szerPola);
			gf.closePath();
			gf.fillStyle=((i+j)%2==0)?"white":"#404040";
			gf.fill();
		}

	}

	for(var i=0;i<sz.krolowki.length;i++){
		gf.beginPath();
		gf.arc(startx+(sz.krolowki[i].x+1)*szerPola+szerPola/2,((8-sz.krolowki[i].y)*szerPola)+starty+szerPola/2,szerPola/3,0,Math.PI*2);
		gf.closePath();
		gf.fillStyle="#101010";
		gf.fill();
	}
	/*już niepotrzebne, wywalam
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if(sz.pola[i][j]==1){
				gf.beginPath();
				gf.rect(startx+(i+1)*szerPola,starty+((8-j)*szerPola),szerPola,szerPola);
				gf.closePath();
				gf.fillStyle="rgba(255,255,0,0.2)";
				gf.fill();
			}
		}
	}
	*/
}
var poprzednie=[];
function czyPoprzednie(sz){
	for(var i=0;i<poprzednie.length;i++){
		if(sz.equals(poprzednie[i])) return true;
	}
	return false;
}
var gd;

function liczUstawienie(sz,il,d){
	if(gd>10) return;
	if(il==8){
		if(!czyPoprzednie(sz)) {
			poprzednie.push(sz);
		}
		return;
	}

	for(var z=d;z<64;z++){
	//for (var i = 0; i < 8; i++) {
		//for (var j = 0; j < 8; j++) {
		var i=z&7;
		var j=(z&56)>>3;
			if (sz.pola[i][j] == 0) {
				var k=sz.clone();
				if(k.addKrolowka(i,j)) liczUstawienie(k,il+1,z);
			}
		//}
	}
}
function krolowki(_pion,_poziom){
	var k=new Szachownica();
	k.addKrolowka(_pion,_poziom);

	gd=0;
	poprzednie=[];
	liczUstawienie(k,1,0);
	var odp=poprzednie.length;
	var sq=Math.sqrt(odp);
	var x=Math.ceil(sq);
	var y=Math.round(sq);

	var szerPola=30;
	var odstep=30;
	var wys=y*(szerPola*10+odstep/2)+odstep/2;
	var szer=x*(szerPola*10+odstep/2)+odstep/2;
	gf.setSize(szer,wys);
	for(var i=0;i<odp;i++){
		var xi=i%x;
		var yi=Math.floor(i/x);

		rysujSzachownice(poprzednie[i],xi,yi);
	}
}
function rePaint(){
	krolowki(pion,poziom);
}
window.onload = function () {
	gf=new DelorGraph(document.getElementById("drawingCanvas"));
	document.getElementById("pion").onchange=function(){
		pion=Number(this.value);
		rePaint();
	};
	document.getElementById("poziom").onchange=function(){
		poziom=Number(this.value);
		rePaint();
	};

	rePaint();

}
