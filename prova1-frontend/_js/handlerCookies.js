const handlerCookies = () => {

  //setSessionStorage
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();    
    //save states of checkboxes before close window
    let eachCheckbox = document.querySelectorAll("[type='checkbox']") 
    eachCheckbox.forEach((checkbox) => {
      //set storage checkboxes state
      let idCheckbox = checkbox.id
      let isChecked = ""
      if (checkbox.checked) { isChecked = "checked" }
      else if (checkbox.indeterminate) { isChecked = "indeterminate" }
      sessionStorage.setItem(idCheckbox, isChecked)
    })
    let btnCollapse = document.querySelectorAll(".collapse")
    btnCollapse.forEach((button) => {
      //set storage collapse button state
      let idButtonCollapse = button.id
      let collapseState = button.childNodes[0].classList.contains("down")
      collapseState = collapseState.toString()
      sessionStorage.setItem(idButtonCollapse, collapseState)
    })

  })

  //getSessionStorage
  window.addEventListener("load", getLocalStorage())
  function getLocalStorage(){
    let eachCheckbox = document.querySelectorAll("[type='checkbox']") 
    eachCheckbox.forEach((checkbox) => {
      let idCheckbox = checkbox.id
      let getStateCheckbox = sessionStorage.getItem(idCheckbox)
      if (getStateCheckbox === "checked") {
        checkbox.checked = true
      } else if (getStateCheckbox === "indeterminate") {
        checkbox.indeterminate = true
      } else {
        checkbox.indeterminate = false
        checkbox.checked = false
      }
    })
    let eachBtnCollapse = document.querySelectorAll(".collapse")
    eachBtnCollapse.forEach((btnCollapse) => {
      let idBtnCollapse = btnCollapse.id
      let getStateBtn = sessionStorage.getItem(idBtnCollapse)
      if (getStateBtn == "true") 
      {
        btnCollapse.childNodes[0].classList.add("down")
        btnCollapse.parentElement.childNodes[3].classList.toggle("collapsed")
      }
    })
  }

}

export default handlerCookies;