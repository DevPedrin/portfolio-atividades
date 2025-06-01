const tabela = document.querySelector("table tbody")

// Defina a URL da API — troca aqui pra produção ou localhost quando quiser
const API_URL = "https://api-portfolio-x1u6.onrender.com/atividades"
// const API_URL = "http://localhost:8080/atividades"

function montarTabela(atividades) {
  tabela.innerHTML = ""
  atividades.forEach(atividade => {
    const tr = document.createElement("tr")

    const tdData = document.createElement("td")
    tdData.textContent = new Date(atividade.dta).toLocaleDateString("pt-BR")

    const tdNome = document.createElement("td")
    tdNome.textContent = atividade.nome_atividade

    const tdDesc = document.createElement("td")
    tdDesc.textContent = atividade.descricao || "-"

    const tdLink = document.createElement("td")
    const a = document.createElement("a")
    a.href = atividade.link || "#"
    a.textContent = "Ver"
    a.target = "_blank"
    tdLink.appendChild(a)

    tr.appendChild(tdData)
    tr.appendChild(tdNome)
    tr.appendChild(tdDesc)
    tr.appendChild(tdLink)

    tabela.appendChild(tr)
  })
}

async function carregarAtividades() {
  const cache = localStorage.getItem('atividadesCache')
  if (cache) {
    montarTabela(JSON.parse(cache))
  }

  try {
    const resposta = await fetch(API_URL)
    if (!resposta.ok) throw new Error('Erro na resposta da API')

    const atividades = await resposta.json()
    montarTabela(atividades)
    localStorage.setItem('atividadesCache', JSON.stringify(atividades))
  } catch (erro) {
    console.error("Erro ao carregar atividades da API, usando cache:", erro)
  }
}

carregarAtividades()
