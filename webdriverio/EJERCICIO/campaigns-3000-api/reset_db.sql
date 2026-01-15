-- Eliminar todos los datos existentes
DELETE FROM campaign_events;
DELETE FROM campaign_categories;
DELETE FROM campaigns;
DELETE FROM subscriber_interests;
DELETE FROM subscribers;
DELETE FROM payments;
DELETE FROM saved_cards;
DELETE FROM users;
DELETE FROM sqlite_sequence;

-- Insertar 5 usuarios (passwords sin hashear para desarrollo)
INSERT INTO users (username, email, password_hash, role) VALUES
('cfalco', 'cfalco@gmail.com', '$2b$10$rYZg5rVhxty5GeQbBMoZ7epFw4GVjaQysiL79Zry/Limge44G0EFO', 'ADMIN'),
('kozinski', 'kozinski@gmail.com', '$2b$10$33icZMVwWfTIz8RkR/8IH.1v5RE5mSeBdLIEgwQkrXA2JmYt.afAe', 'USER'),
('mgarcia', 'mgarcia@gmail.com', '$2b$10$lhgtq1MZtn0FQrz0CjbS4ORCmLD5aBW2G4L2fnF9cJ1HkvDuRuUKO', 'USER'),
('lrodriguez', 'lrodriguez@gmail.com', '$2b$10$wYFsSPbuEgB5U1Vugber2.xGWFWnnblJ2kvn6atfOZsWESv5ScuWq', 'USER'),
('aperez', 'aperez@gmail.com', 'GWw0uewhJqYpl30sgR79nOOxdvY40IJDzYci9YFEL98Hw7Rgj7huC', 'USER');

-- Insertar 3 suscriptores (vinculados a usuarios kozinski, mgarcia y lrodriguez)
INSERT INTO subscribers (name, email, status, user_id, created_at, active_until, unsubscribe_token) VALUES
('Juan Kozinski', 'kozinski@gmail.com', 'suscrito', 2, strftime('%s', 'now') * 1000, strftime('%s', 'now', '+1 year') * 1000, 'token_kozinski_123'),
('María García', 'mgarcia@gmail.com', 'suscrito', 3, strftime('%s', 'now') * 1000, strftime('%s', 'now', '+6 months') * 1000, 'token_mgarcia_456'),
('Luis Rodríguez', 'lrodriguez@gmail.com', 'suscrito', 4, strftime('%s', 'now') * 1000, strftime('%s', 'now', '+3 months') * 1000, 'token_lrodriguez_789');

-- Intereses de los suscriptores
INSERT INTO subscriber_interests (subscriber_id, category) VALUES
(1, 'tecnología'), (1, 'programación'), (1, 'ia'),
(2, 'marketing'), (2, 'diseño'), (2, 'negocios'),
(3, 'blockchain'), (3, 'negocios'), (3, 'tecnología');

-- Insertar 12 campañas de ejemplo
INSERT INTO campaigns (name, subject, content, status, track_clicks, scheduled_date, sent_date, open_rate) VALUES
('Novedades IA 2026', 'Las 5 tendencias de IA que revolucionarán el mercado', 'Descubre cómo la inteligencia artificial está transformando industrias enteras. En este boletín exploramos GPT-5, modelos multimodales y automatización empresarial.', 'enviada', 1, NULL, datetime('now', '-30 days'), 45.5),
('Guía de Marketing Digital', 'Estrategias de marketing que funcionan en 2026', 'Aprende las mejores prácticas de marketing digital: SEO avanzado, publicidad programática y growth hacking para startups.', 'enviada', 1, NULL, datetime('now', '-25 days'), 38.2),
('Desarrollo Web Moderno', 'Next.js 15 y el futuro del desarrollo frontend', 'Exploramos las nuevas características de Next.js 15, React Server Components y las mejores prácticas para aplicaciones web escalables.', 'enviada', 1, NULL, datetime('now', '-20 days'), 52.1),
('Blockchain para Empresas', 'Cómo implementar blockchain en tu negocio', 'Una guía práctica para entender y aplicar tecnología blockchain: contratos inteligentes, DeFi empresarial y casos de uso reales.', 'enviada', 1, NULL, datetime('now', '-15 days'), 29.8),
('Diseño UX/UI 2026', 'Tendencias de diseño que dominarán este año', 'Glassmorphism, microinteracciones y accesibilidad: las claves del diseño moderno que cautivará a tus usuarios.', 'enviada', 1, NULL, datetime('now', '-10 days'), 41.3),
('Python para Data Science', 'Domina Python para análisis de datos', 'Pandas, NumPy y Matplotlib: las herramientas esenciales para convertirte en un experto en ciencia de datos.', 'borrador', 0, NULL, NULL, 0),
('Estrategias de Negocios', 'Cómo escalar tu startup en 2026', 'Financiación, product-market fit y estrategias de crecimiento: todo lo que necesitas para llevar tu negocio al siguiente nivel.', 'programada', 1, datetime('now', '+7 days'), NULL, 0),
('Machine Learning Práctico', 'De cero a experto en ML', 'TensorFlow, PyTorch y Scikit-learn: aprende a crear modelos de machine learning paso a paso.', 'borrador', 0, NULL, NULL, 0),
('SEO Avanzado', 'Técnicas de SEO que Google adora', 'Core Web Vitals, E-E-A-T y link building ético: estrategias probadas para posicionar tu web en los primeros resultados.', 'programada', 1, datetime('now', '+14 days'), NULL, 0),
('React Native 2026', 'Apps móviles con React Native', 'Construye aplicaciones móviles nativas con JavaScript: arquitectura, rendimiento y mejores prácticas.', 'enviada', 1, NULL, datetime('now', '-5 days'), 35.7),
('NFTs y Web3', 'El futuro de los activos digitales', 'Smart contracts, marketplaces y tokenización: todo sobre el ecosistema Web3 y sus oportunidades.', 'borrador', 0, NULL, NULL, 0),
('Growth Hacking', 'Crecer sin gastar una fortuna', 'Técnicas de growth hacking probadas: viralidad, referidos y automatización del marketing para startups con presupuesto limitado.', 'enviada', 1, NULL, datetime('now', '-3 days'), 48.9);

-- Categorías de las campañas
INSERT INTO campaign_categories (campaign_id, category) VALUES
(1, 'ia'), (1, 'tecnología'),
(2, 'marketing'), (2, 'negocios'),
(3, 'programación'), (3, 'tecnología'),
(4, 'blockchain'), (4, 'negocios'),
(5, 'diseño'),
(6, 'programación'), (6, 'ia'),
(7, 'negocios'),
(8, 'ia'), (8, 'programación'),
(9, 'marketing'),
(10, 'programación'), (10, 'tecnología'),
(11, 'blockchain'), (11, 'tecnología'),
(12, 'marketing'), (12, 'negocios');
