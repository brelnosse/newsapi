const newsContainer = document.querySelector(".newsContainer");
const categories = document.querySelectorAll(".categories .category");
const categoriesArray = ["general", "science" , "sports" , "business",  "health" , "entertainment", "tech" , "politics" , "food" , "travel"];
let category = "general";

for(let category of categories){
  category.addEventListener("click", (e)=>{
    if(categoriesArray.includes(e.target.id.trim().toLowerCase())){
      category = e.target.id.trim().toLowerCase();
    }
  })
}
function  cutText(elem, maxlength){
  let arrElem = [...elem.textContent.trim()];
  let newElem = '';

  if(arrElem.length > maxlength){
    for(let i = 0; i < maxlength-1; i++){
      newElem += arrElem[i]
    }
    newElem += "...";
    elem.title = arrElem.join("");
    elem.textContent = newElem;
  }

}

function process(){
  const newsTitles = document.querySelectorAll(".newsContainer .newsTitle");
  const newsDescriptions = document.querySelectorAll(".newsContainer .newsDescription");

  for(let newsTitle of newsTitles){
    cutText(newsTitle, 68);
  }
  for(let newsDescription of newsDescriptions){
    cutText(newsDescription, 140);
  }
}
const observer = new MutationObserver(mutations=>{
  mutations.forEach(mutation=>{
    mutation.addedNodes.forEach(node=>{
      if(node.nodeType === Node.ELEMENT_NODE){
        process();
      }
    })
  })
})
observer.observe(newsContainer, {childList: true});
fetch("https://api.worldnewsapi.com/search-news?api-key=358dd670577c4792b6805f9fe396f116&text=a")
  .then(function(res){
    if(res.ok){
      return res.json();
    }
  })
  .then(function(value){
    for(let i = 0; i < value.news.length; i++){
      newsContainer.innerHTML += `
        <div class="news">
          <img src="${value.news[i].image}" alt="${value.news[i].url}">
          <a href="${value.news[i].url}" target="_blank" class="newsTitle">${value.news[i].title}</a>
          <span class="newsDescription">${value.news[i].summary}</span>
          <a href="${value.news[i].url}" target="_blank" class="more">Plus</a>
        </div>
      `;
    }
  })
