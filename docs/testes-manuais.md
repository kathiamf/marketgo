# Plano e registro de testes manuais

**Estado deste registro:** os 18 cenários abaixo não foram executados. Não havia credenciais Supabase no ambiente; a validação web alcançou somente a tela explícita de configuração. Marcar um teste como pendente evita apresentar expectativas como resultados reais.

| ID  | Cenário                                                   | Resultado esperado                                                                     | Situação                                      |
| --- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- |
| M01 | Abrir o app sem configuração Supabase                     | Exibir orientação de configuração, sem travar ou exibir dados fictícios.               | Verificado no navegador: exibiu a orientação. |
| M02 | Abrir o app com URL e chave pública Supabase válidas      | Carregar as rotas iniciais e consultar dados do backend.                               | Não executado: sem projeto configurado.       |
| M03 | Cadastrar conta com dados válidos                         | Criar usuário e iniciar ou confirmar a sessão conforme Supabase.                       | Não executado: sem credenciais.               |
| M04 | Cadastrar com e-mail inválido ou senha inválida           | Impedir envio e mostrar validação compreensível.                                       | Não executado manualmente.                    |
| M05 | Entrar com credenciais corretas                           | Abrir a área autenticada e preservar a sessão.                                         | Não executado: sem credenciais.               |
| M06 | Entrar com senha incorreta                                | Mostrar erro sem revelar dados sensíveis.                                              | Não executado: sem credenciais.               |
| M07 | Encerrar sessão                                           | Desautenticar e retornar à tela pública apropriada.                                    | Não executado: sem credenciais.               |
| M08 | Navegar pelas lojas e categorias                          | Apresentar lojas e filtros retornados pelo banco.                                      | Não executado: sem seed remoto.               |
| M09 | Buscar loja ou produto                                    | Mostrar resultados compatíveis com o termo e estado vazio quando não houver resultado. | Não executado: sem seed remoto.               |
| M10 | Abrir loja e produto                                      | Mostrar descrição, preço, disponibilidade e contexto da loja.                          | Não executado: sem seed remoto.               |
| M11 | Adicionar produto ao carrinho                             | Atualizar quantidade e subtotal de forma coerente.                                     | Não executado manualmente.                    |
| M12 | Adicionar produto de uma segunda loja                     | Impedir mistura de lojas no mesmo carrinho e explicar a regra.                         | Não executado manualmente.                    |
| M13 | Alterar quantidade e remover item                         | Recalcular total corretamente e permitir carrinho vazio.                               | Não executado manualmente.                    |
| M14 | Fechar e reabrir o app com itens no carrinho              | Restaurar o carrinho do usuário correto sem misturar sessões.                          | Não executado manualmente.                    |
| M15 | Enviar checkout incompleto                                | Bloquear pedido e apontar os campos obrigatórios.                                      | Não executado: sem sessão Supabase.           |
| M16 | Criar pedido válido e verificar total                     | Criar pedido e itens com preço calculado no SQL; apresentar confirmação.               | Não executado: sem backend configurado.       |
| M17 | Acompanhar pedido e tentar cancelar em estados diferentes | Exibir histórico/status e aceitar cancelamento somente na condição permitida.          | Não executado: sem backend configurado.       |
| M18 | Sair e entrar com outro usuário                           | Não revelar carrinho nem pedidos do usuário anterior.                                  | Não executado: sem duas contas Supabase.      |

## Próxima execução

1. Configure `.env` com URL e chave pública de um projeto de teste.
2. Execute `supabase/schema.sql` e `supabase/seed.sql` no projeto.
3. Inicie o app com `npx expo start -c` e execute M02–M18 no dispositivo/navegador de destino.
4. Anote data, ambiente, resultado observado e evidência para cada ID; não altere os estados acima sem executar o cenário.
