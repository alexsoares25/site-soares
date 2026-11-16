/**
 * SOARES SERVIÇOS — js/projetos.js
 * ============================================================
 * Lista de projetos realizados. Alimenta:
 *   - a página projetos.html (cards com filtro por categoria);
 *   - o mapa "Presença Operacional" da página inicial.
 *
 * COMO ADICIONAR UM PROJETO
 * Copie um bloco { ... } da lista SOARES_PROJETOS e preencha.
 *
 * Campos obrigatórios:
 *   categoria  'residencial' | 'industrial' | 'mineracao'
 *   titulo     nome do projeto como deve aparecer no site
 *   local      cidade e estado
 *
 * Campos opcionais (aparecem na ficha só quando preenchidos):
 *   coords     [latitude, longitude] — coloca o projeto no mapa da home
 *   ano        ano de conclusão
 *   foto       caminho da imagem, por exemplo 'assets/projetos/casa-01.jpg'
 *   servicos   lista de serviços executados (substitui a lista padrão da categoria)
 *   resumo     descrição curta (substitui o texto padrão da categoria)
 *   desafio    qual era o problema do cliente
 *   solucao    o que a Soares fez
 *   resultados lista de resultados obtidos
 *
 * IMPORTANTE: publique apenas informações reais e autorizadas pelo
 * cliente. Não inclua o nome de contratantes sem autorização — este
 * arquivo é público.
 * ============================================================
 */

window.SOARES_CATEGORIAS = {
  residencial: {
    nome: 'Residencial',
    cor: '#C9922A',
    resumo: 'Projeto, regularização ou acompanhamento técnico de obra residencial.',
    servicos: ['Projeto', 'Acompanhamento técnico', 'ART']
  },
  industrial: {
    nome: 'Industrial',
    cor: '#0B2E6B',
    resumo: 'Inspeção técnica e adequação de equipamentos e veículos conforme requisitos normativos e exigências da contratante.',
    servicos: ['Inspeção técnica', 'Adequação de equipamentos', 'Documentação técnica']
  },
  mineracao: {
    nome: 'Mineração',
    cor: '#d9c006',
    resumo: 'Preparação técnica e mobilização de frota para operação em mina, com documentação estruturada para aprovação junto à contratante.',
    servicos: ['Adequação de veículos', 'Mobilização de frota', 'Documentação NR-12 e NR-22']
  }
};

window.SOARES_PROJETOS = [
  { categoria: 'mineracao',  titulo: 'Operação Mineradora',  local: 'Barro Alto - GO',        coords: [-15.1, -48.9] },
  { categoria: 'mineracao',  titulo: 'Operação Mineradora',  local: 'Goiás - GO',             coords: [-15.1, -49.0] },
  { categoria: 'mineracao',  titulo: 'Operação Mineradora',  local: 'Alto Horizonte - GO',    coords: [-14.2, -49.4] },
  { categoria: 'mineracao',  titulo: 'Operação Mineradora',  local: 'Mara Rosa - GO',         coords: [-14.0, -49.2] },
  { categoria: 'mineracao',  titulo: 'Projeto de Mineração', local: 'Goiás - GO',             coords: [-13.6, -47.0] },
  { categoria: 'mineracao',  titulo: 'Operação Mineradora',  local: 'Almas - TO',             coords: [-11.7, -47.2] },
  { categoria: 'mineracao',  titulo: 'Unidade de Mineração', local: 'Mato Grosso do Sul - MS', coords: [-19.3, -57.5] },
  { categoria: 'industrial', titulo: 'Unidade Industrial',   local: 'Mato Grosso do Sul - MS', coords: [-19.3, -57.6] },
  { categoria: 'industrial', titulo: 'Unidade Industrial',   local: 'Minas Gerais - MG',      coords: [-19.1, -46.7] },
  { categoria: 'industrial', titulo: 'Unidade Industrial',   local: 'Uberaba - MG',           coords: [-20.0, -47.9] },
  { categoria: 'industrial', titulo: 'Unidade Industrial',   local: 'Niquelândia - GO',       coords: [-14.2, -48.3] }
];
