const elementos = {

      telaInicial: document.getElementById("inicial"),
      telaCadastro: document.getElementById("cadastro"),
      telaJogo: document.getElementById("jogo"),
      telaMensagem: document.querySelector(".mensagem"),
      textoMensagem: document.querySelector(".mensagem .texto"),
      teclado: document.querySelector(".teclado"),
      palavra: document.querySelector(".palavra"),
      dica: document.querySelector(".dica"),
    
    botoes: {
      
      facil: document.querySelector(".botao-facil"), // Botão de dificuldade "Fácil"
      medio: document.querySelector(".botao-medio"), // Botão de dificuldade "Médio"
      dificil: document.querySelector(".botao-dificil"), // Botão de dificuldade "Difícil"
      cadastrar: document.querySelector(".botao-cadastrar"), // Botão para abrir a tela de cadastro de palavras
      realizarCadastro: document.querySelector(".botao-realizar-cadastro"), // Botão para realizar o cadastro de palavras
      voltar: document.querySelector(".botao-voltar"), // Botão para voltar ao menu inicial
      reiniciar: document.querySelector(".reiniciar"), // Botão para reiniciar o jogo
    
    },

    campos: {

      dificuldade: {
      facil: document.getElementById("facil"), // Radiobutton de dificuldade "Fácil"
      medio: document.getElementById("medio"), // Radiobutton de dificuldade "Médio"
      dificil: document.getElementById("dificil"), // Radiobutton de dificuldade "Difícil"

    },
      palavra: document.getElementById("palavra"), // Campo de texto para entrada da palavra
      dica: document.getElementById("dica"), // Campo de texto para entrada da dica
    
    },
    
    boneco: [ // Representação visual do enforcado
    
      document.querySelector(".boneco-cabeca"),
      document.querySelector(".boneco-corpo"),
      document.querySelector(".boneco-braco-esquerdo"),
      document.querySelector(".boneco-braco-direito"),
      document.querySelector(".boneco-perna-esquerda"),
      document.querySelector(".boneco-perna-direita"),
    ],
  };
  
  // Definição das palavras do jogo, agrupadas por dificuldade
  const palavras = {
    facil: [
      {
        palavra: "beijo",
        dica: "É um gesto de carinho",
      },
    ],
    medio: [
      {
        palavra: "relogio",
        dica: "Ele marca as horas",
      },
    ],
    dificil: [
      {
        palavra: "hamburger",
        dica: "Lanche",
      },
    ],
  };
  
  function selecionarLetra(letra) {
    console.log(jogo.acabou());
    if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
    const acertou = jogo.jogar(letra);
    jogo.jogadas.push(letra);
  
    const button = document.querySelector(`.botao-${letra}`);
    button.classList.add(acertou ? "certo" : "errado");
  
    mostrarPalavra();
  
    if (!acertou) {
    mostrarErro();
    }
  
    if (jogo.ganhou()) {
    mostrarMensagem(true);
    } else if (jogo.perdeu()) {
    mostrarMensagem(false);

    }
   }
  }

  function criarTeclado() {
    const letras = [
      "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
  
    elementos.teclado.textContent = "";
  
    for (const letra of letras) {
      const button = document.createElement("button");
      button.appendChild(document.createTextNode(letra.toUpperCase()));
      button.classList.add(`botao-${letra}`);
      elementos.teclado.appendChild(button);
  
      button.addEventListener("click", () => {
        selecionarLetra(letra);

      });
    }
  }
  
  function mostrarErro() {
    const parte = elementos.boneco[5 - jogo.chances];
    parte.classList.remove("escondido");
  }
  
  function mostrarMensagem(vitoria) {
    const mensagem = vitoria
      ? "<p>Parabéns!</p><p>Você Ganhou!</p>"
      : "<p>Que pena!</p><p>Você Perdeu!</p>";
  
    elementos.textoMensagem.innerHTML = mensagem;
    elementos.telaMensagem.style.display = "flex";
    elementos.telaMensagem.classList.add(
      `mensagem-${vitoria ? "vitoria" : "derrota"}`
    );
  
    jogo.emAndamento = false;
  }
  
  function abrirTelaCadastroPalavra() {
    elementos.telaInicial.style.display = "none";
    elementos.telaCadastro.style.display = "flex";
    elementos.telaJogo.style.display = "none";
    elementos.telaMensagem.style.display = "none";
    elementos.telaMensagem.classList.remove("mensagem-vitoria");
    elementos.telaMensagem.classList.remove("mensagem-derrota");
  
    for (const parte of elementos.boneco) {
      parte.classList.remove("escondido");
      parte.classList.add("escondido");
    }
  }
  
  function voltarInicio() {
    elementos.telaInicial.style.display = "flex";
    elementos.telaCadastro.style.display = "none";
    elementos.telaJogo.style.display = "none";
    elementos.telaMensagem.style.display = "none";
    elementos.telaMensagem.classList.remove("mensagem-vitoria");
    elementos.telaMensagem.classList.remove("mensagem-derrota");
  
    for (const parte of elementos.boneco) {
      parte.classList.remove("escondido");
      parte.classList.add("escondido");
    }
  }
  
  function cadastrarPalavra() {}
  
  function sortearPalavra() {
    const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
    const palavra = palavras[jogo.dificuldade][i].palavra;
    const dica = palavras[jogo.dificuldade][i].dica;
  
    jogo.definirPalavra(palavra, dica);
  
    console.log(jogo.palavra.original);
    console.log(jogo.palavra.dica);
  
    return jogo.palavra.original;
  }
  
  function mostrarPalavra() {
    elementos.dica.textContent = jogo.palavra.dica;
    elementos.palavra.textContent = "";
  
    for (let i = 0; i < jogo.acertos.length; i++) {
      const letra = jogo.acertos[i].toUpperCase();
      elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
    }
  }
  
  function novoJogo() {
    // Inicializa o objeto de jogo com valores padrão
    jogo = {
      dificuldade: undefined,
      palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
      
    },
    
      acertos: undefined,
      jogadas: [],
      chances: 6,
      
    definirPalavra: function (palavra, dica) {
        // Configura a palavra a ser adivinhada e sua dica
        this.palavra.original = palavra;
        this.palavra.tamanho = palavra.length;
        this.acertos = "";

        // Remove acentos da palavra e a normaliza
        this.palavra.semAcentos = this.palavra.original
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        this.palavra.dica = dica;
  
        // Inicializa os acertos com espaços em branco
        for (let i = 0; i < this.palavra.tamanho; i++) {
          this.acertos += " ";
        }
      },
      
    jogar: function (letraJogada) {
        // Verifica se a letra jogada está correta na palavra
        let acertou = false;
        for (let i = 0; i < this.palavra.tamanho; i++) {
          const letra = this.palavra.semAcentos[i].toLowerCase();
          if (letra === letraJogada.toLowerCase()) {
            acertou = true;

            // Substitui o espaço em branco pelo caractere correto na posição i
            this.acertos = substituirCaractere(
              this.acertos,
              i,
              this.palavra.original[i]
            );
          }
        }

        // Decrementa as chances se a letra jogada não estiver na palavra  
        if (!acertou) {
          this.chances--;
        }
        return acertou;
      },
      ganhou: function () {
        // Verifica se o jogador ganhou o jogo (adivinhou a palavra)
        return !this.acertos.includes(" ");
      },
      perdeu: function () {
        // Verifica se o jogador perdeu o jogo (esgotou as chances)
        return this.chances <= 0;
      },
      acabou: function () {
        // Verifica se o jogo acabou (ganhou ou perdeu)
        return this.ganhou() || this.perdeu();
      },
      emAndamento: false, // Indica se o jogo está em andamento ou não
    };
  
    // Configura a interface do jogo
    elementos.telaInicial.style.display = "flex";
    elementos.telaCadastro.style.display = "none";
    elementos.telaJogo.style.display = "none";
    elementos.telaMensagem.style.display = "none";
    elementos.telaMensagem.classList.remove("mensagem-vitoria");
    elementos.telaMensagem.classList.remove("mensagem-derrota");
  
    // Oculta as partes do "boneco" da forca
    for (const parte of elementos.boneco) {
      parte.classList.remove("escondido");
      parte.classList.add("escondido");
   }

   // Cria o teclado na tela do jogo  
    criarTeclado();
  }
  
    novoJogo();
  
    function iniciarJogo(dificuldade) {
    jogo.dificuldade = dificuldade;
  
    elementos.telaInicial.style.display = "none";
    elementos.telaJogo.style.display = "flex";
  
    jogo.emAndamento = true;
  
    sortearPalavra();

    // Atualiza a visualização da palavra
    mostrarPalavra();
}
  
    elementos.botoes.facil.addEventListener("click", () => iniciarJogo("facil"));
    elementos.botoes.medio.addEventListener("click", () => iniciarJogo("medio"));
    elementos.botoes.dificil.addEventListener("click", () =>

    iniciarJogo("dificil")
  );

    elementos.botoes.reiniciar.addEventListener("click", () => novoJogo());
    elementos.botoes.voltar.addEventListener("click", () => voltarInicio());
  
    elementos.botoes.cadastrar.addEventListener("click", () =>
    abrirTelaCadastroPalavra()
  );
    elementos.botoes.cadastrarPalavra.addEventListener("click", () =>
    cadastrarPalavra()
  );
  
  function substituirCaractere(str, indice, novoCaractere) {
    // Esta função recebe uma string 'str', um índice 'indice' e um novo caractere 'novoCaractere'.
    // Ela substitui o caractere na posição 'indice' da string 'str' pelo novo caractere 'novoCaractere'
    // e retorna a string resultante.

    // Obtém a parte da string antes do índice 'indice'
    const parteAntes = str.substring(0, indice);

    // Obtém a parte da string após o índice 'indice'
    const parteDepois = str.substring(indice + 1);

    // Concatena a parte antes, o novo caractere e a parte depois para formar a nova string
    const novaString = parteAntes + novoCaractere + parteDepois;

    // Retorna a nova string resultante com a substituição feita
    return novaString;
  } 