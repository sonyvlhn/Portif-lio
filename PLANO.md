# Plano de ação — Portfólio Sony Anderson

1. **Base**: Next.js (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion + Lenis (rolagem suave).
2. **Conteúdo**: todos os dados do currículo em `src/data/profile.ts` — edite ali, sem mexer em componentes.
3. **Seções**: Hero → Perfil (métricas) → Competências → Experiência (timeline) → Projetos → Formação → Contato.
4. **Movimento contínuo**:
   - Fundo "aurora" animado + grade em movimento + ruído
   - Cursor customizado com mola; barra de progresso de rolagem
   - Hero: nome com letras animadas, cargo rotativo, foto com parallax/tilt e anéis orbitando
   - Terminal "digitando" comandos de DevOps em loop
   - Marquee infinito de tecnologias (duas direções)
   - Timeline com linha que se desenha conforme a rolagem
   - Cards de projeto com tilt 3D e spotlight seguindo o mouse
   - Contadores animados; botões magnéticos; navegação com indicador ativo
   - Tudo respeita `prefers-reduced-motion`
5. **Foto**: `public/sony.jpg` (imagem anexada).
6. **Verificação**: `npm run build` e `npm run dev`.
