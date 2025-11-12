//Seleciona elementos do form.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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
}

