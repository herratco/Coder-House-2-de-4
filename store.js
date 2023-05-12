
let loc = location.href.split("/")
loc = loc[loc.length-1];
//total should be a global variable since it is accessible in all directories 
let cart =localStorage.getItem("store");
cart = cart ? JSON.parse(cart):[];

if(loc==="cart.html"){
//before everything is done call the function 
summeryCreator(cart);

let total=0
//create elements

cart && cart.map(prod=>{

 //destructuring is her /** what is destructuring spread out the property of the object */ 
 const { totalPrice, iva, size, directory, price, quantity, id} = prod;

 total+= totalPrice +  iva;
 document.write(
    `<div class='cart'>
    <img src='${ directory}' alt='not' class='item'/>
    <p>${ size}</p>
    <p>$${ price}</p><p>${ quantity}</p>
    <p>${ iva}</p>
    <button id='remove' onclick='remove(${ id})'>Remove</button>
    </div>`)
})
document.getElementById("total").innerHTML=`Total: $${total}`
const button = document.getElementById('btn');
const alertBox = document.getElementById("alert");
const message = document.getElementById("message");

button.addEventListener("click", (e)=>{
  e.preventDefault();

  alertBox.style.display = "flex";
  if(!cart.length){
   message.innerHTML = "you have to add items in the cart first"
   message.style.color = "red"
  }
  
})


//add event to the alert box
/**get the alert button */
const purchase = document.getElementById('btn-alert');
purchase.addEventListener("click",(e)=>{
   e.preventDefault();
   localStorage.clear();
   alertBox.style.display = "none";
//   here is summery of the items to be sold 

   location.reload();
})

function remove (id){
    const unRemoved = cart.filter(prod=> id!==prod.id);
   localStorage.setItem("store",JSON.stringify(unRemoved));
   location.reload();
}


}

else if(loc==="index.html" || loc ==="nosotros.html")
 {
    //only call the summery creator function
    summeryCreator(cart);
 }

   
// this could be executed when the location out of cart 
else{
    //call the function to create a summery
    summeryCreator(cart);

    const form = document.getElementById("form");
    form.addEventListener("submit", async function(e){
        //first we have to create stor
        e.preventDefault();
        const selected = document.getElementById("select");
        const quantity = document.getElementById("quantity");
        let price = document.getElementById("price");
    
        // we have to calculate the taxes
        const totalItem = parseInt(quantity.value);
      
       //the price is depend on the size of the item we selected
       price = parseInt(price.value);

       switch(selected.value){
        case "small":
            price = price - price * 0.25;
            break;
        case "large":
            price = price + price* 0.25;
            break;
        case "x-large":
            price = price + price * 0.5;
            break;
        default:
            price = price;
       }
    
       let currentPrice = totalItem*price;
    
       //we should have return back when nothing is selected
       if(selected.value === selected[0].value ){
        alert("should select one");
    
        return;
       }
        
       
       if(selected.value){
       const  IVA = 0.18;
       let store = localStorage.getItem("store")?JSON.parse(localStorage.getItem("store")):[];
       let iva = currentPrice * IVA;
       /**
        * 
        * JSON to modify the dom in the cart 
        */
       let newJsonItem = {
        "id":(!store.length)?1:store.at(-1)["id"]+1,
        "item":getItemName(),
        "price":price,
        "directory": `img/${getItem()}`,
        "quantity":totalItem,
        "size":selected.value,
        "iva":parseFloat(iva.toFixed(2)),
        "totalPrice":parseFloat(currentPrice.toFixed(2)),//making into two decimal point
    }
       
    //spread operator here
     /**
        spread mean 
             1) coping the items to add another item from existing one
             2) coping the items to change/update the value when we it comes to object
    */ 
     
       store = [
        ...store,
          newJsonItem
       ]

    localStorage.setItem("store",JSON.stringify(store));

    // make fields come back to be empty
        selected.value = "";
        quantity.value = "";
       
       }
      location.reload() 
    })
     //to make the number of items in the cart icon
    

    function getItem(){
        let item = document.getElementsByTagName("img");
        item =item[1].src.split("img/").at(-1);
        return item;
    }
    
    function getItemName(){
        let itemName = document.getElementsByTagName("h1");
        return itemName[0].innerHTML;
    }
}


function summeryCreator(store){
const summeryBox = document.createElement("div")
summeryBox.className = "item-counter";

const cart = document.createElement("div");
const icon = document.createElement("i");
icon.className = "fa-solid fa-cart-shopping";

const span = document.createElement("span");
span.className = "count";
span.innerText = store.length;

cart.appendChild(icon);
cart.appendChild(span);

const details = document.createElement("details");
const summery = document.createElement("summery");
const ol = document.createElement("ol")

const p = document.createElement("p");
let total = 0;
store.map(prod=>{
    
    const {totalPrice,size,iva, item} = prod;
    //  calculate total
    total += totalPrice + iva

    const li = document.createElement("li");
    li.innerText = `${item} : ${size} :${totalPrice+iva}`
    ol.appendChild(li)
})
p.innerText = `total: $${total}`;
ol.appendChild(p);

details.appendChild(summery)
details.appendChild(ol);

summeryBox.appendChild(cart)
summeryBox.appendChild(details);
document.body.appendChild(summeryBox)
}