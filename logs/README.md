# Registros de execução

Os arquivos desta pasta preservam saídas reais de comandos executados durante o desenvolvimento.
Os nomes usam a data local e a etapa do projeto; uma nova execução deve gerar um novo arquivo, sem
substituir o registro anterior. Mensagens de erro são mantidas para mostrar o diagnóstico e a
tentativa de correção. Antes de publicar, revise os logs para confirmar que não contêm chaves,
tokens, senhas ou outros dados sensíveis.

## Registros

- `2026-10-28-dependency-install.log`: instalação das dependências Expo e erro ERESOLVE
  encontrado e corrigido alinhando `react-dom` com a versão compatível do SDK 58.
- `2026-10-28-format.log`: formatação Prettier concluída.
- `2026-10-28-tests.log`: execução conjunta final dos 37 testes de aplicação e 13 testes SQL.
- `2026-10-28-typecheck.log`: execução final do TypeScript.
- `2026-10-28-lint.log`: execução final do ESLint via `npm run lint`.
- `2026-10-28-expo-doctor.log`: execução final do Expo Doctor.
- `2026-10-28-web-export.log`: exportação web do Expo concluída.
- `2026-10-28-expo-web-start.log`: inicialização web usada no smoke test sem credenciais Supabase.

Logs anteriores de tentativas com falha também foram preservados para documentar diagnóstico e correção; consulte [../docs/erros-e-solucoes.md](../docs/erros-e-solucoes.md).

## Comandos

- `npx expo install ...`: seleciona versões compatíveis com o SDK Expo instalado.
- `npm install ...`: instala as dependências JavaScript do app.
- `npm run typecheck`: verifica os tipos TypeScript.
- `npm run test:app`: executa os testes de regras do aplicativo.
- `npm run test:db`: executa os testes SQL no PGlite.
- `npx expo start`: inicia o app em desenvolvimento.
- `npx expo export --platform web`: valida a compilação/exportação web.
- `npx expo-doctor`: verifica compatibilidade do projeto Expo.

Os logs de comandos adicionais são acrescentados conforme cada etapa é executada. O smoke test web
confirmou somente a tela de instrução de configuração, pois não havia `.env`. Nenhum resultado dos
fluxos autenticados é presumido; os 17 cenários que dependem do Supabase permanecem pendentes em
[../docs/testes-manuais.md](../docs/testes-manuais.md).
