const handlerCollapse = () => {

  let btnCollapse = document.querySelectorAll(".collapse") 
  
  btnCollapse.forEach((button) => {
    button.addEventListener("click", () => {
      let nextul = button.parentElement.childNodes[3]
      let icon = button.childNodes[0]
      nextul.classList.toggle("collapsed")
      icon.classList.toggle("down")

      /* scroll to li collapsed/extended */
      const scroll = button.parentElement.offsetTop
      window.scrollTo({top: scroll-300, behavior: 'smooth'});
    })
  })

}

export default handlerCollapse;

