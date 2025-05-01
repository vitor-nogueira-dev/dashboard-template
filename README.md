# Dashboard Template

![License](https://img.shields.io/github/license/vitor-nogueira-dev/dashboard-template)
![Next.js](https://img.shields.io/badge/Next.js-^15.3.1-blue)
![React](https://img.shields.io/badge/React-^19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-^5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-^4.0-blue)
![ShadcnUI](https://img.shields.io/badge/ShadcnUI-2.5.0-blue)
![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-0.503.0-blue)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

Um template open-source de dashboard moderno construído com **Next.js 15**, **ShadcnUI**, **TypeScript** e **Context API**. Projetado para acelerar o desenvolvimento de interfaces escaláveis, com telas prontas, componentes personalizados e uma galeria interativa de exemplos.

🔗 Demo: [Demo Dashboard Template](https://dashboard-template-onogueiradev.vercel.app).

![Dashboard Print](/public/example-application.png)

## Índice
- [Dashboard Template](#dashboard-template)
  - [Índice](#índice)
  - [Funcionalidades](#funcionalidades)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Como Usar](#como-usar)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Componentes Personalizados](#componentes-personalizados)
  - [Linting e Convenções de Código](#linting-e-convenções-de-código)
    - [Configuração do ESLint](#configuração-do-eslint)
    - [Executando o ESLint](#executando-o-eslint)
    - [Desativando Regras](#desativando-regras)
  - [Contribuição](#contribuição)
  - [Licença](#licença)
  - [Créditos](#créditos)
  - [Contato](#contato)

## Funcionalidades
- Telas pré-construídas para dashboards (ex.: dashboard, analytics, settings, profile).
- Telas de autenticação (ex.: signin, signup, reset password).
- Galeria interativa de componentes em `/dashboard/components-guide/` (ex.: botões, formulários, tabelas).
- Componentes reutilizáveis baseados no ShadcnUI, com personalizações (ex.: botão com novas variantes).
- Gerenciamento de estado com Context API.
- Tipagem segura com TypeScript.
- Estilização com Tailwind CSS.
- Suporte a dark mode e light mode.
- Responsividade para dispositivos móveis e desktops.
- Integração com Lucide Icons para ícones personalizáveis.

## Pré-requisitos
- Node.js (versão 18.x ou superior)
- npm ou yarn
- Conhecimento básico de Next.js e TypeScript

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/vitor-nogueira-dev/dashboard-template.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd dashboard-template
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Como Usar
- Acesse `http://localhost:3000` para visualizar o dashboard.
- Explore a galeria de componentes em `/dashboard/components-guide/` para ver exemplos de uso.
- Personalize componentes em `components/ui/` (ex.: adicione novas variantes ao `Button`).
- Adicione novas telas em `app/` ou configure o estado global em `contexts/`.
- Ajuste o tema (dark/light) em `contexts/theme-color-context.tsx`.


## Estrutura do Projeto
```plaintext
├── app/                  # Rotas do Next.js App Router
│   ├── (auth)/           # Rotas de autenticação
│   │   ├── signin/       # Tela de login
│   │   ├── signup/       # Tela de registro
│   │   ├── reset-password/ # Tela de redefinição de senha
│   ├── dashboard/      # Rotas do dashboard
│   │   ├── analytics/    # Tela de analytics
│   │   ├── settings/     # Tela de configurações
│   │   ├── profile/      # Tela de perfil
│   │   ├── components-guide/ # Galeria de exemplos de componentes
│   │   │   ├── display/  # Exemplos de tabelas, gráficos, etc.
│   │   │   ├── forms/    # Exemplos de formulários e inputs
├── components/             # Componentes reutilizáveis
│   ├── ui/               # Componentes genéricos (baseados no ShadcnUI com modificações)
│   ├── auth/         # Componentes de autenticação
│   ├── analytics/    # Componentes de analytics
│   ├── dashboard/    # Componentes do dashboard
│   ├── profile/      # Componentes de perfil
├── contexts/              # Contextos para gerenciamento de estado
├── hooks/                 # Hooks personalizados
├── lib/                   # Funções utilitárias
├── public/                # Arquivos estáticos
├── README.md              # Documentação principal
├── LICENSE                # Licença
├── CONTRIBUTING.md        # Diretrizes de contribuição
├── CODE_OF_CONDUCT.md     # Código de conduta
```
A pasta `app/dashboard/components-guide/` contém uma galeria interativa com exemplos de uso dos componentes, organizada por categorias (ex.: exibição, formulários, botões). Consulte `app/dashboard/components-guide` para mais detalhes.

## Componentes Personalizados
Este template inclui componentes do [ShadcnUI](https://ui.shadcn.com/) com modificações para maior flexibilidade. Destaques:

- **Button**: Baseado no ShadcnUI, com melhorias:
  - Novas variantes: `subtle`, `accent`, `glass`.
  - Tamanhos adicionais: `xl`, `icon-sm`, `icon-lg`.
  - Suporte a ícones (`leftIcon`, `rightIcon`) e estado de carregamento (`isLoading`).
  - Exemplo de uso:
```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

<Button
   variant="accent"
   size="lg"
   isLoading
   loadingText="Carregando..."
   leftIcon={<Loader2 />}
>
   Clique Aqui
</Button>
```
Consulte a [documentação do ShadcnUI](https://ui.shadcn.com/) para mais detalhes sobre os componentes originais.

## Linting e Convenções de Código

Este projeto utiliza ESLint para garantir a consistência e qualidade do código. Nossa configuração inclui regras específicas para TypeScript, React e Next.js, seguindo as melhores práticas da comunidade.

### Configuração do ESLint

O projeto segue as seguintes convenções:
- Uso obrigatório de ponto e vírgula
- Aspas simples para strings
- Indentação com 2 espaços
- Preferência por declarações `const` quando possível
- Formatação consistente de objetos e arrays

### Executando o ESLint

1. Para verificar problemas no código:
   ```bash  
   npm run lint
   ```

2. Para corrigir automaticamente os problemas encontrados:
   ```bash
   npm run lint:fix
   ```

### Desativando Regras

Em casos excepcionais, você pode desativar regras específicas usando comentários:

```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function exemplo(parametroNaoUtilizado: string) {
  // código
}
```

Por favor, mantenha a consistência de código ao contribuir para este projeto.

## Contribuição
Contribuições são muito bem-vindas! Veja como contribuir em [CONTRIBUTING.md](CONTRIBUTING.md) e siga nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ajude a melhorar componentes, adicionar telas ou corrigir bugs!

## Licença
Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações. Alguns componentes são derivados do ShadcnUI, que também utiliza a licença MIT. Consulte os arquivos individuais para avisos de direitos autorais.

## Créditos
- Componentes de UI: [ShadcnUI](https://ui.shadcn.com/) (com modificações, ex.: `Button`).
- Framework: [Next.js](https://nextjs.org/)
- Estilização: [Tailwind CSS](https://tailwindcss.com/)
- Ícones: [Lucide Icons](https://lucide.dev/)

## Contato
Para dúvidas ou sugestões:
- Email: [onogueiradev@gmail.com](mailto:onogueiradev@gmail.com)
- GitHub: [vitor-nogueira-dev](https://github.com/vitor-nogueira-dev)
- LinkedIn: [vitor-nogueira-dev](https://www.linkedin.com/in/vitor-nogueira-dev/)