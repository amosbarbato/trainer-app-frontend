<h1 align="center">🚀 Trainer AI Frontend</h1>

## 📌 O projeto

Aplicação completa de gestão de treinos, com foco em personalização, acompanhamento de desempenho e uso de Inteligência Artificial para geração automatizada de treinos.
Uma plataforma inteligente que ajuda usuários a manter consistência nos treinos, acompanhar sua evolução e receber recomendações personalizadas de forma prática e automatizada.

### Principais Funcionalidades

**Chatbot com IA:**

- Geração automática de treinos personalizados
- Baseado em dados do usuário (objetivo, nível, disponibilidade, etc.)
- Interação simples e dinâmica via chat

**Gestão de Treinos:**

- Criação e organização de planos de treino
- Visualização dos treinos por dia/semana
- Marcação de treinos como 

**Dashboard de Acompanhamento**

- Monitoramento da consistência semanal
- Exibição de sequência atual (streak)
- Registro de recordes pessoais
- Indicadores visuais de evolução

**Diferenciais do Projeto**

- Integração de IA para personalização dos treinos
- Experiência centrada no usuário
- Visualização clara de progresso e desempenho

### Backend

**Outra parte do projeto:** [trainer-app-backend](https://github.com/amosbarbato/trainer-app-backend) - Backend API (Node.JS).

## 🛠️ Stack

- **Next.Js** 16+ (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/UI**
- **Zod** - validation
- **Better Auth** - auth (Google)
- **Orval** - geração de funções de API

## 📥 Comandos

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor dev |
| `pnpm build` | Build com tsup |
| `pnpm start` | Inicia o servidor build | 
| `pnpm lint` | Executa o ESLint |
| `pnpm dlx orval` | Regenerar o cliente de API a partir da especificação do OpenAPI do backend |
| `pnpm dlx shadcn@latest add <component>` | Instala um componente com shadcn/UI |

## 🧩 Arquitetura

### Variaveis `.env`
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=

# Frontend URL
NEXT_PUBLIC_BASE_URL= 
```

### Estrutura de Diretórios

`@/*` mapeia para a raiz do projeto `(./)`. Exemplo: `@/_components/ui/button`, `@/app/_lib/auth-client`.

- `app/` - Next.js App Router e código em nível de aplicativo
  - `_lib/` - Bibliotecas internas (auth client, API layer, fetch mutation)
    - `api/fetch-generated/` - Funções de fetch geradas pelo Orval para componentes do servidor
    - `auth-client.ts` - BetterAuth client instance (authClient)
    - `fetch.ts` - Fetch mutation personalizado que prepende a URL da API e encaminha cookies
  - `_components/ui` - Componentes shadcn/UI

## License

MIT