const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await res.json()
    displayCategories(data.categories);
}

const loadAllPets = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllPets(data.pets)
}

const loadCategoryPets = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`);
    const data = await res.json();
    displayAllPets(data.data)
}

const displayCategories = (categories) => {
    const buttonContainer = document.getElementById('category');
    buttonContainer.innerHTML = "";

    categories.forEach(element => {
        const button = document.createElement("div");
        button.classList.add("p-2");
        button.innerHTML = `
        <button class="btn text-center text-xl font-bold border px-12 border-gray-300" onclick="handleCategoryClick(this, '${element.category}')">
            <img class="w-7" src="${element.category_icon}" /> ${element.category}
        </button>`;
        buttonContainer.append(button);
    });
}

const handleCategoryClick = (button, categoryId) => {
    const buttons = document.querySelectorAll('#category button');
    buttons.forEach(btn => btn.classList.remove("bg-[#0E7A81]", "text-white"));

    button.classList.add("bg-[#0E7A81]", "text-white");
    loadCategoryPets(categoryId);
}

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";
    petsContainer.classList.remove("grid");

    if (pets.length === 0) {
        petsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-8 rounded-lg bg-[#da7a7a08]">
                <img src="assests/error.webp" />
                <h2 class="mt-4 text-2xl font-bold text-primary">No Information Available</h2>
                <p class="mt-2 text-center">
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        `;
    } else {
        petsContainer.classList.add("grid");
        pets.forEach(pet => {
            const petsCard = document.createElement("div");
            petsCard.innerHTML = `
                <div class="max-w-sm rounded-lg overflow-hidden border-2 p-4">
                    <img class="rounded-lg border" src="${pet.image}" />
                    <div class="py-4">
                        <h2 class="text-lg font-semibold">${pet.pet_name}</h2>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=101715&format=png" /> Breed:
                            ${pet.breed || "Not Available"}
                        </p>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=42287&format=png" /> Birth:
                            ${pet.date_of_birth || "Not Available"}
                        </p>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=47197&format=png" /> Gender:
                            ${pet.gender || "Not Available"}
                        </p>
                        <p class="flex gap-2 price"><img class="w-5" src="https://img.icons8.com/?size=40&id=45859&format=png" /> Price:
                            ${pet.price ? pet.price + '$' : "Not Available"}
                        </p>
                    </div>
                    <div class="flex justify-between">
                        <button onclick="handleLike('${pet.image}')" class="btn"><img class="w-7" src="https://img.icons8.com/?size=80&id=42460&format=png" alt=""></button>
                        <button class="btn text-[#0E7A81]" onclick="adoptPet(event)">Adopt</button>
                        <button onclick="showPetDetails('${pet.petId}')" class="btn text-[#0E7A81]">Details</button>
                    </div>
                </div>
            `;
            petsContainer.append(petsCard);
        });
    }
}


const showPetDetails = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const { breed, vaccinated_status, price, date_of_birth, image, gender, pet_details, pet_name } = data.petData
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <div class="overflow-hidden p-4">
                    <img class="rounded-lg border" src="${image}" />
                    <div class="py-4">
                        <h2 class="text-lg font-semibold">${pet_name}</h2>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=101715&format=png" /> Breed:
                            ${breed || "Not Available"}
                        </p>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=42287&format=png" /> Birth:
                            ${date_of_birth || "Not Available"}
                        </p>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=47197&format=png" /> Gender:
                            ${gender || "Not Available"}
                        </p>
                        <p class="flex gap-2 price"><img class="w-5" src="https://img.icons8.com/?size=40&id=45859&format=png" /> Price:
                            ${price ? price + '$' : "Not Available"}
                        </p>
                        <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=47197&format=png" /> Vaccinated Status:
                            ${vaccinated_status || "Not Available"}
                        </p>
                        <h2 class="text-xl font-bold py-5">Details Information</h2>
                        <p class="flex gap-2">
                            ${pet_details || "Not Available"}
                        </p>

                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `

    my_modal_5.showModal()

}

const handleLike = (petImg) => {
    const imgContainer = document.getElementById('liked-pets');
    const likedImg = document.createElement("div");
    likedImg.classList.add("p-2");
    likedImg.innerHTML = `
    <img class="rounded-lg object-cover" src='${petImg}' />
    `;
    imgContainer.appendChild(likedImg);
}

const adoptPet = (event) => {
    const button = event.target;
    button.innerText = "Adopted";
    button.disabled = true;
    button.classList.add("bg-gray-300", "cursor-not-allowed");
}

const sortPetsByPrice = () => {
    const petsContainer = document.getElementById('pets');
    let pets = Array.from(petsContainer.children);

    pets.sort((a, b) => {
        let priceA = parseFloat(a.querySelector(".price").textContent.replace("Price:", "").trim().replace("$", "")) || 0;
        let priceB = parseFloat(b.querySelector(".price").textContent.replace("Price:", "").trim().replace("$", "")) || 0;

        return priceB - priceA;
    });

    petsContainer.innerHTML = "";
    pets.forEach(pet => petsContainer.appendChild(pet));
}

document.getElementById('sort-price').addEventListener('click', sortPetsByPrice);

loadCategories()
loadAllPets()

