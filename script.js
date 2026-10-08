const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const SHOPIFY_STORE_URL = "https://b51isi-cm.myshopify.com";
const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const SHOPIFY_VARIANTS = {
  hoodie: {
    colors: ["Grey", "Brown", "Cream", "Beige", "Black"],
    ids: [
      "67651412492679", "67651412525447", "67651412558215", "67651412590983", "67651412623751", "67651412656519",
      "67651412689287", "67651412722055", "67651412754823", "67651412787591", "67651412820359", "67651412853127",
      "67651412885895", "67651412918663", "67651412951431", "67651412984199", "67651413016967", "67651413049735",
      "67651413082503", "67651413115271", "67651413148039", "67651413180807", "67651413213575", "67651413246343",
      "67651413279111", "67651413311879", "67651413344647", "67651413377415", "67651413410183", "67651413442951"
    ]
  },
  pants: {
    colors: ["Black", "Beige", "Grey", "Brown", "Cream"],
    ids: [
      "67651413475719", "67651413508487", "67651413541255", "67651413574023", "67651413606791", "67651413639559",
      "67651413672327", "67651413705095", "67651413737863", "67651413770631", "67651413803399", "67651413836167",
      "67651413868935", "67651413901703", "67651413934471", "67651413967239", "67651414000007", "67651414032775",
      "67651414065543", "67651414098311", "67651414131079", "67651414163847", "67651414196615", "67651414229383",
      "67651414262151", "67651414294919", "67651414327687", "67651414360455", "67651414393223", "67651414425991"
    ]
  },
  outfit: {
    colors: ["Beige", "Brown", "Grey", "Black", "Cream"],
    ids: [
      "67651360850311", "67651414458759", "67651414491527", "67651414524295", "67651414557063", "67651414589831",
      "67651414622599", "67651414655367", "67651414688135", "67651414720903", "67651414753671", "67651414786439",
      "67651414819207", "67651414851975", "67651414884743", "67651414917511", "67651414950279", "67651414983047",
      "67651415015815", "67651415048583", "67651415081351", "67651415114119", "67651415146887", "67651415179655",
      "67651415212423", "67651415245191", "67651415277959", "67651415310727", "67651415343495", "67651415376263"
    ]
  }
};

localStorage.removeItem("moonstyle_demo_account_name");
localStorage.removeItem("moonstyle_demo_account_email");

let cart = JSON.parse(localStorage.getItem("moonstyle_cart") || "[]");
let pendingProduct = null;

function saveCart(){ localStorage.setItem("moonstyle_cart", JSON.stringify(cart)); renderCart(); }
function addToCart(item){
  const existing = cart.find(x => x.name === item.name && x.size === item.size);
  if(existing){ existing.qty++; existing.variantId = item.variantId; }
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

function getVariantId(kind, color, size){
  const product = SHOPIFY_VARIANTS[kind];
  if(!product) return null;
  const colorIndex = product.colors.indexOf(color);
  const sizeIndex = SIZES.indexOf(size);
  if(colorIndex < 0 || sizeIndex < 0) return null;
  return product.ids[colorIndex * SIZES.length + sizeIndex] || null;
}

function openVariantPicker(item){
  pendingProduct = item;
  $("#variantProductName").textContent = `${item.name} · ${item.color}`;
  $("#variantStatus").textContent = "";
  const selectedSize = $("#sizeFilter").value;
  $("#variantSize").value = SIZES.includes(selectedSize) ? selectedSize : "";
  $("#variantOverlay").classList.add("open");
  $("#variantSize").focus();
}

function closeVariantPicker(){
  $("#variantOverlay").classList.remove("open");
  pendingProduct = null;
}

function addFromCard(card){
  const kind = card.dataset.model === "Outfit" ? "outfit" : card.dataset.model === "Broek" ? "pants" : "hoodie";
  openVariantPicker({
    name: card.dataset.product,
    price: +card.dataset.price,
    color: card.dataset.color,
    kind,
    image: card.dataset.image
  });
}

const imageViewer = $("#imageViewer");
const imageViewerImage = imageViewer.querySelector("img");
const imageViewerCaption = $(".image-viewer-caption");

function openImageViewer(image){
  imageViewerImage.src = image.currentSrc || image.src;
  imageViewerImage.alt = image.alt;
  imageViewerCaption.textContent = image.alt;
  imageViewer.showModal();
}

$$(".product-image img, .feature-image img, .hero-media img").forEach(image=>{
  image.tabIndex = 0;
  image.setAttribute("role","button");
  image.setAttribute("aria-label",`Vergroot foto: ${image.alt}`);
  image.addEventListener("click",()=>openImageViewer(image));
  image.addEventListener("keydown",event=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      openImageViewer(image);
    }
  });
});

$(".image-viewer-close").addEventListener("click",()=>imageViewer.close());
imageViewer.addEventListener("click",event=>{
  if(event.target===imageViewer) imageViewer.close();
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&imageViewer.open) imageViewer.close();
});

$$(".quick-add").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();addFromCard(btn.closest(".product-card"));}));
$("[data-feature-add]").onclick=()=>openVariantPicker({name:"Moon Zip — Black",price:35,color:"Black",kind:"hoodie",image:"assets/moonstyle black.jpg"});
$("#variantForm").addEventListener("submit",event=>{
  event.preventDefault();
  if(!pendingProduct) return;
  const size=$("#variantSize").value;
  const variantId=getVariantId(pendingProduct.kind,pendingProduct.color,size);
  if(!variantId){
    $("#variantStatus").textContent="Deze kleur- en maatcombinatie is niet beschikbaar in Shopify. Neem contact op met de winkel.";
    return;
  }
  addToCart({...pendingProduct,size,variantId});
  closeVariantPicker();
});
$$("[data-close-variant]").forEach(button=>button.addEventListener("click",closeVariantPicker));
$("#variantOverlay").addEventListener("click",event=>{if(event.target.id==="variantOverlay")closeVariantPicker();});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&$("#variantOverlay").classList.contains("open")) closeVariantPicker();
});
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
$("#checkoutBtn").onclick=()=>{
  const status=$("#checkoutStatus");
  if(!cart.length){
    status.textContent="Je winkelwagen is nog leeg.";
    return;
  }

  const items=cart.map(item=>{
    const name=item.name.toLowerCase();
    const kind=item.kind || (name.includes("outfit") ? "outfit" : /pants|cargo|wide leg/.test(name) ? "pants" : "hoodie");
    return {
      id: item.variantId || getVariantId(kind,item.color,item.size),
      quantity: item.qty
    };
  });
  if(items.some(item=>!item.id || !Number.isInteger(item.quantity) || item.quantity < 1)){
    status.textContent="Een product in je winkelwagen kan niet aan Shopify worden gekoppeld. Verwijder het en voeg het opnieuw toe.";
    return;
  }

  const checkoutUrl = items.map(item=>`${item.id}:${item.quantity}`).join(",");
  window.location.assign(`${SHOPIFY_STORE_URL}/cart/${checkoutUrl}`);
};

$("#newsletterForm").onsubmit=e=>{e.preventDefault();alert("Welkom bij de Faith Club. Je ontvangt 10% korting.");e.target.reset();};
$("#popupForm").onsubmit=e=>{e.preventDefault();$("#newsletterPopup").classList.remove("show");alert("Welkom bij de Faith Club. Je ontvangt 10% korting.");};

setTimeout(()=>{if(!sessionStorage.getItem("moonstyle_popup_seen")){$("#newsletterPopup").classList.add("show");sessionStorage.setItem("moonstyle_popup_seen","1")}},10000);
$("[data-close-popup]").onclick=()=>$("#newsletterPopup").classList.remove("show");

renderCart();
