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






const displayCategories = (category) => {
    const buttonContainer = document.getElementById('category')
    category.forEach(element => {
        const button = document.createElement("div");
        button.classList.add("p-2")
        button.innerHTML = `
        <button class ="btn text-center text-xl font-bold  border px-12 border-gray-300"> <img class="w-7" src="${element.category_icon}" /> ${element.category} </button>
        
        `
        buttonContainer.append(button)
    });

}

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets')
    pets.forEach(pet => {
        const petsCard = document.createElement("div");
        petsCard.innerHTML = `
        
    <div class="max-w-sm rounded-lg overflow-hidden  border-2 p-4">
        <img class=" rounded-lg border" src="${pet.image}" />
        <div class="py-4">
            <h2 class="text-lg font-semibold">${pet.pet_name}</h2>
            <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=101715&format=png" /> Breed:
                ${pet.breed}
            </p>
            <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=42287&format=png" /> Birth:
                ${pet.date_of_birth}
            </p>
            <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=80&id=47197&format=png" /> Gender:
                ${pet.gender}
            </p>
            <p class="flex gap-2"><img class="w-5" src="https://img.icons8.com/?size=40&id=45859&format=png" /> Price:
                ${pet.price}$
            </p>

        </div>
        <div class="flex justify-between">
            <button class="btn"><img class="w-7" src="https://img.icons8.com/?size=80&id=42460&format=png"
                    alt=""></button>
            <button class="btn text-[#0E7A81]">Adopt</button>
            <button class="btn text-[#0E7A81]">Details</button>
        </div>
    </div>
        
        `
        petsContainer.append(petsCard)
    });
}

loadCategories()
loadAllPets()