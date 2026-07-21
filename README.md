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
- Criação do Model `Task`.
- Criação da migration `tasks`.
- Criação do `TaskController`.
- Criação do `StoreTaskRequest`.
- Criação do `TaskSeeder`.
- Inclusão de testes automatizados para os principais fluxos da API.
- Correção do carregamento das rotas da API no Laravel 11.
- Ajustes na configuração do Docker para executar o código atualizado.

## Frontend

- Criação do `TaskService`.
- Separação entre camada de apresentação e acesso à API.
- Externalização da URL da API utilizando environments.
- Reforço da tipagem da aplicação.
- Correção do tratamento de erros.
- Organização dos estilos em arquivo SCSS.
- Melhorias de responsividade.

---

# Decisões técnicas

Durante a refatoração foram adotadas algumas decisões para preservar o comportamento original da aplicação:

- O endpoint `/tarefas` foi mantido para evitar alterações no contrato da API.
- Foi utilizada a arquitetura padrão do Laravel com Eloquent.
- Não foram adicionadas camadas Service/Repository por não agregarem valor ao escopo atual do CRUD.
- O frontend passou a consumir a URL da API através dos environments.
- O arquivo `storage/tarefas.json` foi removido, sendo substituído por um Seeder.
- As três tarefas iniciais foram preservadas, incluindo `Tarefa 2` com `completed = true`.

---

# Backend

O backend utiliza Laravel 11, PHP 8.2 e SQLite.

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

## Endpoints

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/tarefas` | Lista tarefas |
| POST | `/tarefas` | Cria tarefa |
| DELETE | `/tarefas/{id}` | Remove tarefa |

---

## Regras da API

- `title` obrigatório.
- Máximo de 255 caracteres.
- POST retorna **201 Created**.
- DELETE retorna **204 No Content**.
- DELETE retorna **404** quando a tarefa não existe.

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
- funcionamento do Seeder.

---

# Frontend

O frontend Angular consome a API através do `TaskService`.

Principais arquivos:

- `task.ts`
- `task.service.ts`
- `app.component.ts`

A URL da API é configurada em:

```
frontend/src/environments/environment.ts
frontend/src/environments/environment.development.ts
```

Os estilos foram movidos para `app.component.scss`, mantendo a identidade visual original e adicionando responsividade.

O tratamento de erros foi ajustado para preservar o estado da interface quando ocorrerem falhas na comunicação com o backend.

---

# Observações

- O arquivo `storage/tarefas.json` deixou de ser utilizado.
- Os dados iniciais são recriados automaticamente pelo `TaskSeeder`.
- O Seeder utiliza `updateOrCreate`, permitindo múltiplas execuções sem duplicação de registros.
- Novas tarefas continuam sendo criadas com `completed = false`.
- As respostas da API são retornadas pelo Eloquent incluindo `created_at` e `updated_at`.
- O modelo e a tabela seguem a convenção do Laravel (Task → tasks), enquanto os endpoints permaneceram em português (/tarefas) para manter compatibilidade com o frontend existente e evitar mudanças desnecessárias na API.