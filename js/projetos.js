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
 *   categoria  'residencial' | 'institucional' | 'industrial' | 'mineracao'
 *   titulo     nome do projeto como deve aparecer no site
 *
 * Campos opcionais (aparecem na ficha só quando preenchidos):
 *   local      cidade e estado, por exemplo 'Goianésia - GO'
 *   area       área do projeto, por exemplo '115 m²'
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
    servicos: ['Projeto arquitetônico', 'Projetos complementares', 'ART']
  },
  institucional: {
    nome: 'Institucional',
    cor: '#4E7A3C',
    resumo: 'Projeto para órgão público ou equipamento de uso coletivo, com aprovação junto à prefeitura.',
    servicos: ['Projeto arquitetônico', 'Projetos complementares', 'ART']
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
  // ----- Engenharia civil e arquitetura -----
  {
    categoria: 'institucional',
    titulo: 'Praça pública',
    local: 'Goianésia - GO',
    coords: [-15.3, -49.1],
    area: '1.500 m²',
    resumo: 'Projeto completo de praça pública, da arquitetura aos projetos complementares, para aprovação junto à prefeitura.',
    servicos: ['Projeto arquitetônico legal', 'Projeto estrutural', 'Instalações elétricas', 'Instalações hidrossanitárias', 'Maquete 3D e renders']
  },
  {
    categoria: 'residencial',
    titulo: 'Residência em lote estreito',
    local: 'Caçapava - SP',
    coords: [-23.1, -45.7],
    area: '42 m²',
    resumo: 'Projeto para lote de 3,5 × 12 m, com solução de planta para área reduzida e aprovação municipal.',
    servicos: ['Projeto arquitetônico legal', 'Projeto estrutural', 'Instalações elétricas', 'Instalações hidrossanitárias']
  },
  {
    categoria: 'residencial',
    titulo: 'Residência com projetos complementares',
    // local: preencher a cidade quando confirmada
    area: '115 m²',
    resumo: 'Projeto arquitetônico e complementares com emissão de ART e aprovação junto à prefeitura.',
    servicos: ['Projeto arquitetônico legal', 'Projeto de interiores', 'Projeto estrutural', 'Instalações elétricas', 'Instalações hidrossanitárias']
  },
  {
    categoria: 'residencial',
    titulo: 'Regularização e acréscimo de área',
    // local: preencher a cidade quando confirmada
    area: '238 m²',
    resumo: 'Regularização de imóvel com acréscimo de área, incluindo os memoriais necessários para aprovação na prefeitura.',
    servicos: ['Projeto arquitetônico legal', 'Regularização de imóveis', 'Memorial descritivo']
  },
  {
    categoria: 'residencial',
    titulo: 'Área gourmet e lavanderia',
    // local: preencher a cidade quando confirmada
    area: '50 m²',
    resumo: 'Projeto executivo de ampliação residencial, com renders para visualização antes da obra.',
    servicos: ['Projeto arquitetônico executivo', 'Renders fotorrealísticos', 'Projeto estrutural', 'Instalações elétricas', 'Instalações hidráulicas e sanitárias']
  },

  // ----- Indústria e mineração -----
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
