var pieceSelected
var previousPieceSelected
var typePieceSelected
var actualPosition
var actualRow
var actualColumn
let possibleMoves

function removeValidMove() {
  var item = document.getElementsByClassName('cell-valid')
  while (item[0]) {
    item[0].classList.remove('cell-valid')
  }
}

function getFocusPiece(event) {
  pieceSelected = event
  removeValidMove()
  previousPieceSelected = pieceSelected
}

function getFocusPiecePossibleMoves() {
  possibleMoves = []
  typePieceSelected = pieceSelected.target.classList[2]
  switch (typePieceSelected) {
    case 'fa-chess-pawn':
      checkValidMovePawn(pieceSelected)
      break

    case 'fa-chess-rook':
      checkValidMoveRook(pieceSelected)
      break

    case 'fa-chess-knight':
      checkValidMoveKnight(pieceSelected)
      break

    case 'fa-chess-bishop':
      checkValidMoveBishop(pieceSelected)
      break

    case 'fa-chess-king':
      checkValidMoveKing(pieceSelected)
      break

    case 'fa-chess-queen':
      checkValidMoveQueen(pieceSelected)
      break
  }
}

function getFocusPiecePosition() {
  actualPosition = pieceSelected.target.parentNode.id
  let rowcol = actualPosition.split('-')
  actualRow = +rowcol[0]
  actualColumn = +rowcol[1]
}

// Piece Moves
function checkValidMovePawn() {
  let newRowPosition = actualRow - 1
  let positionValidMove =
    newRowPosition.toString() + '-' + actualColumn.toString()
  document
    .getElementById(positionValidMove.toString())
    .classList.add('cell-valid')
}

function checkValidMoveKing() {
  const moveLimit = 1
  orizontalMove(moveLimit)
  verticalMove(moveLimit)
  diagonalMove(moveLimit)
}

function checkValidMoveQueen() {
  const moveLimit = 7
  orizontalMove(moveLimit)
  verticalMove(moveLimit)
  diagonalMove(moveLimit)
}

function checkValidMoveRook() {
  const moveLimit = 7
  orizontalMove(moveLimit)
  verticalMove(moveLimit)
}

function checkValidMoveBishop() {
  const moveLimit = 7
  diagonalMove(moveLimit)
}

function checkValidMoveKnight() {
  const arr1 = [-2, 2]
  const arr2 = [-1, 1]

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      let newRow = actualRow + arr1[i]
      let newCol = actualColumn + arr2[j]
      if (!isDirectionNotValid(newRow, newCol)) {
        possibleMoves.push(createPossibleMoveId(newRow, newCol))
      }

      newRow = actualRow + arr2[j]
      newCol = actualColumn + arr1[i]
      if (!isDirectionNotValid(newRow, newCol)) {
        possibleMoves.push(createPossibleMoveId(newRow, newCol))
      }
    }
  }
  highlightValidMoves(possibleMoves)
}

// Move Types
function verticalMove(moveLimit) {
  checkTopMoves(moveLimit)
  checkBottomMoves(moveLimit)
}

function diagonalMove(moveLimit) {
  checkTopLeftMoves(moveLimit)
  checkBottomLeftMoves(moveLimit)
  checkBottomRightMoves(moveLimit)
  checkTopRightMoves(moveLimit)
}

function orizontalMove(moveLimit) {
  checkRightMoves(moveLimit)
  checkLeftMoves(moveLimit)
}

function checkBottomMoves(moveLimit) {
  let newCol = actualColumn
  for (let r = 1; r <= moveLimit; r++) {
    let newRow = actualRow - r
    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkTopMoves(moveLimit) {
  let newCol = actualColumn
  for (let r = 1; r <= moveLimit; r++) {
    let newRow = actualRow + r
    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkLeftMoves(moveLimit) {
  let newRow = actualRow
  for (let c = 1; c <= moveLimit; c++) {
    let newCol = actualColumn - c
    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkRightMoves(moveLimit) {
  let newRow = actualRow
  for (let c = 1; c <= moveLimit; c++) {
    let newCol = actualColumn + c
    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkTopRightMoves(moveLimit) {
  for (let i = 1; i <= moveLimit; i++) {
    let newRow = actualRow - i
    let newCol = actualColumn + i

    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkBottomRightMoves(moveLimit) {
  for (let i = 1; i <= moveLimit; i++) {
    let newRow = actualRow + i
    let newCol = actualColumn - i

    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkBottomLeftMoves(moveLimit) {
  for (let i = 1; i <= moveLimit; i++) {
    let newRow = actualRow - i
    let newCol = actualColumn - i

    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function checkTopLeftMoves(moveLimit) {
  for (let i = 1; i <= moveLimit; i++) {
    let newRow = actualRow + i
    let newCol = actualColumn + i
    if (isDirectionNotValid(newRow, newCol)) {
      break
    }
    addPossibleMove(newRow, newCol)
    if (isEnemyOnWay(newRow, newCol)) {
      break
    }
  }
}

function addPossibleMove(newRow, newCol) {
  possibleMoves.push(createPossibleMoveId(newRow, newCol))
}

function isDirectionNotValid(newRow, newCol) {
  if (!isMoveInBoard(newRow, newCol) || isFriendOnWay(newRow, newCol)) {
    return true
  }
  return false
}

// Helpers
function createPossibleMoveId(newRow, newCol) {
  let newPosition = newRow.toString() + '-' + newCol.toString()
  return newPosition
}

function isMoveInBoard(newRow, newCol) {
  if (newRow <= 7 && newRow >= 0 && newCol <= 7 && newCol >= 0) {
    return true
  }
  return false
}

function highlightValidMoves() {
  for (let i = 0; i < possibleMoves.length; i++) {
    document
      .getElementById(possibleMoves[i].toString())
      .classList.add('cell-valid')
  }
}

// Check Way is Free
function isFriendOnWay(newRow, newCol) {
  let element = document.getElementById(createPossibleMoveId(newRow, newCol))
  let actualColor = element?.children[0]?.classList[0]
  if (element == null) {
    return false
  }
  if (
    pieceSelected.target.classList.contains(actualColor) &&
    element?.children[0]?.classList.contains(actualColor)
  ) {
    return true
  }
  return false
}

function isEnemyOnWay(newRow, newCol) {
  let element = document.getElementById(createPossibleMoveId(newRow, newCol))

  if (element.children[0] != null) {
    return true
  }
  return false
}

// Move piece
function movePiece(event) {
  let newPosition = event.target
  if (newPosition.classList.contains('cell-valid')) {
    checkEatEnemyPiece(newPosition)
    newPosition.appendChild(pieceSelected.target)
    removeValidMove()
  }
}

function checkEatEnemyPiece(newPosition) {
  if (newPosition.children[0] != null) {
    putInGraveyard(newPosition.firstChild)
    newPosition.innerHTML = ''
  }
}

function putInGraveyard(deadPiece) {
  let graveyard = document.querySelector(checkTeamGraveyard(deadPiece))
  graveyard.appendChild(deadPiece)
}

function checkTeamGraveyard(deadPiece) {
  if (deadPiece.classList.contains('orange-piece')) {
    return '.orange-graveyard'
  }
  return '.black-graveyard'
}

// Board Creation
window.onload = function () {
  appendChildCellToBoard()
  appendChildPawn()
  appendChildRook()
  appendChildKnigth()
  appendChildBishop()
  appendChildKing()
  appendChildQueen()

  setEventsCellClick()
}

function appendChildCellToBoard() {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let cell = document.createElement('div')
      cell.id = r.toString() + '-' + c.toString()
      cell.classList.add('cell')
      document.getElementById('board').appendChild(cell)
    }
  }
  setEventsCellClick()
}

function setEventsCellClick() {
  let elements = document.querySelectorAll('.cell i')

  elements.forEach((element) => {
    element.addEventListener('click', getFocusPiece)
    element.addEventListener('click', updateFocusPiece)
  })
}

function setEventsValidCellsClick() {
  let validCells = document.querySelectorAll('.cell-valid')
  validCells.forEach((validCell) => {
    validCell.addEventListener('click', movePiece)
  })
}

async function updateFocusPiece(event) {
  getFocusPiecePosition()
  getFocusPiecePossibleMoves()
  highlightValidMoves()
  setEventsValidCellsClick()
}

function appendChildPawn() {
  appendChildOrangePawn()
  appendChildBlackPawn()
}

function appendChildRook() {
  appendChildBlackRook()
  appendChildOrangeRook()
}

function appendChildBishop() {
  appendChildBlackBishop()
  appendChildOrangeBishop()
}

function appendChildKnigth() {
  appendChildBlackKnigth()
  appendChildOrangeKnigth()
}

function appendChildQueen() {
  appendChildBlackQueen()
  appendChildOrangeQueen()
}

function appendChildKing() {
  appendChildBlackKing()
  appendChildOrangeKing()
}

function appendChildBlackBishop() {
  appendChildBlackBishop()
  appendChildOrangeBishop()
}

function appendChildOrangePawn() {
  for (let r = 4; r < 8; r++) {
    let element = createOrangeElement('pawn')
    document
      .getElementById('1-' + r.toString())
      .appendChild(createOrangeElement('pawn'))
  }
}

function appendChildBlackPawn() {
  for (let r = 0; r < 4; r++) {
    document
      .getElementById('6-' + r.toString())
      .appendChild(createBlackElement('pawn'))
  }
}

function appendChildBlackRook() {
  document.getElementById('7-0').appendChild(createBlackElement('rook'))
  document.getElementById('7-7').appendChild(createBlackElement('rook'))
}

function appendChildOrangeRook() {
  document.getElementById('0-0').appendChild(createOrangeElement('rook'))
  document.getElementById('0-7').appendChild(createOrangeElement('rook'))
}

function appendChildBlackKnigth() {
  document.getElementById('7-1').appendChild(createBlackElement('knight'))
  document.getElementById('7-6').appendChild(createBlackElement('knight'))
}

function appendChildOrangeKnigth() {
  document.getElementById('0-1').appendChild(createOrangeElement('knight'))
  document.getElementById('0-6').appendChild(createOrangeElement('knight'))
}

function appendChildOrangeBishop() {
  document.getElementById('0-2').appendChild(createOrangeElement('bishop'))
  document.getElementById('0-5').appendChild(createOrangeElement('bishop'))
}

function appendChildBlackBishop() {
  document.getElementById('7-2').appendChild(createBlackElement('bishop'))
  document.getElementById('7-5').appendChild(createBlackElement('bishop'))
}

function appendChildBlackQueen() {
  document.getElementById('7-4').appendChild(createBlackElement('queen'))
}

function appendChildOrangeQueen() {
  document.getElementById('0-4').appendChild(createOrangeElement('queen'))
}

function appendChildOrangeKing() {
  document.getElementById('0-3').appendChild(createOrangeElement('king'))
}

function appendChildBlackKing() {
  document.getElementById('7-3').appendChild(createBlackElement('king'))
}

function createBlackElement(namePiece) {
  let element = document.createElement('i')
  element.classList.add('black-piece')
  element.classList.add('fas')
  element.classList.add('fa-chess-' + namePiece)
  // element.attributes.add("piece-type", "black "+namePiece);
  return element
}

function createOrangeElement(namePiece) {
  let element = document.createElement('i')
  element.classList.add('orange-piece')
  element.classList.add('fas')
  element.classList.add('fa-chess-' + namePiece)
  return element
}
