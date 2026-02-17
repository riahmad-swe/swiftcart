const BASE_URL = "https://fakestoreapi.com";

const productsContainer = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");

const productCard = (product) => {
	return `
        <div class="bg-zinc-100 rounded-3xl shadow-md hover:shadow-lg shadow-black/10 transition duration-200 flex flex-col">
            <div class="overflow-hidden rounded-t-3xl h-60 mb-5 bg-zinc-200 p-4">
                <img src="${product.image}" class="h-full object-contain mx-auto hover:scale-125 transition-transform duration-300"/>
            </div>
            <div class="px-6 pb-6 flex flex-col gap-3">
                <h3 class="font-bold text-lg truncate -mb-1.5">${product.title}</h3>
                <div className="flex items-center">
                    <span class="text-blue-600 text-[17px] font-bold inline-block">💵 $${product.price}</span>
                    <span class="font-semibold inline-block ml-1">⭐ ${product.rating.rate}</span>
                </div>
                <span class="px-3 py-1 w-fit rounded-full bg-blue-600 text-zinc-50 font-medium text-sm capitalize">🏷️ ${product.category}</span>
                <div class="mt-2 space-y-2">
                    <button
                        class="w-full bg-zinc-300/75 hover:bg-zinc-200 py-2 rounded-lg font-semibold cursor-pointer"
                        onclick="openDetailsModal(${product.id})"
                    >
                        Details
                    </button>
                    <button
                        class="w-full bg-blue-600 text-zinc-50 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
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

const loadCategories = async () => {
	try {
		const res = await fetch(BASE_URL + "/products/categories");
		const categories = await res.json();

		categoriesContainer.innerHTML =
			`<button 
        class="px-4 py-2 bg-zinc-950 text-zinc-50 hover:bg-blue-600 hover:text-white text-sm md:text-base rounded-lg"
        onclick="activateCategory(this, '')"
        >
                All
                </button>` +
			categories
				.map((category) => {
					const categoryEndpoint = category
						.replace(" ", "%20")
						.replace("'", "%27");
					return `
                        <button 
                        class="px-4 py-2 bg-gray-200 rounded-lg font-medium text-sm md:text-base hover:bg-blue-600 hover:text-white capitalize"
                        onclick="activateCategory(this, '${categoryEndpoint}')"
                        >
                        ${category}
                        </button>
                        `;
				})
				.join("");
	} catch (error) {
		categoriesContainer.innerHTML =
			"<p class='text-red-600 text-lg font-medium'>Failed to load categories.</p>";
	}
};

const loadProducts = async (endpoint = "/products") => {
	try {
		productsContainer.innerHTML =
			"<p class='text-center text-2xl text-zinc-500 font-semibold col-span-full'>Loading...</p>";

		const res = await fetch(BASE_URL + endpoint);
		const data = await res.json();

		productsContainer.innerHTML = data.map(productCard).join("");
	} catch (error) {
		productsContainer.innerHTML =
			"<p class='text-center text-red-600 text-xl font-medium col-span-full'>Failed to load products.</p>";
	}
};

const activateCategory = (btn, endpoint) => {
	btn.innerText === "All"
		? loadProducts()
		: loadProducts(`/products/category/${endpoint}`);

	const buttons = categoriesContainer.querySelectorAll("button");
	buttons.forEach((button) => {
		button.classList.remove("bg-zinc-950", "text-zinc-50");
		button.classList.add("bg-gray-200");
	});

	btn.classList.remove("bg-gray-200");
	btn.classList.add("bg-zinc-950", "text-zinc-50");
};

loadCategories();
loadProducts();
