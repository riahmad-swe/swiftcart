const BASE_URL = "https://fakestoreapi.com";

const topRatedContainer = document.getElementById("top-rated");

function productCard(product) {
	return `
        <div class="bg-zinc-100 rounded-3xl shadow-md hover:shadow-lg shadow-black/10 transition duration-200 flex flex-col">
            <div class="overflow-hidden rounded-t-3xl h-60 mb-5 bg-zinc-200 p-4">
                <img src="${product.image}" class="h-full object-contain mx-auto hover:scale-125 transition-transform duration-300"/>
            </div>
            <div class="px-6 pb-6 flex flex-col gap-3">
                <h3 class="font-bold text-lg truncate -mb-1.5">${product.title}</h3>
                <div className="flex items-center gap-2">
                    <span class="text-blue-600 text-lg font-bold">💵 $${product.price}</span>
                    <span class="font-semibold">⭐️ ${product.rating.rate}</span>
                </div>
                <span class="px-3 py-1 w-fit rounded-full bg-blue-600 text-zinc-50 font-medium text-sm capitalize">🏷️ ${product.category}</span>
                <div class="mt-2 space-y-2">
                    <button class="w-full bg-zinc-300/75 hover:bg-zinc-200 py-2 rounded-lg font-semibold cursor-pointer">Details</button>
                    <button class="w-full bg-blue-600 text-zinc-50 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function loadTopRated() {
	try {
		const res = await fetch(BASE_URL + "/products");
		const products = await res.json();
		const top = products
			.sort((a, b) => b.rating.rate - a.rating.rate)
			.slice(0, 3);
		topRatedContainer.innerHTML = top.map(productCard).join("");
	} catch (error) {
		topRatedContainer.innerHTML =
			"<p class='text-center text-red-500 col-span-full'>Failed to load top products.</p>";
	}
}

loadTopRated();
