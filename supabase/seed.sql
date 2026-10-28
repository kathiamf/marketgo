-- MarketGo sample catalog: 6 stores and 50 products.
insert into public.stores
  (name, category, emoji, description, rating, delivery_fee, eta_min, eta_max, min_order, is_open)
values
  ('Mercado Bom Preço', 'Mercado', '🛒', 'Supermercado de bairro com entrega rápida.', 4.7, 5.9, 30, 45, 20.0, true),
  ('Padaria Pão Quente', 'Padaria', '🥖', 'Pães e cafés saindo do forno o dia todo.', 4.8, 3.5, 15, 25, 10.0, true),
  ('Farmácia Vida', 'Farmácia', '💊', 'Medicamentos e higiene, sem sair de casa.', 4.6, 6.0, 25, 40, 15.0, true),
  ('Hortifrúti da Terra', 'Hortifrúti', '🥬', 'Frutas, verduras e legumes fresquinhos.', 4.5, 4.9, 30, 50, 25.0, true),
  ('Pizzaria Forno a Lenha', 'Restaurante', '🍕', 'Pizzas artesanais de massa fina.', 4.9, 7.9, 40, 60, 30.0, true),
  ('Sushi Sakura', 'Restaurante', '🍣', 'Culinária japonesa. Volta amanhã.', 4.4, 9.9, 45, 65, 40.0, false);

insert into public.products (store_id, section, name, description, price, emoji)
select store.id, product.section, product.name, product.description, product.price, product.emoji
from (
  values
    ('Mercado Bom Preço', 'Hortifrúti', 'Banana prata 1 kg', '', 6.9, '🍌'),
    ('Mercado Bom Preço', 'Hortifrúti', 'Maçã gala 1 kg', '', 9.9, '🍎'),
    ('Mercado Bom Preço', 'Hortifrúti', 'Tomate 1 kg', '', 7.5, '🍅'),
    ('Mercado Bom Preço', 'Mercearia', 'Arroz branco 5 kg', 'Tipo 1, grãos longos.', 29.9, '🍚'),
    ('Mercado Bom Preço', 'Mercearia', 'Feijão carioca 1 kg', '', 8.5, '🫘'),
    ('Mercado Bom Preço', 'Mercearia', 'Macarrão espaguete 500 g', '', 4.8, '🍝'),
    ('Mercado Bom Preço', 'Mercearia', 'Café torrado 500 g', 'Moagem média.', 18.9, '☕'),
    ('Mercado Bom Preço', 'Laticínios', 'Leite integral 1 L', '', 5.25, '🥛'),
    ('Mercado Bom Preço', 'Laticínios', 'Queijo mussarela 200 g', '', 14.9, '🧀'),
    ('Mercado Bom Preço', 'Laticínios', 'Manteiga 200 g', '', 11.9, '🧈'),
    ('Mercado Bom Preço', 'Limpeza', 'Detergente 500 ml', '', 2.9, '🧴'),
    ('Mercado Bom Preço', 'Limpeza', 'Sabão em pó 1 kg', '', 12.5, '🧼'),
    ('Padaria Pão Quente', 'Pães', 'Pão francês (6 un)', 'Crocante por fora, macio por dentro.', 4.8, '🥖'),
    ('Padaria Pão Quente', 'Pães', 'Pão de queijo (10 un)', '', 12.0, '🧀'),
    ('Padaria Pão Quente', 'Pães', 'Pão na chapa', '', 5.5, '🍞'),
    ('Padaria Pão Quente', 'Doces', 'Bolo de cenoura (fatia)', 'Com cobertura de chocolate.', 7.5, '🍰'),
    ('Padaria Pão Quente', 'Bebidas', 'Café com leite', '', 6.5, '☕'),
    ('Padaria Pão Quente', 'Bebidas', 'Suco de laranja 300 ml', '', 8.0, '🍊'),
    ('Padaria Pão Quente', 'Salgados', 'Coxinha', '', 6.5, '🍗'),
    ('Padaria Pão Quente', 'Salgados', 'Empada de frango', '', 6.0, '🥧'),
    ('Farmácia Vida', 'Analgésicos', 'Dipirona 500 mg (10 comp.)', '', 9.9, '💊'),
    ('Farmácia Vida', 'Analgésicos', 'Paracetamol 750 mg (10 comp.)', '', 11.5, '💊'),
    ('Farmácia Vida', 'Higiene', 'Sabonete 90 g', '', 2.5, '🧼'),
    ('Farmácia Vida', 'Higiene', 'Creme dental 90 g', '', 5.9, '🪥'),
    ('Farmácia Vida', 'Higiene', 'Escova de dentes', '', 7.9, '🪥'),
    ('Farmácia Vida', 'Higiene', 'Protetor solar FPS 50', '', 39.9, '🧴'),
    ('Farmácia Vida', 'Cuidados', 'Álcool em gel 500 ml', '', 9.9, '🧴'),
    ('Farmácia Vida', 'Cuidados', 'Curativo (20 un)', '', 8.5, '🩹'),
    ('Hortifrúti da Terra', 'Frutas', 'Laranja 1 kg', '', 5.9, '🍊'),
    ('Hortifrúti da Terra', 'Frutas', 'Mamão papaia', '', 6.5, '🍈'),
    ('Hortifrúti da Terra', 'Frutas', 'Uva sem semente 500 g', '', 14.9, '🍇'),
    ('Hortifrúti da Terra', 'Verduras', 'Alface crespa', '', 3.9, '🥬'),
    ('Hortifrúti da Terra', 'Verduras', 'Cenoura 1 kg', '', 5.5, '🥕'),
    ('Hortifrúti da Terra', 'Verduras', 'Brócolis', '', 6.9, '🥦'),
    ('Hortifrúti da Terra', 'Legumes', 'Batata 1 kg', '', 6.2, '🥔'),
    ('Hortifrúti da Terra', 'Legumes', 'Cebola 1 kg', '', 5.8, '🧅'),
    ('Hortifrúti da Terra', 'Legumes', 'Abóbora', '', 4.9, '🎃'),
    ('Hortifrúti da Terra', 'Ovos', 'Ovos caipiras (12 un)', '', 16.0, '🥚'),
    ('Pizzaria Forno a Lenha', 'Pizzas', 'Margherita', 'Molho de tomate, mussarela e manjericão.', 42.0, '🍕'),
    ('Pizzaria Forno a Lenha', 'Pizzas', 'Calabresa', 'Calabresa fatiada e cebola.', 46.0, '🍕'),
    ('Pizzaria Forno a Lenha', 'Pizzas', 'Quatro queijos', 'Mussarela, parmesão, gorgonzola e catupiry.', 52.0, '🍕'),
    ('Pizzaria Forno a Lenha', 'Bebidas', 'Refrigerante 2 L', '', 12.0, '🥤'),
    ('Pizzaria Forno a Lenha', 'Bebidas', 'Suco natural 500 ml', '', 9.0, '🍹'),
    ('Pizzaria Forno a Lenha', 'Sobremesas', 'Brownie com sorvete', '', 18.0, '🍫'),
    ('Pizzaria Forno a Lenha', 'Sobremesas', 'Pudim', '', 12.0, '🍮'),
    ('Sushi Sakura', 'Combos', 'Combo 20 peças', '', 79.9, '🍣'),
    ('Sushi Sakura', 'Combos', 'Combo 30 peças', '', 109.9, '🍣'),
    ('Sushi Sakura', 'Individuais', 'Temaki de salmão', '', 24.9, '🍣'),
    ('Sushi Sakura', 'Individuais', 'Hot roll (8 un)', '', 28.9, '🍤'),
    ('Sushi Sakura', 'Bebidas', 'Chá gelado', '', 8.0, '🍵')
) as product(store_name, section, name, description, price, emoji)
join public.stores store on store.name = product.store_name;
