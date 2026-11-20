/** Official results seed — replace via Studio export JSON for production. */

function placeholderPhoto(label, accent = '#ff2a85') {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0a2e"/>
      <stop offset="45%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#ff7b00"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="620" cy="120" r="90" fill="#ff7b00" opacity="0.55"/>
  <circle cx="620" cy="120" r="55" fill="#ff2a85" opacity="0.4"/>
  <path d="M40 520 Q120 380 200 500 T360 480 T520 520 T680 460 T800 540 L800 600 L40 600 Z" fill="#0b0616" opacity="0.85"/>
  <text x="400" y="300" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="42" fill="#fff" opacity="0.92">${label}</text>
  <text x="400" y="350" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#00f0ff">LEONIDA CREW</text>
</svg>`.trim()
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const STORAGE_KEY = 'uninorte-piv-hof-2026'

export const seedTeams = [
  {
    id: 'team-aurora',
    rank: 1,
    name: 'Squad Aurora',
    project: 'Sistema de Agendamiento Médico Resiliente',
    members: [
      { name: 'Lucía Méndez', role: 'Tech Lead' },
      { name: 'Carlos Rivas', role: 'Backend' },
      { name: 'Ana Soto', role: 'Frontend' },
      { name: 'Diego Peña', role: 'DevOps' },
    ],
    juryNote: 'Arquitectura Docker + Resiliencia + Pitch impecable',
    score: 30,
    photoDataUrl: placeholderPhoto('AURORA', '#ff2a85'),
    filterIntensity: 0.75,
  },
  {
    id: 'team-neon',
    rank: 2,
    name: 'Neon Circuit',
    project: 'Plataforma IoT de Monitoreo Urbano',
    members: [
      { name: 'Sofía Vargas', role: 'Product Owner' },
      { name: 'Mateo Cruz', role: 'Full Stack' },
      { name: 'Valentina Ruiz', role: 'UI/UX' },
      { name: 'Andrés Gómez', role: 'QA' },
    ],
    juryNote: 'UX excepcional + demo en vivo + storytelling',
    score: 30,
    photoDataUrl: placeholderPhoto('NEON CIRCUIT', '#9d4edd'),
    filterIntensity: 0.7,
  },
  {
    id: 'team-harbor',
    rank: null,
    name: 'Harbor Bytes',
    project: 'API de Logística Portuaria con Event Sourcing',
    members: [
      { name: 'Elena Torres', role: 'Backend' },
      { name: 'Julián Castro', role: 'Arquitecto' },
      { name: 'Camila Díaz', role: 'Frontend' },
    ],
    juryNote: 'Diseño de eventos sólido y métricas claras',
    score: 30,
    photoDataUrl: placeholderPhoto('HARBOR', '#00f0ff'),
    filterIntensity: 0.65,
  },
  {
    id: 'team-pixel',
    rank: null,
    name: 'Pixel Rangers',
    project: 'Motor de Recomendaciones Educativas',
    members: [
      { name: 'Nicolás Herrera', role: 'ML Engineer' },
      { name: 'Paula Jiménez', role: 'Data' },
      { name: 'Sebastián Mora', role: 'Frontend' },
    ],
    juryNote: 'Modelo explicable y UI didáctica',
    score: 30,
    photoDataUrl: placeholderPhoto('PIXEL', '#ff7b00'),
    filterIntensity: 0.7,
  },
  {
    id: 'team-sunset',
    rank: null,
    name: 'Sunset Protocols',
    project: 'Chatbot Multicanal para Atención Ciudadana',
    members: [
      { name: 'Mariana López', role: 'AI Lead' },
      { name: 'Felipe Rojas', role: 'Integraciones' },
      { name: 'Daniela Vega', role: 'QA' },
    ],
    juryNote: 'Integración WhatsApp + fallback humano',
    score: 30,
    photoDataUrl: placeholderPhoto('SUNSET', '#ff2a85'),
    filterIntensity: 0.68,
  },
  {
    id: 'team-vice',
    rank: null,
    name: 'Vice Stack',
    project: 'Dashboard de Observabilidad para Microservicios',
    members: [
      { name: 'Ricardo Núñez', role: 'SRE' },
      { name: 'Laura Paredes', role: 'Backend' },
      { name: 'Tomás Silva', role: 'Frontend' },
    ],
    juryNote: 'Alerting inteligente y dashboards vivos',
    score: 30,
    photoDataUrl: placeholderPhoto('VICE STACK', '#9d4edd'),
    filterIntensity: 0.72,
  },
]

export function cloneSeed() {
  return structuredClone(seedTeams)
}
