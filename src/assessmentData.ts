export type TemperamentType = 'S' | 'C' | 'M' | 'P'

export type Question = {
  id: number
  text: string
  type: TemperamentType
}

export type TemperamentData = {
  name: string
  nick: string
  color: string
  bg: string
  energy: string
  comm: string
  stress: string
  strengths: string[]
  growth: string[]
}

export type ResultProfile = {
  name: string
  nick: string
  traits: string[]
  strengths?: string[]
  growth?: string[]
  schoolRole: string
  stress: string
  rmsValue: string
}

export const questions: Question[] = [
  { id: 1, text: 'I feel genuinely energized and recharged by lively social gatherings, parties, and meetups.', type: 'S' },
  { id: 2, text: 'I naturally take charge of situations, direct individuals, and lead groups without hesitation.', type: 'C' },
  { id: 3, text: 'I highly prefer meaningful, deep, one-on-one conversations over interacting with large groups.', type: 'M' },
  { id: 4, text: 'I rarely get easily upset, remaining calm and going with the flow in most daily situations.', type: 'P' },
  { id: 5, text: 'I thoroughly enjoy telling stories, cracking jokes, and being the center of attention in a room.', type: 'S' },
  { id: 6, text: 'I am intensely competitive and driven to win, excel, or succeed in almost every task I undertake.', type: 'C' },
  { id: 7, text: 'I am highly sensitive to, and easily affected by, the moods of others and the overall room atmosphere.', type: 'M' },
  { id: 8, text: 'I actively avoid arguments and confrontations, choosing to compromise easily to preserve peace.', type: 'P' },
  { id: 9, text: 'I initiate new projects with massive enthusiasm but often struggle with the regular follow-through.', type: 'S' },
  { id: 10, text: 'I work with high efficiency, maintaining a sharp focus on achieving practical and measurable results.', type: 'C' },
  { id: 11, text: 'I deeply appreciate systemic order, meticulous planning, and structural neatness in my workspace.', type: 'M' },
  { id: 12, text: 'I execute tasks at a steady, deliberate pace, and I strongly dislike being rushed or pressured.', type: 'P' },
  { id: 13, text: 'I quickly adapt to sudden changes and actively seek out spontaneous, novel experiences.', type: 'S' },
  { id: 14, text: 'I make decisions rapidly, relying heavily on objective logic and operational facts rather than emotions.', type: 'C' },
  { id: 15, text: 'I invest significant time analyzing situations and mapping out all potential risks before acting.', type: 'M' },
  { id: 16, text: 'I am widely recognized as reliable, loyal, consistent, and I prefer sticking to well-established routines.', type: 'P' },
]

export const screenQuestions: Record<number, number[]> = {
  1: [0, 1, 2, 3],
  2: [4, 5, 6, 7],
  3: [8, 9, 10, 11],
  4: [12, 13, 14, 15],
}

export const temperamentData: Record<TemperamentType, TemperamentData> = {
  S: {
    name: 'Sanguine',
    nick: 'The Creative Enthusiast',
    color: '#d97706',
    bg: '#fef3c7',
    energy: 'Extroverted',
    comm: 'Energetic and expressive',
    stress: 'Avoids responsibility',
    strengths: ['Masterful communicator', 'Builds team enthusiasm', 'Natural networker', 'Handles change effortlessly'],
    growth: ['Tends to become disorganised', 'Easily distracted', 'Struggles with follow-through'],
  },
  C: {
    name: 'Choleric',
    nick: 'The Strategic Driver',
    color: '#dc2626',
    bg: '#fee2e2',
    energy: 'Extroverted',
    comm: 'Direct and authoritative',
    stress: 'Becomes controlling',
    strengths: ['Natural leadership instinct', 'Vision-driven', 'Highly effective execution', 'Thrives under pressure'],
    growth: ['Can seem overly dominant', 'Impatient', 'Insensitive to team dynamics'],
  },
  M: {
    name: 'Melancholic',
    nick: 'The Analytical Specialist',
    color: '#1d4ed8',
    bg: '#dbeafe',
    energy: 'Introverted',
    comm: 'Precise and thoughtful',
    stress: 'Overthinks and isolates',
    strengths: ['Unmatched precision', 'High-quality standards', 'Loyal and thorough', 'Excellent problem-solving'],
    growth: ['Susceptible to overthinking', 'High perfectionism', 'Deep self-criticism'],
  },
  P: {
    name: 'Phlegmatic',
    nick: 'The Diplomatic Mediator',
    color: '#059669',
    bg: '#d1fae5',
    energy: 'Introverted',
    comm: 'Gentle and calm',
    stress: 'Withdraws emotionally',
    strengths: ['Calm crisis management', 'Excellent listener', 'Anchors team dynamics', 'Consistent performer'],
    growth: ['May avoid necessary conflict', 'Struggles with self-motivation', 'Resists sudden change'],
  },
}

export const combos: Record<string, ResultProfile> = {
  SC: {
    name: 'Choleric - Sanguine',
    nick: 'The Powerful Influencer',
    traits: ['Bold', 'Talkative', 'Visionary', 'Energetic', 'Charismatic'],
    strengths: ['Inspires crowds', 'Persuasive communicator', 'Strong leadership', 'Natural mobilizer'],
    growth: ['Can dominate conversations', 'Impulsive', 'Emotionally unstable'],
    schoolRole: 'Prefects, house captains, event hosts, peer motivators',
    stress: 'Becomes loud, controlling, emotional',
    rmsValue: 'Leadership through Excellence and Respect',
  },
  CS: {
    name: 'Sanguine - Choleric',
    nick: 'The Exciting Motivator',
    traits: ['Social', 'Fast-moving', 'Passionate', 'Influential'],
    strengths: ['Attracts people easily', 'Dynamic communicator', 'Creates excitement', 'Encouraging'],
    growth: ['Inconsistent', 'Easily distracted', 'Can exaggerate'],
    schoolRole: 'Assembly anchors, club leaders, class encouragers',
    stress: 'Emotional outbursts',
    rmsValue: 'Confidence through Innovation and Love',
  },
  CM: {
    name: 'Choleric - Melancholic',
    nick: 'The Strategic Commander',
    traits: ['Strong-willed', 'Analytical', 'Organized', 'Goal-driven'],
    strengths: ['Excellent planners', 'High achievers', 'Disciplined', 'Vision + structure'],
    growth: ['Perfectionist', 'Critical', 'Can intimidate people'],
    schoolRole: 'Project leads, academic team heads, structured organisers',
    stress: 'Becomes harsh and withdrawn',
    rmsValue: 'Responsibility through Excellence',
  },
  MC: {
    name: 'Melancholic - Choleric',
    nick: 'The Perfectionist Leader',
    traits: ['Structured', 'Serious', 'Driven', 'Strategic'],
    strengths: ['Excellence-oriented', 'Highly responsible', 'Strong standards', 'Organized'],
    growth: ['Difficult to please', 'Critical spirit', 'Workaholic tendencies'],
    schoolRole: 'Study coordinators, research leads, competition planners',
    stress: 'Becomes rigid',
    rmsValue: 'Excellence through Responsibility',
  },
  CP: {
    name: 'Choleric - Phlegmatic',
    nick: 'The Calm Leader',
    traits: ['Strong but calm', 'Stable', 'Practical', 'Dependable'],
    strengths: ['Balanced leadership', 'Emotionally steady', 'Wise under pressure', 'Loyal'],
    growth: ['Can suppress emotions', 'Stubborn', 'Emotionally distant'],
    schoolRole: 'Discipline prefects, team captains, dependable class leaders',
    stress: 'Quietly controlling',
    rmsValue: 'Steady leadership through Respect',
  },
  PC: {
    name: 'Phlegmatic - Choleric',
    nick: 'The Steady Commander',
    traits: ['Calm', 'Strong', 'Reliable', 'Decisive'],
    strengths: ['Balanced and grounded', 'Loyal to the mission', 'Calm under fire', 'Respected leader'],
    growth: ['Slow to act', 'May bottle emotions', 'Resistant to urgency'],
    schoolRole: 'Class representatives, welfare leaders, calm decision makers',
    stress: 'Quietly stubborn',
    rmsValue: 'Responsible service through Teamwork',
  },
  SP: {
    name: 'Sanguine - Phlegmatic',
    nick: 'The Friendly Peacemaker',
    traits: ['Warm', 'Gentle', 'Relational', 'Easygoing'],
    strengths: ['Great with people', 'Creates harmony', 'Approachable', 'Encouraging'],
    growth: ['Avoids confrontation', 'Indecisive', 'May lack discipline'],
    schoolRole: 'Buddy systems, welcome teams, peer support groups',
    stress: 'Withdraws quietly',
    rmsValue: 'Teamwork shaped by Love',
  },
  PS: {
    name: 'Phlegmatic - Sanguine',
    nick: 'The Gentle Friend',
    traits: ['Calm', 'Friendly', 'Relaxed', 'Pleasant'],
    strengths: ['Easy to work with', 'Supportive', 'Peaceful', 'Encouraging'],
    growth: ['Procrastination', 'Avoids difficult decisions', 'Too accommodating'],
    schoolRole: 'Support teams, welfare groups, class harmony builders',
    stress: 'Quietly disengages',
    rmsValue: 'Respect expressed through Teamwork',
  },
  SM: {
    name: 'Sanguine - Melancholic',
    nick: 'The Emotional Creative',
    traits: ['Creative', 'Expressive', 'Deep-feeling', 'Artistic'],
    strengths: ['Deep compassion', 'Creativity', 'Passionate worshippers', 'Emotionally expressive'],
    growth: ['Mood swings', 'Sensitive', 'Easily hurt', 'Overthinks emotions'],
    schoolRole: 'Creative arts, music, writing, media, and presentation teams',
    stress: 'Emotional shutdown',
    rmsValue: 'Innovation with Love',
  },
  MS: {
    name: 'Melancholic - Sanguine',
    nick: 'The Thoughtful Expresser',
    traits: ['Introspective', 'Creative', 'Expressive', 'Compassionate'],
    strengths: ['Deep thinker who can communicate', 'Rich emotional intelligence', 'Creative and compassionate'],
    growth: ['Mood swings', 'Overthinks social situations', 'Inconsistent'],
    schoolRole: 'Writers, presenters, creative communicators, peer mentors',
    stress: 'Withdraws then overexpresses',
    rmsValue: 'Thoughtful Innovation',
  },
  MP: {
    name: 'Melancholic - Phlegmatic',
    nick: 'The Thoughtful Stabilizer',
    traits: ['Quiet', 'Deep thinker', 'Loyal', 'Observant'],
    strengths: ['Wise', 'Stable', 'Dependable', 'Excellent listeners'],
    growth: ['Fearful of risks', 'Slow to act', 'Can isolate'],
    schoolRole: 'Counsellor assistants, study partners, trusted peer advisers',
    stress: 'Retreats emotionally',
    rmsValue: 'Quiet Excellence and Responsibility',
  },
  PM: {
    name: 'Phlegmatic - Melancholic',
    nick: 'The Quiet Thinker',
    traits: ['Reserved', 'Careful', 'Deep', 'Loyal'],
    strengths: ['Reliable', 'Analytical', 'Stable emotionally', 'Thoughtful'],
    growth: ['Pessimistic tendencies', 'Hesitant', 'Can become withdrawn'],
    schoolRole: 'Class secretaries, record keepers, library and club stewards',
    stress: 'Retreats into silence',
    rmsValue: 'Respectful consistency',
  },
}

export const pureProfiles: Record<TemperamentType, ResultProfile> = {
  S: {
    name: 'Sanguine',
    nick: 'The Pure Socializer',
    traits: ['Extroverted', 'Energetic', 'Charismatic', 'Fun-loving'],
    schoolRole: 'Social events, presentations, peer encouragement',
    stress: 'Avoids responsibility',
    rmsValue: 'Love and Innovation',
  },
  C: {
    name: 'Choleric',
    nick: 'The Pure Driver',
    traits: ['Decisive', 'Bold', 'Goal-focused', 'Authoritative'],
    schoolRole: 'Leadership, prefect roles, team direction',
    stress: 'Becomes controlling',
    rmsValue: 'Excellence and Responsibility',
  },
  M: {
    name: 'Melancholic',
    nick: 'The Pure Analyst',
    traits: ['Introverted', 'Detailed', 'Thoughtful', 'Perfectionist'],
    schoolRole: 'Research, academic clubs, planning, administration',
    stress: 'Overthinks and isolates',
    rmsValue: 'Excellence and Respect',
  },
  P: {
    name: 'Phlegmatic',
    nick: 'The Pure Peacemaker',
    traits: ['Calm', 'Steady', 'Loyal', 'Patient'],
    schoolRole: 'Care teams, mentoring, welfare and support',
    stress: 'Withdraws emotionally',
    rmsValue: 'Teamwork and Love',
  },
}
