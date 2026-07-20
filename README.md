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

## Backend

O backend usa Laravel 11, PHP 8.2 e SQLite. A persistência das tarefas foi migrada do arquivo `storage/tarefas.json` para Eloquent, usando a tabela `tasks`.

### Configuração local

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan serve
```

No Windows PowerShell, caso o arquivo SQLite ainda não exista:

```powershell
New-Item -ItemType File -Path database\database.sqlite -Force
```

### Endpoints

Com o servidor Laravel em `http://localhost:8000`, os endpoints consumidos pelo frontend são:

| Método | URL | Descrição |
| --- | --- | --- |
| GET | `http://localhost:8000/tarefas` | Lista todas as tarefas |
| POST | `http://localhost:8000/tarefas` | Cria uma tarefa |
| DELETE | `http://localhost:8000/tarefas/{id}` | Exclui uma tarefa |

Regras atuais:

- `POST /tarefas` valida `title` como obrigatório, string e máximo de 255 caracteres.
- `POST /tarefas` retorna o recurso criado com status `201`.
- `DELETE /tarefas/{id}` retorna `204` ao excluir com sucesso.
- `DELETE /tarefas/{id}` retorna `404` quando a tarefa não existe.

### Validação

Com as dependências instaladas:

```bash
php artisan migrate
php artisan test
php artisan route:list
```

## Frontend

O frontend Angular continua usando `http://localhost:8000/tarefas`. A comunicação com a API foi isolada em `TaskService`, e o componente principal ficou responsável apenas pelo estado da tela e pelas interações do usuário.

Arquivos principais desta etapa:

- `frontend/src/app/task.ts`: define a interface `Task` e o tipo usado para nova tarefa.
- `frontend/src/app/task.service.ts`: concentra as chamadas `GET`, `POST` e `DELETE` para `/tarefas`.
- `frontend/src/app/app.component.ts`: consome o serviço e mantém o mesmo comportamento visual e funcional.

A URL da API ainda está hardcoded em `frontend/src/app/task.service.ts`. A externalização para environments ficou para uma etapa posterior.

## Observações

- O arquivo `storage/tarefas.json` não é mais usado pela API.
- Dados antigos do JSON não são migrados automaticamente para SQLite.
- As respostas da API agora vêm do Eloquent e incluem `created_at` e `updated_at`.
- O modelo e a tabela seguem a convenção do Laravel (Task → tasks), enquanto os endpoints permaneceram em português (/tarefas) para manter compatibilidade com o frontend existente e evitar mudanças desnecessárias na API.
