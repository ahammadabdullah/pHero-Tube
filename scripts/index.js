const handleTab = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const rcvdData = await res.json();
  const data = rcvdData.data;
  const tabContainer = document.getElementById("tab-container");

  data.forEach((tab) => {
    const btn = document.createElement("button");
    btn.innerHTML = `
    <a onclick="handleLoadVideo(${tab.category_id})">${tab.category}</a>
    `;
    tabContainer.appendChild(btn);
    btn.classList.add("inactive-btn");
  });
};

const handleLoadVideo = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const rcvdData = await res.json();
  const data = rcvdData.data;
  /*   const sortByViewBtn = document.getElementById("sort-by-view-btn");
  sortByViewBtn.addEventListener("click", () => {
    const updatedArr = data.map((data) => data.others?.views);
    const descendedArr = updatedArr.sort((a, b) => b - a);

    console.log(descendedArr);
  }); */
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  const noVideoAlert = document.getElementById("no-video-alert");
  if (data.length <= 0) {
    noVideoAlert.classList.remove("hidden");
  } else {
    noVideoAlert.classList.add("hidden");
  }
  /* seconds to hours convert */
  const secToHours = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours + " hrs " + minutes + " mins ago"}`;
  };

  data.forEach((video) => {
    const div = document.createElement("div");
    const uploadTime = video?.others?.posted_date;

    div.innerHTML = `
    <div class="w-80">
        <div class="pb-5 relative ">
            <img class="rounded-lg h-[180px] w-[320px]" src="${
              video?.thumbnail
            }" alt="">
                <button id="img-badge" disabled onclick="hideAddClass(this)" class="bg-black text-xs text-white p-1 rounded-md translate-x-48 -translate-y-10 absolute disabled:cursor-default image-badge ">${secToHours(
                  uploadTime
                )}
                </button>
        </div>
            <!-- video desc -->
        <div class="flex flex-row">
            <img class="w-9 h-9 rounded-full" src="${
              video?.authors[0]?.profile_picture
            }" alt="">
            <div class=" ml-4">
                <h4 class="text-base font-bold">${video?.title}</h4>
                <h5 class="text-sm font-normal">${
                  video?.authors[0]?.profile_name
                }<i id="verified-badge" class="pl-3 font-[#2568EF] fa-solid fa-certificate"></i></h5>
                <p>${video?.others?.views}</p>
                </div>
            </div>
        </div>
    
    `;
    videoContainer.appendChild(div);
  });
};
/* const handleSelectedButton = (element) => {
  console.log(element);
  element.classList.remove("inactive-btn");
  element.classList.add("active-btn");
}; */

const blog = () => {
  window.location.href = "blog.html";
};
handleTab();
handleLoadVideo(1000);
