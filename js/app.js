const clickButton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody");
let carrito = [];

clickButton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
});

function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  console.log(item);
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {

const inputElemento = tbody.getElementsByClassName("inputElemento")



    for (let i = 0; i < carrito.length; i++) {
if (carrito[i].title.trim() === newItem.title.trim()) {
    carrito[i].cantidad ++;
    const inputValue = inputElemento[i]
    inputValue.value++;
    carritoTotal()
    
    return null
    
}
    }
  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const Content = `
        
        <th scope="row">1</th>
                        <td class="table__productos">
                            <img src=${item.img} alt="">
                            <h6 class="title">${item.title}</h6>
                        </td>
                        <td class="table__precio"><p>${item.precio}</p></td>
                        <td class="table__cantidad">
                            <input  class="inputElemento" type="number" min="1" value=${item.cantidad} >
                            <button class="delete btn-danger">x</button>
                        </td>
        
        
        `;
        tr.innerHTML = Content
        tbody.append(tr)
        tr.querySelector(".delete").addEventListener("click",removeItemCarrito)
  });
  carritoTotal()
}

function carritoTotal() {
    let total = 0 
    const itemCartTotal = document.querySelector(".itemCartTotal")
    carrito.forEach((item => {
        const precio = Number(item.precio.replace("$",""))
        total = total + precio*item.cantidad 
    }))
    itemCartTotal.innerHTML= `Total $${total}`
}

function removeItemCarrito (e) {
const buttonDelete = e.target
const tr = buttonDelete.closest(".itemCarrito")
const title = tr.querySelector(".title").textContent
for (let i = 0 ; i<carrito.length; i++){
    if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i,1)
    }
}
tr.remove()
carritoTotal()
}
