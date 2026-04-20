const products = [
    { id: 1, name: "Modern Grey Sofa", price: 1800, img:"images/sofa.jpg" },
    { id: 2, name: "Wooden Coffee Table", price: 9500, img: "images/table1.jpg" },
    { id: 3, name: "Royal King Bed", price: 25000, img: "images/bed.jpg" },
    { id: 4, name: "Velvet Accent Chair", price: 4200, img: "images/chair1.jpg" },
    { id: 5, name: "Modern Wardrobe", price: 3200, img: "images/wardrobe.jpg" },
    { id: 6, name: "Minimalist Study Desk", price: 7500, img: "images/desk1.jpg" },
    { id: 7, name: "Modern Pendant Light", price: 1200, img: "images/lamp1.jpg" },
    { id: 8, name: "Abstract Area Rug", price: 5000, img: "images/carpet.jpg" }
];

let cart = JSON.parse(localStorage.getItem('my_furniture_cart')) || [];

function renderProducts() {
    const list = document.getElementById('product-list');
    if(!list) return;
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">${p.price.toLocaleString()} EGP</p>
            <button onclick="addToCart(${p.id})" class="add-btn">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) cart = cart.filter(i => i.id !== id);
        updateCartUI();
    }
}

function updateCartUI() {
    localStorage.setItem('my_furniture_cart', JSON.stringify(cart));
    
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPrice = document.getElementById('total-price');

    if(cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if(cartItemsList) {
        if(cart.length === 0) {
            cartItemsList.innerHTML = "<p>Your cart is currently empty.</p>";
        } else {
            cartItemsList.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div style="flex:1; margin-left:15px">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString()} EGP</p>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if(totalPrice) totalPrice.innerText = total.toLocaleString();
}

window.onload = () => {
    renderProducts();
    updateCartUI();
};
