var index = 0;
const sites = []; // Array global para armazenar os dados coletados

title();

function title() {
  const listLimit = document.querySelectorAll('ul').length;

  if (index < listLimit) {
    const firstSibling = document.querySelectorAll('ul')[index]

    if (firstSibling) {
      console.log("O primeiro título é verdade");
            // Usa try-catch para acessar o texto do título
            let head;
            try {
              head = document.querySelectorAll('ul')[index].previousElementSibling.textContent.trim();
            } catch (error) {
              console.error(`Erro ao acessar o título no índice ${index}:`, error);
              head = "Sem head"; // Valor padrão em caso de erro
            }
      itemsList(firstSibling.children, head);
    } 
      index++; // Incrementa para o próximo cabeçalho
    title(); // Chama recursivamente a função
  
  } else {
    // Quando terminar de percorrer os cabeçalhos, salva os dados
    salvarComoTxt(sites);
  }
}

function itemsList(elements, head) {
  // Itera pelos elementos e coleta os dados
  for (let i = 0; i < elements.length; i++) {
    const nome = elements[i].children[0]?.textContent.trim() || "Sem Nome"; // Nome do site
    const descricao = elements[i].childNodes[1]?.textContent.trim() || "Sem Descrição"; // Descrição
    const link = elements[i].children[0]?.href || "Sem Link"; // Link do site

    // Adiciona os dados ao array global
    sites.push([head, nome, descricao, link]);
  }

}

// Função para criar e salvar o arquivo .txt
function salvarComoTxt(dados) {
  // Converte os dados em texto com separadores de tabulação (\t) e nova linha (\n)
  const cabecalho = "Categorias\tSite\tFunção\tLink\n";
  const texto = cabecalho + dados.map(linha => linha.join("\t")).join("\n");

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
