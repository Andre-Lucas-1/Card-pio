const divListaItens = document.querySelector("#cardapio");
const divItem = document.querySelector("#itens");
const divTotal = document.querySelector("#vlrTotal");

const sacola = [];
let totalCarrinho = 0.0;

class Item {
    constructor(id, descricao, preco) {
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = 1;
    }
}

const addItem = (itemElement) => {
    const id = itemElement.dataset.id;
    const descricao = itemElement.querySelector(".descricao").textContent;
    const preco = parseFloat(itemElement.querySelector(".valor").textContent.replace("R$ ", "").replace(",", ".").split(" ")[0]);

    let posicaoArray = -1;
    for (let i in sacola) {
        if (sacola[i].id == id) {
            posicaoArray = i;
            break;
        }
    }

    if (posicaoArray === -1) {
        let objItem = new Item(id, descricao, preco);
        sacola.push(objItem);
    } else {
        sacola[posicaoArray].quantidade += 1;
    }

    listaItens();
    atualizaValor();
}

const atualizaValor = () => {
    totalCarrinho = 0.0;
    for (let obj of sacola) {
        totalCarrinho += obj.preco * obj.quantidade;
    }
    divTotal.innerHTML = `R$ ${totalCarrinho.toFixed(2).replace(".", ",")}`;
}

const removeItem = (indice) => {
    let objItem = sacola[indice];
    totalCarrinho -= objItem.preco * objItem.quantidade;
    sacola.splice(indice, 1);
    listaItens();
    atualizaValor();
}

const listaItens = () => {
    divItem.innerHTML = "";
    sacola.forEach((elem, i) => {
        const divsacola = document.createElement("div");
        divsacola.setAttribute("class", "sacola");
        let valor = elem.preco * elem.quantidade;

        divsacola.innerHTML = `
            ${elem.descricao} ${elem.quantidade} R$ ${elem.preco.toFixed(2).replace(".", ",")} R$ ${valor.toFixed(2).replace(".", ",")}
            <img src="imagens/remover.png" alt="Remover" class="btnRemover" data-index="${i}">
        `;

        divItem.appendChild(divsacola);
    });

    // Adiciona eventos de remoção aos botões de remover
    const botoesRemover = document.querySelectorAll(".btnRemover");
    botoesRemover.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            removeItem(index);
        });
    });
}

// Adiciona evento aos botões de adicionar
const adicionarEventos = () => {
    const botoesAdicionar = document.querySelectorAll("#cardapio .btnAdd");
    botoesAdicionar.forEach((btn) => {
        btn.addEventListener("click", () => {
            const itemElement = btn.closest(".card");
            addItem(itemElement);
        });
    });
}

adicionarEventos();
