export interface SlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  notes: string[];
}

export const SLIDES_CONFIG: SlideConfig[] = [
  {
    id: "slide_1_title",
    title: "Algo grande está sucediendo",
    subtitle: "Javier Rivero 2026",
    notes: [
      "Abre despacio. Deja que la sala sienta que un cambio histórico ya está en marcha.",
      "Usa el espacio reservado para una división cinematográfica de antes/después, un horizonte o una ruptura con textura.",
      "La idea central: un antes y un después se está abriendo en la historia humana.",
    ],
  },
  {
    id: "slide_2_intro",
    title: "Javier Rivero",
    subtitle: "Sección 02",
    notes: [
      "Esta es la pausa humana antes de que arranque la narrativa.",
      "Retrato + bio: Stripe, Uber, PMI, Collective Academy, Google, TEDx, comunidad de IA en México.",
      "Mantenla espaciosa y personal. Todavía no sobreexpliques.",
    ],
  },
  {
    id: "slide_3_catalyst",
    title: "El punto de giro",
    subtitle: "Sección 03",
    notes: [
      "Establece el tono del Acto I: duro, inmediato y ligeramente intenso.",
      "Compara el momento de la IA con despertar en 2020 en un mundo con nuevas reglas de operación.",
      "Usa el espacio reservado para una onda abstracta, ola o quiebre de línea de tiempo, no para imágenes literales de pandemia.",
    ],
  },
  {
    id: "slide_4_curve_intro",
    title: "La curva exponencial",
    subtitle: "Sección 04",
    notes: [
      "Diapositiva de apertura del Acto I: deja que la imagen y el título carguen el tono antes del gráfico.",
      "Mantén la pausa. La curva es la protagonista de la siguiente sección.",
    ],
  },
  {
    id: "slide_4_curve",
    title: "La curva exponencial",
    subtitle: "Sección 04",
    notes: [
      "La curva es la protagonista. Lleva a la audiencia de 2021 a 2026.",
      "Enfatiza que esto habla de inteligencia y capacidad, no de ingresos.",
      "Mantén cada hito corto: GPT-3/Codex, ChatGPT, GPT-4, razonamiento/agentes, trabajo autónomo, frontera actual.",
    ],
  },
  {
    id: "slide_6_entrena_intro",
    title: "¿Cómo se entrena la IA?",
    subtitle: "Sección 06",
    notes: [
      "Diapositiva de apertura del Acto sobre entrenamiento: deja que la imagen y la pregunta carguen el tono antes de AlphaGo.",
      "Mantén la pausa. La comparación AlphaGo vs AlphaZero es la protagonista de la siguiente diapositiva.",
    ],
  },
  {
    id: "slide_6_paradox",
    title: "AlphaGo Zero",
    subtitle: "Sección 06",
    notes: [
      "Enmarca la paradoja: los datos humanos eran el techo; el autojuego fue el salto.",
      "Usa el lado izquierdo como lógica humana rígida y el derecho como estrategia orgánica descubierta por la máquina.",
      "Mantén esto conceptual y limpio. Sin clichés de robots o chips.",
    ],
  },
  {
    id: "slide_4_futuro",
    title: "El futuro ya está aquí",
    subtitle: "Sección 04",
    notes: [
      "Pausa dramática después del gráfico. Deja que la imagen y la frase aterricen el mensaje.",
      "La idea central: esto no es ciencia ficción lejana — el futuro ya llegó.",
      "Mantén la pausa. No sobreexpliques antes de pasar a la velocidad de las empresas.",
    ],
  },
  {
    id: "slide_4_agent_domains",
    title: "¿En qué dominios se despliegan los agentes?",
    subtitle: "Anthropic Economic Index",
    notes: [
      "Conecta el mensaje anterior con datos reales: los agentes ya están desplegados en el mundo laboral.",
      "El dato dominante es desarrollo de software con casi el 50% de tool calls; el resto se reparte en back-office, marketing, ventas y más.",
      "Fuente: investigación reciente de Anthropic sobre uso de agentes por dominio.",
    ],
  },
  {
    id: "slide_5_velocity",
    title: "Realidad exponencial",
    subtitle: "Sección 05",
    notes: [
      "Usa los botones en la diapositiva para moverte entre Cursor, OpenAI y Anthropic.",
      "Cada pulso debe crear la misma sensación: esto ya se volvió vertical.",
      "Reemplaza el texto temporal/estadístico con datos públicos reales cuando los tengas.",
    ],
  },
  {
    id: "slide_5_musk_algorithm",
    title: "El algoritmo de Musk",
    subtitle: "Sección 05",
    notes: [
      "Cada clic revela un paso del algoritmo de Musk, en orden estricto.",
      "Paso 1: cuestiona los requisitos. Paso 2: elimina lo innecesario. Paso 3: simplifica u optimiza.",
      "Paso 4: acelera el ciclo. Paso 5: automatiza al final — solo cuando lo anterior ya está resuelto.",
      "Conecta con la realidad exponencial: en un mundo que acelera, este marco evita optimizar lo que no debería existir.",
    ],
  },
  {
    id: "slide_7_trap",
    title: "El falso stack",
    subtitle: "Sección 07",
    notes: [
      "Al entrar, solo aparecen los logos flotando; el primer clic revela el título «El falso stack».",
      "Muestra el mercado ruidoso de herramientas, proveedores y flujos de trabajo.",
      "El punto no es que las herramientas no importen. El punto es que el pánico por herramientas es el centro de gravedad equivocado.",
      "Segundo clic: el título pasa a «verdadero» y avanza a la diapositiva siguiente.",
      "Aterriza en la idea central del 'falso stack': ¿en qué deben convertirse los humanos cuando el stack sigue cambiando?",
    ],
  },
  {
    id: "slide_8_pivot",
    title: "El verdadero stack",
    subtitle: "Sección 08",
    notes: [
      "La diapositiva arranca como continuación de la anterior: el título hace flip de 'falso' a 'verdadero'.",
      "Deja que 'habilidades humanas' entre con calma mientras las tres imágenes de fondo se revelan de izquierda a derecha.",
      "Este es el puente al Acto II: las tres habilidades se desarrollan en las diapositivas siguientes.",
    ],
  },
  {
    id: "slide_9_curiosity",
    title: "Curiosidad",
    subtitle: "Sección 09",
    notes: [
      "Pilar uno: curiosidad. El diseño se ha simplificado al máximo: la hermosa imagen de exploración y la palabra gigante 'Curiosidad' hablan por sí solas.",
      "Idea clave: Cuando las respuestas son gratis e infinitas, el valor se mueve hacia preguntas hermosas y atrevidas. La curiosidad es nuestro motor de exploración.",
    ],
  },
  {
    id: "slide_10_initiative",
    title: "Iniciativa",
    subtitle: "Sección 10",
    notes: [
      "Pilar dos: iniciativa. Foco absoluto en la fuerza visual de la imagen y el concepto.",
      "Idea clave: La audiencia ya no es solo un operador inerte de sistemas de IA, sino un director creativo. La iniciativa toma el timón de los resultados.",
    ],
  },
  {
    id: "slide_11_optimism",
    title: "Optimismo",
    subtitle: "Sección 11",
    notes: [
      "Pilar tres: optimismo. Cierre del tríptico visual de habilidades del Stack Humano.",
      "Idea clave: El miedo congela; el optimismo mueve. Es una decisión estratégica activa y audaz de aprovechar la tormenta y construir sobre el cambio.",
    ],
  },
  {
    id: "slide_12_synthesis",
    title: "El viento a tu favor",
    subtitle: "Sección 12",
    notes: [
      "Entrega la línea de síntesis en español y déjala respirar.",
      "La idea clave: la IA pregunta quién vas a ser cuando el trabajo aburrido desaparezca.",
      "Esto debe sentirse equilibrado, armónico y poderoso.",
    ],
  },
  {
    id: "slide_13_outro",
    title: "Disfruta el viaje",
    subtitle: "Sección 13",
    notes: [
      "Paso 1: Cierra con los tres rasgos del Stack Humano (curiosidad, iniciativa, optimismo radical).",
      "Paso 2 (Haz clic para colapsar): Transición sutil y creativa donde el texto se disuelve hacia el centro y surge el logo de Collective, '¡Gracias!' y tu nombre.",
      "Quédate aquí. Deja que la presentación respire al final.",
    ],
  },
];

/** Static deck images preloaded when the site first loads. */
export const DECK_IMAGE_URLS = [
  "/assets/cover.png",
  "/assets/collective-logo-white.png",
  "/assets/Javier.webp",
  "/assets/curva.png",
  "/assets/futuro.png",
  "/assets/entrena.png",
  "/assets/falsostack.png",
  "/assets/verdadero.png",
  "/assets/curiosidad.png",
  "/assets/iniciativa.png",
  "/assets/optimismo.png",
] as const;
