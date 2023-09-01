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
    <a class="tabs" onclick="handleLoadVideo(${tab.category_id}); handleTabs();">${tab.category}</a>
    `;
    tabContainer.appendChild(btn);
  });
};

const handleLoadVideo = async (categoryID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const rcvdData = await res.json();
  let data = rcvdData.data;

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
        <div class="pb-5  ">
            <img class="rounded-lg h-[180px] w-[320px]" src="${
              video?.thumbnail
            }" alt="">
            <div class="flex justify-end -translate-y-10 -translate-x-4 relative">
              <button id="img-badge" disabled" class="${
                uploadTime > 0 ? "block" : "hidden"
              } bg-black text-xs  text-white p-1 rounded-md absolute  disabled:cursor-default image-badge ">${secToHours(
      uploadTime
    )}
              </button>
            </div>
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
                }<i id="verified-badge" class="${
      video?.authors[0]?.verified === true ? "inline" : "hidden"
    } pl-3 font-[#2568EF] fa-solid fa-certificate"></i></h5>
                <p>${video?.others?.views}</p>
                </div>
            </div>
        </div>
    
    `;
    div.classList.add("video");
    videoContainer.appendChild(div);
  });
};

const handleTabs = () => {
  const tabs = document.querySelectorAll(".tabs");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active-btn");
      });
      tab.classList.add("active-btn");
    });
  });
};

function sortByViewData() {
  const videoContainer = document.getElementById("video-container");
  const videos = Array.from(videoContainer.querySelectorAll("div.video"));
  console.log(videos);
  videos.sort((a, b) => {
    const viewsA = parseInt(
      a.querySelector("p").textContent.replace(/[^\d]/g, "")
    );
    const viewsB = parseInt(
      b.querySelector("p").textContent.replace(/[^\d]/g, "")
    );
    return viewsB - viewsA;
  });
  const sortByViewBtn = document.getElementById("sort-by-view-btn");
  sortByViewBtn.addEventListener("click", () => {
    console.log("clicked");
    sortByViewData();
  });

  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    videoContainer.appendChild(video);
  });
}

const blog = () => {
  window.location.href = "blog.html";
};
handleTab();
handleTabs();
handleLoadVideo(1000);
