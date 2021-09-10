//Création de nos produits (stock)
const product = [
        {id: 1, nom: "paquet de chips", prix: 4, image: "chips.png" },
        {id: 2, nom: "saumon sauvage", prix: 30, image: "saumon.png" },
        {id: 3, nom: "pack de salvetat", prix: 15, image: "salvetat.png" },
        {id: 4, nom: "paquet de bonbons", prix: 7, image: "bonbons.png" },
        {id: 5, nom: "cacahuètes", prix: 2, image: "cacahuetes.png" }
]

const maDivCard = document.querySelector("#productCard");


//
function makeACard(product){
        let productCardReady = `
                                                <div class="card-group col-5 p-2">
                                                        <div class="card shadow-sm">
                                                                <img id="productCardImg" src="img/${product.image}" class="card-img-top img-fluid" alt="...">
                                                        
                                                                <div class="card-body">
                                                                        <h5 id="productCardName" class="card-title">${product.nom}</h5>
                                                                        <div class="card-footer">
                                                                                 <div class="d-flex justify-content-between align-items-center">
                                                                                 
                                                                                        <div class="btn-group ajout">
                                                                                                <button type="button" class="btn btn-sm btn-outline-secondary">Voir 👓 </button>
                                                                                                <button class="btn btn-outline-secondary moinsBtn">-</button>
                                                                                                <input type="text"  value="0" class="compteur" data-productId="${product.id}">
                                                                                                <button class="btn btn-outline-secondary plusBtn" >+</button>
                                                                                                <button type="button" class="btn btn-sm btn-outline-success cart-btn ajouterToCart disabled " id="${product.id}">Ajouter au panier 🛒 </button>
                                                                                        </div>
                                                                                        <small id="productCardPrice" class="text-muted">${product.prix}€</small>
                                                                                        <div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                        </div>
                                        `
        
        return productCardReady;
}


function getProductsCards(products){
        let cards = "";
        
        products.forEach(elt => {
                cards += makeACard(elt);
        })
        
        return cards;
}

function showProducts(){
        
        //On insère d'abord les cards avec les boutons => on créer les boutons
        maDivCard.innerHTML = getProductsCards(product);
        
        //Ensuite on affiche les boutons et fonctionnalités
        //Chaque fois qu'on clique sur le bouton "ajouter au panier" => id du produit qui s'affiche
        
        
        
        //Récupération des div.ajout avec leurs éléments
        const mesDivDajout = document.querySelectorAll(".ajout");   //=> tableau de div
        const allAddBtns = document.querySelectorAll(".ajouterToCart");
        //pour chaque div.ajout
        mesDivDajout.forEach(div => {
                const plusBtn = div.querySelector(".plusBtn");
                const lessBtn = div.querySelector(".moinsBtn");
                const addToCartBtn = div.querySelector(".ajouterToCart");
                const compteur = div.querySelector(".compteur");
        
                plusBtn.addEventListener("click", () => {
                        plus(compteur, addToCartBtn);
                })
                
                lessBtn.addEventListener("click", () => {
                        moins(compteur, addToCartBtn);
                })
        
                //au click d'un bouton ajouter au panier => récupérer la valeur du compteur
                addToCartBtn.addEventListener("click", () => {
                        addToCart(addToCartBtn.id, compteur.value);
                        //la logger dans une alert ou dans la console
                        console.log(" Ajout de " + compteur.value + " unités dans le panier");
                })
        })
        showCount();
        
}

//accéder aux éléments afin de pouvoir les observer et les manipuler

//2 fonctions :
// fonction plus(){} => en charge d'incrémenter le compteur quand on click sur +
function plus(inputCompteur, addToCartBtn){
        
        inputCompteur.value++;
        if(inputCompteur.value > 0) addToCartBtn.classList.remove("disabled");
        
        showCount();
        
        
}

//fonction moins(){} => en charge de décrémenter le compteur quand on clicke sur - sauf s'il est à 0
function moins(inputCompteur, addToCartBtn){
        
        if (inputCompteur.value > 0){
                inputCompteur.value--;
                //Si un compteur a une value de 0, alors on ajoute la classe "disabled" au bouton "ajouter au panier"
        } else if(inputCompteur.value <= 0){
                addToCartBtn.classList.add("disabled");
        }
        
        showCount();
        
}


//-------------------------------------------------------------------------------------------------------------------------------------------

//redirection des boutons shop et panier
const btnShop = document.querySelector('#btnShop');
btnShop.addEventListener('click', (evt) => {
        showProducts(evt.target.value);
})

const btnPanier = document.querySelector('#btnPanier');
btnPanier.addEventListener('click', (evt) => {
        displayCart(evt.target.value);
})


//-------------------------------------------------------------------------------------------------------------------------------------------

function addToCart(idProduct, quantityToAdd){
        quantityToAdd = parseInt(quantityToAdd);
        //Ajouter un nouvel élément au panier avec le bon id et une quantity = 1
        let productToFind = cart.find(elt => elt.id == idProduct);
        //Si pas d'élément avec le même id
        if (!productToFind){
                //ajout au panier
                cart.push({id: parseInt(idProduct), quantity: quantityToAdd});
                console.log(cart, " ✔️");
        } else{
                //sinon incrémentation de la quantité
                productToFind.quantity+= quantityToAdd;
                console.log(cart, " ✔️");
        }
        //La même chose en ternaire
        //productToFind ? productToFind.quantity++   :   cart.push(newProduct) ;
        
        showCount();
        
}

//*----------------------------------------------------------------------------------------------------------------------------------
const cart = [
        {id:4, quantity: 5},
        {id:2, quantity: 3}
];

function displayCart(){
        let total =0;
        //Initialisation de mon contenu de papier
        let contenu = '';
        
        cart.forEach(elt => {
                let productToFind = product.find(e => e.id == elt.id);
                let tr = `
                <tr>
                                                        <td>${productToFind.nom}<img id="productCardImg" src="img/${productToFind.image}" class="card-img-top img-fluid"width="30"height="30"></td>
                                                        <td>${productToFind.prix}€</td>
                                                        <td class="quantite" data-productId="${productToFind.id}">
                                                                <button class="btn btn-outline-warning moinsBtn">-</button>
                                                                ${elt.quantity}
                                                                <button class="btn btn-outline-warning plusBtn" >+</button>
                                                        </td>
                                                        <td>${elt.quantity*productToFind.prix}€</td>
                                                        <td><button class="btn btn-outline-danger" id="${productToFind.id}">X</button></td>
                                                </tr>
        `
                total +=(elt.quantity*productToFind.prix);
                contenu += tr;
                
        });
        
        let table = `
                                <table class="table table-hover table-dark">
                                        <thead>
                                                <tr>
                                                        <th scope="col">Produit</th>
                                                        <th scope="col">Prix</th>
                                                        <th scope="col">Quantité</th>
                                                        <th scope="col">Sous-total</th>
                                                        <th scope="col">Actions</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                       
                                       ${contenu}
                                        
                                        </tbody>
                                        <tfoot>
                                                <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td><strong>Total :</strong></td>
                                                        <td>${total}€</td>
                                                        <td><button class="btn btn-outline-success">Payer</button></td>
                                                </tr>
                                </tfoot>
                                </table>
        `
        maDivCard.innerHTML = table;
        
        const deleteBtn = document.querySelectorAll(".btn-outline-danger");
        deleteBtn.forEach(bouton => {
                bouton.addEventListener("click", () =>{
                        //méthode du prof
                        deleteToCart(bouton.id);
                        //moins(product.quantity, bouton.id);
        
                        //Ma méthode que j'ai trouvé
                        //trouver dans un tableau d'objet l'index de l'élément à partir de sa propriété id
                       /* let productToFind = product.find(e => e.id == bouton.id);
                        if (productToFind){
                                //récupération du produit dans le tableau Cart
                                productToFind = cart.find(e => e.id == productToFind.id);
                                //Récupération de l'index du produit dans le tableau cart
                                let productToFindIndex = cart.indexOf(productToFind);
                                //suppression du produit dans le tableau cart
                                cart.splice(productToFindIndex, 1);
                                
                                console.log( "✔️ found dans le tableau à l'index "+ productToFindIndex+ ": " + productToFind.id + productToFind.nom);
                        } else{
                                console.log("❎️ not found")
                        }*/
                        
                })
        })
        //A l'affichage du panier, on veut attraper tout ces td et récuperer l'attribut data-productId
        const tdsQuantite = document.querySelectorAll(".quantite");
        
        tdsQuantite.forEach(td => {
                //récupération de la valeur du data-productId = récupération de l'id du produit
                const dataProductId = td.getAttribute("data-productId");
                //récupération bouton moins
                const lessBtn = td.querySelector(".moinsBtn");
                //récupération bouton plus
                const plusBtn = td.querySelector(".plusBtn");
                
                lessBtn.addEventListener("click", () => {
                        deleteQuantityProduct(dataProductId);
                })
                
                plusBtn.addEventListener("click", () => {
                        addQuantityProduct(dataProductId);
                })
        })
        
        showCount();
        
        
}
//function enleveUnArticle => modifie le panier et redéclenche l'affichage du panier
function deleteQuantityProduct(productId){
        let index = cart.findIndex(product => product.id == productId);
        
        //Si le produit à une quantité de 1 et que je clique sur - -> je veux tomber à 0 -> je veux enlever le produit du panier
        if(cart[index].quantity == 1){
                deleteToCart(productId)
                //pas besoin de displayCart car il est déjà contenu dans la fonction deleteToCart
        } else{
                cart[index].quantity--;
                displayCart();
        }
        showCount();
}

//function ajouteUnArticle => modifie le panier et redéclenche l'affichage du panier
function addQuantityProduct(productId){
        
        //On cherche l'index du produit dans le tableau panier cart
        let index = cart.findIndex(product => product.id == productId);
        cart[index].quantity++;
        
        displayCart();
        showCount();
        
}

function showCount(){
        let count = 0;
        const locateCount = document.querySelector("#count");
        
        cart.forEach(elt => {
                let productToFind = product.find(e => e.id == elt.id);
                let index = cart.findIndex(product => product.id == productToFind.id);
                let quantities = cart[index].quantity;
                count += quantities;
        })
        console.log(count);
        
        //remplace le contenu de #count par le total des quantités
        locateCount.innerHTML = count;
        
}



//-----------------------------------------------------------------------------------------------------------------------------------------------------
//fonction qui attends un id de produit => bouton.id à l'appel de cette fonction là haut
function deleteToCart(idProduct){
        let index = cart.findIndex(item => item.id === parseInt(idProduct) );
        cart.splice(index, 1);
        //On rappel la fonction d'affichage pour que ça se recharge direct
        displayCart();
        
        showCount();
        
}






