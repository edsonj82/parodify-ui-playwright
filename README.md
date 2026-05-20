# Parodify Playwright Test Suite 🚀

Este repositório contém uma suíte de testes automatizados de ponta a ponta (E2E) para a interface do **Parodify**. O objetivo do projeto é garantir a estabilidade e a integridade de fluxos críticos de autenticação, mecânicas de reprodução de mídia e renderização de dados dinâmicos utilizando as melhores práticas do **Playwright**.

## 🛠️ Tecnologias Utilizadas

- **Playwright:** Framework core para execução e orquestração dos testes E2E.
- **JavaScript/TypeScript:** Linguagem base para escrita de scripts limpos e padronizados.
- **Network API Mocking:** Interceptação nativa de requisições HTTP para isolamento do ambiente.

## 🏗️ Diferenciais Técnicos da Suíte

### 1. Arquitetura de Custom Fixtures (Isolamento de Código e Dados)
Para eliminar a duplicação crônica de código (*boilerplate*) e o espalhamento de payloads idênticos por múltiplos arquivos, a suíte implementa uma **Fixture Customizada**.
- **Injeção Automática de Roteamento:** A fixture estende o comportamento padrão do `test` do Playwright, interceptando chamadas para o endpoint de catálogo (`**/songs`) e disponibilizando uma música mockada (`mockSong`) diretamente no escopo de cada cenário de teste.
- **Manutenibilidade:** Qualquer mudança na estrutura de dados ou nos contratos da API necessita de alteração em um único ponto centralizado, mantendo os arquivos de teste focados exclusivamente em interações do usuário.

### 2. Isolamento de Camada com Network Mocking
A suíte implementa o método `page.route` para interceptar chamadas HTTP direcionadas ao endpoint de catálogo (`**/songs`). Ao injetar uma resposta controlada (Status `200` com payload JSON customizado), os testes tornam-se:
- **Independentes:** Não sofrem com instabilidades, lentidões ou quedas do backend.
- **Determinísticos:** Garantem que a UI processe exatamente a massa de dados esperada de forma previsível.

### 3. Resiliência contra Elementos Duplicados (Strict Mode Resolution)
Para contornar o comportamento assíncrono de componentes dinâmicos (como textos idênticos exibidos simultaneamente no card e no player inferior), a suíte utiliza estratégias avançadas de escopo do Playwright, combinando `.nth()`, `.last()`, locators baseados em acessibilidade (`getByRole`) e buscas delimitadas por containers (`songCard`).
- Escopos atrelados ao container pai (`songCard`).
- Métodos nativos como `.toHaveAttribute('src', ...)` para validação precisa de imagens de capa.
- Resolução de textos duplicados com base em sua ordenação de renderização na árvore do DOM (`.last()` e `.nth()`).

---

## 🧪 Cenários de Testes Automatizados

Abaixo estão detalhados todos os comportamentos e regras de negócio validados por esta suíte:

### 1. Identidade e Autenticação
* **Validar Perfil do Utilizador:** Acessa a plataforma e garante que a sessão ativa exibe corretamente o nome do usuário logado (`"Fernando Papito"`) no elemento de perfil (`.logged-user`).

### 2. Controle de Estados do Player (Playback Management)
* **Iniciar Reprodução de Música:** Valida que o clique no botão de ação inicial altera dinamicamente os estados da interface, ativando visualmente o controle de `Pause`.
* **Ciclo de Vida de Mídia:** Verifica se a interface reage e retorna ao estado inicial (`Play` visível) de forma automática ao concluir a execução da faixa.
* **Interromper Reprodução (Stop/Pause):** Garante que, ao pausar uma música em andamento, o estado visual do player seja resetado, ocultando o botão de `Pause` e reexibindo o botão de `Play`.

### 3. Validação de Metadados no Player Ativo
Após o disparo do áudio, os testes asseguram que as informações corretas são repassadas do payload mockado para os respectivos componentes do player de áudio global:
* **Título da Música:** Validação do cabeçalho ativo na visualização do player principal utilizando indexação por papel de acessibilidade (`getByRole`).
* **Artista da Faixa:** Identificação do texto do artista (`song.artist`) utilizando estratégias de renderização do fim do DOM (`.last()`).
* **Descrição da Mídia:** Confirmação de que o texto descritivo secundário é apresentado de forma correspondente ao payload.
* **Imagem Dinâmica do Player:** Rastreamento do caminho de origem (`src`) da imagem de exibição do player via seletores baseados em atributos HTML.

### 4. Integridade Visual do Catálogo
* **Renderização de Capa de Álbum:** Garante que a tag de imagem presente no card de músicas possui o atributo de link exato (`song.image`), validando que o mapeamento de imagens do catálogo está íntegro antes e durante a interação.

---

## 🏗️ Estrutura do Arquivo de Teste

Os cenários estão centralizados no arquivo principal de especificações de comportamento:
```bash
├── fixtures/
│   └── base.ts                 # Fixture customizada que centraliza mocks de dados e rotas HTTP
├── tests/
│   └── player.spec.ts          # Scripts de testes otimizados e limpos consumindo a fixture
└── package.json
```

## 🚀 Como Executar

1. Instale as dependências:
   ```bash
   npm install

2. Execute os testes em modo headless (background):
    ```bash
   npx playwright test

3. Abra o relatório de testes:
    ```bash
    npx playwright show-report

Este projeto reflete a aplicação de padrões avançados de QA Engineering, focado na criação de pipelines de CI/CD rápidos e resilientes.

---