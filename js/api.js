// button section functionlity..
// ata global veribal..jate ar maje data fetch kre btn a use krte pari oi api ta
let issues = [];

async function issuesFetchData() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  issues = data.data;

  displayIssues(issues);
}
// display issues
const displayIssues = (issues) => {
  //   console.log(issues);
  const issuesContainer = document.getElementById("container");
  issuesContainer.innerHTML = "";
  issues.forEach((item) => {
    // console.log(item);

    const issuesAppended = document.createElement("div");

    issuesAppended.className =
      "bg-white p-5 space-y-4 border border-gray-500 border-t-4 rounded-sm";
    // for open and closed border
    if (item.status === "open") {
      //   console.log(item.status);
      issuesAppended.classList.replace("border-gray-500", "border-green-500");
    } else if (item.status === "closed") {
      issuesAppended.classList.replace("border-gray-500", "border-purple-500");
    }

    issuesAppended.innerHTML = `
    <div class="flex items-center  justify-between space-x-2 ">
            <img src="./assets/open-status.png" alt=""> 
            <p class="text-[#D97706] bg-gray-200 rounded-3xl px-5 py-2">${item.priority}</p>
        </div>
    <h1 class="text-2xl font-bold">${item.title}</h1>
    
                    <p class="text-xl font-semibold text-[#64748B] line-clamp-2">${item.description}</p>
                    <div onclick="useModal(${item.id})" class="flex gap-3">
                        <div class="flex items-center px-5 py-2 bg-[#FECACA] space-x-2 rounded-4xl">
                            <img src="./assets/Vector (2).png" alt="">
                            <p class="text-[#EF4444]">${item.labels[0] ? item.labels[0] : "NO Added"}</p>
                        </div>
                        <div class="flex items-center space-x-2 bg-[#FDE68A] rounded-3xl px-5 py-2">
                            <img src="./assets/Vector (3).png" alt="">
                            <p class="text-[#D97706]">${item.labels[1] ? item.labels[1] : "No Added"}</p>
                        </div>
                    </div>
                    <hr class="w-full m-0 p-0 border-gray-300">
                    <div class="text-[#64748B] text-xl">
                        <p>#${item.author}</p>
                        <P><p>${new Date(item.createdAt).toLocaleDateString()}</p></P>
                    </div>
    `;
    issuesContainer.appendChild(issuesAppended);
  });
};

const allbtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const countIssues = document.getElementById("countIssues");

let allBtnStatus = "all-btn";
function toggleBtn(id) {
  allBtnStatus = id;
  // remove all color
  allbtn.classList.remove("btn-primary", "text-white");
  openBtn.classList.remove("btn-primary", "text-white");
  closeBtn.classList.remove("btn-primary", "text-white");
  // add color
  allbtn.classList.add("bg-white", "text-black");
  openBtn.classList.add("bg-white", "text-black");
  closeBtn.classList.add("bg-white", "text-black");

  const clickbtn = document.getElementById(id);
  clickbtn.classList.add("bg-blue-500", "text-white");
  clickbtn.classList.remove("bg-white", "text-black");
  // section data
  // je btn a click krsi..setar data dekhasse..atar functionality akhne...
  if (id === "open-btn") {
    filteredIssues = issues.filter((issue) => issue.status === "open");

    displayIssues(filteredIssues);
    document.getElementById("countIssues").innerText = filteredIssues.length;
  } else if (id === "close-btn") {
    filteredIssues = issues.filter((issue) => issue.status === "closed");
    displayIssues(filteredIssues);
    document.getElementById("countIssues").innerText = filteredIssues.length;
  } else if (id === "all-btn") {
    displayIssues(issues);
    document.getElementById("countIssues").innerText = issues.length;
  }
}

// akhne ja seacrah dissi tai passi
document
  .getElementById("search-btn")
  .addEventListener("click", async function () {
    const searchValue = document.getElementById("searchValue");
    const ValueInput = searchValue.value.trim().toLowerCase();
    console.log(ValueInput);
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${ValueInput}`,
    );
    const data = await res.json();

    console.log(data.data);
    displayIssues(data.data);
    searchValue.value = "";
  });

// for modal fetch
async function useModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  displayModal(data.data);
}
// display modal
async function displayModal(menu) {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
  <div class="space-x-5">
        <h2 class="my-4 text-4xl font-bold">${menu.title}</h2>
        <div class="flex space-x-4 my-6 text-[#64748B] text-xl font-medium">
            <p><span class="px-5 py-2 bg-green-600 rounded-2xl text-white">${menu.status}</span></p>
            <h3>Opened by.${menu.author}</h3>
            <p>22.2.2026</p>
        </div>
        <div class="flex my-6 gap-2">
            <div class="flex items-center px-5 py-2 bg-[#FDE68A] space-x-2 rounded-4xl">
                <img src="./assets/Vector (2).png" alt="">
                <p class="text-[#D97706]"> Bug</p>
            </div>
            <div class="flex items-center px-5 py-2 bg-[#FECACA] space-x-2 rounded-4xl">
                <img src="./assets/Vector (2).png" alt="">
                <p class="text-[#EF4444]">Allow</p>
            </div>
        </div>
        <p class="text-[#64748B] my-4 line-clamp-2 text-xl font-medium">${menu.description}</p>
        <div class="bg-gray-200 space-y-4  rounded-xl grid grid-cols-2">
            <div class="space-y-2 p-3">
                <p class="text-[#64748B] text-xl font-medium">Assignee:</p>
                <h2 class="text-3xl font-semibold">${menu.assignee ? menu.assignee : "Not"}</h2>
            </div>
            <div class="space-y-3 p-3">
                <p class="text-[#64748B] text-xl font-medium">Priority</p>
                <p><span class="px-4 py-1 bg-red-500 rounded-2xl">${menu.priority}</span></p>
            </div>

        </div>
    </div>
 

    `;

  document.getElementById("my_modal_5").showModal();
}
issuesFetchData();
