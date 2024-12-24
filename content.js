// Seleciona os elementos desejados
const elements = document.querySelectorAll("#Introduction_Points")[0]
  .parentElement.nextElementSibling.children;

// Array para armazenar os dados
const sites = [];

// Itera pelos elementos e coleta os dados
for (let i = 0; i < elements.length; i++) {
  const nome = elements[i].children[0]?.textContent.trim() || "Sem Nome"; // Nome do site
const descricao = elements[i].childNodes[1]?.textContent.trim() || "Sem Descrição"; // Descrição
  const link = elements[i].children[0]?.href || "Sem Link"; // Link do site

  // Adiciona os dados ao array
  sites.push([nome, descricao, link]);
}

// Função para criar e salvar o arquivo .txt
function salvarComoTxt(dados) {
  // Converte os dados em texto com separadores de tabulação (\t) e nova linha (\n)
  const texto = dados.map(linha => linha.join("\t")).join("\n");

  // Cria o Blob com o texto
  const blob = new Blob([texto], { type: "text/plain" });

  // Cria o link para download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dados_sites.txt"; // Nome do arquivo
  link.click();

  // Libera a URL do Blob após o download
  URL.revokeObjectURL(url);
}

// Chama a função para salvar os dados
salvarComoTxt(sites);