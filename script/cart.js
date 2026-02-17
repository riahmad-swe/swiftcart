const BASE_URL = "https://fakestoreapi.com";

const cartItemsContainer = document.getElementById("cart-items");
const summaryCount = document.getElementById("summary-count");
const summaryTotal = document.getElementById("summary-total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const setCartCount = () => {
	const cartCountChip = document.getElementById("cart-count");
	if (cartCountChip) {
		cartCountChip.innerText = cart.length;
	}
};

const removeCartItem = (index) => {
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));

	setCartCount();
	showCart();
};

const openDetailsModal = (id) => {
	fetch(`https://fakestoreapi.com/products/${id}`)
		.then((res) => res.json())
		.then((product) => {
			document.getElementById("modal-title").innerText = product.title;
			document.getElementById("modal-image").src = product.image;
			document.getElementById("modal-category").innerText =
				"Category: " + product.category;
			document.getElementById("modal-price").innerText =
				"Price: $" + product.price;
			document.getElementById("modal-rating").innerText =
				"Rating: ⭐ " +
				product.rating.rate +
				" (" +
				product.rating.count +
				")";
			document.getElementById("modal-description").innerText =
				product.description;

			document.getElementById("product-modal").showModal();
		});
};

const showCart = () => {
	if (cart.length === 0) {
		cartItemsContainer.innerHTML =
			"<p class='text-lg font-medium text-gray-600'>Your cart is empty.</p>";
		summaryCount.innerText = 0;
		summaryTotal.innerText = "$0.00";
		return;
	}

	let totalPrice = 0;
	cartItemsContainer.innerHTML = cart
		.map((item, idx) => {
			totalPrice += item.price;
			return cartItemCard(item, idx);
		})
		.join("");

	summaryCount.innerText = cart.length;
	summaryTotal.innerText = `$${totalPrice.toFixed(2)}`;
};

const cartItemCard = (item, idx) => {
	return `
			<div class="bg-white pl-6 pr-8 py-6 rounded-[20px] shadow-md shadow-black/5 flex flex-col md:flex-row gap-4 items-center">
                    <img src="${item.image}" class="size-24 object-contain hover:scale-115 transition-transform duration-300" />
				<div class="flex-1">
					<h3 class="font-semibold text-lg mb-1 line-clamp-1">${item.title}</h3>
					<p class="text-gray-600 text-[15px] font-medium capitalize mb-2">${item.category}</p>
					<p class="text-zinc-950 font-bold">$${item.price}</p>
				</div>
                <div>
                    <button 
                        class="bg-blue-500 text-zinc-50 font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        onclick="openDetailsModal(${item.id})"
                    >
                        Details
                    </button>
                    <button 
                        class="bg-red-500 text-zinc-50 font-semibold ml-1 px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                        onclick="removeCartItem(${idx})"
                    >
                        Remove
                    </button>
                </div>
			</div>
			`;
};

setCartCount();
showCart();
