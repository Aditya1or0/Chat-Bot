let Api_Url =
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAQ8yoDsv266j32nqOiK_tln2kP2j_tQek";
let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let userMessage = null;
let chatContainer = document.querySelector(".chat-container");
let container = document.querySelector(".container");

function createChatBox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function getApiResponse(aiChatBox) {
  let textElement = aiChatBox.querySelector(".text");
  try {
    let response = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
      }),
    });

    let data = await response.json();
    let apiResponse = data?.candidates[0].content.parts[0].text;
    textElement.innerText = apiResponse;
    console.log(data);
    console.log(apiResponse);
  } catch (error) {
    console.log(error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}
function showLoading() {
  let html = `<div class="img">
   <img src="images/ai.png" alt="" width="50">
        </div> 
        <p class="text"></p>
   
      <img src="images/loading.gif" class="loading" height="50">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
  userMessage = prompt.value;
  if (userMessage == "") {
    container.style.display = "flex";
  } else {
    container.style.display = "none";
  }
  if (!userMessage) return;
  let html = `<div class="img">
          <img src="images/user.png" alt="" width="50">
        </div>
        <p class="text"> </p>`;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});
btn.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("#btn").click();
  }
});