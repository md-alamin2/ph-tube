const removeActive = () => {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
};
// implement category btn api
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
  for (let category of categoriesArr) {
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoriesVideo(${category.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
        `;
    // append element
    categoryContainer.appendChild(categoryDiv);
  }
};

// implement video api
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";
  if (videos.length == 0) {
    videosContainer.innerHTML = `
    <div class="col-span-4 mt-5 lg:mt-44">
        <img class="w-fit mx-auto" src="assets/Icon.png" alt=""/>
        <h2 class="text-3xl font-bold text-center mt-2">Oops!! Sorry, There is no content here</h2>
    </div>
    `;
  }
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-10 shadow-sm">
          <figure>
            <img
              class="w-full h-[250px] object-cover rounded-lg"
              src="${video.thumbnail}"
              alt="Shoes"
            />
          </figure>
          <div class="mt-5 mb-5 flex items-start gap-3">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>

            <div>
              <h2 class="font-bold">${video.title}</h2>

              <div class="flex items-center gap-1">
                <p class="text-sm text-[#17171770]">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true? `<img src="assets/verified.png" alt="">` : ``}
              </div>

              <p class="text-sm text-[#17171770]">${video.others.views}</p>

            </div>
          </div>
          <button onclick="videoDetails('${video.video_id}')" class="btn btn-wide mx-auto mb-3 active">Show details</button>
          </div>
          `;
    videosContainer.appendChild(videoCard);
  });
};

const loadCategoriesVideo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");
      displayVideos(data.category);
    });
};
// video showing function
const videoDetails = (videoId) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};
const displayVideoDetails = (video) => {
  document.getElementById("show_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `
};
document.getElementById("input-item").addEventListener("keyup", (event)=>{
  const input = event.target.value;
  loadVideos(input);
})

loadCategories();
loadVideos();
