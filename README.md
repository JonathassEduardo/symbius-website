# Symbius — Site Institucional

Site institucional da **Symbius**, uma plataforma de tecnologia voltada para conectar clínicas, profissionais de saúde e pacientes, oferecendo soluções digitais para modernizar a gestão e melhorar a experiência no atendimento.

O site apresenta a proposta da Symbius, seus pilares, soluções e canais de contato.

## Tecnologias

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **shadcn/ui** — preset `radix-nova`, cor base `neutral` e ícones Lucide
- **React Router** para gerenciamento de rotas
- **React Hook Form** + **Zod** para formulários e validação
- **oxlint** para análise estática do código

## Funcionalidades

- Apresentação institucional da Symbius;
- Seção sobre a empresa e seus pilares;
- Apresentação das soluções da plataforma;
- Animações e elementos interativos;
- Efeitos visuais de interação com o mouse;
- Seção de contato com direcionamento para o WhatsApp;
- Layout responsivo para diferentes dispositivos.

## Scripts

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Verifica os tipos e gera a versão de produção
npm run preview  # Executa uma prévia da versão de produção
npm run lint     # Executa o oxlint
```

## Estrutura

```text
src/
├── components/
│   ├── layout/          # Componentes de layout
│   └── ui/              # Componentes shadcn/ui
├── config/              # Configurações da aplicação
├── features/            # Funcionalidades organizadas por domínio
├── hooks/               # Hooks personalizados
├── lib/                 # Utilitários e conteúdo institucional
├── pages/               # Páginas do site
└── routes/              # Configuração das rotas
```

## Identidade visual

O site utiliza a identidade visual da Symbius, com componentes personalizados, elementos decorativos, animações e uma interface construída com foco em clareza, modernidade e experiência do usuário.

## Notificações no Discord

O projeto utiliza GitHub Actions para enviar notificações a um canal do Discord quando ocorrem atividades em Pull Requests.

O workflow está localizado em `.github/workflows/discord-pr.yml` e contempla:

- Abertura e reabertura de Pull Requests;
- Envio de novos commits para uma Pull Request;
- Marcação de uma Pull Request como pronta para revisão;
- Fechamento de uma Pull Request, indicando se houve merge.

### Configuração

O segredo `DISCORD_WEBHOOK_URL` deve ser configurado em **Settings → Secrets and variables → Actions**, nas configurações do repositório no GitHub.

O endereço do webhook e outras credenciais sensíveis não devem ser adicionados ao código-fonte.

## Status do projeto

A estrutura inicial do site institucional está configurada. Novas seções, melhorias visuais e funcionalidades serão implementadas conforme a evolução da Symbius.
