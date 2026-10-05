const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let cart = JSON.parse(localStorage.getItem("moonstyle_cart") || "[]");

function saveCart(){ localStorage.setItem("moonstyle_cart", JSON.stringify(cart)); renderCart(); }
function addToCart(item){
  const existing = cart.find(x => x.name === item.name && x.size === item.size);
  if(existing) existing.qty++;
  else cart.push({...item, qty:1});
  saveCart();
  openCart();
}
function renderCart(){
  const count = cart.reduce((a,x)=>a+x.qty,0);
  $$(".cart-count").forEach(el=>el.textContent=count);
  const box=$("#cartItems"), total=$("#cartTotal");
  if(!box) return;
  if(!cart.length){box.innerHTML='<p class="micro">Je tas is nog leeg.</p>'; total.textContent="€0.00"; return;}
  box.innerHTML=cart.map((x,i)=>`
    <div class="cart-row">
      <img src="${x.image}" alt="">
      <div><h4>${x.name}</h4><p>${x.size} · ${x.color} · ${x.qty}×</p><p>€${(x.price*x.qty).toFixed(2)}</p></div>
      <button class="remove" data-remove="${i}">Remove</button>
    </div>`).join("");
  total.textContent="€"+cart.reduce((a,x)=>a+x.price*x.qty,0).toFixed(2);
  $$("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);saveCart();});
}
function openCart(){$("#cartOverlay").classList.add("open")}
function closeCart(){$("#cartOverlay").classList.remove("open")}
function addFromCard(card){
  addToCart({name:card.dataset.product,price:+card.dataset.price,color:card.dataset.color||"Black",size:"M",image:card.dataset.image});
}

$$(".quick-add").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();addFromCard(btn.closest(".product-card"));}));
$("[data-feature-add]").onclick=()=>addToCart({name:"Moon Zip — Black",price:35,color:"Black",size:"M",image:"assets/moonstyle black.jpg"});
$$("[data-open-cart]").forEach(x=>x.onclick=openCart);
$("[data-close-cart]").onclick=closeCart;
$("#cartOverlay").addEventListener("click",e=>{if(e.target.id==="cartOverlay")closeCart()});

$("[data-open-search]").onclick=()=>{$("#searchOverlay").classList.add("open");setTimeout(()=>$("#searchInput").focus(),100)};
$("[data-close-search]").onclick=()=>$("#searchOverlay").classList.remove("open");
$("[data-size-guide]").onclick=()=>$("#sizeOverlay").classList.add("open");
$("[data-close-size]").onclick=()=>$("#sizeOverlay").classList.remove("open");

$(".mobile-menu-btn").onclick=()=>$("#mobileMenu").classList.toggle("open");
$$(".mobile-menu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));

function applyFilters(){
  const color=$("#colorFilter").value, model=$("#modelFilter").value;
  $$("#shopGrid .product-card").forEach(card=>{
    const okColor=color==="all"||card.dataset.color===color;
    const okModel=model==="all"||card.dataset.model===model;
    card.style.display=okColor&&okModel?"":"none";
  });
}
$("#colorFilter").onchange=applyFilters;
$("#modelFilter").onchange=applyFilters;
$("#sizeFilter").onchange=()=>{ if($("#sizeFilter").value!=="all") alert("Maat geselecteerd. Bij live Shopify-koppeling wordt deze maat aan de cart toegevoegd."); };

$("#checkoutBtn").onclick=()=>{
  alert("Shopify checkout ready: vervang deze handler door je Shopify Storefront Cart/Checkout endpoint.");
};

$("#newsletterForm").onsubmit=e=>{e.preventDefault();alert("Welkom bij de Faith Club. Je ontvangt 10% korting.");e.target.reset();};
$("#popupForm").onsubmit=e=>{e.preventDefault();$("#newsletterPopup").classList.remove("show");alert("Welkom bij de Faith Club. Je ontvangt 10% korting.");};

setTimeout(()=>{if(!sessionStorage.getItem("moonstyle_popup_seen")){$("#newsletterPopup").classList.add("show");sessionStorage.setItem("moonstyle_popup_seen","1")}},10000);
$("[data-close-popup]").onclick=()=>$("#newsletterPopup").classList.remove("show");

renderCart();
