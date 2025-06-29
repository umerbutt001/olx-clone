var cardMobile = document.getElementById('cardmobile');
var big = document.getElementsByClassName('div3');
var backs = document.getElementById('back');
var cars = document.getElementById('cardcar')
var saveCards = document.getElementById('savecard')
var bikes = document.getElementById('cardbike')
var washCard = document.getElementById('cardwash')
var microWave = document.getElementById('cardmicro')
var ledTV  = document.getElementById('ledtv')
var Ac = document.getElementById('ac')
var Refrigerator = document.getElementById('fridge')
var wardRobes = document.getElementById('wardrobes')
var tablesChiar = document.getElementById('table')
var Bed = document.getElementById('beds') 
var dressingTable = document.getElementById('dressing-table')
var woodenChairs = document.getElementById('chairs')
var dinningTables = document.getElementById('dinningtables')
var Couch = document.getElementById('couchs')
var Kabnets = document.getElementById('kabnet')
// var previewBox = document.getElementById("imagePreview");
// var previewImg = document.getElementById("previewImg");
// var addToCartBtn = document.getElementById("addToCartBtn");
// var cartBtn = document.querySelector(".button2");
var previewBox = document.getElementById("imagePreview");
var previewImg = document.getElementById("previewImg");
var addToCartBtn = document.getElementById("addToCartBtn");
var cartOverlay = document.getElementById("cartOverlay");
var cartImagesContainer = document.getElementById("cartImagesContainer");
var closeCart = document.getElementById("closeCart");

function setCurrentView(view) {
  localStorage.setItem('currentView', view);
}


function phone(){
    saveCards.style.display = 'none';
    big[0].style.display = 'block';
    big[0].style.width = '99vw';
    big[0].style.justifyself = 'center'
    big[0].style.display = 'flex';
    big[0].style.flexwrap = 'wrap'
    big[0].style.justifycontent = 'space-evenly';
    big[0].style.margintop = '50px';

    setCurrentView('phone');
}



function back(){
    // Hide all div3 elements (product grids)
    for(let i = 0; i < big.length; i++){
        big[i].style.display = 'none';
    }
    saveCards.style.display = 'flex';
    cardMobile.style.display = 'block';
    cars.style.display = 'block';
    bikes.style.display = 'block';
    washCard.style.display = 'block';
    microWave.style.display = 'block';
    ledTV.style.display = 'block';
    Ac.style.display = 'block';
    Refrigerator.style.display = 'block';
    wardRobes.style.display = 'block';
    tablesChiar.style.display = 'block';
    Bed.style.display = 'block';
    dressingTable.style.display = 'block';
    woodenChairs.style.display = 'block';
    dinningTables.style.display = 'block';
    Couch.style.display = 'block';
    Kabnets.style.display = 'block'

    setCurrentView('saveCard');
}

function car(){
   saveCards.style.display = 'none'; 
//    cars.style.display = 'none'
   big[1].style.display = 'block'
   big[1].style.width = '99vw';
   big[1].style.justifyself = 'center'
   big[1].style.display = 'flex';
   big[1].style.flexwrap = 'wrap'
   big[1].style.justifycontent = 'space-evenly';
   big[1].style.margintop = '50px';
   setCurrentView('phone');
}
// function goback(){
//     big[1].style.display = 'none';
//     saveCards.style.display = 'flex'; 
//     cars.style.display = 'block';
// }



function bike(){
   saveCards.style.display = 'none'; 
//    bikes.style.display = 'none'
   big[2].style.display = 'block'
   big[2].style.width = '99vw';
   big[2].style.justifyself = 'center'
   big[2].style.display = 'flex';
   big[2].style.flexwrap = 'wrap'
   big[2].style.justifycontent = 'space-evenly';
   big[2].style.margintop = '50px';

   setCurrentView('phone');
}

function wash(){
   saveCards.style.display = 'none'; 
   bikes.style.display = 'none'
   big[3].style.display = 'block'
   big[3].style.width = '99vw';
   big[3].style.justifyself = 'center'
   big[3].style.display = 'flex';
   big[3].style.flexwrap = 'wrap'
   big[3].style.justifycontent = 'space-evenly';
   big[3].style.margintop = '50px';

   setCurrentView('phone');
}

function micro(){
   saveCards.style.display = 'none'; 
//    bikes.style.display = 'none'
   big[4].style.display = 'block'
   big[4].style.width = '99vw';
   big[4].style.justifyself = 'center'
   big[4].style.display = 'flex';
   big[4].style.flexwrap = 'wrap'
   big[4].style.justifycontent = 'space-evenly';
   big[4].style.margintop = '50px'; 

   setCurrentView('phone');
}

function led(){
   saveCards.style.display = 'none';
   big[5].style.display = 'block'
   big[5].style.width = '99vw';
   big[5].style.justifyself = 'center'
   big[5].style.display = 'flex';
   big[5].style.flexwrap = 'wrap'
   big[5].style.justifycontent = 'space-evenly';
   big[5].style.margintop = '50px';  

   setCurrentView('phone');
}


function ac(){
   saveCards.style.display = 'none';
   big[6].style.display = 'block'
   big[6].style.width = '99vw';
   big[6].style.justifyself = 'center'
   big[6].style.display = 'flex';
   big[6].style.flexwrap = 'wrap'
   big[6].style.justifycontent = 'space-evenly';
   big[6].style.margintop = '50px'; 
   
   setCurrentView('phone');
}


function refrigerator(){
    saveCards.style.display = 'none';
   big[7].style.display = 'block'
   big[7].style.width = '99vw';
   big[7].style.justifyself = 'center'
   big[7].style.display = 'flex';
   big[7].style.flexwrap = 'wrap'
   big[7].style.justifycontent = 'space-evenly';
   big[7].style.margintop = '50px';

   setCurrentView('phone');
}



function wardrobe(){
    saveCards.style.display = 'none';
   big[8].style.display = 'block'
   big[8].style.width = '99vw';
   big[8].style.justifyself = 'center'
   big[8].style.display = 'flex';
   big[8].style.flexwrap = 'wrap'
   big[8].style.justifycontent = 'space-evenly';
   big[8].style.margintop = '50px';  

   setCurrentView('phone');
}

function tables(){
   saveCards.style.display = 'none';
   big[9].style.display = 'block'
   big[9].style.width = '99vw';
   big[9].style.justifyself = 'center'
   big[9].style.display = 'flex';
   big[9].style.flexwrap = 'wrap'
   big[9].style.justifycontent = 'space-evenly';
   big[9].style.margintop = '50px'; 

   setCurrentView('phone');
}


function bed(){
saveCards.style.display = 'none';
   big[10].style.display = 'block'
   big[10].style.width = '99vw';
   big[10].style.justifyself = 'center'
   big[10].style.display = 'flex';
   big[10].style.flexwrap = 'wrap'
   big[10].style.justifycontent = 'space-evenly';
   big[10].style.margintop = '50px'; 

   setCurrentView('phone');
}


function dressingtable(){
saveCards.style.display = 'none';
   big[11].style.display = 'block'
   big[11].style.width = '99vw';
   big[11].style.justifyself = 'center'
   big[11].style.display = 'flex';
   big[11].style.flexwrap = 'wrap'
   big[11].style.justifycontent = 'space-evenly';
   big[11].style.margintop = '50px'; 

   setCurrentView('phone');
}


function chair(){
saveCards.style.display = 'none';
   big[12].style.display = 'block'
   big[12].style.width = '99vw';
   big[12].style.justifyself = 'center'
   big[12].style.display = 'flex';
   big[12].style.flexwrap = 'wrap'
   big[12].style.justifycontent = 'space-evenly';
   big[12].style.margintop = '50px'; 

   setCurrentView('phone');
}


function dinningtable(){
    saveCards.style.display = 'none';
   big[13].style.display = 'block'
   big[13].style.width = '99vw';
   big[13].style.justifyself = 'center'
   big[13].style.display = 'flex';
   big[13].style.flexwrap = 'wrap'
   big[13].style.justifycontent = 'space-evenly';
   big[13].style.margintop = '50px'; 

   setCurrentView('phone');
}


function couch(){
   saveCards.style.display = 'none';
   big[14].style.display = 'block'
   big[14].style.width = '99vw';
   big[14].style.justifyself = 'center'
   big[14].style.display = 'flex';
   big[14].style.flexwrap = 'wrap'
   big[14].style.justifycontent = 'space-evenly';
   big[14].style.margintop = '50px';
   
   setCurrentView('phone');
}


function kabnets(){
    saveCards.style.display = 'none';
   big[15].style.display = 'block'
   big[15].style.width = '99vw';
   big[15].style.justifyself = 'center'
   big[15].style.display = 'flex';
   big[15].style.flexwrap = 'wrap'
   big[15].style.justifycontent = 'space-evenly';
   big[15].style.margintop = '50px';

   setCurrentView('phone');
}



var cartImages = JSON.parse(localStorage.getItem('cartImages')) || [];

var allImages = document.getElementsByClassName("size");

for (var i = 0; i < allImages.length; i++) {
  allImages[i].addEventListener('click', function () {
    previewImg.src = this.src;
    previewBox.style.display = "block";
    localStorage.setItem('previewOpen', 'true');
    localStorage.setItem('previewSrc', this.src);
  });
}

function hidePreview() {
  previewBox.style.display = "none";
  localStorage.setItem('previewOpen', 'false');
  localStorage.removeItem('previewSrc');
}

addToCartBtn.addEventListener('click', function () {
  var imageSrc = previewImg.src;

  if (!imageSrc) {
    alert("No image selected!");
    return;
  }

   if (cartImages.includes(imageSrc)) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Image already in cart.",
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    cartImages.push(imageSrc);
    localStorage.setItem('cartImages', JSON.stringify(cartImages));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Image added to cart!",
      showConfirmButton: false,
      timer: 1500
    });
  }
  hidePreview();
});

var openCartBtns = document.getElementsByClassName("button2");

for (var j = 0; j < openCartBtns.length; j++) {
  openCartBtns[j].addEventListener('click', function () {
    if (cartImages.length === 0) {
      alert("Cart is empty.");
      return;
    }

    cartImagesContainer.innerHTML = "";

     for (var k = 0; k < cartImages.length; k++) {
      var img = document.createElement("img");
      img.src = cartImages[k];
      img.style.width = "100px";
      img.style.margin = "5px";
      cartImagesContainer.appendChild(img);
    }

    cartOverlay.style.display = "flex";
     localStorage.setItem('cartOpen', 'true');
  });
}

closeCart.addEventListener('click', function () {
  cartOverlay.style.display = "none";
   localStorage.setItem('cartOpen', 'false');
});