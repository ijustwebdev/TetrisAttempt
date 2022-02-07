const playfieldID = document.getElementById("playfield")
let playFieldArr = []
let spawnPoint = 3
let currentPieceLocation = []
let gravityOn = false
let logicBoard = []
let logicArr = []
let gravityValue = 1000
let gravity 



// function to create 200 squares since our play area is 10 x 20 squares
function createPlayfieldGrid(){
    // create 200 divs with the class of "square" and add them to our array
    for (let i = 0; i < 200; i++){
        let square = document.createElement("div")
        square.classList.add("square")
        square.id = i
        playFieldArr.push(square)
    }
    // take each square from our array and add it to the document
    for (let i = 0; i < playFieldArr.length; i++){
        //! DEBUG: Populate each div square with their corresponding number
        playFieldArr[i].innerText = i
        //! DEBUG 
        playfieldID.appendChild(playFieldArr[i])
    }
}
createPlayfieldGrid()

// Create the board where logic checks will take place and data will be stored
// TODO: the logicboard should mirror the playfield and be updated in sync with each interval
function createLogicBoard(){
    for (let o = 0; o < 20; o++){
        for (let i = 0; i < 10; i++){
            logicArr.push(0)
        }
        logicBoard.push(logicArr)
        logicArr = []
    }
}
createLogicBoard()

// updateLogicBoard(){
//     for(let i = 0; i < currentPieceLocation.length; i++){
//         // set the index of the logicBoard[] equal to the index of currentPieceLocation[]'s values
//         // is if currentPieceLocation = [68,77,78,79] then logicBoard[68,77,78,79] should = 1
//     }
// }

// create objects for each piece that will contain data on what square should be filled. 
function Piece() {
    this.shapeB = shapeB
    this.shapeR = shapeR
    this.shapeU = shapeU
    this.shapeL = shapeL
    this.color = color
    this.currentRotation = currentRotation

}

const tPiece = new Piece(
    shapeB = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,1,0],
        [0,1,1,1]
    ],
    shapeR = [
        [0,0,0,0],
        [0,0,0,1],
        [0,0,1,1],
        [0,0,0,1]
    ],
    shapeU = [
        [0,0,0,0],
        [0,1,1,1],
        [0,0,1,0],
        [0,0,0,0]
    ],
    shapeL = [
        [0,0,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0]
    ],
    color = "rgba(160, 0, 240, 1)",
    currentRotation = shapeB
)
// TODO: Add piece randomization
currentPiece = tPiece

// TODO: Add piece rotation
// function rotatePieceRight(piece){
//     //* get the piece's current rotation = an array 0-3 with 0 being shapeB so that we can + or - 1 to draw the new shape orientation
//     //* rotate the piece and check for collisions before actually removing or drawing the new rotated piece
//     //* check to make sure we can rotate
//     //? check if we cant rotate in place but our piece could be moved one square over and rotated
//     //* remove the previous piece
//     //* draw new piece

// }

// We need to check each of the shape[][][] indexes and if they are 1 color our div with the shape's color beginning at playfieldArr[3]
// This is so we don't spawn pieces below the top row
// The found bool lets us spawn the piece at the top row by not accounting for the "empty" lines/arrays in our objects containing an array of 0s and no 1s
function spawnPieceCoords(piece){
    let found = false
    for(let i = 0; i < piece.shapeB.length; i++){
        let shapeInnerArray = piece.shapeB[i]
        for(let o = 0; o < shapeInnerArray.length; o++){
            if(shapeInnerArray[o] === 1){
                found = true
                currentPieceLocation.push(o + spawnPoint)
            }
        }
            if(found){
                spawnPoint += 10
            }  
    }
    // Reset the spawnPoint after we assign the coords
    spawnPoint = 3
}
spawnPieceCoords(tPiece)

function drawNewPiece(){
        for(let i = 0; i < currentPieceLocation.length; i++){
        playFieldArr[currentPieceLocation[i]].style.backgroundColor = tPiece.color
    }
}
drawNewPiece()

function clearPreviousPiece(){
    for(let i = 0; i < currentPieceLocation.length; i++){
        playFieldArr[currentPieceLocation[i]].style.backgroundColor = "black"
    }
}

// TODO: implement piece holding
// function holdPiece(){}
// grab the current piece's coordinates and color
// draw this in our tiny hold window
// if holding a piece spawn that piece at the held piece's coordinate point

function movePieceDown(){
    let able = true
    for(let i = 0; i < currentPieceLocation.length; i++){
        let nextLoc = currentPieceLocation[i] + 10
        // TODO: also check to make sure we're not only within the playfield but also not trying to move into another filled piece
        if(nextLoc <= 199){
            able = true
        }
        else if(nextLoc >= 200){
            able = false
        }
    }
    if(able){
        clearPreviousPiece()
        for(let i = 0; i < currentPieceLocation.length; i++){
            currentPieceLocation[i] += 10
        }
    }
    else if(!able){
        // Assign currentPieceLocation to our new piece since our movement controls modify currentPieceLocation
        currentPieceLocation = []
        spawnPieceCoords(tPiece)
        //? should probably check if any line is full on our logicboard in this else if statement 
    }
    drawNewPiece()
}

function movePieceLeft(){
    let able = true
    let currentLeftIndex = getSmallest(currentPieceLocation)
    for(let i = 0; i < currentPieceLocation.length; i++){
        if(currentLeftIndex != 0){
            able = true
        }
        else if(currentLeftIndex === 0){
            able = false
        }
    }
    if(able){
        clearPreviousPiece()
        for(let i = 0; i < currentPieceLocation.length; i++){
            currentPieceLocation[i] -= 1
        }
        drawNewPiece()
    }
}

function movePieceRight(){
    let able = true
    let currentRightIndex = getLargest(currentPieceLocation)
    for(let i = 0; i < currentPieceLocation.length; i++){
        if(currentRightIndex != 9){
            able = true
        }
        else if (currentRightIndex === 9){
            able = false
        }
    }
    if(able){
        clearPreviousPiece()
        for(let i = 0; i < currentPieceLocation.length; i++){
            currentPieceLocation[i] += 1
        }
        drawNewPiece()
    }
}

// TODO: update the logicboard so our piece takes up space in the logicboard by flipping indexes to 1 on entry and 0 on exit

// This function will turn the "gravity" on that automatically pulls pieces downards by calling movePieceDown in intervals
// ! FLAW: You cannot turn gravity off or alter it once you've turned it on, this is a limitation of this implementation
function enableGravity(){
    gravity = setInterval(movePieceDown, gravityValue)
    console.log("Gravity has been enabled at " + gravityValue)
}
//! VESTIGIAL: Does not function due to the above flaw.
// function makeGravityFaster(){
//     clearInterval(gravity)
//     gravityValue -= 100
//     setInterval(movePieceDown, gravityValue)
//     console.log("Gravity has been set to " + gravityValue)
// }

// Function that will return the smallest first digit of the array so we can check it against 0 to make sure our pieces do not move off the board left
function getSmallest(inputArr){
    let currentValue = 0
    let holder = 9
    let returnVal = 0
    for(let i = 0; i < inputArr.length; i++){
        // ex: currentValue when calling getSmallest on [62, 71, 72, 73] should be = 1 
        currentValue = inputArr[i] % 10
        if(currentValue < holder){
            holder = currentValue
            returnVal = currentValue
        }
    }
    return(returnVal)
}

// Similar to getSmallest but returns the largest first digit
function getLargest(inputArr){
    let currentValue = 0
    let holder = 0
    let returnVal = 0
    for(let i = 0; i < inputArr.length; i++){
        currentValue = inputArr[i] % 10
        if(currentValue > holder){
            holder = currentValue
            returnVal = currentValue
        }
    }
    return(returnVal)
}

document.getElementById("buttonDown").addEventListener("click", movePieceDown)
document.getElementById("buttonLeft").addEventListener("click", movePieceLeft)
document.getElementById("buttonRight").addEventListener("click", movePieceRight)
document.getElementById("gravity").addEventListener("click", enableGravity)
document.getElementById("rotateRight").addEventListener("click", rotatePieceRight(currentPiece))
// document.getElementById("rotateLeft").addEventListener("click", rotatePieceLeft)



//! DEBUG STATEMENT
//console.log(currentPieceLocation)
//! DEBUG STATEMENT



//! DEBUG STATEMENT
console.log(logicBoard) 
//! DEBUG STATEMENT
