const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((res) => res.json())
    // send data to display
    .then((data) => displayCategories(data.categories));
};

const displayCategories = (categoriesArr) => {
    // get the container
    const categoryContainer = document.getElementById("category-container");

    // loop operation on categoriesArr
    for(category of categoriesArr){
        // create element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML =`
        <button class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
        `;
        // append element
        categoryContainer.appendChild(categoryDiv)
    }
};
loadCategories();
