var cvs = document.getElementById("dango");
var ctx = cvs.getContext("2d");
var box = 35;
var d;
var dango = [];
var game = setInterval(draw,100);

var dangoRosa = new Image();
dangoRosa.src = './assets/images/dangoRosa.png';

var dangoBranco = new Image();
dangoBranco.src = './assets/images/dangoBranco.png';

var foodImg = new Image();
foodImg.src = './assets/images/dangoVerde.png';

var food = {
    x : Math.floor(Math.random()*22+1) * box,
    y : Math.floor(Math.random()*14+1) * box
}

dango[0] = {
    x : 10 * box,
    y : 10 * box
};

document.addEventListener("keydown",direcao);

function direcao(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function collision(head,array){
    for(var i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){    
    ctx.fillStyle = "#D8BFD8";
    ctx.fillRect(0,0,cvs.width,cvs.height);        

    for( i = 0; i < dango.length ; i++){

        ctx.drawImage((i === 0) ? dangoRosa : dangoBranco, dango[i].x, dango[i].y, box, box);
    } 
    
        ctx.drawImage(foodImg, food.x, food.y, box, box);
    
    var dangoX = dango[0].x;
    var dangoY = dango[0].y;    
    
    if( d == "LEFT")  dangoX -= box;
    if( d == "UP")    dangoY -= box;
    if( d == "RIGHT") dangoX += box;
    if( d == "DOWN")  dangoY += box;    
    
    if(dangoX == food.x && dangoY == food.y){        
        food = {
            x : Math.floor(Math.random()*22+1) * box,
            y : Math.floor(Math.random()*14+1) * box
        }
    }else{
        dango.pop();
    }    

    var newHead = {
        x : dangoX,
        y : dangoY
    }    

    if (dangoX < 0 || dangoX >= cvs.width || dangoY < 0 || dangoY >= cvs.height || collision(newHead, dango)) {
        clearInterval(game);
    }

    dango.unshift(newHead);

}