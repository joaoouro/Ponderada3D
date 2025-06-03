// Variáveis globais para a animação e interação
let angleX = 0;
let angleY = 0;
let cameraDistance = 500;
let animationSpeed = 1;
let planets = [];
let stars = [];

// Variáveis para controle da câmera
let cameraAngleX = 0;
let cameraAngleY = 0;

function setup() {
    let canvas = createCanvas(800, 600, WEBGL);
    canvas.parent('canvas-container');
    
    // Inicializar planetas com propriedades diferentes
    planets = [
        {
            distance: 150,
            size: 20,
            speed: 0.02,
            angle: 0,
            color: [255, 100, 100],
            material: 'ambient',
            tilt: 0.1
        },
        {
            distance: 220,
            size: 35,
            speed: 0.015,
            angle: PI/3,
            color: [100, 150, 255],
            material: 'specular',
            tilt: 0.2
        },
        {
            distance: 300,
            size: 25,
            speed: 0.01,
            angle: PI,
            color: [100, 255, 150],
            material: 'emissive',
            tilt: -0.15
        },
        {
            distance: 380,
            size: 30,
            speed: 0.008,
            angle: PI*1.5,
            color: [255, 200, 50],
            material: 'normal',
            tilt: 0.3
        }
    ];
    
    // Criar estrelas de fundo
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(-1000, 1000),
            y: random(-1000, 1000),
            z: random(-1000, 1000),
            brightness: random(50, 255)
        });
    }
}

function draw() {
    background(5, 5, 15);
    
    // Controle da câmera com o mouse
    cameraAngleY = map(mouseX, 0, width, -PI/4, PI/4);
    cameraAngleX = map(mouseY, 0, height, -PI/6, PI/6);
    
    // Aplicar rotação da câmera
    rotateX(cameraAngleX);
    rotateY(cameraAngleY);
    
    // Zoom com as setas do teclado
    if (keyIsPressed) {
        if (keyCode === UP_ARROW) cameraDistance = max(200, cameraDistance - 5);
        if (keyCode === DOWN_ARROW) cameraDistance = min(800, cameraDistance + 5);
    }
    
    // Aplicar zoom
    scale(400 / cameraDistance);
    
    // Desenhar estrelas de fundo
    drawStars();
    
    // Configurar iluminação múltipla
    setupLighting();
    
    // Desenhar sol central
    drawSun();
    
    // Desenhar e animar planetas
    drawPlanets();
    
    // Incrementar ângulos para animação
    angleX += 0.005 * animationSpeed;
    angleY += 0.003 * animationSpeed;
}

function drawStars() {
    // Desenhar estrelas sem iluminação
    push();
    fill(255, 255, 255, 150);
    noStroke();
    
    for (let star of stars) {
        push();
        translate(star.x, star.y, star.z);
        fill(255, 255, 255, star.brightness);
        sphere(1);
        pop();
    }
    pop();
}

function setupLighting() {
    // Luz ambiente fraca
    ambientLight(30, 30, 50);
    
    // Luz direcional principal (como luz solar)
    directionalLight(255, 255, 200, 0, 0, -1);
    
    // Luz pontual no centro (sol)
    pointLight(255, 200, 100, 0, 0, 0);
    
    // Luz pontual colorida que se move
    let lightX = cos(frameCount * 0.02) * 300;
    let lightY = sin(frameCount * 0.03) * 200;
    let lightZ = sin(frameCount * 0.01) * 150;
    pointLight(100, 200, 255, lightX, lightY, lightZ);
}

function drawSun() {
    push();
    
    // Rotação automática do sol
    rotateX(angleX);
    rotateY(angleY * 1.5);
    
    // Material emissivo para o sol
    emissiveMaterial(255, 150, 50);
    noStroke();
    
    // Sol principal
    sphere(40);
    
    // Anéis solares
    rotateX(PI/2);
    stroke(255, 200, 100, 100);
    strokeWeight(2);
    noFill();
    for (let i = 1; i <= 3; i++) {
        circle(0, 0, 80 + i * 10);
    }
    
    pop();
}

function drawPlanets() {
    for (let planet of planets) {
        push();
        
        // Rotação orbital
        rotateY(planet.angle);
        
        // Translação para a órbita
        translate(planet.distance, 0, 0);
        
        // Inclinação do planeta
        rotateZ(planet.tilt);
        
        // Rotação própria do planeta
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.02);
        
        // Aplicar material baseado no tipo
        switch(planet.material) {
            case 'ambient':
                ambientMaterial(planet.color[0], planet.color[1], planet.color[2]);
                break;
            case 'specular':
                specularMaterial(planet.color[0], planet.color[1], planet.color[2]);
                shininess(100);
                break;
            case 'emissive':
                emissiveMaterial(planet.color[0], planet.color[1], planet.color[2]);
                break;
            case 'normal':
                normalMaterial();
                break;
        }
        
        noStroke();
        
        // Desenhar planeta principal
        sphere(planet.size);
        
        // Adicionar lua para alguns planetas
        if (planet.distance > 250) {
            push();
            rotateY(frameCount * 0.05);
            translate(planet.size + 20, 0, 0);
            fill(200, 200, 200);
            ambientMaterial(150, 150, 150);
            sphere(planet.size * 0.3);
            pop();
        }
        
        pop();
        
        // Atualizar ângulo orbital
        planet.angle += planet.speed * animationSpeed;
    }
    
    // Desenhar órbitas
    drawOrbits();
}

function drawOrbits() {
    push();
    stroke(255, 255, 255, 50);
    strokeWeight(1);
    noFill();
    
    for (let planet of planets) {
        rotateX(PI/2);
        circle(0, 0, planet.distance * 2);
        rotateX(-PI/2);
    }
    pop();
}

// Interação: clique para mudar velocidade
function mousePressed() {
    if (animationSpeed === 1) {
        animationSpeed = 3;
    } else if (animationSpeed === 3) {
        animationSpeed = 0.5;
    } else {
        animationSpeed = 1;
    }
}

// Interação: teclado para zoom
function keyPressed() {
    if (key === 'r' || key === 'R') {
        // Reset da câmera
        cameraDistance = 500;
        cameraAngleX = 0;
        cameraAngleY = 0;
    }
} 