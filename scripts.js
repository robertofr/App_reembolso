//Seleciona elementos do form.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


// Seleciona os elementos da lista
const expenseList =  document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")


// Captura o evento de input no campo de valor.
amount.oninput = () =>{
// Obtém o valor atual, removendo todos os caracteres que não são númericos.
    let value = amount.value.replace(/\D/g, "")

// Converte o valor para um número decimal, dividindo por 100.
    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
// Formata o valor como moeda brasileira (BRL).
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Retorna o valor formatado
    return value
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) =>{
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault()
    //Cria um objeto vom uma nova despesa
    const newExpense ={
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //Chama a função que irá adcionar o item na lista
    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense){
    try {
        // Cria elemento para adcionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)



        // Cria a informação da despesa

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria nome da despesa.
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa.
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adciona o item na lista
        expenseList.append(expenseItem)

        // Atualiza os totais.
        updateTotals()

    } catch(error){
        alert("Não foi possivél atualizar a lista de despesas.")
        console.log(error)
    }

}

// Atualiza os totais.
function updateTotals(){
    try {
      // Recupera todos os itens   
      const items = expenseList.children
        
      // Atualiza a quantidade de itens na lista.
      expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`  

      // Variável para incrementar o total.
      let total = 0

      // Percorre cada item da lista
      for(let item = 0; item < items.length; item++){
        const itemAmount = items[item].querySelector(".expense-amount")

        // Remover caracteres não númericos e substitui a vírgula por ponto
        let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",",".")

        // Converte o valor para float.
        value = parseFloat(value)

       // Verifica se é um número válido
       if (isNaN(value)){
            return alert(
                "Não foi possível calcular o total. O valor não parece ser um número"
            )
       }

       // Incrementa o valor total
       total += Number(value)
      } 

        expenseTotal.textContent = total

    } catch (error) {
      console.log(error)
      alert("Não foi possível atualizar os totais.")
    }
}