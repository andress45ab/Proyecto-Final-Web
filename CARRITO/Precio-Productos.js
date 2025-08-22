const cartInfo = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsSections = document.querySelectorAll('.products');
const ordenarBtn = document.getElementById('ordenar-btn');
const ordenarForm = document.getElementById('ordenar-form');

// Lista de todos los contenedores de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

// Eventos de click en los productos para ambas secciones
productsSections.forEach(section => {
    section.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.parentElement;

            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h4').textContent,
                price: product.querySelector('h3').textContent,
            };

            const exists = allProducts.some(product => product.title === infoProduct.title);

            if (exists) {
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                allProducts = [...products];
            } else {
                allProducts = [...allProducts, infoProduct];
            }
            showHTML();
        }
    });
});

// Evento de click para eliminar producto
rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(
            (product) => product.title !== title
        );
        showHTML();
    }
});

// Desactivar el envío del formulario si el carrito está vacío
ordenarForm.addEventListener('submit', e => {
    if (allProducts.length === 0) {
        e.preventDefault();
        alert('El carrito está vacío. Agrega productos para poder ordenar.');
    }
});

// Funcion para mostrar HTML
const showHTML = () => {
    // Si no hay productos, oculta el carrito y el botón de ordenar
    if (!allProducts.length) {
        cartInfo.classList.add('hidden-cart');
        ordenarBtn.style.display = 'none'; 
        return;
    }
    
    // Si hay productos, muestra el carrito y el botón de ordenar
    cartInfo.classList.remove('hidden-cart');
    ordenarBtn.style.display = 'block'; 
    rowProduct.innerHTML = '';
    
    // Limpia los inputs ocultos del formulario antes de agregar los nuevos
    const hiddenInputs = ordenarForm.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach(input => input.remove());

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <img src="img/close-icon.png" alt="Icono de cierre" class="icon-close">
        `;

        rowProduct.append(containerProduct);

        // Crea inputs ocultos para el formulario
        const hiddenInputTitle = document.createElement('input');
        hiddenInputTitle.type = 'hidden';
        hiddenInputTitle.name = `producto[]`;
        hiddenInputTitle.value = `${product.title} - Cantidad: ${product.quantity}`;
        ordenarForm.appendChild(hiddenInputTitle);
        
        total =
            total +
            parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.textContent = `$${total}`;
    countProducts.textContent = totalOfProducts;
};

// Ocultar/mostrar carrito al hacer click en el ícono
const btnCart = document.querySelector('.container-cart-icon');
const cartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    cartProducts.classList.toggle('hidden-cart');
});