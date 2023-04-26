
let loc = location.href.split("/")
loc = loc[loc.length-1];

if(loc==="cart.html"){
let cart =localStorage.getItem("store");
if(cart){
    cart = JSON.parse(cart)
};
console.log(cart)
let total=0

//create elements

cart && cart.map(prod=>{
 total+=prod.totalPrice + prod.iva;
 document.write(
    `<div class='cart'>
    <img src='${prod.directory}' alt='not' class='item'/>
    <p>${prod.size}</p>
    <p>$${prod.price}</p><p>${prod.quantity}</p>
    <p>${prod.iva}</p>
    <button id='remove' onclick='remove(${prod.id})'>Remove</button>
    </div>`)
})
document.getElementById("total").innerHTML=`Total: $${total}`
const button = document.getElementById('btn');
button.addEventListener("click", (e)=>{
  e.preventDefault();
  localStorage.clear();
  location.reload();
  alert("yeah successfully purchased!")
  
})

function remove (id){
    const unRemoved = cart.filter(prod=>prod.id!==id);
   localStorage.setItem("store",JSON.stringify(unRemoved));
   location.reload();
}

}
// this could be executed when the location out of cart 
else{
    const cart = document.getElementById("form");
    cart.addEventListener("submit", async function(e){
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

       store.push({
        id:(!store.length)?1:store[store.length-1].id+1,
        price,
        directory: `img/${getItem()}`,
        quantity:totalItem,
        size:selected.value,
        iva:parseFloat(iva.toFixed(2)),
        totalPrice:parseFloat(currentPrice.toFixed(2)),//making into two decimal point
    })

    localStorage.setItem("store",JSON.stringify(store));
    console.log(localStorage.getItem("store"))
        selected.value = "";
        quantity.value = "";
       
       }
       
    })

    function getItem(){
        let item = document.getElementsByTagName("img");
        item =item[1].src.split("img/").at(-1);
        return item;
    }
    
}

    