# Roteiro de apresentação — aproximadamente 5 minutos

## 0:00–0:40 | Problema e objetivo

“O MarketGo é um protótipo mobile-first para compras em mercados locais. A proposta é reunir catálogo, carrinho e acompanhamento de pedidos em uma experiência simples. O projeto foi organizado para demonstrar um fluxo de compra realista, mas não processa pagamentos nem realiza entregas.”

## 0:40–1:20 | Tecnologias e arquitetura

“A interface usa Expo SDK 58, React Native e Expo Router. O Supabase fornece autenticação e persistência. A aplicação separa rotas, componentes, contexto, serviços e regras de domínio. O carrinho fica associado ao usuário, e os dados sensíveis de pedidos não são gravados por escrita direta do cliente.”

## 1:20–2:30 | Demonstração da experiência

“Com um projeto Supabase configurado, o fluxo percorre autenticação, navegação por lojas e produtos, inclusão no carrinho, checkout e consulta do pedido. A regra de uma loja por carrinho reduz ambiguidades de frete e disponibilidade. Sem credenciais, o app informa claramente como configurar o backend; não substituímos o serviço por dados falsos.”

**Nota para apresentação neste ambiente:** não demonstrar telas autenticadas como se tivessem sido validadas. A tela inicial de configuração foi a única verificada no navegador.

## 2:30–3:25 | Banco e regras

“O banco possui tabelas para lojas, produtos, pedidos e itens, com políticas de Row Level Security. A função `create_order` recebe identificadores e quantidades; preço e total são calculados no servidor, e os itens ficam registrados como snapshot. As funções de status protegem a propriedade do pedido e restringem cancelamento.”

## 3:25–4:20 | Testes e qualidade

“A suíte automatizada passou com 37 testes de regras da aplicação e 13 testes SQL executados em PGlite. TypeScript e ESLint passaram, Expo Doctor concluiu 20 de 20 verificações e a exportação web foi gerada. Há também 18 cenários manuais documentados, ainda pendentes porque o ambiente não possui credenciais Supabase.”

## 4:20–5:00 | Limitações e próximos passos

“O pagamento e o avanço de status são demonstrativos; não existe integração com gateway ou entregador. Para completar a validação, o próximo passo é configurar um Supabase de teste, executar schema e seed e rodar os cenários manuais em dispositivo-alvo. O projeto registra os erros reais de dependências e as correções sem esconder as limitações.”
