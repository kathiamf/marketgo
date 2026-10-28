# Relatório do projeto MarketGo

**Data do registro:** 28/10/2026

**Repositório:** https://github.com/kathiamf/marketgo

**Plataforma:** Expo / React Native
**Estado:** implementação e validações automatizadas concluídas; integração com Supabase real e testes manuais pendentes.

## 1. Objetivo

Desenvolver um protótipo mobile-first para compras em mercados locais, cobrindo navegação de catálogo, carrinho, checkout demonstrativo e consulta do pedido. O escopo não inclui processamento financeiro ou operação real de entrega.

## 2. Implementação

O aplicativo usa Expo SDK 58, React Native, Expo Router e TypeScript. O Supabase é a camada planejada de autenticação e persistência. A interface tem rotas para autenticação, lojas, produtos, carrinho, checkout, perfil e pedidos. Validações compartilhadas cobrem quantidades, preço em centavos e regras do carrinho.

O SQL define lojas, produtos, pedidos e itens, políticas RLS e funções para criar e atualizar pedidos. O servidor calcula totais e cria snapshots dos itens. O seed contém seis lojas e 50 produtos. A atualização de status é demonstrativa; não é uma integração com entregadores.

## 3. Validação automatizada

| Verificação                                       |           Resultado registrado |
| ------------------------------------------------- | -----------------------------: |
| Testes de aplicação                               |                    37 passaram |
| Testes SQL com PGlite                             |                    13 passaram |
| TypeScript (`npm run typecheck`)                  |                         passou |
| ESLint (`npm run lint`)                           |                         passou |
| Expo Doctor                                       |    20/20 verificações passaram |
| Exportação web (`npx expo export --platform web`) |                      concluída |
| Smoke test web sem `.env`                         | tela de configuração observada |

Os logs de comandos em `logs/` preservam as evidências de execução e os erros encontrados. A falha de `npx expo lint` não foi apresentada como sucesso; o comando configurado e validado é `npm run lint`, que executa `eslint .`.

## 4. Testes manuais e limitações

O ambiente não possui `.env` nem credenciais de um projeto Supabase. Por esse motivo, cadastro, login, catálogo remoto e pedidos reais não foram validados; 17 cenários manuais permanecem não executados, enquanto M01 verificou a tela de configuração. Os passos e estados estão em `testes-manuais.md`.

Também não foi validado em aparelho físico. Pagamento, avanço de status e entrega são simulados. A instalação relatou vulnerabilidades de dependências; não há relatório de auditoria detalhado neste trabalho. Não se deve usar chave `service_role` no aplicativo.

## 5. Problemas encontrados e correções

1. Incompatibilidade React / `react-dom` provocou `ERESOLVE`; os pacotes web foram alinhados usando `npx expo install`.
2. Jest incluiu indevidamente um teste ESM de banco; sua descoberta foi limitada aos testes TypeScript de app, e o banco passou a usar `node --test`.
3. Erros de tipagem nas integrações TypeScript foram corrigidos e o typecheck final passou.
4. `npx expo lint` encontrou configuração inconsistente; `npm run lint` foi configurado para executar ESLint diretamente e passou.
5. Expo Doctor encontrou dependências ausentes/desalinhadas; correções via Expo alinharam o projeto, resultando em 20/20 verificações.

Mais detalhes e nomes dos logs: `erros-e-solucoes.md`.

## 6. Próximas etapas

1. Configurar projeto Supabase de teste e variáveis públicas em `.env`.
2. Aplicar schema e seed, validar RLS e executar M02–M18 da lista manual.
3. Testar layout e navegação em dispositivos iOS e Android.
4. Revisar as vulnerabilidades reportadas pelo npm antes de atualizar dependências.
5. Planejar integrações de pagamento e entrega somente se entrarem no escopo do produto.

## 7. Apresentação

O roteiro estimado de cinco minutos está em `roteiro-apresentacao.md`.
