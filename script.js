const products = [
  {
    id:1,
    name:"Âmbar & Baunilha",
    category:"adocicado",
    price:89.9,
    tag:"Mais vendido",
    image:"img/card inverno 1.jpeg",
    desc:"Doce, quente e envolvente."
  },
  {
    id:2,
    name:"Sândalo",
    category:"amadeirado",
    price:94.9,
    tag:"Inverno 26",
    image:"img/card inverno 2.jpeg",
    desc:"Elegante e profundamente acolhedor."
  },
  {
    id:3,
    name:"Lavanda",
    category:"floral",
    price:79.9,
    tag:"Clássico",
    image:"img/temp1.jpeg",
    desc:"Calma, leveza e serenidade."
  },
  {
    id:4,
    name:"Cedro & Figo",
    category:"amadeirado",
    price:99.9,
    tag:"Edição especial",
    image:"img/temp2.jpeg",
    desc:"Amadeirado com um toque sofisticado."
  },
  {
    id:5,
    name:"Flor de Algodão",
    category:"fresco",
    price:84.9,
    tag:"Leve",
    image:"img/temp3.jpeg",
    desc:"Limpo, fresco e delicado."
  },
  {
    id:6,
    name:"Jasmim & Pera",
    category:"floral",
    price:89.9,
    tag:"Novo",
    image:"img/temp4.jpeg",
    desc:"Floral luminoso com fundo frutado."
  }
];

const winterIds = [1,2,4];

let bag = JSON.parse(
  localStorage.getItem("laromaBag") || "[]"
);


const catalogGrid = document.getElementById("catalogGrid");
const winterGrid = document.getElementById("winterGrid");
const bagCount = document.getElementById("bagCount");
const bagItems = document.getElementById("bagItems");
const bagPanel = document.getElementById("bagPanel");
const backdrop = document.getElementById("backdrop");


/* =========================
   CARD DE PRODUTO
========================= */

function card(p){

  return `
    <article class="product-card">

      <div class="product-image">

        ${
          p.tag
          ? `<span class="product-tag">${p.tag}</span>`
          : ""
        }

        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        >

      </div>

      <div class="product-info">

        <div>

          <h3>
            ${p.name}
          </h3>

          <p>
            ${p.desc}
          </p>

        </div>

        <span class="product-price">
          R$ ${p.price.toFixed(2).replace(".",",")}
        </span>

      </div>

      <button
        class="add-button"
        data-add="${p.id}"
      >
        Adicionar +
      </button>

    </article>
  `;
}


/* =========================
   CATÁLOGO
========================= */

function renderCatalog(filter = "todos"){

  const list =
    filter === "todos"
    ? products
    : products.filter(
        p => p.category === filter
      );

  catalogGrid.innerHTML =
    list.map(card).join("");
}


/* =========================
   COLEÇÃO DE INVERNO
========================= */

function renderWinter(){

  winterGrid.innerHTML =
    products
      .filter(
        p => winterIds.includes(p.id)
      )
      .map(card)
      .join("");
}


/* =========================
   SACOLA
========================= */

function updateBag(){

  bagCount.textContent =
    bag.length;

  if(!bag.length){

    bagItems.innerHTML = `
      <p class="empty">
        Sua seleção está vazia.<br>
        Adicione produtos para enviar seu pedido.
      </p>
    `;

    localStorage.setItem(
      "laromaBag",
      JSON.stringify(bag)
    );

    return;
  }


  bagItems.innerHTML =
    bag.map(
      (p,i) => `

        <div class="bag-item">

          <img
            src="${p.image}"
            alt="${p.name}"
          >

          <div>

            <h4>
              ${p.name}
            </h4>

            <p>
              R$ ${p.price.toFixed(2).replace(".",",")}
            </p>

          </div>

          <button
            class="remove-item"
            data-remove="${i}"
          >
            remover
          </button>

        </div>

      `
    ).join("");


  localStorage.setItem(
    "laromaBag",
    JSON.stringify(bag)
  );
}


/* =========================
   ADICIONAR PRODUTO
========================= */

function addProduct(id){

  const p =
    products.find(
      x => x.id === Number(id)
    );

  if(!p) return;

  bag.push(p);

  updateBag();

  openBag();
}


/* =========================
   SACOLA ABRIR / FECHAR
========================= */

function openBag(){

  bagPanel.classList.add("open");

  backdrop.classList.add("open");

  bagPanel.setAttribute(
    "aria-hidden",
    "false"
  );
}


function closeBag(){

  bagPanel.classList.remove("open");

  backdrop.classList.remove("open");

  bagPanel.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* =========================
   EVENTOS
========================= */

document.addEventListener(
  "click",
  e => {

    const add =
      e.target.closest("[data-add]");

    if(add){

      addProduct(
        add.dataset.add
      );

      return;
    }


    const remove =
      e.target.closest("[data-remove]");

    if(remove){

      bag.splice(
        Number(
          remove.dataset.remove
        ),
        1
      );

      updateBag();

      return;
    }


    const filter =
      e.target.closest(".filter");

    if(filter){

      document
        .querySelectorAll(".filter")
        .forEach(
          b =>
            b.classList.remove(
              "active"
            )
        );

      filter.classList.add(
        "active"
      );

      renderCatalog(
        filter.dataset.filter
      );

      return;
    }


    const mood =
      e.target.closest("[data-mood]");

    if(mood){

      const results = {

        aconchego:
          "Nossa sugestão: Âmbar & Baunilha, uma luz quente para desacelerar.",

        leveza:
          "Nossa sugestão: Flor de Algodão, delicadeza para deixar o ambiente leve.",

        energia:
          "Nossa sugestão: Jasmim & Pera, luminosidade e frescor para renovar o dia.",

        elegancia:
          "Nossa sugestão: Cedro & Figo, presença sofisticada para momentos especiais."

      };

      document
        .getElementById(
          "finderResult"
        )
        .textContent =
          results[
            mood.dataset.mood
          ];
    }

  }
);


/* =========================
   SACOLA
========================= */

document
  .getElementById("openBag")
  .addEventListener(
    "click",
    openBag
  );


document
  .getElementById("closeBag")
  .addEventListener(
    "click",
    closeBag
  );


backdrop.addEventListener(
  "click",
  closeBag
);


/* =========================
   WHATSAPP
========================= */

document
  .getElementById(
    "whatsappOrder"
  )
  .addEventListener(
    "click",
    () => {

      if(!bag.length){

        alert(
          "Adicione pelo menos um produto à sua seleção."
        );

        return;
      }


      const items =
        bag
          .map(
            p =>
              `• ${p.name} — R$ ${p.price
                .toFixed(2)
                .replace(".",",")}`
          )
          .join("\n");


      const total =
        bag.reduce(
          (s,p) =>
            s + p.price,
          0
        );


      const text =

`Olá, Márcia! Vim pelo site da Laroma Speciale e gostaria de fazer um pedido:

${items}

Total estimado: R$ ${total
  .toFixed(2)
  .replace(".",",")}

Gostaria de confirmar disponibilidade e finalizar meu pedido.`;


      window.open(
        "https://wa.me/5516991710604?text=" +
        encodeURIComponent(text),
        "_blank"
      );

    }
  );


/* =========================
   MENU MOBILE
========================= */

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );

const nav =
  document.querySelector(
    ".nav"
  );


menuToggle.addEventListener(
  "click",
  () => {

    const open =
      nav.classList.toggle(
        "open"
      );

    menuToggle.setAttribute(
      "aria-expanded",
      open
    );

  }
);


nav
  .querySelectorAll("a")
  .forEach(
    a =>
      a.addEventListener(
        "click",
        () =>
          nav.classList.remove(
            "open"
          )
      )
  );


/* =========================
   INICIALIZAÇÃO
========================= */

renderCatalog();

renderWinter();

updateBag();