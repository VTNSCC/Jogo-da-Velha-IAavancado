 //Estrutura do jogo

let tabul = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let w;
  let h;
  let ai = 'X';
  let human = 'O';
  let currentPlayer = human;

 
  function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    melhorMov();
  }
  
  function equals3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  //Função para checar o ganhador nos eixos correspondentes
  function checkWinner() {
    let winner = null;
  
    // Horizontal
    for (let i = 0; i < 3; i++) {
      if (equals3(tabul[i][0], tabul[i][1], tabul[i][2])) {
        winner = tabul[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (equals3(tabul[0][i], tabul[1][i], tabul[2][i])) {
        winner = tabul[0][i];
      }
    }
  
    // Diagonal
    if (equals3(tabul[0][0], tabul[1][1], tabul[2][2])) {
      winner = tabul[0][0];
    }
    if (equals3(tabul[2][0], tabul[1][1], tabul[0][2])) {
      winner = tabul[2][0];
    }

  //Verifica os espaços abertos no tabuleiro
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tabul[i][j] == '') {
          openSpots++;
        }
      }
    }

  //Estado empate
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function mousePressed() {
    if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (tabul[i][j] == '') {
        tabul[i][j] = human;
        currentPlayer = ai;
        melhorMov();
      }
    }
  }
  
  function draw() {
    background(255);
    strokeWeight(15);
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = tabul[i][j];
        textSize(32);
        let r = w / 4;
        if (spot == human) {
          noFill();
          ellipse(x, y, r * 2);
        } else if (spot == ai) {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        }
      }
    }
  //Verifica vitória válida
  //Não há estado de vitória válida pro player pq o bot é inteligente dms
    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html('Séloco EMPATOU. Seis são o bicho eim 😶🤲😶🤲😶🤲');
      } else {
        resultP.html(`${result} É o bicho!`);
      }
    }
  }