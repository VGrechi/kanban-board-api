# KanBan Board API

Aplicação simples desenvolvida com NodeJS e o superset TypeScript. Contém testes unitários e de integração desenvolvidos com Jest.

## Casos de Uso

- [x] Criar Tarefa com ou sem rótulos. Status inicial: "TO DO".
- [x] Mover Tarefa para status "IN PROGRESS".
- [x] Mover Tarefa para status "TESTING".
- [x] Mover Tarefa para status "DONE".
- [x] Adicionar ou remover rótulos.
- [x] Pesquisar Tarefas por:
    - Chave
    - Nome
    - Status
    - Nome do rótulo
    - Prioridade do rótulo

## Requisitos

- NodeJs + NPM
[NodeJS](https://nodejs.org/en/download/)

## Preparação

1. Acessar a pasta pelo Terminal
2. Executar: npm install

## Execução de Scripts

- **npm start** Inicia a aplicação.

- **npm test** Executa todos os testes.

- **npm run test:coverage** Eecuta todos os testes e coleta a cobertura de código.

- **npm run test:unit** Executa todos os testes unitários.

- **npm run test:integration** Executa todos os testes de integração.