function melhorMov() {
    // Decisão de jogada da ia no turno
    let valorMax = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        
        // Medindo se o espaço está preenchido  
        if (tabul[i][j] == '') {
          tabul[i][j] = ai;
          let score = minimax(tabul, 0,-Infinity, Infinity, false);
          tabul[i][j] = '';
          if (score > valorMax) {
            valorMax = score;
            move = { i, j };
          }
        }
      }
    }
    //Movimentação do bot
    tabul[move.i][move.j] = ai;
    currentPlayer = human;
  }
  //Estado de valor 
  let scores = {
    X: 1,
    O: -1,
    tie: 0
  };
  
  function minimax(tabul, depth, alpha, beta, Maximizando) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (Maximizando) {
      let valorMax = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
         // Medindo se o espaço está preenchido  
          if (tabul[i][j] == '') {
            tabul[i][j] = ai;
            let score = minimax(tabul, depth + 1, alpha, beta, false);
            tabul[i][j] = '';
            valorMax = max(score, valorMax);
            alpha = max(alpha, score);
            if (beta <= alpha){
                break;
            }
          }
        }
      }
      return valorMax;
    } else {
      let valorMax = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
         // Medindo se o espaço está preenchido  
         
          if (tabul[i][j] == '') {
            tabul[i][j] = human;
            let score = minimax(tabul, depth + 1, alpha, beta, true);
            tabul[i][j] = '';
            valorMax = min(score, valorMax);
            beta = min(beta, score);
            if (beta <= alpha){
                break
            }
          }
        }
      }
      return valorMax;
    }
  }