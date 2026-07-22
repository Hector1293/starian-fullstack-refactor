# 🧪 Teste Técnico — Refatoração Fullstack (Angular + PHP)


Bem-vindo(a) ao teste técnico!  
Este repositório contém um projeto propositalmente **mal estruturado** e com diversas **más práticas** tanto no **frontend (Angular)** quanto no **backend (PHP)**.

O objetivo deste teste **não é entregar uma feature nova**, mas sim **refatorar o projeto existente**, identificando e corrigindo problemas de estrutura, organização, legibilidade e boas práticas.

---

## 🎯 Objetivo

Avaliar sua capacidade de:

- Identificar más práticas e problemas técnicos em projetos existentes
- Refatorar código front e back para melhorar **qualidade, legibilidade, manutenibilidade e boas práticas**
- Separar responsabilidades, aplicar arquitetura mais limpa e moderna
- Garantir que a aplicação continue funcionando após as melhorias
- Escrever código de forma clara, coesa e consistente
- Garantir responsividade.

📬 Instruções de Entrega
- Crie um novo respositório utilizando este como template;
  <img width="1285" height="242" alt="image" src="https://github.com/user-attachments/assets/093203bc-88d3-4806-b688-877369d0bfec" />
- Clone o seu repositório gerado do template;
- Após concluir o teste, envie o link do seu repositório para a equipe técnica responsável pela avaliação

---

# Principais problemas identificados

### Backend

- Persistência de dados em arquivo JSON.
- Lógica de negócio implementada diretamente nas rotas.
- Ausência de validação centralizada das requisições.
- Ausência de testes automatizados.
- Dados iniciais dependentes do arquivo JSON.

### Frontend

- Comunicação HTTP concentrada no componente principal.
- URL da API hardcoded.
- Contratos da API parcialmente tipados.
- Tratamento de erros inconsistente.
- Estilos inline.
- Layout pouco responsivo.

---

# Refatorações realizadas

## Backend

- Migração da persistência de JSON para SQLite utilizando Eloquent.
- Atualização do Laravel para a versão 12.
- Criação do Model `Task`.
- Criação da migration `tasks`.
- Criação do `TaskController`.
- Criação do `StoreTaskRequest`.
- Criação do `UpdateTaskRequest`.
- Criação do `TaskSeeder`.
- Inclusão de testes automatizados para os principais fluxos da API.
- Inclusão do endpoint `PATCH /tasks/{task}` para concluir e reabrir tarefas.
- Correção do carregamento das rotas da API no Laravel.
- Ajuste do CORS para permitir requisições `PATCH`.
- Ajustes na configuração do Docker para executar o código atualizado.

## Frontend

- Atualização do Angular para a versão 21.
- Criação do `TaskService`.
- Separação entre camada de apresentação e acesso à API.
- Externalização da URL da API utilizando environments.
- Reforço da tipagem da aplicação.
- Correção do tratamento de erros.
- Organização dos estilos em arquivo SCSS.
- Melhorias de responsividade.
- Inclusão de checkbox para concluir e reabrir tarefas.
- Atualização do `TaskService` para utilizar `PATCH /tasks/{task}`.
- Componentização da interface em `TaskFormComponent`, `TaskListComponent` e `TaskItemComponent`.
- Inclusão de testes unitários para componentes e `TaskService`.

## Docker

- Atualização da imagem Node do frontend para compatibilidade com Angular 21.
- Substituição de `npm install` por `npm ci` no Dockerfile do frontend.

## Integração Contínua

- Criação de pipeline com GitHub Actions para validar backend e frontend em pushes e pull requests.

---

# Decisões técnicas

Durante a refatoração foram adotadas algumas decisões para preservar o comportamento original da aplicação:

- O endpoint `/tarefas` foi mantido para evitar alterações no contrato da API.
- O endpoint REST `PATCH /tasks/{task}` foi adicionado para atualização do status da tarefa.
- Foi utilizada a arquitetura padrão do Laravel com Eloquent.
- Não foram adicionadas camadas Service/Repository por não agregarem valor ao escopo atual do CRUD.
- O frontend passou a consumir a URL da API através dos environments.
- A tela foi componentizada sem alterar comportamento: `AppComponent` mantém o estado e as chamadas ao `TaskService`, enquanto os componentes filhos cuidam apenas da apresentação e emissão de eventos.
- O arquivo `storage/tarefas.json` foi removido, sendo substituído por um Seeder.
- As três tarefas iniciais foram preservadas, incluindo `Tarefa 2` com `completed = true`.
- A interface só altera o status visual de uma tarefa após confirmação da API.

---

# Requisitos

- PHP 8.2 ou superior.
- Composer.
- Laravel 12.
- Node.js compatível com Angular 21. O Dockerfile do frontend utiliza Node 20.20.2.
- Angular 21.
- Docker e Docker Compose, caso a execução seja feita por containers.

---

# Backend

O backend utiliza Laravel 12, PHP 8.2+ e SQLite.

## Configuração

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate
```

Criar o banco SQLite:

```bash
touch database/database.sqlite
```

No Windows PowerShell:

```powershell
New-Item -ItemType File -Path database\database.sqlite -Force
```

Executar migrations e seed:

```bash
php artisan migrate --seed
```

Iniciar servidor:

```bash
php artisan serve
```

---

## Execução com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços expostos:

- Backend Laravel: `http://localhost:8000`
- Frontend Angular: `http://localhost:4200`

Para executar comandos do backend dentro do container:

```bash
docker compose exec laravel php artisan migrate --seed
docker compose exec laravel php artisan test
docker compose exec laravel php artisan route:list
```

---

## Funcionalidades disponíveis

- Listar tarefas.
- Criar tarefas.
- Excluir tarefas.
- Concluir e reabrir tarefas.

---

## Endpoints

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/tarefas` | Lista tarefas |
| POST | `/tarefas` | Cria tarefa |
| DELETE | `/tarefas/{id}` | Remove tarefa |
| PATCH | `/tasks/{task}` | Atualiza o status `completed` da tarefa |

---

## Regras da API

- `title` obrigatório.
- Máximo de 255 caracteres.
- `PATCH /tasks/{task}` permite atualizar apenas `completed`.
- `completed` é obrigatório e booleano no payload de atualização.
- POST retorna **201 Created**.
- DELETE retorna **204 No Content**.
- DELETE retorna **404** quando a tarefa não existe.
- PATCH retorna a tarefa atualizada.

---

## Testes

Executar:

```bash
php artisan migrate
php artisan db:seed
php artisan test
php artisan route:list
```

Os testes utilizam SQLite em memória e cobrem:

- listagem;
- criação;
- validação;
- limite de caracteres;
- remoção;
- erro 404;
- funcionamento do Seeder;
- conclusão e reabertura de tarefas;
- validação de payload inválido ao atualizar `completed`.

---

# Frontend

O frontend Angular consome a API através do `TaskService`.

Principais arquivos:

- `task.ts`
- `task.service.ts`
- `app.component.ts`
- `task-form.component.ts`
- `task-list.component.ts`
- `task-item.component.ts`

Organização dos componentes:

```text
AppComponent
├── TaskFormComponent
├── TaskListComponent
└── TaskItemComponent
```

Responsabilidades:

- `AppComponent`: estado da aplicação, mensagens de erro e chamadas ao `TaskService`.
- `TaskFormComponent`: formulário de criação e emissão do evento de nova tarefa.
- `TaskListComponent`: recebimento e renderização da coleção de tarefas.
- `TaskItemComponent`: exibição de uma tarefa, checkbox de conclusão, botão de exclusão e emissão de eventos.

A URL da API é configurada em:

```
frontend/src/environments/environment.ts
frontend/src/environments/environment.development.ts
```

Os estilos foram movidos para `app.component.scss`, mantendo a identidade visual original e adicionando responsividade.

O tratamento de erros foi ajustado para preservar o estado da interface quando ocorrerem falhas na comunicação com o backend.

O checkbox de cada tarefa permite concluir e reabrir tarefas. A lista é atualizada somente após resposta bem-sucedida da API.

Executar localmente:

```bash
cd frontend
npm ci
npm run start
```

Executar testes unitários:

```bash
cd frontend
npm test -- --watch=false --browsers=ChromeHeadlessNoSandbox
```

Os testes cobrem:

- `AppComponent`: carregamento, criação, remoção, atualização de status e tratamento de erros.
- `TaskFormComponent`: renderização, emissão de criação e bloqueio de título vazio.
- `TaskListComponent`: renderização da lista, mensagem para lista vazia e repasse de eventos.
- `TaskItemComponent`: título, estado concluído, checkbox e remoção.
- `TaskService`: chamadas HTTP `GET`, `POST`, `PATCH` e `DELETE`, incluindo URL, método e payload.

Gerar build:

```bash
cd frontend
npm run build
```

---

# Integração Contínua

O projeto utiliza GitHub Actions para executar validações automáticas em pushes e pull requests para a branch principal.

A pipeline está definida em:

```text
.github/workflows/ci.yml
```

Jobs configurados:

- `backend`: instala as dependências com Composer, prepara o ambiente Laravel e executa os testes automatizados com `php artisan test`.
- `frontend`: instala as dependências com `npm ci`, executa os testes unitários em modo headless e executa o build da aplicação com `npm run build`.

---

# Estrutura resumida

```text
backend/
  app/Http/Controllers/TaskController.php
  app/Http/Requests/StoreTaskRequest.php
  app/Http/Requests/UpdateTaskRequest.php
  app/Models/Task.php
  database/migrations/
  database/seeders/TaskSeeder.php
  routes/api.php
  tests/Feature/

frontend/
  src/app/app.component.*
  src/app/task-form.component.*
  src/app/task-list.component.*
  src/app/task-item.component.*
  src/app/*.spec.ts
  src/app/task.ts
  src/app/task.service.ts
  src/environments/

.github/
  workflows/ci.yml

docker-compose.yml
```

---

# Observações

- O arquivo `storage/tarefas.json` deixou de ser utilizado.
- Os dados iniciais são recriados automaticamente pelo `TaskSeeder`.
- O Seeder utiliza `updateOrCreate`, permitindo múltiplas execuções sem duplicação de registros.
- Novas tarefas continuam sendo criadas com `completed = false`.
- O status `completed` pode ser alterado pelo endpoint `PATCH /tasks/{task}` e pelo checkbox no frontend.
- As respostas da API são retornadas pelo Eloquent incluindo `created_at` e `updated_at`.
- O modelo e a tabela seguem a convenção do Laravel (Task → tasks). Os endpoints originais permaneceram em português (`/tarefas`) para manter compatibilidade, e o novo endpoint de atualização segue a convenção REST solicitada (`/tasks/{task}`).
