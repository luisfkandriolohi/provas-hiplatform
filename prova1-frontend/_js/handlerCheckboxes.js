const handlerCheckboxes = () => {

  let eachCheckbox = document.querySelectorAll("[type='checkbox']") 
  
  eachCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (element) => {

      if (element.target.checked){
        //checkar filhos
        let checkbox = element.target
        let childsCheckbox = checkbox.parentElement.childNodes[3]
        if (childsCheckbox !== undefined) { 
          childsCheckbox = childsCheckbox.querySelectorAll("[type='checkbox']") 
          childsCheckbox.forEach((element) => {
            element.checked = true
            element.indeterminate = false
          })
        }

      }else{
        //checkar filhos
        let checkbox = element.target
        let childsCheckbox = checkbox.parentElement.childNodes[3]
        if (childsCheckbox !== undefined) { 
          childsCheckbox = childsCheckbox.querySelectorAll("[type='checkbox']") 
          childsCheckbox.forEach((element) => {
            element.checked = false
          })
        }

        //uncheck em todos os pais
        let arrayCheckboxes = parents(checkbox)
        arrayCheckboxes.forEach((array) => {
          array.forEach(() => {
            //array[0] é o pai de cada li ja que fazemos uma varredura total nos checkboxes
            array[0].checked = false
          })
        })

      }

      //checkar pais
      let arrayCheckboxes = parents(checkbox)
      arrayCheckboxes.forEach((array) => {
        let qtdCheckboxes = array.length
        verifyCheckedCheckboxes(array, qtdCheckboxes)
      })


      function verifyCheckedCheckboxes(array, qtdCheckboxes) {
        //ignora o primeiro array vazio
        if (array.length === 0) { return }
        let qtdCheckboxesChecked = 0
        //soma a quantidade de checkboxes no estado checked
        array.forEach((element) => {
          if (element.checked) { ++qtdCheckboxesChecked }
        })
        //compara a qtd de checkboxes com a qtd de checkboxed checked
        // -1 serve para tirar o checkbox target da conta (ja que somamos apenas os filhos)
        if (qtdCheckboxes-1 == qtdCheckboxesChecked) 
        { 
          array[0].indeterminate = false
          array[0].checked = true
        }
        else
        { 
          if (array[0].checked != true) 
          { 
            //indeterminate apenas para os checkboxes unchecked
            array[0].indeterminate = true 
          }
        }
        //se nenhum checkbox estiver checked limpamos os checkbox dos indeterminated e checked
        if (qtdCheckboxesChecked === 0) { array[0].indeterminate = false }
        if (qtdCheckboxesChecked === 0 ) { array[0].checked = false }
      }


      function parents(element, arrayCheckboxes) {
        //retorna quando chegar no body (ignorando o body)
        if(element.tagName == 'BODY' ) return arrayCheckboxes;
        //cria array vazio caso nao seja passado por parâmetro
        if(arrayCheckboxes === undefined) arrayCheckboxes = [];
        //pular as ULs
        if(element.tagName == "UL") { return parents(element.parentNode, arrayCheckboxes); }
        else
        {
          //salva um array de filhos daquele pai dentro do arrayCheckboxes
          arrayCheckboxes.push(element.querySelectorAll("[type='checkbox']"));
        } 
        //retorna de forma recursiva ate chegar no body
        return parents(element.parentNode, arrayCheckboxes);
      }

    })
  })

}

export default handlerCheckboxes;

