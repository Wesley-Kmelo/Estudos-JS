const card = document.querySelectorAll('.cards');

const page1 = document.querySelector('.table');
const page2 = document.querySelector('.start');

var cont =0;

let flippedCard = false;
let blockCards = false;
let card1, card2;

/*esta função chama a função flipcard novamente , mas nesse caso 
retira o EventListener que faz com que o card seja clicável. */
function disableCards() {
    
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click',flipCard);

    resetTab();
}

/*ao remover o nome flip do nome da classe as configurações do css
voltam ao que estao configuradas no onme da classe*/
function resetCards(){
    blockCards = true;

    setTimeout(() =>{
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        resetTab();
    },1500)
}


/*a finalidade dessa função é através de arrays, setar essas configurações
pra quando for chamada, zerar na memória os valores contidos.*/
function resetTab(){
    [flippedCard, blockCards] = [false, false];
    [card1, card2] = [null, null];
}

/*criada uma variavel que conta cada acerto . Quando essa variavel chegar em 6, é emitido um pop-up
com uma mensagem e a página é recarregada.*/
function checkMatch() {
      if (card1.dataset.chance === card2.dataset.chance) {
        cont++;
        disableCards();

            if(cont===6){
                let r=confirm("     Parabéns. \nClique em OK para começar um novo jogo")
                if (r){
                document.location.reload(true); 
            }
                return false;      
            }
        return;
        }

        resetCards();
}



function flipCard(){
    if (blockCards) return;
    if (this === card1) return;

    this.classList.add('flip');
    if (!flippedCard) {
        flippedCard = true;
        card1 = this;
        return;
    }

    card2 = this;
    flippedCard = false;
    checkMatch();

}


/*adiciona o classname 'flip' para cada ocorrencia pesquisada
na const card acima, através do callback da função flipCard. COm isso o css
desse card é alterado.
Em seguida é criado uma variavel randomica que faz com que os cards sejam 
embaralhados a cada rodada.*/
card.forEach((card) => {
    card.addEventListener('click',flipCard);
    let rndPos = Math.floor(Math.random()*12);
    card.style.order = rndPos;
    
})

/*a finalidade dessa função é esconder a div start localizada acima
pela const page3 e mostrar a div table, confugrando a position para que
o display flex funcione corretamente.Absolute quer dizer..por cima dos
outros elementos*/
function changePage(){    
        page2.style.visibility = 'hidden';
        page1.style.position="absolute";
        page1.style.transition ='2s';
        page1.style.visibility = 'visible';
    }
    

