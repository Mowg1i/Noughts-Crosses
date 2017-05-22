$(document).ready(function() {
  var squares = $(".square");
  var dialogue = $("#dialogue");
  var userSymbol = "";
  var aiSymbol;
  var userTurn = false;

  // shows the result and clears the board
  function endGame(result, symbol) {
    switch (result) {
      case 1:
        result = symbol + " won!";
        break;
      case 0:
        result = "Draw.";
    }
    $("#result").html(result);
    setTimeout(function() {
      for (var k = 0; k < 9; k++) {
        squares[k].innerHTML = "";
        $(squares[k]).removeClass("clicked");
      }
      userTurn = false;
      $(".dialogue").css("visibility", "visible");
      $("#result").html('');
    }, 2000);
  }

  // Once the user has picked their symbol play may begin
  $(".pick").click(function() {
    userSymbol = this.value;
    if (userSymbol == "X") {
      aiSymbol = "O";
      userTurn = true;
    } else {
      aiSymbol = "X";
      ai();
    }
    $(".dialogue").css("visibility", "hidden");
  });

  // checks for winning boards
  function checkWon(symbol, isTest) {
    var result;
    if (
      squares[0].innerHTML == symbol &&
      squares[1].innerHTML == symbol &&
      squares[2].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[3].innerHTML == symbol &&
      squares[4].innerHTML == symbol &&
      squares[5].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[6].innerHTML == symbol &&
      squares[7].innerHTML == symbol &&
      squares[8].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[0].innerHTML == symbol &&
      squares[3].innerHTML == symbol &&
      squares[6].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[1].innerHTML == symbol &&
      squares[4].innerHTML == symbol &&
      squares[7].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[2].innerHTML == symbol &&
      squares[5].innerHTML == symbol &&
      squares[8].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[0].innerHTML == symbol &&
      squares[4].innerHTML == symbol &&
      squares[8].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[2].innerHTML == symbol &&
      squares[4].innerHTML == symbol &&
      squares[6].innerHTML == symbol
    ) {
      result = 1;
    } else if (
      squares[0].innerHTML !== "" &&
      squares[1].innerHTML !== "" &&
      squares[2].innerHTML !== "" &&
      squares[3].innerHTML !== "" &&
      squares[4].innerHTML !== "" &&
      squares[5].innerHTML !== "" &&
      squares[6].innerHTML !== "" &&
      squares[7].innerHTML !== "" &&
      squares[8].innerHTML !== ""
    ) {
      result = 0;
    }
    if (
      (isTest === false && result == 1) ||
      (isTest === false && result === 0)
    ) {
      endGame(result, symbol);
    }
    return result;
  }

  // computer's go
  function ai() {
    // testMoves looks at possible moves to see if winning move is available. If it is available, makes the move and returns true. Else returns false;
    function testMoves() {
      for (var test = 0; test < 9; test++) {
        if (squares[test].innerHTML === "") {
          squares[test].innerHTML = aiSymbol;
          $(squares[test]).addClass("clicked");
          if (checkWon(aiSymbol, true) == 1) {
            checkWon(aiSymbol, false);
            return true;
          } else {
            squares[test].innerHTML = "";
            $(squares[test]).removeClass("clicked");
          }
        }
      }
      return false;
    }

    //if block is possible, block
    function testBlocks() {
      for (var test = 0; test < 9; test++) {
        if (squares[test].innerHTML === "") {
          squares[test].innerHTML = userSymbol;
          
          if (checkWon(userSymbol, true) == 1) {
            squares[test].innerHTML = aiSymbol;
            $(squares[test]).addClass("clicked");
            checkWon(aiSymbol, false);
            return true;
          } else {
            squares[test].innerHTML = "";
            $(squares[test]).removeClass("clicked");
          }
        }
      }
      return false;
    }
  
    // If win or block is not possible, check for next best move depending on AI symbol.
    function bestMove() {
      var moves = [4, 0, 8, 2, 6];
      if (aiSymbol == "X") {
        for (var c = 1; c < moves.length; c++) {
          if (squares[moves[c]].innerHTML === "") {
            squares[moves[c]].innerHTML = aiSymbol;
            $(squares[moves[c]]).addClass("clicked");
            checkWon(aiSymbol, false);
            return true;
          }
        }
      } else {
        for (var c = 0; c < moves.length; c++) {
          if (squares[moves[c]].innerHTML === "") {
            squares[moves[c]].innerHTML = aiSymbol;
            $(squares[moves[c]]).addClass("clicked");
            checkWon(aiSymbol, false);
            return true;
          }
        }
      }
      return false;
    }

    // If win, block or best move is not possible, just move in next available space.
    if (!testMoves() && !testBlocks() && !bestMove()) {
      for (var t = 0; t < 9; t++) {
        if (squares[t].innerHTML === "") {
          squares[t].innerHTML = aiSymbol;
          $(squares[t]).addClass("clicked");
          checkWon(aiSymbol, false);
          break;
        }
      }
    }
    if (checkWon(aiSymbol, false) == 1) {
      return;
    }
    userTurn = true;
  }

  // user's go
  $(".square").click(function() {
    if (userTurn === true && this.innerHTML === "") {
      this.innerHTML = userSymbol;     
      $(this).addClass("clicked");
      if (checkWon(userSymbol, false) == 1) {
        userTurn = false;
        return;
      }
      userTurn = false;
      ai();
    }
  });
});