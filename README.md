# PayCheck System

## Descrição

O **PayCheck System** é uma aplicação para gerenciamento de contratos e pagamentos. Ele fornece funcionalidades para visualizar resumos de contratos, registrar pagamentos, acompanhar históricos e gerenciar empresas e contratos.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Back-end**: Implementado em Node.js, responsável pela lógica do servidor e integração com o 
banco de dados.

- **Front-end**: Implementado em Next.js, responsável pela interface do usuário.

### Back-end

Localizado na pasta `back-end/`, o back-end contém:

- **Configurações**:
  
  - `db.js`: Configuração da conexão com o banco de dados MySQL.
  - `uploadsConfig.js`: Configuração para upload de arquivos PDF.
  
- **Controladores**:
  
  - `dashboardController.js`: Gerencia os dados do dashboard, como resumos, pagamentos recentes e próximos vencimentos.
  - `contratosController.js`: Gerencia contratos (criação, listagem, atualização, exclusão, etc.).
  - `pagamentosController.js`: Gerencia pagamentos (registro, histórico, atrasos, etc.).
  - `empresasController.js`: Gerencia empresas (criação, listagem, exclusão).
  
- **Rotas**:
  
  - `dashboardRoutes.js`: Rotas relacionadas ao dashboard.
  - `contratosRoutes.js`: Rotas relacionadas a contratos.
  - `pagamentosRoutes.js`: Rotas relacionadas a pagamentos.
  - `empresasRoutes.js`: Rotas relacionadas a empresas.

### Front-end

Localizado na pasta `front-end/`, o front-end contém:

- **Componentes**:
  
  - `dashboard-summary.tsx`: Exibe o resumo do dashboard.
  - `payment-reminder.tsx`: Lembra pagamentos atrasados.
  
- **Páginas**:
  
  - `dashboard/page.tsx`: Página principal do dashboard.
  - `contract-details/[id]/page.tsx`: Detalhes de um contrato específico.
  - `payment-history/[id]/page.tsx`: Histórico de pagamentos de um contrato.
  - `payment-register/[id]/page.tsx`: Registro de novos pagamentos.
  - `edit-contract/[id]/page.tsx`: Edição de contratos.
  - `register-contract/page.tsx`: Registro de novos contratos.
  - `register-company/page.tsx`: Registro de novas empresas.

## Funcionalidades Principais

- **Dashboard**:
  
  - Resumo de contratos (ativos, pendentes, atrasados, valor total).
  - Listagem de pagamentos recentes.
  - Listagem de próximos vencimentos.
  
- **Contratos**:
  
  - Criação, edição e exclusão de contratos.
  - Upload e download de arquivos PDF associados aos contratos.
  
- **Pagamentos**:
  
  - Registro de novos pagamentos.
  - Histórico de pagamentos.
  - Cálculo de atrasos.
  
- **Empresas**:

  - Gerenciamento de empresas associadas aos contratos.
