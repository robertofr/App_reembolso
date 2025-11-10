//Seleciona elementos do form.
const amount = document.getElementById("amount")


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
    return value
}
