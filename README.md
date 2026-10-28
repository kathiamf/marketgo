# MarketGo

Aplicativo mobile-first de delivery de mercado, desenvolvido com Expo, React Native, Expo Router e Supabase. O projeto demonstra autenticação, catálogo, carrinho persistente, checkout e acompanhamento de pedidos; não processa pagamentos nem realiza entregas reais.

## Requisitos

- Node.js 24 ou compatível com Expo SDK 58
- npm
- Projeto Supabase próprio para habilitar autenticação e operações reais

## Configuração

```powershell
npm install
Copy-Item .env.example .env
```

Edite `.env` com a URL do projeto e a chave **pública** (anon/publishable) do Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=SUA-CHAVE-PUBLICA
```

Não coloque chaves `service_role` ou outros segredos em variáveis `EXPO_PUBLIC_*`. No painel SQL do Supabase, execute `supabase/schema.sql` e, em seguida, `supabase/seed.sql`. Reinicie o Expo depois de alterar o `.env`:

```powershell
npx expo start -c
```

Sem essas credenciais, a tela inicial apresenta as instruções de configuração. Não há backend de demonstração nem dados falsos no aplicativo. A configuração Supabase, as contas e os fluxos reais não foram validados neste ambiente.

## Comandos

```powershell
npm run web
npm test
npm run test:app
npm run test:db
npm run typecheck
npm run lint
npm run format
npx expo export --platform web
npx expo-doctor
```

`npm test` executa os 37 testes de aplicação e os 13 testes do SQL com PGlite. Esses testes não substituem a validação de uma instância Supabase real ou em dispositivos físicos.

## Funcionalidades

- Cadastro, login e sessão usando Supabase Auth.
- Catálogo de lojas, busca, categorias, detalhes da loja e do produto.
- Carrinho persistente por usuário, limitado a uma loja e com quantidades validadas.
- Checkout com endereço e método de pagamento simulado.
- Criação do pedido por função SQL, com preços e total calculados no servidor.
- Histórico, detalhes, acompanhamento e cancelamento conforme o estado do pedido.
- Políticas RLS para separar dados dos usuários.

## Estrutura

- `app/`: rotas Expo Router para autenticação, lojas, produtos, carrinho e pedidos.
- `src/`: componentes, contexto, hooks, serviços, tipos, validações e regras de negócio.
- `supabase/schema.sql`: tabelas, políticas RLS e funções SQL.
- `supabase/seed.sql`: seis lojas e 50 produtos de exemplo.
- `__tests__/` e `supabase/tests/`: testes da aplicação e do banco.
- `docs/`: cenários manuais, roteiro de apresentação e relatório.
- `logs/`: saídas reais de comandos e histórico de erros observados.

## Validação e limitações conhecidas

No ambiente de desenvolvimento, os 50 testes automatizados passaram, o TypeScript e o ESLint passaram, o Expo Doctor concluiu 20/20 verificações e a exportação web foi gerada. A inicialização no navegador foi verificada; a tela pediu as credenciais ausentes, como esperado.

Os 18 cenários manuais estão documentados como **não executados** até que haja configuração Supabase e validação no ambiente-alvo. O avanço de status é demonstrativo e não representa integração com entregadores. Pagamento é simulado.

Consulte [docs/erros-e-solucoes.md](./docs/erros-e-solucoes.md), [docs/testes-manuais.md](./docs/testes-manuais.md), [docs/roteiro-apresentacao.md](./docs/roteiro-apresentacao.md) e o [relatório DOCX](./docs/relatorio-projeto.docx).

## Licença

Consulte [LICENSE](./LICENSE).
