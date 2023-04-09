
let loc = location.href.split("/")
loc = loc[loc.length-1];
if(loc==="producto.html"){
    const cart = document.getElementById("form");
    cart.addEventListener("submit", async function(e){
        //first we have to create stor
        e.preventDefault();
        const selected = document.getElementById("select");
        const quantity = document.getElementById("quantity");
        let price = document.getElementById("price");
    
        // we have to calculate the taxes
        const totalItem = parseInt(quantity.value);
      
        price = parseInt(price.value);
        //calculate the taxes
    
       let currentPrice = totalItem*price;
    
       //we should have return back when nothing is selected
       if(selected.value === selected[0].value ){
        alert("should select one");
    
        return;
       }
        
       
       if(selected.value){
       const  IVA = 0.18;
       let store = localStorage.getItem("store")?JSON.parse(localStorage.getItem("store")):[];
       
       store.push({
        id:(!store.length)?1:store[store.length-1].id+1,
        price,
        quantity:totalItem,
        size:selected.value,
        iva:currentPrice*IVA,
        totalPrice:currentPrice
    })

    localStorage.setItem("store",JSON.stringify(store));
    console.log(localStorage.getItem("store"))
        selected.value = "";
        quantity.value = "";
       
       }
       
    })
}
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
 document.write(`<div class='cart font-family'><p>T-shirt</p><p>${prod.size}</p><p>$${prod.price}</p><p>${prod.quantity}</p><p>${prod.iva}</p><button id='remove' onclick='remove(${prod.id})'>Remove</button></div>`)
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


