export const profile = {
  name: "Sony Anderson",
  firstName: "Sony",
  lastName: "Anderson",
  location: "Macapá, Amapá · Brasil",
  roles: [
    "Desenvolvedor Web",
    "Next.js · React · TypeScript",
    "Suporte & Infraestrutura",
    "DevOps com Docker",
  ],
  headline:
    "Construo sistemas web de ponta a ponta e mantenho a operação de pé, da interface ao contêiner.",
  summary:
    "Profissional de TI desde 2021, hoje na MSB Tecnologia atendendo clientes do setor público do Amapá, com destaque para o DETRAN/AP. Uno a operação do dia a dia (chamados, monitoramento e ambientes em Docker) ao desenvolvimento de aplicações web completas com Next.js, TypeScript e PostgreSQL.",
  summary2:
    "Construo sistemas de ponta a ponta: interface, API, banco de dados, autenticação, armazenamento de arquivos e infraestrutura em contêineres.",
  photo: "/sony.jpg",
  contact: {
    email: "sonyvlhn@gmail.com",
    phone: "(96) 99180-7954",
    whatsapp: "https://wa.me/5596991807954",
    linkedin: "https://www.linkedin.com/in/sonyvlhn/",
    github: "https://github.com/sonyvlhn",
    site: "https://iflashimports.com/",
  },
  metrics: [
    { value: 5, prefix: "~", suffix: " anos", label: "de atuação contínua em TI (desde nov/2021)" },
    { value: 12, prefix: "~", suffix: " hosts", label: "monitorados com Zabbix 7.0" },
    { value: 3, prefix: "", suffix: " projetos", label: "públicos no GitHub, 1 site em produção" },
  ],
  skills: [
    {
      group: "Front-end",
      key: ["Next.js", "React", "TypeScript"],
      rest: ["JavaScript", "Tailwind CSS", "HTML5", "CSS", "Framer Motion"],
    },
    {
      group: "Back-end e dados",
      key: ["PostgreSQL", "Prisma ORM"],
      rest: ["Node.js", "API REST", "Route Handlers", "Server Actions", "Zod", "JWT / bcrypt"],
    },
    {
      group: "Infraestrutura e DevOps",
      key: ["Docker", "Zabbix 7"],
      rest: ["Docker Compose", "Linux (Ubuntu)", "Storage S3", "Redes", "Vercel", "Git"],
    },
    {
      group: "Gestão e suporte",
      key: [],
      rest: ["GLPI", "Redmine", "Documentação técnica", "Suporte N1/N2", "Treinamento de usuários"],
    },
  ],
  experience: [
    {
      title: "Suporte Técnico N1",
      org: "MSB Tecnologia",
      place: "Macapá, AP · Presencial",
      date: "nov 2024 – atual",
      current: true,
      bullets: [
        "Atendimento de primeiro nível em alto volume de chamados no GLPI, do registro e classificação até a solução.",
        "Implantação do monitoramento de cerca de 12 hosts com Zabbix 7.0 (Zabbix Agent 2 em modo ativo, Ubuntu, plugins Docker e PostgreSQL).",
        "Customização do Portal de Serviços do DETRAN/AP na plataforma Sistema Gestor, da MSB.",
        "Elaboração de documentação técnica e guias de serviço; acompanhamento de demandas no Redmine.",
        "Apoio a rotinas DevOps: ambientes com Docker e manutenção de serviços internos.",
      ],
    },
    {
      title: "Técnico",
      org: "Pinguim Telecom e Tecnologia",
      place: "Macapá, AP",
      date: "nov 2021 – nov 2024",
      current: false,
      bullets: [
        "Gestão de TI em cartórios: estações de trabalho, rede e continuidade dos serviços.",
        "Suporte técnico N2 em sistema de gestão empresarial.",
        "Manutenção preventiva e corretiva de computadores; apoio a serviços de telecomunicações e redes.",
        "Treinamento de usuários nos sistemas utilizados.",
      ],
    },
    {
      title: "Voluntário em Manutenção",
      org: "Pinguim Telecom e Tecnologia",
      place: "Macapá, AP",
      date: "out 2020 – dez 2020",
      current: false,
      bullets: [
        "Manutenção de computadores, instalação de sistemas operacionais, organização de documentos e planilhas do provedor e atendimento ao cliente.",
      ],
    },
  ],
  projects: [
    {
      title: "Painel Gestor",
      kind: "Admin do e-commerce",
      href: "https://github.com/sonyvlhn/authenticator",
      linkLabel: "github.com/sonyvlhn/authenticator",
      bullets: [
        "Autenticação com JWT (jose) e senhas com bcrypt; novos cadastros ficam bloqueados até aprovação do administrador.",
        "Produtos e categorias com validação (Zod), desconto percentual, destaque e galeria de até 5 fotos.",
        "Upload de imagens para storage compatível com S3 (SeaweedFS) via AWS SDK.",
        "Ambiente completo em Docker Compose: PostgreSQL, pgAdmin e storage, com credenciais validadas a partir do .env.",
      ],
      stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS 4", "Docker"],
    },
    {
      title: "E-commerce",
      kind: "Loja virtual",
      href: "https://github.com/sonyvlhn/ecommerce",
      linkLabel: "github.com/sonyvlhn/ecommerce",
      bullets: [
        "Vitrine conectada ao PostgreSQL: listagem, filtro e pesquisa de produtos, destaques e cálculo de descontos.",
        "Página dinâmica de produto com carrossel de imagens e quickview.",
        "Interface responsiva com skeleton loading, tema por variáveis CSS e animações com Framer Motion.",
        "Consome os dados do Painel Gestor, formando um sistema completo de loja e administração.",
      ],
      stack: ["Next.js 16", "App Router", "React 19", "Tailwind CSS 4", "PostgreSQL"],
    },
    {
      title: "iFlash",
      kind: "Catálogo de produtos Apple · em produção",
      href: "https://iflashimports.com/",
      linkLabel: "iflashimports.com",
      secondary: { href: "https://github.com/sonyvlhn/Projeto-iFlash", label: "código no GitHub" },
      bullets: [
        "Site em produção para loja de Macapá: vitrine com preços e parcelamento e direcionamento do cliente a um consultor.",
      ],
      stack: ["HTML", "CSS", "JavaScript"],
    },
  ],
  education: [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      org: "Estácio",
      date: "Curso trancado",
      note: "",
    },
    {
      title: "Técnico em Redes de Computadores",
      org: "Instituto Federal do Amapá (IFAP)",
      date: "2018 – 2021",
      note: "Integrado ao Ensino Médio · redes, cabeamento estruturado, sistemas operacionais e administração de serviços",
    },
  ],
  languages: [
    { name: "Português", level: "Nativo", pct: 100 },
    { name: "Inglês", level: "Intermediário", pct: 60 },
  ],
} as const;

export type Profile = typeof profile;
