// Non-translatable category metadata. Names, descriptions, and instructions
// live in src/locales/{lang}/categories.json.
// modes: which play modes include this category ('couples' | 'friends' | 'team')
export const categories = {
  spark: { key: 'spark', icon: '✨', color: '#4fa8e8', modes: ['couples', 'friends', 'team'] },
  roots: { key: 'roots', icon: '🌱', color: '#5fb37a', modes: ['couples', 'friends', 'team'] },
  mirror: { key: 'mirror', icon: '🪞', color: '#b15fd0', modes: ['couples', 'friends'] },
  heat: { key: 'heat', icon: '🔥', color: '#e8615c', modes: ['couples'] },
  shadow: { key: 'shadow', icon: '🌑', color: '#7c8ba3', modes: ['couples', 'friends'] },
  absurdista: {
    key: 'absurdista',
    icon: '🎭',
    color: '#e89a3c',
    timerSeconds: 90,
    modes: ['couples', 'friends', 'team'],
  },
  decadesTape: {
    key: 'decadesTape',
    icon: '🎵',
    color: '#d96ba0',
    specialBehavior: 'music-trivia',
    scoringType: 'points',
    modes: ['couples', 'friends', 'team'],
  },
  atlasOfMe: {
    key: 'atlasOfMe',
    icon: '🗺️',
    color: '#3fa9a0',
    timerSeconds: 30,
    scoringType: 'points',
    modes: ['couples', 'friends', 'team'],
  },
  dilemma: { key: 'dilemma', icon: '⚖️', color: '#a17f72', modes: ['couples', 'friends', 'team'] },
}

// Question format: { id, en: { q, explanation }, es: { q, explanation } }

export const shadow = [
  {
    id: 'shadow-1',
    en: {
      q: 'The Secret Shame?',
      explanation: "What is a mistake you made that you've never told anyone because of the shame?",
    },
    es: {
      q: '¿La Vergüenza Secreta?',
      explanation: '¿Qué error cometiste que nunca le has contado a nadie por la vergüenza?',
    },
  },
  {
    id: 'shadow-2',
    en: {
      q: "The 'Dark' Thought?",
      explanation:
        "What is a thought you've had about someone you love that would hurt them if they knew?",
    },
    es: {
      q: "¿El Pensamiento 'Oscuro'?",
      explanation:
        '¿Qué pensamiento has tenido sobre alguien que amas que le haría daño si lo supiera?',
    },
  },
  {
    id: 'shadow-3',
    en: {
      q: 'The Revenge?',
      explanation: "Have you ever intentionally hurt someone's feelings to 'get even'?",
    },
    es: {
      q: '¿La Venganza?',
      explanation:
        "¿Alguna vez has herido los sentimientos de alguien intencionalmente para 'desquitarte'?",
    },
  },
  {
    id: 'shadow-4',
    en: {
      q: 'The Void?',
      explanation: 'What is the existential thought that keeps you up at 3 AM?',
    },
    es: {
      q: '¿El Vacío?',
      explanation: '¿Cuál es el pensamiento existencial que te mantiene despierto/a a las 3 AM?',
    },
  },
  {
    id: 'shadow-5',
    en: {
      q: 'The Betrayal?',
      explanation: "Have you ever betrayed someone's trust to protect yourself?",
    },
    es: {
      q: '¿La Traición?',
      explanation:
        '¿Alguna vez has traicionado la confianza de alguien para protegerte a ti mismo/a?',
    },
  },
  {
    id: 'shadow-6',
    en: {
      q: 'The Hidden Vice?',
      explanation:
        "What is a habit or 'dark' trait of yours that you work very hard to hide from the world?",
    },
    es: {
      q: '¿El Vicio Oculto?',
      explanation: '¿Qué hábito o rasgo oscuro tuyo te esfuerzas mucho por ocultar al mundo?',
    },
  },
  {
    id: 'shadow-7',
    en: {
      q: 'The Regret?',
      explanation:
        'If you could go back and change one decision, even if it changed who you are today, would you?',
    },
    es: {
      q: '¿El Arrepentimiento?',
      explanation:
        '¿Si pudieras volver atrás y cambiar una decisión, aunque cambiara quién eres hoy, lo harías?',
    },
  },
  {
    id: 'shadow-8',
    en: {
      q: 'The Unresolved Grief?',
      explanation: "Who are you still grieving, even though everyone thinks you've 'moved on'?",
    },
    es: {
      q: '¿El Duelo No Resuelto?',
      explanation: "¿Por quién sigues de duelo, aunque todos crean que ya 'superaste' la pérdida?",
    },
  },
  {
    id: 'shadow-9',
    en: {
      q: 'The Taboo?',
      explanation: "What is an opinion you hold that is 'socially unacceptable'?",
    },
    es: { q: '¿El Tabú?', explanation: "¿Qué opinión tienes que es 'socialmente inaceptable'?" },
  },
  {
    id: 'shadow-10',
    en: {
      q: 'The Resentment?',
      explanation: 'Who do you harbor the most secret resentment toward right now?',
    },
    es: {
      q: '¿El Resentimiento?',
      explanation: '¿Hacia quién guardas el mayor resentimiento secreto ahora mismo?',
    },
  },
  {
    id: 'shadow-11',
    en: {
      q: 'The Moral Gray Area?',
      explanation: "What is the most 'illegal' or 'unethical' thing you've ever done?",
    },
    es: {
      q: '¿La Zona Gris Moral?',
      explanation: "¿Cuál es la cosa más 'ilegal' o 'poco ética' que hayas hecho?",
    },
  },
  {
    id: 'shadow-12',
    en: {
      q: 'The Failure?',
      explanation:
        "What was your most 'spectacular' failure, and did you actually learn anything from it?",
    },
    es: {
      q: '¿El Fracaso?',
      explanation: "¿Cuál fue tu fracaso más 'espectacular', y realmente aprendiste algo de él?",
    },
  },
  {
    id: 'shadow-13',
    en: {
      q: 'The Mask Slip?',
      explanation:
        "When was the last time you 'lost it' and showed a side of yourself you aren't proud of?",
    },
    es: {
      q: '¿El Desliz de la Máscara?',
      explanation:
        "¿Cuándo fue la última vez que 'te perdiste' y mostraste un lado de ti del que no estás orgulloso/a?",
    },
  },
  {
    id: 'shadow-14',
    en: {
      q: 'The Fear of Being Known?',
      explanation: 'What is the scariest part about me knowing everything about you?',
    },
    es: {
      q: '¿El Miedo a Ser Conocido/a?',
      explanation: '¿Cuál es la parte más aterradora de que yo sepa todo sobre ti?',
    },
  },
  {
    id: 'shadow-15',
    en: {
      q: 'The Lie?',
      explanation: 'What is a lie you are currently telling someone in your life?',
    },
    es: {
      q: '¿La Mentira?',
      explanation: '¿Qué mentira le estás contando actualmente a alguien en tu vida?',
    },
  },
  {
    id: 'shadow-16',
    en: { q: 'The Envy?', explanation: 'Whose life do you sometimes wish you could steal?' },
    es: { q: '¿La Envidia?', explanation: "¿La vida de quién a veces desearías poder 'robar'?" },
  },
  {
    id: 'shadow-17',
    en: {
      q: 'The Disappointment?',
      explanation: 'In what way have you disappointed yourself the most?',
    },
    es: {
      q: '¿La Decepción?',
      explanation: '¿De qué manera te has decepcionado más a ti mismo/a?',
    },
  },
  {
    id: 'shadow-18',
    en: {
      q: 'The Ghosting?',
      explanation: 'Have you ever cut someone out of your life without explaining why?',
    },
    es: {
      q: '¿El Ghosting?',
      explanation: '¿Alguna vez has cortado a alguien de tu vida sin explicar por qué?',
    },
  },
  {
    id: 'shadow-19',
    en: {
      q: 'The Power Trip?',
      explanation: 'When was the last time you felt powerful by making someone else feel small?',
    },
    es: {
      q: '¿El Abuso de Poder?',
      explanation:
        '¿Cuándo fue la última vez que te sentiste poderoso/a al hacer que alguien se sintiera pequeño/a?',
    },
  },
  {
    id: 'shadow-20',
    en: {
      q: 'The Ending?',
      explanation:
        "How do you want to be remembered, and how is that different from how you'll actually be remembered?",
    },
    es: {
      q: '¿El Final?',
      explanation:
        '¿Cómo quieres ser recordado/a, y en qué se diferencia de cómo realmente te recordarán?',
    },
  },
  {
    id: 'shadow-21',
    en: {
      q: 'The Self-Sabotage?',
      explanation: 'What is the one way you consistently ruin your own happiness?',
    },
    es: {
      q: '¿El Autosabotaje?',
      explanation: '¿De qué manera sigues arruinando sistemáticamente tu propia felicidad?',
    },
  },
  {
    id: 'shadow-22',
    en: {
      q: 'The Hidden Anger?',
      explanation: "What is something that makes you 'see red' that other people find trivial?",
    },
    es: {
      q: '¿La Ira Oculta?',
      explanation: "¿Qué es algo que te hace 'ver rojo' y que otros encuentran trivial?",
    },
  },
  {
    id: 'shadow-23',
    en: {
      q: 'The Sacrifice?',
      explanation: 'What have you had to give up to become the person you are today?',
    },
    es: {
      q: '¿El Sacrificio?',
      explanation: '¿Qué has tenido que sacrificar para convertirte en la persona que eres hoy?',
    },
  },
  {
    id: 'shadow-24',
    en: {
      q: 'The Final Secret?',
      explanation: "What is one thing you've never said out loud to anyone, ever?",
    },
    es: {
      q: '¿El Secreto Final?',
      explanation: '¿Qué es algo que nunca has dicho en voz alta a nadie, jamás?',
    },
  },
  {
    id: 'shadow-25',
    en: {
      q: "The 'Shadow' Question?",
      explanation: 'If this was our last conversation, what would you regret not having told me?',
    },
    es: {
      q: "¿La Pregunta de 'La Sombra'?",
      explanation: 'Si esta fuera nuestra última conversación, ¿qué lamentarías no haberme dicho?',
    },
  },
]

export const absurdista = [
  {
    id: 'abs-1',
    en: {
      q: "*Spicy* Why 'Accidentally' liking an ex's photo from 2014 is a power move",
      explanation: 'Explain how this fits their toxic investigation skills',
    },
    es: {
      q: "*Picante* Por qué darle 'like accidentalmente' a una foto de tu ex de 2014 es una demostración de poder",
      explanation: 'Explica cómo esto encaja con sus habilidades de investigación tóxica',
    },
  },
  {
    id: 'abs-2',
    en: {
      q: "*Spicy* The psychological brilliance of sending a 'U up?' text at 3 AM",
      explanation: 'Defend why this is their signature move',
    },
    es: {
      q: "*Picante* La brillantez psicológica de mandar un '¿Estás despierto/a?' a las 3 AM",
      explanation: 'Defiende por qué este es su movimiento característico',
    },
  },
  {
    id: 'abs-3',
    en: {
      q: "*Spicy* Why being 'Delusional' is actually the highest form of self-care",
      explanation: 'Link it to their recent romantic choices',
    },
    es: {
      q: "*Picante* Por qué ser 'Delirante' es en realidad la más alta forma de autocuidado",
      explanation: 'Vincúlalo con sus elecciones románticas recientes',
    },
  },
  {
    id: 'abs-4',
    en: {
      q: "*Spicy* The case for making 'Bad Decisions' a tax-deductible expense",
      explanation: 'Calculate how much of a refund they would get this year',
    },
    es: {
      q: "*Picante* El argumento para que las 'Malas Decisiones' sean un gasto deducible de impuestos",
      explanation: 'Calcula cuánto de reembolso les correspondería este año',
    },
  },
  {
    id: 'abs-5',
    en: {
      q: "*Spicy* Why having a 'Rotation' is better for the soul than a relationship",
      explanation: "Explain why they can't seem to commit to a lunch spot, let alone a person",
    },
    es: {
      q: "*Picante* Por qué tener una 'Rotación' es mejor para el alma que una relación",
      explanation:
        'Explica por qué no pueden comprometerse ni con un lugar para almorzar, y mucho menos con una persona',
    },
  },
  {
    id: 'abs-6',
    en: {
      q: "*Spicy* The hidden pheromones in the smell of a 'Red Flag'",
      explanation: 'Explain why they are attracted to danger like a moth to a flame',
    },
    es: {
      q: "*Picante* Las feromonas ocultas en el olor de una 'Bandera Roja'",
      explanation: 'Explica por qué se sienten atraídos al peligro como la polilla a la llama',
    },
  },
  {
    id: 'abs-7',
    en: {
      q: "*Spicy* Why 'Read Receipts' are an instrument of psychological warfare",
      explanation: 'Comment on how long they usually leave people on seen',
    },
    es: {
      q: "*Picante* Por qué las 'Confirmaciones de Lectura' son un instrumento de guerra psicológica",
      explanation: 'Comenta cuánto tiempo suelen dejar a la gente en visto',
    },
  },
  {
    id: 'abs-8',
    en: {
      q: "*Spicy* The movement to replace Wedding Vows with 'Terms and Conditions'",
      explanation: 'Link it to their fear of commitment',
    },
    es: {
      q: "*Picante* El movimiento para reemplazar los Votos Matrimoniales con 'Términos y Condiciones'",
      explanation: 'Vincúlalo con su miedo al compromiso',
    },
  },
  {
    id: 'abs-9',
    en: {
      q: "*Spicy* Why your 'FBI Agent' watching your search history is your only true friend",
      explanation: "Speculate on the weirdest thing they've searched this week",
    },
    es: {
      q: "*Picante* Por qué tu 'Agente del FBI' que mira tu historial de búsqueda es tu único verdadero amigo",
      explanation: 'Especula sobre la cosa más rara que han buscado esta semana',
    },
  },
  {
    id: 'abs-10',
    en: {
      q: "*Spicy* The benefits of 'Gaslighting' yourself into believing you're a 10/10",
      explanation: "Explain why they don't even need to pretend",
    },
    es: {
      q: "*Picante* Los beneficios de hacerte 'Gaslighting' a ti mismo para creer que eres un 10/10",
      explanation: 'Explica por qué ni siquiera necesitan fingir',
    },
  },
  {
    id: 'abs-11',
    en: {
      q: "*Spicy* Why 'Ghosting' is the most environmentally friendly way to break up",
      explanation: 'Link it to their habit of disappearing when things get deep',
    },
    es: {
      q: "*Picante* Por qué el 'Ghosting' es la forma más respetuosa con el medio ambiente de terminar una relación",
      explanation: 'Vincúlalo con su hábito de desaparecer cuando las cosas se ponen serias',
    },
  },
  {
    id: 'abs-12',
    en: {
      q: "*Spicy* The necessity of having a 'Finsta' for your pets",
      explanation: 'Explain what secret drama they are hiding there',
    },
    es: {
      q: '*Picante* La necesidad de tener una cuenta secreta de Instagram para tus mascotas',
      explanation: 'Explica qué drama secreto están ocultando ahí',
    },
  },
  {
    id: 'abs-13',
    en: {
      q: "*Spicy* Why 'Staying Friends with an Ex' is a sign of high emotional intelligence",
      explanation: 'Or just a sign that they love chaos—you decide',
    },
    es: {
      q: "*Picante* Por qué 'Seguir siendo amigos de un ex' es señal de alta inteligencia emocional",
      explanation: 'O simplemente una señal de que aman el caos—tú decides',
    },
  },
  {
    id: 'abs-14',
    en: {
      q: "*Spicy* The art of 'Soft-launching' a new partner on Instagram",
      explanation: 'Critique their last attempt at being mysterious',
    },
    es: {
      q: "*Picante* El arte del 'Lanzamiento Suave' de una nueva pareja en Instagram",
      explanation: 'Critica su último intento de ser misterioso/a',
    },
  },
  {
    id: 'abs-15',
    en: {
      q: "*Spicy* Why 'Thirst Traps' should be considered a form of modern art",
      explanation: 'Explain why their gallery belongs in the Louvre',
    },
    es: {
      q: "*Picante* Por qué las 'Fotos Seductoras' deberían considerarse una forma de arte moderno",
      explanation: 'Explica por qué su galería pertenece al Louvre',
    },
  },
  {
    id: 'abs-16',
    en: {
      q: "*Spicy* The case for 'Checking their Zodiac sign' before asking for their name",
      explanation: 'Link it to their refusal to date a Scorpio',
    },
    es: {
      q: '*Picante* El argumento para consultar su signo del zodíaco antes de preguntar su nombre',
      explanation: 'Vincúlalo con su negativa a salir con un/a Escorpio',
    },
  },
  {
    id: 'abs-17',
    en: {
      q: "*Spicy* Why 'Overthinking' is just an advanced form of time travel",
      explanation: 'Explain why they are currently stuck in the year 2019',
    },
    es: {
      q: "*Picante* Por qué el 'Overthinking' es solo una forma avanzada de viaje en el tiempo",
      explanation: 'Explica por qué siguen atrapados en el año 2019',
    },
  },
  {
    id: 'abs-18',
    en: {
      q: "*Spicy* The romantic appeal of someone who is 'Emotionally Unavailable'",
      explanation: "Explain why this is exactly their 'type'",
    },
    es: {
      q: "*Picante* El encanto romántico de alguien que está 'Emocionalmente No Disponible'",
      explanation: "Explica por qué esto es exactamente su 'tipo'",
    },
  },
  {
    id: 'abs-19',
    en: {
      q: "*Spicy* Why 'Stalking' a LinkedIn profile is the ultimate first date preparation",
      explanation: 'Reveal their secret talent for digital private investigation',
    },
    es: {
      q: "*Picante* Por qué 'Acechar' un perfil de LinkedIn es la preparación perfecta para una primera cita",
      explanation: 'Revela su talento secreto para la investigación privada digital',
    },
  },
  {
    id: 'abs-20',
    en: {
      q: "*Spicy* The scientific reason why 'Toxic' people have the best playlists",
      explanation: 'Comment on the depressing music they listen to',
    },
    es: {
      q: "*Picante* La razón científica por la que las personas 'Tóxicas' tienen las mejores playlists",
      explanation: 'Comenta la música deprimente que escuchan',
    },
  },
  {
    id: 'abs-21',
    en: {
      q: 'The Benefits of Sleeping with Socks and Sandals',
      explanation: 'Defend why this combination should be mandatory for sleeping.',
    },
    es: {
      q: 'Los Beneficios de Dormir con Calcetines y Sandalias',
      explanation: 'Defiende por qué esta combinación debería ser obligatoria para dormir.',
    },
  },
  {
    id: 'abs-22',
    en: {
      q: 'Why Plants Should Have the Right to Vote',
      explanation: 'Argue why plants deserve political representation.',
    },
    es: {
      q: 'Por Qué las Plantas Deberían Tener Derecho al Voto',
      explanation: 'Argumenta por qué las plantas merecen representación política.',
    },
  },
  {
    id: 'abs-23',
    en: {
      q: 'Pineapple Pizza as a UNESCO World Heritage Site',
      explanation: 'Defend this controversial dish as a culinary masterpiece.',
    },
    es: {
      q: 'La Pizza con Piña como Patrimonio de la Humanidad',
      explanation: 'Defiende este controvertido plato como una obra maestra culinaria.',
    },
  },
  {
    id: 'abs-24',
    en: {
      q: 'Why We Should Wear Underwear Over Our Pants',
      explanation: 'Convince your opponent that this fashion should be universal.',
    },
    es: {
      q: 'Por Qué Deberíamos Usar Ropa Interior por Encima de los Pantalones',
      explanation: 'Convence a tu oponente de que esta moda debería ser universal.',
    },
  },
  {
    id: 'abs-25',
    en: {
      q: 'The Superiority of Eating Cereal with a Fork',
      explanation: 'Explain why the fork is superior to the spoon for cereal.',
    },
    es: {
      q: 'La Superioridad de Comer Cereal con Tenedor',
      explanation: 'Explica por qué el tenedor es superior a la cuchara para el cereal.',
    },
  },
  {
    id: 'abs-26',
    en: {
      q: 'Why Cats Should Rule the World',
      explanation: 'Argue that cats would be better leaders than humans.',
    },
    es: {
      q: 'Por Qué los Gatos Deberían Gobernar el Mundo',
      explanation: 'Argumenta que los gatos serían mejores líderes que los humanos.',
    },
  },
  {
    id: 'abs-27',
    en: {
      q: 'Monday is the Best Day of the Week',
      explanation: 'Defend the most hated day of the week with passion and evidence.',
    },
    es: {
      q: 'El Lunes es el Mejor Día de la Semana',
      explanation: 'Defiende al día más odiado de la semana con pasión y evidencia.',
    },
  },
  {
    id: 'abs-28',
    en: {
      q: 'Communicating Only with Emojis',
      explanation: 'Explain why we should abandon words entirely.',
    },
    es: {
      q: 'Comunicarnos Solo con Emojis',
      explanation: 'Explica por qué deberíamos abandonar las palabras por completo.',
    },
  },
  {
    id: 'abs-29',
    en: {
      q: 'The Importance of Showering with Shoes On',
      explanation: 'Convince everyone that this is a superior hygienic practice.',
    },
    es: {
      q: 'La Importancia de Ducharse con Zapatos Puestos',
      explanation: 'Convence a todos de que esta es una práctica higiénica superior.',
    },
  },
  {
    id: 'abs-30',
    en: {
      q: 'Toilet Paper Should Go the Other Way',
      explanation: 'Take a definitive stance in this age-old debate.',
    },
    es: {
      q: 'El Papel Higiénico Debe Ir del Lado Contrario',
      explanation: 'Toma una postura definitiva en este debate milenario.',
    },
  },
  {
    id: 'abs-31',
    en: {
      q: 'Cold Pizza is the Best Breakfast',
      explanation: 'Defend refrigerated pizza as the supreme morning meal.',
    },
    es: {
      q: 'La Pizza Fría es el Mejor Desayuno',
      explanation: 'Defiende la pizza refrigerada como la comida matutina suprema.',
    },
  },
  {
    id: 'abs-32',
    en: {
      q: 'Sleeping on the Floor Instead of Beds',
      explanation: 'Argue that beds are unnecessary and the floor is superior.',
    },
    es: {
      q: 'Dormir en el Piso en Lugar de Camas',
      explanation: 'Argumenta que las camas son innecesarias y el piso es superior.',
    },
  },
  {
    id: 'abs-33',
    en: {
      q: 'Watching Movies with Spoilers First',
      explanation: 'Explain why reading the ending improves the cinematic experience.',
    },
    es: {
      q: 'Ver Películas con Spoilers Primero',
      explanation: 'Explica por qué leer el final mejora la experiencia cinematográfica.',
    },
  },
  {
    id: 'abs-34',
    en: {
      q: 'Mandatory Naps at Work',
      explanation: 'Defend that naps should be a universal labor right.',
    },
    es: {
      q: 'Las Siestas Obligatorias en el Trabajo',
      explanation: 'Defiende que las siestas deberían ser un derecho laboral universal.',
    },
  },
  {
    id: 'abs-35',
    en: {
      q: 'Memes are the Highest Form of Art',
      explanation: 'Argue that memes surpass all classical fine arts.',
    },
    es: {
      q: 'Los Memes Son la Forma de Arte Más Alta',
      explanation: 'Argumenta que los memes superan a todas las bellas artes clásicas.',
    },
  },
  {
    id: 'abs-36',
    en: {
      q: 'The National Movement to replace all handshakes with aggressive high-fives',
      explanation: 'Explain why this would fix the economy',
    },
    es: {
      q: 'El Movimiento Nacional para reemplazar los apretones de manos por choques de manos agresivos',
      explanation: 'Explica por qué esto arreglaría la economía',
    },
  },
  {
    id: 'abs-37',
    en: {
      q: 'The hidden spiritual benefits of never washing your favorite mug',
      explanation: 'Link it to their obsession with caffeine',
    },
    es: {
      q: 'Los beneficios espirituales ocultos de nunca lavar tu taza favorita',
      explanation: 'Vincúlalo con su obsesión por la cafeína',
    },
  },
  {
    id: 'abs-38',
    en: {
      q: 'Why sleeping with a slice of bread under your pillow prevents nightmares',
      explanation: 'Explain how this would improve their morning mood',
    },
    es: {
      q: 'Por qué dormir con un trozo de pan bajo la almohada previene las pesadillas',
      explanation: 'Explica cómo esto mejoraría su estado de ánimo por la mañana',
    },
  },
  {
    id: 'abs-39',
    en: {
      q: "The 'Glitter for President' campaign",
      explanation: 'Explain why they would be the perfect Campaign Manager',
    },
    es: {
      q: "La campaña 'Purpurina para Presidente'",
      explanation: 'Explica por qué serían el/la Jefe/a de Campaña perfecto/a',
    },
  },
  {
    id: 'abs-40',
    en: {
      q: "Why 'Procrastination' should be added as an Olympic sport",
      explanation: 'Explain why they are already a gold medalist',
    },
    es: {
      q: "Por qué la 'Procrastinación' debería añadirse como deporte olímpico",
      explanation: 'Explica por qué ya son medallista de oro',
    },
  },
  {
    id: 'abs-41',
    en: {
      q: 'The secret conspiracy that birds are actually government cameras',
      explanation: 'Link it to their paranoid tendencies',
    },
    es: {
      q: 'La conspiración secreta de que los pájaros son en realidad cámaras del gobierno',
      explanation: 'Vincúlalo con sus tendencias paranoicas',
    },
  },
  {
    id: 'abs-42',
    en: {
      q: 'Why wearing pajamas to a wedding is the ultimate sign of respect',
      explanation: 'Defend their questionable fashion choices',
    },
    es: {
      q: 'Por qué ir a una boda en pijama es la máxima muestra de respeto',
      explanation: 'Defiende sus cuestionables elecciones de moda',
    },
  },
  {
    id: 'abs-43',
    en: {
      q: 'The revolutionary diet of eating only foods that are the color orange',
      explanation: 'Explain how this would simplify their grocery shopping',
    },
    es: {
      q: 'La dieta revolucionaria de comer solo alimentos de color naranja',
      explanation: 'Explica cómo esto simplificaría sus compras del supermercado',
    },
  },
  {
    id: 'abs-44',
    en: {
      q: 'Why we should replace the GPS voice with an angry grandmother',
      explanation: "Compare the voice's personality to theirs",
    },
    es: {
      q: 'Por qué deberíamos reemplazar la voz del GPS con una abuela enojada',
      explanation: 'Compara la personalidad de la voz con la suya',
    },
  },
  {
    id: 'abs-45',
    en: {
      q: 'The urgent need for a tax on people who talk to their pets',
      explanation: 'Calculate how much money they would owe the state',
    },
    es: {
      q: 'La urgente necesidad de un impuesto a las personas que le hablan a sus mascotas',
      explanation: 'Calcula cuánto dinero le deberían al estado',
    },
  },
  {
    id: 'abs-46',
    en: {
      q: "Why 'Aggressive Knitting' is the future of home security",
      explanation: 'Explain why they need this hobby for their safety',
    },
    es: {
      q: "Por qué el 'Tejido Agresivo' es el futuro de la seguridad del hogar",
      explanation: 'Explica por qué necesitan este hobby para su seguridad',
    },
  },
  {
    id: 'abs-47',
    en: {
      q: 'The undeniable proof that the Earth is actually shaped like a burrito',
      explanation: 'Link it to their late-night food cravings',
    },
    es: {
      q: 'La prueba irrefutable de que la Tierra tiene realmente forma de burrito',
      explanation: 'Vincúlalo con sus antojos nocturnos de comida',
    },
  },
  {
    id: 'abs-48',
    en: {
      q: 'Why we should use Monopoly money as a valid legal tender',
      explanation: 'Explain why they would finally be a billionaire',
    },
    es: {
      q: 'Por qué deberíamos usar el dinero del Monopoly como moneda de curso legal',
      explanation: 'Explica por qué por fin serían millonario/a',
    },
  },
  {
    id: 'abs-49',
    en: {
      q: 'The benefits of replacing all office chairs with giant exercise balls',
      explanation: 'Describe their struggle to stay balanced',
    },
    es: {
      q: 'Los beneficios de reemplazar todas las sillas de oficina por pelotas de ejercicio gigantes',
      explanation: 'Describe su lucha por mantenerse en equilibrio',
    },
  },
  {
    id: 'abs-50',
    en: {
      q: "Why 'Ghosting' should be a professional service you can hire someone for",
      explanation: 'Explain why they are your #1 client',
    },
    es: {
      q: "Por qué el 'Ghosting' debería ser un servicio profesional que puedes contratar",
      explanation: 'Explica por qué son tu cliente número 1',
    },
  },
  {
    id: 'abs-51',
    en: {
      q: 'The scientific reason why singing in the shower improves Wi-Fi signals',
      explanation: 'Comment on the quality of their singing',
    },
    es: {
      q: 'La razón científica por la que cantar en la ducha mejora las señales de Wi-Fi',
      explanation: 'Comenta la calidad de su canto',
    },
  },
  {
    id: 'abs-52',
    en: {
      q: "Why 'Napping' should be a mandatory requirement for a driver's license",
      explanation: 'Relate it to their constant state of tiredness',
    },
    es: {
      q: "Por qué 'Dormir la Siesta' debería ser un requisito obligatorio para el carnet de conducir",
      explanation: 'Relaciónalo con su estado constante de cansancio',
    },
  },
  {
    id: 'abs-53',
    en: {
      q: "The movement to make 'Sarcasm' an official second language",
      explanation: 'Explain why they are already fluent',
    },
    es: {
      q: "El movimiento para convertir el 'Sarcasmo' en un segundo idioma oficial",
      explanation: 'Explica por qué ya son fluidos/as',
    },
  },
  {
    id: 'abs-54',
    en: {
      q: 'Why we should replace all lawn grass with green marshmallows',
      explanation: 'Link it to their lack of gardening skills',
    },
    es: {
      q: 'Por qué deberíamos reemplazar todo el césped con malvaviscos verdes',
      explanation: 'Vincúlalo con su falta de habilidades de jardinería',
    },
  },
  {
    id: 'abs-55',
    en: {
      q: 'The philosophical brilliance of wearing shoes on the wrong feet',
      explanation: 'Explain how this matches their chaotic energy',
    },
    es: {
      q: 'La brillantez filosófica de ponerse los zapatos en los pies equivocados',
      explanation: 'Explica cómo esto encaja con su energía caótica',
    },
  },
]

export const atlasOfMe = [
  {
    id: 'atlas-1',
    en: {
      q: "The 'I Don't Speak the Language' Moment",
      explanation:
        'That place where you tried to speak the local language and failed so miserably it was embarrassing.',
    },
    es: {
      q: "El Momento 'No Hablo'",
      explanation:
        'Ese lugar donde intentaste hablar el idioma local y fallaste tan miserablemente que fue vergonzoso.',
    },
  },
  {
    id: 'atlas-2',
    en: {
      q: 'The Middle of Nowhere',
      explanation: "The most godforsaken town or rural area you've ever been stranded in.",
    },
    es: {
      q: 'En el Quinto Pino',
      explanation:
        'El pueblo o zona rural más olvidado de Dios en el que te hayas quedado atrapado alguna vez.',
    },
  },
  {
    id: 'atlas-3',
    en: {
      q: 'Almost Illegal',
      explanation:
        'A time you crossed a border or restricted area and felt like you were about to be interrogated.',
    },
    es: {
      q: 'Casi Ilegal',
      explanation:
        'Una vez que cruzaste una frontera o zona restringida y sentiste que te iban a interrogar.',
    },
  },
  {
    id: 'atlas-4',
    en: {
      q: 'Tourist Trap',
      explanation:
        'A famous landmark you visited that turned out to be a total disappointment and overpriced.',
    },
    es: {
      q: 'Trampa para Turistas',
      explanation:
        'Un monumento famoso que visitaste y resultó ser una decepción total y carísima.',
    },
  },
  {
    id: 'atlas-5',
    en: {
      q: 'Night Geography',
      explanation:
        "A city or neighborhood you were wandering through after 3:00 AM (when you probably shouldn't have been).",
    },
    es: {
      q: 'Geografía Nocturna',
      explanation:
        'Una ciudad o barrio por el que andabas deambulando después de las 3:00 AM (y probablemente no debías).',
    },
  },
  {
    id: 'atlas-6',
    en: {
      q: 'Romantic Views',
      explanation:
        "A place with such an incredible view that you considered having an 'intimate moment' right then and there.",
    },
    es: {
      q: 'Vistas Románticas',
      explanation:
        "Un lugar con una vista tan increíble que consideraste tener un momento 'íntimo' ahí mismo.",
    },
  },
  {
    id: 'atlas-7',
    en: {
      q: 'Culinary Regret',
      explanation:
        "A city where you ate something 'typical' that catastrophically destroyed your stomach.",
    },
    es: {
      q: 'Arrepentimiento Culinario',
      explanation:
        "Una ciudad donde comiste algo 'típico' que te destrozó el estómago de forma catastrófica.",
    },
  },
  {
    id: 'atlas-8',
    en: {
      q: 'Lost in Translation',
      explanation:
        "A place where you were genuinely lost because you couldn't understand a single sign or notice.",
    },
    es: {
      q: 'Perdido en Traducción',
      explanation:
        'Un sitio donde te perdiste de verdad porque no entendías ni una sola señal o cartel.',
    },
  },
  {
    id: 'atlas-9',
    en: {
      q: 'Forbidden Zone (Ex)',
      explanation:
        "A city that is now 'ruined' for you because your ex lives there or you went with that person.",
    },
    es: {
      q: 'Zona Prohibida (Ex)',
      explanation:
        "Una ciudad que ahora está 'arruinada' para ti porque ahí vive tu ex o fuiste con esa persona.",
    },
  },
  {
    id: 'atlas-10',
    en: {
      q: 'Luxury vs. Disaster',
      explanation:
        'That elegant city you visited when you looked (and felt) like a complete living disaster.',
    },
    es: {
      q: 'Lujo vs. Desastre',
      explanation:
        'Esa ciudad elegante que visitaste cuando te veías (y sentías) como un auténtico desastre viviente.',
    },
  },
  {
    id: 'atlas-11',
    en: {
      q: 'Forbidden Swim',
      explanation:
        "A fountain, lake, or pool you got into even though there was a clear 'No Swimming' sign.",
    },
    es: {
      q: 'Chapuzón Prohibido',
      explanation:
        "Una fuente, lago o piscina donde te metiste aunque había un cartel claro de 'Prohibido el baño'.",
    },
  },
  {
    id: 'atlas-12',
    en: {
      q: 'Altitude Sickness',
      explanation:
        'A place so high (mountain or rooftop) where the altitude or cocktails made you lose your head.',
    },
    es: {
      q: 'Mal de Altura',
      explanation:
        'Un lugar tan alto (montaña o terraza) donde el aire o los cócteles te hicieron perder la cabeza.',
    },
  },
  {
    id: 'atlas-13',
    en: {
      q: 'What Happens in Vegas...',
      explanation:
        "A city where you did something so stupid you promised you'd 'never speak of it again.'",
    },
    es: {
      q: 'Lo que pasa en Vegas...',
      explanation:
        "Una ciudad donde hiciste algo tan estúpido que prometiste 'no volver a hablar de ello'.",
    },
  },
  {
    id: 'atlas-14',
    en: {
      q: 'The Eternal Walk',
      explanation:
        'A place where you had to walk for miles in completely inappropriate footwear (heels, flip-flops, etc.).',
    },
    es: {
      q: 'La Caminata Eterna',
      explanation:
        'Un lugar donde tuviste que caminar kilómetros con calzado totalmente inapropiado (tacones, chanclas, etc.).',
    },
  },
  {
    id: 'atlas-15',
    en: {
      q: 'Public Drama',
      explanation:
        'A famous square or park where you had a huge argument or a very public breakup.',
    },
    es: {
      q: 'Drama en Público',
      explanation:
        'Una plaza o parque famoso donde tuviste una discusión enorme o una ruptura muy pública.',
    },
  },
  {
    id: 'atlas-16',
    en: {
      q: 'The Fake Post',
      explanation:
        'A place you posted a photo of just to make people jealous, even though you were actually having a terrible time.',
    },
    es: {
      q: 'Postureo Mentiroso',
      explanation:
        'Un lugar del que subiste una foto solo para dar envidia, aunque en realidad la estabas pasando fatal.',
    },
  },
  {
    id: 'atlas-17',
    en: {
      q: 'Animal Attack',
      explanation:
        'A place where you were genuinely harassed or attacked by the local wildlife (monkeys, pigeons, dogs).',
    },
    es: {
      q: 'Ataque Animal',
      explanation:
        'Un sitio donde fuiste genuinamente acosado o atacado por la fauna local (monos, palomas, perros).',
    },
  },
  {
    id: 'atlas-18',
    en: {
      q: "I Don't Belong Here",
      explanation:
        "A neighborhood or bar you walked into and immediately realized you 'shouldn't be there.'",
    },
    es: {
      q: 'Aquí no Encajo',
      explanation:
        "Un barrio o bar donde entraste y te diste cuenta al instante de que 'no deberías estar ahí'.",
    },
  },
  {
    id: 'atlas-19',
    en: {
      q: 'Transit Nightmare',
      explanation: 'The worst train station or airport where you had to sleep on the floor.',
    },
    es: {
      q: 'Pesadilla de Tránsito',
      explanation: 'La peor estación de tren o aeropuerto donde te haya tocado dormir en el suelo.',
    },
  },
  {
    id: 'atlas-20',
    en: {
      q: 'Low-Cost Passport',
      explanation:
        'A country or city you visited only because the flight was absurdly cheap, not because you wanted to.',
    },
    es: {
      q: 'Pasaporte al Low-Cost',
      explanation:
        'Un país o ciudad que visitaste solo porque el vuelo era absurdamente barato, no por ganas.',
    },
  },
]

export const dilemma = [
  {
    id: 'dil-1',
    en: {
      q: 'Saving Lives: The Bridge',
      explanation:
        'A runaway train is going to kill 5 people. You can divert it, but it will kill 1 innocent person. Do you divert it?',
    },
    es: {
      q: 'Salvando Vidas: El Puente',
      explanation:
        'Un tren descontrolado va a matar a 5 personas. Puedes desviarlo, pero matará a 1 persona inocente. ¿Lo desvías?',
    },
  },
  {
    id: 'dil-2',
    en: {
      q: 'Loyalty vs. Justice',
      explanation:
        'Your best friend committed a serious crime. Nobody knows you witnessed it. Do you report them or keep the secret?',
    },
    es: {
      q: 'Lealtad vs. Justicia',
      explanation:
        'Tu mejor amigo cometió un crimen grave. Nadie sabe que fuiste testigo. ¿Lo denuncias o guardas el secreto?',
    },
  },
  {
    id: 'dil-3',
    en: {
      q: 'The Deadly Secret',
      explanation:
        'You discover your partner has a terminal illness, but the doctor was asked not to tell you. Would you prefer to know or live in ignorance?',
    },
    es: {
      q: 'El Secreto Mortal',
      explanation:
        'Descubres que tu pareja tiene una enfermedad terminal, pero te pidieron al médico que no te lo diga. ¿Preferirías saberlo o vivir en ignorancia?',
    },
  },
  {
    id: 'dil-4',
    en: {
      q: 'The White Lie',
      explanation:
        'Your child asks you if Santa Claus exists. Telling the truth could ruin their childhood magic. Do you lie or tell the truth?',
    },
    es: {
      q: 'La Mentira Piadosa',
      explanation:
        'Tu hijo te pregunta si Papá Noel existe. Decir la verdad podría arruinar su magia infantil. ¿Mientes o dices la verdad?',
    },
  },
  {
    id: 'dil-5',
    en: {
      q: 'Save One or Five',
      explanation:
        'You are a doctor. You have an organ that can save one patient. Or you can use it to save 5 different patients. What do you choose?',
    },
    es: {
      q: 'Salvar a Uno o Cinco',
      explanation:
        'Eres médico. Tienes un órgano que puede salvar a un paciente. O puedes usarlo para salvar a 5 pacientes diferentes. ¿Qué eliges?',
    },
  },
  {
    id: 'dil-6',
    en: {
      q: 'Wealth vs. Love',
      explanation:
        'You can have a life of extreme wealth but no romantic love, or a life of deep love but with constant financial difficulties. What do you choose?',
    },
    es: {
      q: 'Riqueza vs. Amor',
      explanation:
        'Puedes tener una vida de riqueza extrema pero sin amor romántico, o una vida de amor profundo pero con dificultades económicas constantes. ¿Qué eliges?',
    },
  },
  {
    id: 'dil-7',
    en: {
      q: 'The Happiness Machine',
      explanation:
        'There is a machine that gives you constant happiness, but you live in a simulation. Do you prefer fake happiness or painful reality?',
    },
    es: {
      q: 'La Máquina de la Felicidad',
      explanation:
        'Existe una máquina que te da felicidad constante, pero vives en una simulación. ¿Prefieres felicidad falsa o realidad dolorosa?',
    },
  },
  {
    id: 'dil-8',
    en: {
      q: 'Stealing to Survive',
      explanation:
        'Your family is starving. The only way to feed them is to steal food from a store. Do you do it?',
    },
    es: {
      q: 'Robar para Sobrevivir',
      explanation:
        'Tu familia está muriendo de hambre. La única forma de alimentarlos es robar comida de una tienda. ¿Lo haces?',
    },
  },
  {
    id: 'dil-9',
    en: {
      q: 'The Baby or the Art',
      explanation:
        'A museum is on fire: you can save an unknown baby or an invaluable painting that will benefit millions. What do you save?',
    },
    es: {
      q: 'El Bebé o el Arte',
      explanation:
        'Un museo en llamas: puedes salvar a un bebé desconocido o una pintura invaluable que beneficiará a millones. ¿Qué salvas?',
    },
  },
  {
    id: 'dil-10',
    en: {
      q: 'Privacy vs. Security',
      explanation:
        'The government wants full access to your private life (messages, location, cameras) to prevent terrorism. Do you accept?',
    },
    es: {
      q: 'Privacidad vs. Seguridad',
      explanation:
        'El gobierno quiere acceso total a tu vida privada (mensajes, ubicación, cámaras) para prevenir terrorismo. ¿Aceptas?',
    },
  },
  {
    id: 'dil-11',
    en: {
      q: 'The Perfect Clone',
      explanation:
        'You can create a clone of yourself that will live your boring life while you live adventures. The clone suffers. Do you create it?',
    },
    es: {
      q: 'El Clon Perfecto',
      explanation:
        'Puedes crear un clon tuyo que vivirá tu vida aburrida mientras tú vives aventuras. El clon sufre. ¿Lo creas?',
    },
  },
  {
    id: 'dil-12',
    en: {
      q: 'Time vs. Money',
      explanation:
        'Work 80 hours/week for $500k a year, or 20 hours/week for $40k. What do you choose for the next 10 years?',
    },
    es: {
      q: 'Tiempo vs. Dinero',
      explanation:
        'Trabajar 80 horas/semana por $500k al año, o 20 horas/semana por $40k. ¿Qué eliges para los próximos 10 años?',
    },
  },
  {
    id: 'dil-13',
    en: {
      q: 'The Painful Truth',
      explanation:
        'Your partner is happy believing a lie about their past. Telling the truth will destroy them. Do you tell them?',
    },
    es: {
      q: 'La Verdad Dolorosa',
      explanation:
        'Tu pareja es feliz creyendo una mentira sobre su pasado. Decir la verdad los destruirá. ¿Se la dices?',
    },
  },
  {
    id: 'dil-14',
    en: {
      q: 'Sacrifice for Humanity',
      explanation:
        'You can cure all diseases in the world, but you and your family will die in the process. Do you do it?',
    },
    es: {
      q: 'Sacrificio por la Humanidad',
      explanation:
        'Puedes curar todas las enfermedades del mundo, pero tú y tu familia morirán en el proceso. ¿Lo haces?',
    },
  },
  {
    id: 'dil-15',
    en: {
      q: 'The Red Button',
      explanation:
        'Pressing a button gives you $10 million, but someone random in the world dies. Nobody will know it was you. Do you press it?',
    },
    es: {
      q: 'El Botón Rojo',
      explanation:
        'Presionar un botón te da $10 millones, pero alguien random en el mundo muere. Nadie sabrá que fuiste tú. ¿Lo presionas?',
    },
  },
  {
    id: 'dil-16',
    en: {
      q: 'Freedom vs. Protection',
      explanation:
        'Would you prefer to live in a society with total freedom (including dangers) or in one where you are 100% safe but without freedoms?',
    },
    es: {
      q: 'Libertad vs. Protección',
      explanation:
        '¿Prefieres vivir en una sociedad con libertad total (incluyendo peligros) o en una donde estás 100% seguro pero sin libertades?',
    },
  },
  {
    id: 'dil-17',
    en: {
      q: 'Journey to the Past',
      explanation:
        'You can go back to the past and change one mistake, but you will lose all memories from that moment until now. Do you do it?',
    },
    es: {
      q: 'Viaje al Pasado',
      explanation:
        'Puedes volver al pasado y cambiar un error, pero perderás todos los recuerdos desde ese momento hasta ahora. ¿Lo haces?',
    },
  },
  {
    id: 'dil-18',
    en: {
      q: 'The Animal or the Human',
      explanation: 'You can only save your dog/cat or an unpleasant stranger. Who do you save?',
    },
    es: {
      q: 'El Animal o el Humano',
      explanation:
        'Solo puedes salvar a tu perro/gato o a un extraño desagradable. ¿A quién salvas?',
    },
  },
  {
    id: 'dil-19',
    en: {
      q: 'Dream Job vs. Family',
      explanation:
        'You are offered your dream job on another continent, but your family begs you to stay. What do you do?',
    },
    es: {
      q: 'Trabajo Soñado vs. Familia',
      explanation:
        'Te ofrecen el trabajo de tus sueños en otro continente, pero tu familia te suplica que te quedes. ¿Qué haces?',
    },
  },
  {
    id: 'dil-20',
    en: {
      q: 'The Lonely Immortality',
      explanation:
        'You can be immortal, but all your loved ones will age and die while you remain. Do you accept?',
    },
    es: {
      q: 'La Inmortalidad Solitaria',
      explanation:
        'Puedes ser inmortal, pero todos tus seres queridos envejecerán y morirán mientras tú sigues. ¿Aceptas?',
    },
  },
  {
    id: 'dil-21',
    en: {
      q: 'The Perfect Child',
      explanation:
        'You can genetically edit your future child to be perfect (intelligent, healthy, attractive). Do you do it?',
    },
    es: {
      q: 'El Hijo Perfecto',
      explanation:
        'Puedes editar genéticamente a tu futuro hijo para que sea perfecto (inteligente, sano, atractivo). ¿Lo haces?',
    },
  },
  {
    id: 'dil-22',
    en: {
      q: 'Just Punishment',
      explanation:
        'Someone murdered your loved one. You can take revenge without legal consequences. Do you take revenge?',
    },
    es: {
      q: 'Castigo Justo',
      explanation:
        'Alguien asesinó a tu ser querido. Puedes vengarte sin consecuencias legales. ¿Te vengas?',
    },
  },
  {
    id: 'dil-23',
    en: {
      q: 'The Truth Drug',
      explanation:
        'There is a drug that forces people to tell the truth. Should it be legal to use in criminal interrogations?',
    },
    es: {
      q: 'La Droga de la Verdad',
      explanation:
        'Existe una droga que obliga a las personas a decir la verdad. ¿Debería ser legal usarla en interrogatorios criminales?',
    },
  },
  {
    id: 'dil-24',
    en: {
      q: 'Adopt or Have Children',
      explanation:
        'There are millions of homeless children. Is it selfish to have biological children instead of adopting?',
    },
    es: {
      q: 'Adoptar o Tener Hijos',
      explanation:
        'Hay millones de niños sin hogar. ¿Es egoísta tener hijos biológicos en lugar de adoptar?',
    },
  },
  {
    id: 'dil-25',
    en: {
      q: 'The Final Dilemma',
      explanation:
        'You know that your best life decision was wrong, but it made you who you are. Would you change it if you could?',
    },
    es: {
      q: 'El Dilema Final',
      explanation:
        'Sabes que tu mejor decisión en la vida fue incorrecta, pero te hizo quien eres. ¿La cambiarías si pudieras?',
    },
  },
  {
    id: 'dil-26',
    en: {
      q: 'The Price of Silence',
      explanation:
        'You are offered 10 million dollars, but your greatest enemy also receives 100 million. Would you accept the deal or prefer that both end up with nothing?',
    },
    es: {
      q: 'El Precio del Silencio',
      explanation:
        'Te ofrecen 10 millones de dólares, pero tu mayor enemigo también recibe 100 millones. ¿Aceptarías el trato o prefieres que ambos se queden en cero?',
    },
  },
  {
    id: 'dil-27',
    en: {
      q: 'The White Lie (Friendship)',
      explanation:
        "You discover your best friend's partner is cheating on them. If you tell them, you ruin their current happiness; if you stay silent, you betray their trust. What do you do?",
    },
    es: {
      q: 'La Mentira Piadosa (Amistad)',
      explanation:
        'Descubres que la pareja de tu mejor amigo le es infiel. Si se lo dices, arruinas su felicidad actual; si callas, traicionas su confianza. ¿Qué haces?',
    },
  },
  {
    id: 'dil-28',
    en: {
      q: 'The Vital Exchange',
      explanation:
        'A stranger dies every time you press a button that gives you $50,000. There are no legal consequences and no one will ever know. How many times do you press it?',
    },
    es: {
      q: 'El Intercambio Vital',
      explanation:
        'Un extraño muere cada vez que presionas un botón que te da 50,000 dólares. No hay consecuencias legales y nadie lo sabrá jamás. ¿Cuántas veces lo presionas?',
    },
  },
  {
    id: 'dil-29',
    en: {
      q: 'Justice vs. Blood',
      explanation:
        'If a close family member committed an unforgivable crime, would you turn them in to the police or help them hide forever?',
    },
    es: {
      q: 'Justicia vs. Sangre',
      explanation:
        'Si un familiar muy cercano cometiera un crimen imperdonable, ¿lo entregarías a la policía o lo ayudarías a esconderse para siempre?',
    },
  },
  {
    id: 'dil-30',
    en: {
      q: 'The Truth Filter',
      explanation:
        "Would you prefer to know exactly what everyone thinks of you (even if it's hurtful) or live in happy but false ignorance?",
    },
    es: {
      q: 'El Filtro de la Verdad',
      explanation:
        '¿Preferirías saber exactamente qué piensa todo el mundo de ti (aunque sea hiriente) o vivir en una ignorancia feliz pero falsa?',
    },
  },
  {
    id: 'dil-31',
    en: {
      q: 'The Golden Cradle',
      explanation:
        'Would you prefer your children to be mediocre but immensely happy, or brilliant and successful but living in constant depression?',
    },
    es: {
      q: 'La Cuna de Oro',
      explanation:
        '¿Preferirías que tus hijos fueran mediocres pero inmensamente felices, o genios exitosos que vivieran en una depresión constante?',
    },
  },
  {
    id: 'dil-32',
    en: {
      q: 'Retroactive Revenge',
      explanation:
        'If you could make the person who hurt you most feel exactly the same pain you went through, would you flip the switch?',
    },
    es: {
      q: 'Venganza Retroactiva',
      explanation:
        'Si pudieras hacer que la persona que más te ha herido sienta exactamente el mismo dolor que tú pasaste, ¿apretarías el interruptor?',
    },
  },
  {
    id: 'dil-33',
    en: {
      q: "The Idol's Dilemma",
      explanation:
        'Your favorite artist turns out to be a despicable person in private. Do you keep consuming their art by separating it from the person, or do you cancel them completely?',
    },
    es: {
      q: 'El Dilema del Ídolo',
      explanation:
        'Tu artista favorito resulta ser una persona despreciable en privado. ¿Sigues consumiendo su arte separándolo de la persona, o lo cancelas por completo?',
    },
  },
  {
    id: 'dil-34',
    en: {
      q: 'Love vs. Ambition',
      explanation:
        'You are offered absolute professional success, but in exchange you will never be able to find true love. Do you sign the contract?',
    },
    es: {
      q: 'Amor vs. Ambición',
      explanation:
        'Te ofrecen el éxito profesional absoluto, pero a cambio nunca podrás encontrar el amor verdadero. ¿Firmas el contrato?',
    },
  },
  {
    id: 'dil-35',
    en: {
      q: 'The Erased Memory',
      explanation:
        "Would you prefer to forget the person you loved most so you don't feel pain, or keep the memory even if it prevents you from moving on?",
    },
    es: {
      q: 'La Memoria Borrada',
      explanation:
        '¿Preferirías olvidar a la persona que más has amado para no sentir dolor, o mantener el recuerdo aunque te impida avanzar con alguien nuevo?',
    },
  },
  {
    id: 'dil-36',
    en: {
      q: 'The Last Resort',
      explanation:
        "To save the lives of 10 strangers, you must sacrifice your pet's life. Do you do it?",
    },
    es: {
      q: 'El Último Recurso',
      explanation:
        'Para salvar la vida de 10 desconocidos, debes sacrificar la vida de tu mascota. ¿Lo haces?',
    },
  },
  {
    id: 'dil-37',
    en: {
      q: 'Dead Privacy',
      explanation:
        'Would you let your partner review all your browsing history and messages from the last 5 years in exchange for doing the same with theirs?',
    },
    es: {
      q: 'Privacidad Muerta',
      explanation:
        '¿Dejarías que tu pareja revisara todo tu historial de búsqueda y mensajes de los últimos 5 años a cambio de que tú pudieras hacer lo mismo con los suyos?',
    },
  },
  {
    id: 'dil-38',
    en: {
      q: 'The False Praise',
      explanation:
        "Would you prefer people to admire you for something you didn't do, or hate you for something you did but that was the right thing?",
    },
    es: {
      q: 'El Elogio Falso',
      explanation:
        '¿Preferirías que la gente te admire por algo que no hiciste, o que te odien por algo que sí hiciste pero que fue lo correcto?',
    },
  },
  {
    id: 'dil-39',
    en: {
      q: 'The Cursed Inheritance',
      explanation:
        'You receive a million-dollar inheritance, but you discover the money came from the exploitation of innocent people. Do you donate it all or keep a portion?',
    },
    es: {
      q: 'La Herencia Maldita',
      explanation:
        'Recibes una herencia millonaria, pero descubres que el dinero provino de la explotación de personas inocentes. ¿Lo donas todo o te quedas con una parte?',
    },
  },
  {
    id: 'dil-40',
    en: {
      q: 'Zero Empathy',
      explanation:
        'If you could eliminate your ability to feel sadness in exchange for also losing half your ability to feel joy, would you do it?',
    },
    es: {
      q: 'Cero Empatía',
      explanation:
        'Si pudieras eliminar tu capacidad de sentir tristeza a cambio de perder también la mitad de tu capacidad de sentir alegría, ¿lo harías?',
    },
  },
  {
    id: 'dil-41',
    en: {
      q: 'The Informant',
      explanation:
        'You see someone stealing food from a supermarket. They are clearly hungry. Do you alert security out of honesty or look the other way?',
    },
    es: {
      q: 'El Soplón',
      explanation:
        'Ves a alguien robando comida en un supermercado. Claramente tiene hambre. ¿Avisas a seguridad por principios de honestidad o miras hacia otro lado?',
    },
  },
  {
    id: 'dil-42',
    en: {
      q: 'Posthumous Fame',
      explanation:
        'Would you prefer to be a misunderstood poor genius who will be famous after death, or a successful rich fraud who will be forgotten the day after their burial?',
    },
    es: {
      q: 'Fama Póstuma',
      explanation:
        '¿Preferirías ser un genio incomprendido y pobre que será famoso después de morir, o un fraude exitoso y rico que será olvidado al día siguiente de su entierro?',
    },
  },
  {
    id: 'dil-43',
    en: {
      q: 'The Deciding Vote',
      explanation:
        'If you could save a genius who has the cure for a disease, but to do so a young healthy person must die, who would you choose?',
    },
    es: {
      q: 'El Voto Decisivo',
      explanation:
        'Si pudieras salvar a un genio que tiene la cura para una enfermedad, pero para hacerlo debe morir una persona joven y sana de tu elección, ¿quién sería?',
    },
  },
  {
    id: 'dil-44',
    en: {
      q: 'Toxic Loyalty',
      explanation:
        "Your partner asks you to cut off a lifelong friend because they 'have a bad feeling.' There is no evidence of anything wrong. Who do you choose?",
    },
    es: {
      q: 'Lealtad Tóxica',
      explanation:
        "Tu pareja te pide que cortes relación con un amigo de toda la vida porque 'le da mala espina'. No hay pruebas de nada malo. ¿A quién eliges?",
    },
  },
  {
    id: 'dil-45',
    en: {
      q: 'The Last Word',
      explanation:
        "If you could know the exact date you will die, would you prefer to know so you can plan everything, or live each day without knowing if it's your last?",
    },
    es: {
      q: 'La Última Palabra',
      explanation:
        'Si pudieras saber la fecha exacta en la que vas a morir, ¿preferirías saberlo para planificar todo o vivir cada día sin saber si es el último?',
    },
  },
]

export const heat = [
  {
    id: 'heat-1',
    en: {
      q: 'The Shift?',
      explanation: "When did our friendship (or relationship) first feel 'real' or 'deep' to you?",
    },
    es: {
      q: '¿El Cambio?',
      explanation:
        "¿Cuándo sentiste por primera vez que nuestra amistad (o relación) era 'real' o 'profunda'?",
    },
  },
  {
    id: 'heat-2',
    en: {
      q: 'The Erotic Mind?',
      explanation:
        "What is a non-sexual thing that makes you feel most 'alive' or 'turned on' by life?",
    },
    es: {
      q: '¿La Mente Erótica?',
      explanation: "¿Qué cosa no sexual te hace sentir más 'vivo/a' o 'encendido/a' por la vida?",
    },
  },
  {
    id: 'heat-3',
    en: {
      q: 'The Mystery?',
      explanation: 'What is one thing about me that still remains a mystery to you?',
    },
    es: {
      q: '¿El Misterio?',
      explanation: '¿Qué es algo de mí que todavía sigue siendo un misterio para ti?',
    },
  },
  {
    id: 'heat-4',
    en: {
      q: 'The Attraction?',
      explanation: 'What is the first thing that usually draws you to another person?',
    },
    es: {
      q: '¿La Atracción?',
      explanation: '¿Qué es lo primero que normalmente te atrae de otra persona?',
    },
  },
  {
    id: 'heat-5',
    en: {
      q: 'The Power Dynamic?',
      explanation:
        'In your relationships, do you prefer to be the one who cares more, or the one who is cared for more?',
    },
    es: {
      q: '¿La Dinámica de Poder?',
      explanation: '¿En tus relaciones, prefieres ser quien más cuida o quien más es cuidado/a?',
    },
  },
  {
    id: 'heat-6',
    en: {
      q: 'The Romantic Blueprint?',
      explanation: 'What movie or book ruined your expectations of romance?',
    },
    es: {
      q: '¿El Plano Romántico?',
      explanation: '¿Qué película o libro arruinó tus expectativas del romance?',
    },
  },
  {
    id: 'heat-7',
    en: {
      q: 'The Unspoken Desire?',
      explanation:
        "What is a fantasy (sexual or otherwise) that you've never shared because it feels 'silly'?",
    },
    es: {
      q: '¿El Deseo No Dicho?',
      explanation: "¿Qué fantasía (sexual o no) nunca has compartido porque te parece 'tonta'?",
    },
  },
  {
    id: 'heat-8',
    en: {
      q: 'The Connection Spark?',
      explanation: 'What is the fastest way for someone to earn your trust?',
    },
    es: {
      q: '¿La Chispa de Conexión?',
      explanation: '¿Cuál es la forma más rápida de ganarse tu confianza?',
    },
  },
  {
    id: 'heat-9',
    en: {
      q: 'The Conflict Style?',
      explanation:
        "Are you a 'pursuer' (wanting to talk it out now) or a 'distancer' (needing space) during a fight?",
    },
    es: {
      q: '¿El Estilo de Conflicto?',
      explanation:
        "¿En una discusión, eres 'buscador/a' (querer hablar ahora) o 'distanciador/a' (necesitar espacio)?",
    },
  },
  {
    id: 'heat-10',
    en: {
      q: 'The Love Language?',
      explanation: "How do you show love when you aren't allowed to use words?",
    },
    es: {
      q: '¿El Lenguaje del Amor?',
      explanation: '¿Cómo muestras amor cuando no puedes usar palabras?',
    },
  },
  {
    id: 'heat-11',
    en: {
      q: 'The Seduction?',
      explanation: "What does 'seduction' mean to you in a long-term context?",
    },
    es: {
      q: '¿La Seducción?',
      explanation: "¿Qué significa la 'seducción' para ti en un contexto de largo plazo?",
    },
  },
  {
    id: 'heat-12',
    en: {
      q: 'The Chemistry?',
      explanation: "Do you believe chemistry is something you 'have' or something you 'build'?",
    },
    es: {
      q: '¿La Química?',
      explanation: "¿Crees que la química es algo que 'tienes' o algo que 'construyes'?",
    },
  },
  {
    id: 'heat-13',
    en: {
      q: 'The Vulnerability High?',
      explanation:
        "When was the last time being vulnerable with someone felt better than being 'strong'?",
    },
    es: {
      q: '¿El Subidón de Vulnerabilidad?',
      explanation:
        "¿Cuándo fue la última vez que ser vulnerable con alguien se sintió mejor que ser 'fuerte'?",
    },
  },
  {
    id: 'heat-14',
    en: {
      q: 'The Dealbreaker?',
      explanation:
        "What is a personality trait that is an immediate 'turn off,' no matter how attractive the person is?",
    },
    es: {
      q: '¿El Límite?',
      explanation:
        "¿Qué rasgo de personalidad es un 'apagador inmediato', sin importar lo atractiva que sea la persona?",
    },
  },
  {
    id: 'heat-15',
    en: {
      q: 'The Risk?',
      explanation: "What is the biggest emotional risk you've ever taken for love?",
    },
    es: {
      q: '¿El Riesgo?',
      explanation: '¿Cuál es el mayor riesgo emocional que has tomado por amor?',
    },
  },
  {
    id: 'heat-16',
    en: {
      q: 'The First Impression Revisit?',
      explanation: 'What did you think of me the very first time we met?',
    },
    es: {
      q: '¿Revisitar la Primera Impresión?',
      explanation: '¿Qué pensaste de mí la primera vez que nos conocimos?',
    },
  },
  {
    id: 'heat-17',
    en: {
      q: 'The Jealousy?',
      explanation: "What makes you feel the most 'possessive' in a relationship?",
    },
    es: { q: '¿Los Celos?', explanation: "¿Qué te hace sentir más 'posesivo/a' en una relación?" },
  },
  {
    id: 'heat-18',
    en: {
      q: 'The Physicality?',
      explanation: 'How important is physical touch to your sense of safety?',
    },
    es: {
      q: '¿La Fisicalidad?',
      explanation: '¿Qué tan importante es el contacto físico para tu sensación de seguridad?',
    },
  },
  {
    id: 'heat-19',
    en: {
      q: 'The Intimacy Block?',
      explanation: 'What is the biggest wall you put up when someone tries to get close to you?',
    },
    es: {
      q: '¿El Bloqueo de Intimidad?',
      explanation: '¿Cuál es la mayor barrera que levantas cuando alguien intenta acercarse a ti?',
    },
  },
  {
    id: 'heat-20',
    en: {
      q: 'The Adventure?',
      explanation: "What is an experience you want to have with me that we haven't done yet?",
    },
    es: {
      q: '¿La Aventura?',
      explanation: '¿Qué experiencia quieres tener conmigo que todavía no hemos vivido?',
    },
  },
  {
    id: 'heat-21',
    en: {
      q: 'The Validation?',
      explanation: 'How do you want to be seen by your partner/closest friends?',
    },
    es: {
      q: '¿La Validación?',
      explanation: '¿Cómo quieres ser visto/a por tu pareja/amigos más cercanos?',
    },
  },
  {
    id: 'heat-22',
    en: { q: 'The Flirtation?', explanation: "What is your 'tell' when you like someone?" },
    es: { q: '¿El Flirteo?', explanation: "¿Cuál es tu 'señal' cuando alguien te gusta?" },
  },
  {
    id: 'heat-23',
    en: {
      q: 'The Regretful Choice?',
      explanation: "Who is the 'one that got away'—and why did they get away?",
    },
    es: {
      q: '¿La Elección Arrepentida?',
      explanation: "¿Quién es 'el/la que se fue'—y por qué se fue?",
    },
  },
  {
    id: 'heat-24',
    en: {
      q: 'The Shared Joy?',
      explanation: "What is a memory of us that always makes you smile when you're alone?",
    },
    es: {
      q: '¿La Alegría Compartida?',
      explanation: '¿Qué recuerdo nuestro siempre te hace sonreír cuando estás solo/a?',
    },
  },
  {
    id: 'heat-25',
    en: {
      q: "The 'Heat' Question?",
      explanation:
        "What is something you've been wanting to tell me but haven't found the right moment?",
    },
    es: {
      q: "¿La Pregunta del 'Fuego'?",
      explanation:
        '¿Qué es algo que has querido decirme pero no has encontrado el momento adecuado?',
    },
  },
]

export const mirror = [
  {
    id: 'mirror-1',
    en: {
      q: "The 'Mask'?",
      explanation: 'What is the version of yourself you perform when you feel insecure?',
    },
    es: {
      q: "¿La 'Máscara'?",
      explanation: '¿Qué versión de ti mismo/a interpretas cuando te sientes inseguro/a?',
    },
  },
  {
    id: 'mirror-2',
    en: {
      q: 'The Unspoken Need?',
      explanation:
        'What is something you need from your friends that you are too embarrassed to ask for?',
    },
    es: {
      q: '¿La Necesidad No Dicha?',
      explanation: '¿Qué es algo que necesitas de tus amigos/as pero te da vergüenza pedir?',
    },
  },
  {
    id: 'mirror-3',
    en: {
      q: 'The Superpower?',
      explanation:
        'If you could see yourself through my eyes for one minute, what do you think would surprise you?',
    },
    es: {
      q: '¿El Superpoder?',
      explanation:
        '¿Si pudieras verte a través de mis ojos por un minuto, qué crees que te sorprendería?',
    },
  },
  {
    id: 'mirror-4',
    en: {
      q: 'The Hardest Truth?',
      explanation: "What is a truth about yourself that you've been avoiding?",
    },
    es: {
      q: '¿La Verdad Más Difícil?',
      explanation: '¿Qué verdad sobre ti mismo/a has estado evitando?',
    },
  },
  {
    id: 'mirror-5',
    en: {
      q: 'The Pride Point?',
      explanation: 'What is a quality of yours that you used to hate but now love?',
    },
    es: {
      q: '¿El Punto de Orgullo?',
      explanation: '¿Qué cualidad tuya solías odiar pero ahora amas?',
    },
  },
  {
    id: 'mirror-6',
    en: {
      q: 'The Social Exhaustion?',
      explanation: 'What part of your personality do you find the most exhausting to maintain?',
    },
    es: {
      q: '¿El Agotamiento Social?',
      explanation: '¿Qué parte de tu personalidad encuentras más agotadora de mantener?',
    },
  },
  {
    id: 'mirror-7',
    en: {
      q: 'The Vulnerability Trigger?',
      explanation: "What is the fastest way for someone to make you feel 'small'?",
    },
    es: {
      q: '¿El Gatillo de Vulnerabilidad?',
      explanation: "¿Cuál es la forma más rápida de hacerte sentir 'pequeño/a'?",
    },
  },
  {
    id: 'mirror-8',
    en: {
      q: 'The Body Connection?',
      explanation: "When do you feel most 'at home' in your own skin?",
    },
    es: {
      q: '¿La Conexión Corporal?',
      explanation: "¿Cuándo te sientes más 'en casa' en tu propio cuerpo?",
    },
  },
  {
    id: 'mirror-9',
    en: {
      q: 'The Internal Monologue?',
      explanation: 'Is the voice in your head a critic, a cheerleader, or a narrator?',
    },
    es: {
      q: '¿El Monólogo Interno?',
      explanation: '¿La voz en tu cabeza es un crítico, un animador o un narrador?',
    },
  },
  {
    id: 'mirror-10',
    en: {
      q: 'The Imposter Syndrome?',
      explanation: "In what area of your life do you feel like you're just 'faking it'?",
    },
    es: {
      q: '¿El Síndrome del Impostor?',
      explanation: "¿En qué área de tu vida sientes que solo estás 'fingiendo'?",
    },
  },
  {
    id: 'mirror-11',
    en: {
      q: 'The Growth Gap?',
      explanation:
        'What is one habit you have that is a leftover from a version of you that no longer exists?',
    },
    es: {
      q: '¿La Brecha de Crecimiento?',
      explanation: '¿Qué hábito tienes que es un remanente de una versión de ti que ya no existe?',
    },
  },
  {
    id: 'mirror-12',
    en: {
      q: 'The Definition of Love?',
      explanation: "How do you personally define love without using the word 'love'?",
    },
    es: {
      q: '¿La Definición del Amor?',
      explanation: "¿Cómo defines personalmente el amor sin usar la palabra 'amor'?",
    },
  },
  {
    id: 'mirror-13',
    en: {
      q: 'The Envy Map?',
      explanation:
        'Who are you currently jealous of, and what does that tell you about what you want?',
    },
    es: {
      q: '¿El Mapa de la Envidia?',
      explanation: '¿De quién tienes envidia actualmente, y qué te dice eso sobre lo que quieres?',
    },
  },
  {
    id: 'mirror-14',
    en: {
      q: 'The Forgiveness Gap?',
      explanation: 'What is easier for you: forgiving yourself or forgiving others?',
    },
    es: {
      q: '¿La Brecha del Perdón?',
      explanation: '¿Qué te resulta más fácil: perdonarte a ti mismo/a o perdonar a los demás?',
    },
  },
  {
    id: 'mirror-15',
    en: {
      q: 'The Boundaries?',
      explanation: "What is a boundary you're currently struggling to set?",
    },
    es: {
      q: '¿Los Límites?',
      explanation: '¿Qué límite estás teniendo dificultades para establecer actualmente?',
    },
  },
  {
    id: 'mirror-16',
    en: {
      q: 'The Loneliness?',
      explanation: "What is the difference for you between being 'alone' and being 'lonely'?",
    },
    es: {
      q: '¿La Soledad?',
      explanation: "¿Cuál es la diferencia para ti entre estar 'solo/a' y sentirte 'solitario/a'?",
    },
  },
  {
    id: 'mirror-17',
    en: {
      q: 'The Compliment Barrier?',
      explanation: 'Which compliment is the hardest for you to believe when someone says it?',
    },
    es: {
      q: '¿La Barrera del Cumplido?',
      explanation: '¿Qué cumplido te cuesta más creer cuando alguien te lo dice?',
    },
  },
  {
    id: 'mirror-18',
    en: {
      q: 'The Emotional Language?',
      explanation: "Are you someone who 'thinks' your feelings or 'feels' your feelings?",
    },
    es: {
      q: '¿El Lenguaje Emocional?',
      explanation: "¿Eres alguien que 'piensa' sus sentimientos o que los 'siente'?",
    },
  },
  {
    id: 'mirror-19',
    en: {
      q: 'The Reputation?',
      explanation:
        "What is the one thing you hope people say about you when you aren't in the room?",
    },
    es: {
      q: '¿La Reputación?',
      explanation: '¿Qué es lo único que esperas que la gente diga de ti cuando no estás presente?',
    },
  },
  {
    id: 'mirror-20',
    en: {
      q: 'The Success Metric?',
      explanation: "What would have to happen for you to feel like you've 'made it'?",
    },
    es: {
      q: '¿La Métrica del Éxito?',
      explanation: "¿Qué tendría que pasar para que sientas que has 'llegado'?",
    },
  },
  {
    id: 'mirror-21',
    en: {
      q: 'The Blind Spot?',
      explanation:
        'What is a personality trait of yours that you think I tolerate rather than enjoy?',
    },
    es: {
      q: '¿El Punto Ciego?',
      explanation: '¿Qué rasgo de tu personalidad crees que yo tolero en lugar de disfrutar?',
    },
  },
  {
    id: 'mirror-22',
    en: {
      q: 'The Intuition?',
      explanation:
        "When was the last time your 'gut' told you something that your 'brain' ignored?",
    },
    es: {
      q: '¿La Intuición?',
      explanation:
        "¿Cuándo fue la última vez que tu 'instinto' te dijo algo que tu 'mente' ignoró?",
    },
  },
  {
    id: 'mirror-23',
    en: {
      q: 'The Self-Soothing?',
      explanation: "How do you parent yourself when you're having a hard time?",
    },
    es: {
      q: '¿El Autocuidado?',
      explanation: '¿Cómo te cuidas a ti mismo/a cuando estás pasando un momento difícil?',
    },
  },
  {
    id: 'mirror-24',
    en: {
      q: 'The Authenticity?',
      explanation: 'Who is the one person you are 100% yourself with?',
    },
    es: { q: '¿La Autenticidad?', explanation: '¿Con quién eres 100% tú mismo/a?' },
  },
  {
    id: 'mirror-25',
    en: {
      q: 'The Mirror Question?',
      explanation: 'If you met yourself at a party, would you want to be your friend?',
    },
    es: {
      q: '¿La Pregunta del Espejo?',
      explanation: '¿Si te encontraras contigo mismo/a en una fiesta, querrías ser tu amigo/a?',
    },
  },
]

export const roots = [
  {
    id: 'roots-1',
    en: {
      q: 'The Dinner Table?',
      explanation: "What was the most common 'vibe' or emotion at your childhood dinner table?",
    },
    es: {
      q: '¿La Mesa del Comedor?',
      explanation: "¿Cuál era el 'ambiente' o emoción más común en la mesa de tu infancia?",
    },
  },
  {
    id: 'roots-2',
    en: {
      q: 'The Family Myth?',
      explanation:
        "What is a story your family tells about you that you've started to realize isn't quite true?",
    },
    es: {
      q: '¿El Mito Familiar?',
      explanation:
        '¿Qué historia cuenta tu familia sobre ti que has empezado a darte cuenta de que no es del todo cierta?',
    },
  },
  {
    id: 'roots-3',
    en: {
      q: 'The Early Heartbreak?',
      explanation: "What was your first experience of realizing the world wasn't a fair place?",
    },
    es: {
      q: '¿El Primer Desencanto?',
      explanation:
        '¿Cuál fue tu primera experiencia al darte cuenta de que el mundo no era un lugar justo?',
    },
  },
  {
    id: 'roots-4',
    en: {
      q: 'The Inherited Fear?',
      explanation: "What is a fear you realized you 'borrowed' from one of your parents?",
    },
    es: {
      q: '¿El Miedo Heredado?',
      explanation: "¿Qué miedo te diste cuenta de que 'tomaste prestado' de uno de tus padres?",
    },
  },
  {
    id: 'roots-5',
    en: {
      q: 'The Childhood Sanctuary?',
      explanation: 'Where did you go to hide when you were little?',
    },
    es: {
      q: '¿El Santuario de la Infancia?',
      explanation: '¿A dónde ibas a esconderte cuando eras pequeño/a?',
    },
  },
  {
    id: 'roots-6',
    en: {
      q: 'The First Hero?',
      explanation: "Who was the first adult you admired who wasn't related to you?",
    },
    es: {
      q: '¿El Primer Héroe?',
      explanation: '¿Quién fue el primer adulto que admiraste que no era de tu familia?',
    },
  },
  {
    id: 'roots-7',
    en: {
      q: 'The Sibling Dynamic?',
      explanation:
        'How did your role in your family (older, younger, middle, only) shape how you handle conflict now?',
    },
    es: {
      q: '¿La Dinámica Entre Hermanos?',
      explanation:
        '¿Cómo tu rol en la familia (mayor, menor, del medio, hijo único) moldeó la forma en que manejas los conflictos ahora?',
    },
  },
  {
    id: 'roots-8',
    en: {
      q: 'The Lost Hobby?',
      explanation:
        'What did you love doing at age 10 that you completely stopped doing as an adult?',
    },
    es: {
      q: '¿El Hobby Perdido?',
      explanation:
        '¿Qué amabas hacer a los 10 años que dejaste de hacer por completo al ser adulto/a?',
    },
  },
  {
    id: 'roots-9',
    en: {
      q: 'The Teacher?',
      explanation: 'Which teacher changed the trajectory of your life, for better or worse?',
    },
    es: {
      q: '¿El Maestro/a?',
      explanation: '¿Qué profesor/a cambió la trayectoria de tu vida, para bien o para mal?',
    },
  },
  {
    id: 'roots-10',
    en: {
      q: 'The Ancestral Secret?',
      explanation: 'What is a piece of family history you wish you knew more about?',
    },
    es: {
      q: '¿El Secreto Ancestral?',
      explanation: '¿Qué parte de la historia familiar desearías conocer mejor?',
    },
  },
  {
    id: 'roots-11',
    en: {
      q: 'The Rebellious Phase?',
      explanation: "What was the most 'out of character' thing you did as a teenager?",
    },
    es: {
      q: '¿La Fase Rebelde?',
      explanation: "¿Cuál fue la cosa más 'fuera de tu carácter' que hiciste de adolescente?",
    },
  },
  {
    id: 'roots-12',
    en: {
      q: 'The First Job?',
      explanation: 'What did your very first paycheck teach you about the value of your time?',
    },
    es: {
      q: '¿El Primer Trabajo?',
      explanation: '¿Qué te enseñó tu primer sueldo sobre el valor de tu tiempo?',
    },
  },
  {
    id: 'roots-13',
    en: {
      q: 'The Hometown Ghost?',
      explanation:
        'If you went back to your hometown today, what specific corner would hold the most memories?',
    },
    es: {
      q: '¿El Fantasma del Pueblo?',
      explanation:
        '¿Si volvieras a tu ciudad natal hoy, qué rincón específico guardaría más recuerdos?',
    },
  },
  {
    id: 'roots-14',
    en: {
      q: 'The Parental Praise?',
      explanation: "What did you have to do as a child to get your parents' attention or approval?",
    },
    es: {
      q: '¿La Aprobación de los Padres?',
      explanation:
        '¿Qué tenías que hacer de niño/a para obtener la atención o aprobación de tus padres?',
    },
  },
  {
    id: 'roots-15',
    en: {
      q: 'The Childhood Smell?',
      explanation: 'What scent immediately transports you back to being seven years old?',
    },
    es: {
      q: '¿El Olor de la Infancia?',
      explanation: '¿Qué aroma te transporta de inmediato a cuando tenías siete años?',
    },
  },
  {
    id: 'roots-16',
    en: {
      q: 'The Forgiven Mistake?',
      explanation:
        'What is something your parents did wrong that you have finally forgiven them for?',
    },
    es: {
      q: '¿El Error Perdonado?',
      explanation: '¿Qué es algo que tus padres hicieron mal y que finalmente les has perdonado?',
    },
  },
  {
    id: 'roots-17',
    en: {
      q: 'The Family Motto?',
      explanation: 'If your family had a coat of arms or a slogan, what would it be?',
    },
    es: {
      q: '¿El Lema Familiar?',
      explanation: '¿Si tu familia tuviera un escudo de armas o un lema, cuál sería?',
    },
  },
  {
    id: 'roots-18',
    en: {
      q: 'The First Friend?',
      explanation: 'Who was your first best friend, and what did they teach you about loyalty?',
    },
    es: {
      q: '¿El Primer Amigo/a?',
      explanation: '¿Quién fue tu primer mejor amigo/a, y qué te enseñó sobre la lealtad?',
    },
  },
  {
    id: 'roots-19',
    en: {
      q: "The 'Odd One Out'?",
      explanation:
        "In what way were you the 'black sheep' of your family or social circle growing up?",
    },
    es: {
      q: '¿La Oveja Negra?',
      explanation:
        "¿En qué sentido eras la 'oveja negra' de tu familia o círculo social al crecer?",
    },
  },
  {
    id: 'roots-20',
    en: {
      q: 'The Cultural Anchor?',
      explanation:
        'What tradition from your upbringing do you intend to keep for the rest of your life?',
    },
    es: {
      q: '¿El Ancla Cultural?',
      explanation: '¿Qué tradición de tu crianza tienes intención de mantener el resto de tu vida?',
    },
  },
  {
    id: 'roots-21',
    en: {
      q: 'The Early Dream?',
      explanation: "What did your 8-year-old self think 'success' looked like?",
    },
    es: {
      q: '¿El Sueño Temprano?',
      explanation: "¿Qué pensaba tu yo de 8 años que significaba el 'éxito'?",
    },
  },
  {
    id: 'roots-22',
    en: {
      q: 'The Hidden Struggle?',
      explanation: 'What was something your family went through that neighbors never knew about?',
    },
    es: {
      q: '¿La Lucha Oculta?',
      explanation: '¿Qué fue algo por lo que pasó tu familia que los vecinos nunca supieron?',
    },
  },
  {
    id: 'roots-23',
    en: {
      q: 'The Grandparent Legacy?',
      explanation:
        'What is one piece of advice from a grandparent that has actually stuck with you?',
    },
    es: {
      q: '¿El Legado de los Abuelos?',
      explanation: '¿Qué consejo de un abuelo/a te ha quedado grabado realmente?',
    },
  },
  {
    id: 'roots-24',
    en: {
      q: 'The Childhood Gift?',
      explanation: 'What was the one toy or object you wanted desperately but never got?',
    },
    es: {
      q: '¿El Regalo de Infancia?',
      explanation:
        '¿Cuál fue el juguete u objeto que quisiste desesperadamente pero nunca obtuviste?',
    },
  },
  {
    id: 'roots-25',
    en: {
      q: 'The Turning Point?',
      explanation: 'What was the exact moment you realized you were no longer a child?',
    },
    es: {
      q: '¿El Punto de Inflexión?',
      explanation:
        '¿Cuál fue el momento exacto en que te diste cuenta de que ya no eras un niño/a?',
    },
  },
]

export const spark = [
  {
    id: 'spark-1',
    en: {
      q: "The 'Yes' of the Week?",
      explanation: 'What is something you said yes to recently that actually made your heart race?',
    },
    es: {
      q: "¿El 'Sí' de la Semana?",
      explanation: '¿A qué dijiste que sí recientemente que te aceleró el corazón?',
    },
  },
  {
    id: 'spark-2',
    en: {
      q: 'Smallest Luxury?',
      explanation: 'What is a tiny, inexpensive thing that makes you feel like royalty?',
    },
    es: {
      q: '¿El Lujo Pequeño?',
      explanation: '¿Qué cosa pequeña y barata te hace sentir como de la realeza?',
    },
  },
  {
    id: 'spark-3',
    en: {
      q: "The 'Current You'?",
      explanation: 'If you were a weather pattern today, what would the forecast be?',
    },
    es: {
      q: "¿El 'Tú de Hoy'?",
      explanation: '¿Si fueras un patrón climático hoy, cómo sería el pronóstico?',
    },
  },
  {
    id: 'spark-4',
    en: {
      q: 'Unsung Skill?',
      explanation:
        'What is a talent you have that serves no professional purpose but makes you proud?',
    },
    es: {
      q: '¿Talento Oculto?',
      explanation:
        '¿Qué habilidad tienes que no tiene ningún propósito profesional pero te enorgullece?',
    },
  },
  {
    id: 'spark-5',
    en: {
      q: 'The Last Rabbit Hole?',
      explanation: 'What was the last topic that kept you awake researching until 2 AM?',
    },
    es: {
      q: '¿El Último Pozo Sin Fondo?',
      explanation:
        '¿Cuál fue el último tema que te mantuvo investigando despierto/a hasta las 2 AM?',
    },
  },
  {
    id: 'spark-6',
    en: {
      q: 'Immediate Comfort?',
      explanation:
        'Where is the first place you go—mentally or physically—when you feel overwhelmed?',
    },
    es: {
      q: '¿Refugio Inmediato?',
      explanation: '¿A qué lugar vas primero —mental o físicamente— cuando te sientes abrumado/a?',
    },
  },
  {
    id: 'spark-7',
    en: {
      q: "The 'No' You're Proud Of?",
      explanation:
        'What is something you recently declined that felt like a win for your boundaries?',
    },
    es: {
      q: "¿El 'No' del que Estás Orgulloso/a?",
      explanation:
        '¿Qué fue algo que rechazaste recientemente que sintiste como una victoria para tus límites?',
    },
  },
  {
    id: 'spark-8',
    en: {
      q: 'Sensory Joy?',
      explanation: 'What specific sound or smell instantly makes you feel safe?',
    },
    es: {
      q: '¿Alegría Sensorial?',
      explanation: '¿Qué sonido o aroma específico te hace sentir seguro/a al instante?',
    },
  },
  {
    id: 'spark-9',
    en: {
      q: 'The Social Battery?',
      explanation: 'What is the one social situation that drains you faster than any other?',
    },
    es: {
      q: '¿La Batería Social?',
      explanation: '¿Cuál es la situación social que te agota más rápido que cualquier otra?',
    },
  },
  {
    id: 'spark-10',
    en: {
      q: 'Spontaneous Travel?',
      explanation:
        'If we had to leave for the airport in 20 minutes, where are you hoping the ticket says?',
    },
    es: {
      q: '¿Viaje Espontáneo?',
      explanation:
        '¿Si tuviéramos que salir al aeropuerto en 20 minutos, a qué destino esperas que diga el boleto?',
    },
  },
  {
    id: 'spark-11',
    en: {
      q: 'The Mood Booster?',
      explanation: "What song is your 'break glass in case of emergency' for a bad mood?",
    },
    es: {
      q: '¿El Levantador de Ánimo?',
      explanation:
        "¿Qué canción es tu 'rompe el cristal en caso de emergencia' para cuando estás de mal humor?",
    },
  },
  {
    id: 'spark-12',
    en: {
      q: 'Modern Magic?',
      explanation: 'What piece of technology still feels like magic to you every time you use it?',
    },
    es: {
      q: '¿Magia Moderna?',
      explanation: '¿Qué tecnología todavía te parece mágica cada vez que la usas?',
    },
  },
  {
    id: 'spark-13',
    en: {
      q: 'The Daily Ritual?',
      explanation: 'What is one part of your morning routine that you refuse to compromise on?',
    },
    es: {
      q: '¿El Ritual Diario?',
      explanation: '¿Qué parte de tu rutina matutina te niegas a comprometer?',
    },
  },
  {
    id: 'spark-14',
    en: {
      q: 'Unexpected Compliment?',
      explanation: "What is the strangest but most cherished compliment you've ever received?",
    },
    es: {
      q: '¿Cumplido Inesperado?',
      explanation: '¿Cuál es el cumplido más extraño pero más preciado que hayas recibido?',
    },
  },
  {
    id: 'spark-15',
    en: {
      q: "The 'Outer' Persona?",
      explanation: 'What is the first impression you think you give to strangers?',
    },
    es: {
      q: "¿La Persona 'Exterior'?",
      explanation: '¿Qué primera impresión crees que das a los desconocidos?',
    },
  },
  {
    id: 'spark-16',
    en: {
      q: 'Current Obsession?',
      explanation:
        'What is a food or drink you could eat every day for a month without getting bored?',
    },
    es: {
      q: '¿Obsesión Actual?',
      explanation:
        '¿Qué comida o bebida podrías tomar todos los días durante un mes sin aburrirte?',
    },
  },
  {
    id: 'spark-17',
    en: {
      q: 'The Quiet Moment?',
      explanation: 'When was the last time you sat in total silence for more than ten minutes?',
    },
    es: {
      q: '¿El Momento Tranquilo?',
      explanation:
        '¿Cuándo fue la última vez que estuviste sentado/a en silencio total por más de diez minutos?',
    },
  },
  {
    id: 'spark-18',
    en: {
      q: 'The Thrift Store Find?',
      explanation:
        "If you could only keep one physical object you've ever bought second-hand, what is it?",
    },
    es: {
      q: '¿El Hallazgo de Segunda Mano?',
      explanation:
        '¿Si solo pudieras conservar un objeto que hayas comprado de segunda mano, cuál sería?',
    },
  },
  {
    id: 'spark-19',
    en: {
      q: 'The Future Hype?',
      explanation:
        'What is one thing happening in the next six months that you are genuinely vibrating with excitement for?',
    },
    es: {
      q: '¿La Emoción Futura?',
      explanation:
        '¿Qué es algo que sucederá en los próximos seis meses por lo que estás genuinamente emocionado/a?',
    },
  },
  {
    id: 'spark-20',
    en: {
      q: "The 'Comfort' Watch?",
      explanation: 'What movie or show do you put on when you need the world to stop spinning?',
    },
    es: {
      q: "¿El 'Comfort' de Pantalla?",
      explanation: '¿Qué película o serie pones cuando necesitas que el mundo deje de girar?',
    },
  },
  {
    id: 'spark-21',
    en: { q: 'The Small Bravery?', explanation: 'What was a minor social risk you took recently?' },
    es: {
      q: '¿El Pequeño Valor?',
      explanation: '¿Qué pequeño riesgo social tomaste recientemente?',
    },
  },
  {
    id: 'spark-22',
    en: {
      q: 'The Nature Fix?',
      explanation: 'Are you a mountain person, a sea person, or a forest person—and why?',
    },
    es: {
      q: '¿El Remedio Natural?',
      explanation: '¿Eres más de montaña, de mar o de bosque, y por qué?',
    },
  },
  {
    id: 'spark-23',
    en: {
      q: "The Guilty Pleasure (That isn't guilty)?",
      explanation: "What is something 'low-brow' that you unashamedly love?",
    },
    es: {
      q: '¿El Placer Culpable (Que no es culpable)?',
      explanation: "¿Qué cosa 'vulgar' amas sin vergüenza alguna?",
    },
  },
  {
    id: 'spark-24',
    en: { q: 'The Gift?', explanation: "What is the best gift you've ever given someone else?" },
    es: { q: '¿El Regalo?', explanation: '¿Cuál es el mejor regalo que le has dado a alguien?' },
  },
  {
    id: 'spark-25',
    en: {
      q: 'The Current Question?',
      explanation: "What is a question you've been asking yourself lately?",
    },
    es: {
      q: '¿La Pregunta Actual?',
      explanation: '¿Qué pregunta te has estado haciendo últimamente?',
    },
  },
]

// Music trivia: [year, artist, title] — no translation needed for song data
export const decadesTape = [
  // 1970s
  [1971, 'Led Zeppelin', 'Stairway to Heaven'],
  [1971, 'Marvin Gaye', "What's Going On"],
  [1972, 'David Bowie', 'Ziggy Stardust'],
  [1973, 'Pink Floyd', 'The Dark Side of the Moon'],
  [1974, 'ABBA', 'Waterloo'],
  [1975, 'Queen', 'Bohemian Rhapsody'],
  [1976, 'Eagles', 'Hotel California'],
  [1977, 'Fleetwood Mac', 'The Chain'],
  [1977, 'Donna Summer', 'I Feel Love'],
  [1978, 'Bee Gees', "Stayin' Alive"],
  [1979, 'Michael Jackson', "Don't Stop 'Til You Get Enough"],
  [1979, 'The Clash', 'London Calling'],
  [1970, 'Simon & Garfunkel', 'Bridge Over Troubled Water'],
  [1970, 'The Beatles', 'Let It Be'],
  [1973, 'Stevie Wonder', 'Superstition'],
  [1974, 'Elton John', 'Bennie and the Jets'],
  [1975, 'Bruce Springsteen', 'Born to Run'],
  [1976, 'Peter Frampton', 'Show Me the Way'],
  [1977, 'The Sex Pistols', 'Anarchy in the U.K.'],
  [1978, 'The Rolling Stones', 'Miss You'],
  [1979, 'Blondie', 'Heart of Glass'],

  // 1980s
  [1980, 'AC/DC', 'Back in Black'],
  [1981, 'Kim Carnes', 'Bette Davis Eyes'],
  [1982, 'Michael Jackson', 'Thriller'],
  [1983, 'Madonna', 'Holiday'],
  [1984, 'Prince', 'When Doves Cry'],
  [1985, 'Tears for Fears', 'Shout'],
  [1986, 'Peter Gabriel', 'Sledgehammer'],
  [1987, 'U2', 'With or Without You'],
  [1988, 'Tracy Chapman', 'Fast Car'],
  [1989, 'Madonna', 'Like a Prayer'],
  [1980, 'Blondie', 'Call Me'],
  [1981, 'The Human League', "Don't You Want Me"],
  [1982, 'Survivor', 'Eye of the Tiger'],
  [1983, 'David Bowie & Mick Jagger', 'Dancing in the Street'],
  [1984, 'Cyndi Lauper', 'Girls Just Want to Have Fun'],
  [1985, 'a-ha', 'Take On Me'],
  [1986, 'Bon Jovi', "Livin' on a Prayer"],
  [1987, 'Michael Jackson', 'Bad'],
  [1988, 'George Michael', 'Faith'],
  [1989, 'The Stone Roses', 'I Wanna Be Adored'],

  // 1990s
  [1991, 'Nirvana', 'Smells Like Teen Spirit'],
  [1992, 'Whitney Houston', 'I Will Always Love You'],
  [1993, 'Janet Jackson', 'Again'],
  [1994, 'Oasis', 'Live Forever'],
  [1995, 'TLC', 'Waterfalls'],
  [1996, 'Alanis Morissette', 'Ironic'],
  [1997, 'Radiohead', 'Karma Police'],
  [1998, 'Lauryn Hill', 'Doo Wop (That Thing)'],
  [1999, 'Santana ft. Rob Thomas', 'Smooth'],
  [1990, "Sinéad O'Connor", 'Nothing Compares 2 U'],
  [1991, 'Bryan Adams', '(Everything I Do) I Do It for You'],
  [1992, 'Dr. Dre', "Nuthin' but a G Thang"],
  [1993, 'Pearl Jam', 'Black'],
  [1994, 'Ace of Base', 'The Sign'],
  [1995, 'Coolio', "Gangsta's Paradise"],
  [1996, 'Fugees', 'Killing Me Softly'],
  [1997, 'Puff Daddy & Faith Evans', "I'll Be Missing You"],
  [1998, 'Madonna', 'Frozen'],
  [1999, 'Ricky Martin', "Livin' la Vida Loca"],

  // 2000s
  [2001, "Destiny's Child", 'Survivor'],
  [2002, 'Norah Jones', "Don't Know Why"],
  [2003, 'Beyoncé', 'Crazy in Love'],
  [2004, 'Kanye West', 'Jesus Walks'],
  [2005, 'Mariah Carey', 'We Belong Together'],
  [2006, 'Amy Winehouse', 'Rehab'],
  [2007, 'Rihanna', 'Umbrella'],
  [2008, 'Coldplay', 'Viva la Vida'],
  [2009, 'Jay-Z & Alicia Keys', 'Empire State of Mind'],
  [2000, 'Eminem', 'The Real Slim Shady'],
  [2000, 'U2', 'Beautiful Day'],
  [2001, 'Daft Punk', 'Digital Love'],
  [2002, 'The White Stripes', 'Fell in Love with a Girl'],
  [2003, 'OutKast', 'Hey Ya!'],
  [2004, 'Usher ft. Lil Jon', 'Yeah!'],
  [2005, 'Gorillaz', 'Feel Good Inc.'],
  [2006, 'Justin Timberlake', 'SexyBack'],
  [2007, 'Arcade Fire', 'Intervention'],
  [2008, 'Lil Wayne', 'Lollipop'],
  [2009, 'Lady Gaga', 'Bad Romance'],

  // 2010s
  [2010, 'Cee Lo Green', 'Forget You'],
  [2011, 'Adele', 'Rolling in the Deep'],
  [2012, 'Frank Ocean', 'Thinking Bout You'],
  [2013, 'Daft Punk', 'Get Lucky'],
  [2014, 'Pharrell Williams', 'Happy'],
  [2015, 'Kendrick Lamar', 'Alright'],
  [2016, 'Beyoncé', 'Formation'],
  [2017, 'Cardi B', 'Bodak Yellow'],
  [2018, 'Childish Gambino', 'This Is America'],
  [2019, 'Billie Eilish', 'bad guy'],
  [2010, 'Katy Perry', 'Teenage Dream'],
  [2011, 'Drake', 'Take Care'],
  [2012, 'Gotye ft. Kimbra', 'Somebody That I Used to Know'],
  [2013, 'Lorde', 'Royals'],
  [2014, 'Taylor Swift', 'Shake It Off'],
  [2015, 'The Weeknd', "Can't Feel My Face"],
  [2016, 'Drake', 'One Dance'],
  [2017, 'Luis Fonsi ft. Daddy Yankee', 'Despacito'],
  [2018, 'Post Malone', 'Rockstar'],
  [2019, 'Lizzo', 'Truth Hurts'],

  // 2020s
  [2020, 'The Weeknd', 'Blinding Lights'],
  [2020, 'Bad Bunny', 'DAKITI'],
  [2021, 'Olivia Rodrigo', 'drivers license'],
  [2021, 'Silk Sonic', 'Leave the Door Open'],
  [2022, 'Harry Styles', 'As It Was'],
  [2022, 'Beyoncé', 'CUFF IT'],
  [2023, 'Miley Cyrus', 'Flowers'],
  [2023, 'SZA', 'Kill Bill'],
  [2024, 'Sabrina Carpenter', 'Espresso'],
  [2024, 'Charli XCX', '360'],
  [2020, 'Dua Lipa', 'Levitating'],
  [2021, 'Lil Nas X', 'MONTERO'],
  [2022, 'Taylor Swift', 'Anti-Hero'],
  [2023, 'Morgan Wallen', 'Last Night'],
  [2024, 'Kendrick Lamar', 'Not Like Us'],
]

export const getSongsByDecade = (decade) => {
  return decadesTape.filter(([year]) => {
    const songDecade = Math.floor(year / 10) * 10
    return songDecade === decade
  })
}

export const getAvailableDecades = () => [1970, 1980, 1990, 2000, 2010, 2020]
