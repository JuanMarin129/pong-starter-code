// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

// Variables de dimensiones y posiciones de la pelotita
const ball = {
    x: 30,      // Eje X
    y: 30,      // Eje Y
    w: 20,      // Ancho
    h: 20,      //dd Alto
    speed: 2.5, // Velocidad
    isBallMovingRight: true, // Si es true, se mueve a la derecha. Si es false, se mueve a la izquierda.  
    isBallMovingDown: true // Si es true, se mueve hacia abajo. Si es false, hacia arriba.         
}

const paleta = {
    x: 200,    // Eje X
    y: 550,   // Eje Y
    w: 100,  // Ancho
    h: 20, // Alto
    speed: 12                 // Velocidad
}


// *** Game Functions ***

function gameLoop() {
    // console.log("ejecutando juego");
    
   movimientoPelotita()
   colisionPelotitaPared()
   colisionPaletaPelota()

}

function gameOver() {
    clearInterval(gameIntervalID);
    alert("GAME OVER!");

}

function colisionPaletaPelota() {
    if (
        ball.x < paleta.x + paleta.w &&
        ball.x + ball.w > paleta.x &&
        ball.y < paleta.y + paleta.h &&
        ball.h + ball.y > paleta.y
      ) {
        // ¡colisión detectada!
        console.log("colisionando con la paleta");
        ball.isBallMovingDown = false;
      } 
}


function movimientoPelotita() {
     // Movimiento horizontal
     
     if(ball.isBallMovingRight) {
        ball.x += ball.speed;
     }
     else {
        ball.x -= ball.speed
     }
     ballNode.style.left = `${ball.x}px`; 
 
    // Movimiento vertical
     if(ball.isBallMovingDown) {
        ball.y += ball.speed;
     }
     else {
        ball.y -= ball.speed;
     }
     ballNode.style.top = `${ball.y}px`;
}

function colisionPelotitaPared() {
    
    // Colisión Derecha
    if ((ball.x + ball.w) >= gameBoxNode.offsetWidth) {
        //console.log("COLISION!!!");
        ball.isBallMovingRight = false;
    }

    // Colisión Abajo
    if ((ball.y + ball.h) >= gameBoxNode.offsetHeight) {
        //ball.isBallMovingDown = false;
        gameOver();
    }

    // Colisión Izquierda
    if (ball.x <=0) {
        //console.log("COLISION!!!");
        ball.isBallMovingRight = true;
    }

    // Colisión Arriba
    if (ball.y <=0) {
        ball.isBallMovingDown = true;
    }

}

// *** Game Loop Interval ***

const gameIntervalID = setInterval (() => (
   gameLoop()
),1000/60)  // 60fps



// *** Event Listeners ***

window.addEventListener("keydown", (event) => {
    //console.log("presionando cualquier tecla", event);
    if (event.code === "KeyD") {
        //console.log("moviendo paleta a la derecha");
        paleta.x += paleta.speed;
        paddleNode.style.left = `${paleta.x}px`
    } else if (event.code === "KeyA") {
         //console.log("moviendo paleta a la izquierda");
         paleta.x -= paleta.speed;
         paddleNode.style.left = `${paleta.x}px`
    }
       
})


