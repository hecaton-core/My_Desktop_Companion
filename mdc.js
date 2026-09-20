//Environment
const deskPartment = document.querySelector(".desk-partment") ;
const deskWidth = deskPartment.clientWidth ;

//Resident
const resident = document.querySelector(".resident") ;
const residentWidth = resident.offsetWidth ;

//Animation
const idleSprites = [
    "mdc_assets/residents/kaya_idle_main.png",
    "mdc_assets/residents/kaya_idle_alt.png"
] ;

let idleFrame = 0 ;

function animateIdle () {
    if (residentState === "idle") {
    idleFrame = idleFrame === 0 ? 1 : 0 ;
    resident.src = idleSprites[idleFrame] ;
    }
}

const walkLeftFrames = [
    "mdc_assets/residents/kaya_walk_left_zero.png" ,
    "mdc_assets/residents/kaya_walk_left_1.png" ,
    "mdc_assets/residents/kaya_walk_left_zero.png" ,
    "mdc_assets/residents/kaya_walk_left_2.png"
] ;

let walkFrame = 0 ;
let ResidentDirection = "left" ;

function animateWalkLeft() {
    resident.src = walkLeftFrames[walkFrame] ;
    walkFrame += 1 ;

    if (walkFrame === 4) {
        walkFrame = 0;
    }
}

//Movement space
const maxX = deskWidth - residentWidth ;

//Initial state
let residentState = "idle" ;
let residentX = 600 ;
let targetX = Math.floor(Math.random() * maxX) ;

function moveResident () {
    residentState = "walking" ;

    //NOTE : about Sprite orientation and ScaleX values in next section
    //Walking Sprites are natively facing LEFT
    //But Idle Sprites are natively facing RIGHT
    //So scaleX values will be reversed between Walking and Idle states

    if (residentX < targetX) {
        residentDirection = "right" ;
        resident.style.transform = "scaleX(-1)" ;
    residentX += 1 ;
    }
    if (residentX > targetX) {
    residentDirection = "left" ;
    resident.style.transform = "scaleX(1)" ;
    residentX -= 1 ;
    }
    resident.style.left = residentX + "px" ;

    if (residentX !== targetX) {
    requestAnimationFrame(moveResident) ;
    } else {
        residentState = "idle" ;
        resident.src = "mdc_assets/residents/kaya_idle_main.png" ;

        if (residentDirection === "right") {
            resident.style.transform = "scaleX(1)" ;
        } else {
            resident.style.transform = "scaleX(-1)" ;
        }
        startIdle() ;
    }
}

function startIdle() {
    const idleTime = Math.floor(Math.random() *3000 ) +1500 ;
    setTimeout(() => {
        targetX = Math.floor(Math.random() * maxX) ;
        walkFrame = 0 ;
        resident.src = walkLeftFrames[0] ;
        moveResident() ;
    }, idleTime) ;
}

startIdle () ;
setInterval(animateIdle, 600) ;
setInterval(() => {
    if (residentState === "walking") {
        animateWalkLeft() ;
    }
}, 200) ;



