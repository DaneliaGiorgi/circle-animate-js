let canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');


let mouse = { 
    x: undefined,
    y: undefined
};

let maxRadius = 40;
let minRadius = 2;

let collorArr = [
    '#FF3A17',
    '#A521E8',
    '#238EFF',
    '#A2FF49',
    '#FFC022',
    '#FF23B0',
    '#FFF549'
];

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init;
})

class Circule {
    constructor( x, y, radius, xspeed, yspeed ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.color = collorArr[ Math.floor( Math.random() * collorArr.length ) ];
    }

    draw() {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, Math.PI * 2, false );
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    update() {
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.xspeed = -this.xspeed;
        };
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0 ) {
            this.yspeed = -this.yspeed;
        };
        this.x += this.xspeed;
        this.y += this.yspeed;
        
        //interactivity
        if( mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius) {
                this.radius += 1;
            } 
             else if ( this.radius > minRadius ) {
                this.radius -= 1;      
        }
        this.draw();
    }
}



let circuleArr = [];
let init = () => {
    circuleArr = [];
for ( let i = 0; i < 2000; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let radius = Math.random() * 3 + 1;
    let xspeed = ( Math.random() -0.9 ) * 4;
    let yspeed = ( Math.random() -0.9 ) * 4;
    circuleArr.push( new Circule( x, y, radius, xspeed, yspeed ) ); 
  }
};

init();

let animate = () => {
    requestAnimationFrame( animate );
    ctx.clearRect( 0, 0, innerWidth, innerHeight );
    for ( let i = 0; i < circuleArr.length; i++) {
        circuleArr[i].update();
    }
};

 animate();

