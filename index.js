var SIZE = 3,
    EMPTY = '&nbsp;',
    slots = [],
    turn = 'X',
    score,
    num_num_moves;

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var count = 1;
  for (var i = 0; i < SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 150);
      cell.setAttribute('width', 150);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.count = count;
      cell.addEventListener('click', setScore);
      row.appendChild(cell);
      slots.push(cell);
      count += count;
    }
  }
  startNewGame();
  document.getElementById('board').appendChild(board); 
}

function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  num_moves = 0;
  turn = 'X';
  slots.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

function isWin(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = isFilled('#board ' + testClass, turn);
    if (items.length == SIZE) {
      return true;
    }
  }
  return false;
}

function isFilled(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function setScore() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  num_moves += 1;
  score[turn] += this.count;
  if (isWin(this)) {
    alert(turn + ' Wins!');
    document.getElementById('turn').textContent = turn + ' Wins!';
  } else if (num_moves === SIZE * SIZE) {
    alert('Draw');
    document.getElementById('turn').textContent = 'Draw';
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn + ' turn';
  }
}

init();