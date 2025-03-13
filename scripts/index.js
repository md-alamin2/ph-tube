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
  for (category of categoriesArr) {
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-red-500 hover:text-white">${category.category}</button>
        `;
    // append element
    categoryContainer.appendChild(categoryDiv);
  }
};

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// implement video api
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videos.forEach((video) => {
    console.log(video);
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
                <img src="assets/verified.png" alt="">
              </div>

              <p class="text-sm text-[#17171770]">${video.others.views}</p>

            </div>
          </div>
        </div>
        `;
    videosContainer.appendChild(videoCard);
  });
};

loadCategories();
loadVideos();
