import handlerCollapse from "./handlerCollapse.js"
import handlerCheckboxes from "./handlerCheckboxes.js"
import handlerCookies from "./handlerCookies.js"

await fetch('./_json/data.json')
.then(response => {
  return response.json()
})
.then(data => {

  function renderTree(data){
    return Object.values(data).map(({id,name,children}) => {
      let idSplitted = id.split("-")[0];

      let li = document.createElement("li");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox"
      checkbox.id = id
      li.appendChild(checkbox);

      if (Object.keys(children).length != 0){
        let button = document.createElement("button")
        button.classList.add("collapse")
        button.id = idSplitted;
        li.appendChild(button);

        let icon = document.createElement("i")
        icon.classList.add("fas")
        icon.classList.add("fa-angle-right")
        button.appendChild(icon)
      }
  
      let label = document.createElement("label");
      label.setAttribute("for", `${id}`)
      label.innerHTML = name;
      li.appendChild(label);
  
      let ul = document.createElement("ul");
      ul.classList.add("collapsed")
      if (Object.keys(children).length != 0){
        ul.innerHTML = renderTree(children);
        li.appendChild(ul);
      }
      return li.outerHTML;
    }).join('');
  }
  document.querySelector(".container").innerHTML=renderTree(data);

})
.catch(error => {
  console.log(error)
})

handlerCollapse()
handlerCheckboxes()
handlerCookies()