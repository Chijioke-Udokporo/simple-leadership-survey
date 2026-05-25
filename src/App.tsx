import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  combos,
  pureProfiles,
  questions,
  screenQuestions,
  temperamentData,
  type ResultProfile,
  type TemperamentData,
  type TemperamentType,
} from './assessmentData'
import './App.css'

const progress: Record<number, number> = { 0: 0, 1: 20, 2: 45, 3: 65, 4: 85, 5: 100 }
const ratingLabels = ['', 'SD', 'D', 'N', 'A', 'SA']
const storageKey = 'rms-character-assessment'

type AssessmentResult = {
  totals: Record<TemperamentType, number>
  ranked: Array<[TemperamentType, number]>
  primary: TemperamentType
  profile: ResultProfile
  primaryData: TemperamentData
  strengths: string[]
  growth: string[]
}

type StoredAssessment = {
  screen: number
  scores: Array<number | null>
}

function getInitialAssessment(): StoredAssessment {
  const fallback = { screen: 0, scores: Array(questions.length).fill(null) }

  try {
    const stored = sessionStorage.getItem(storageKey)
    if (!stored) return fallback

    const parsed = JSON.parse(stored) as Partial<StoredAssessment>
    const hasValidScreen = typeof parsed.screen === 'number' && parsed.screen >= 0 && parsed.screen <= 5
    const hasValidScores =
      Array.isArray(parsed.scores) &&
      parsed.scores.length === questions.length &&
      parsed.scores.every((score) => score === null || (Number.isInteger(score) && score >= 1 && score <= 5))

    return {
      screen: hasValidScreen ? parsed.screen! : fallback.screen,
      scores: hasValidScores ? parsed.scores! : fallback.scores,
    }
  } catch {
    return fallback
  }
}

function App() {
  const [screen, setScreen] = useState(() => getInitialAssessment().screen)
  const [scores, setScores] = useState<Array<number | null>>(() => getInitialAssessment().scores)
  const [showValidation, setShowValidation] = useState(false)

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify({ screen, scores }))
  }, [screen, scores])

  const result = useMemo(() => {
    const totals: Record<TemperamentType, number> = { S: 0, C: 0, M: 0, P: 0 }

    questions.forEach((question, index) => {
      totals[question.type] += scores[index] ?? 0
    })

    const ranked = (Object.entries(totals) as Array<[TemperamentType, number]>).sort((a, b) => b[1] - a[1])
    const primary = ranked[0][0]
    const secondary = ranked[1][0]
    const profile = combos[primary + secondary] ?? pureProfiles[primary]
    const primaryData = temperamentData[primary]

    return {
      totals,
      ranked,
      primary,
      profile,
      primaryData,
      strengths: profile.strengths ?? primaryData.strengths,
      growth: profile.growth ?? primaryData.growth,
    }
  }, [scores])

  const goTo = (nextScreen: number) => {
    setScreen(nextScreen)
    setShowValidation(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rate = (questionIndex: number, value: number) => {
    setScores((current) => current.map((score, index) => (index === questionIndex ? value : score)))
  }

  const nextScreen = (from: number, to: number) => {
    const unanswered = screenQuestions[from].some((questionIndex) => scores[questionIndex] === null)

    if (unanswered) {
      setShowValidation(true)
      return
    }

    goTo(to)
  }

  const restart = () => {
    setScores(Array(questions.length).fill(null))
    sessionStorage.removeItem(storageKey)
    goTo(0)
  }

  return (
    <main className="app-shell">
      <BackgroundGeometry />

      <header className="church-header" aria-label="Role Model School">
        <img className="school-logo" src="/rms-logo.png" alt="Role Model School" />
        <div className="church-name">Role Model School</div>
        <div className="church-sub">Character & Temperament Assessment</div>
      </header>

      <section className="assessment-card">
        <div className="progress-wrap" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${progress[screen]}%` }} />
        </div>

        {screen === 0 && <IntroScreen onStart={() => goTo(1)} />}

        {screen >= 1 && screen <= 4 && (
          <QuestionScreen
            screen={screen}
            scores={scores}
            showValidation={showValidation}
            onBack={() => goTo(screen - 1)}
            onNext={() => nextScreen(screen, screen + 1)}
            onRate={rate}
          />
        )}

        {screen === 5 && <ResultsScreen result={result} onRestart={restart} />}
      </section>
    </main>
  )
}

type QuestionScreenProps = {
  screen: number
  scores: Array<number | null>
  showValidation: boolean
  onBack: () => void
  onNext: () => void
  onRate: (questionIndex: number, value: number) => void
}

function QuestionScreen({ screen, scores, showValidation, onBack, onNext, onRate }: QuestionScreenProps) {
  const isTaskSection = screen >= 3
  const isFinal = screen === 4
  const questionsForScreen = screenQuestions[screen]

  return (
    <>
      <SectionHeader
        pill={`${isTaskSection ? 'PART B' : 'PART A'} - ${screen % 2 === 1 ? '1' : '2'} of 2`}
        title={isTaskSection ? 'Task Execution &\nWork Style' : 'Social Dynamics &\nInterpersonal Energy'}
        desc={
          screen === 1
            ? 'How you relate to people and show up in groups'
            : screen === 2
              ? 'Continued - rate each statement honestly'
              : screen === 3
                ? 'How you approach work, decisions, and structure'
                : "Final section - you're almost done"
        }
      />

      <div className="questions-body">
        {questionsForScreen.map((questionIndex) => {
          const question = questions[questionIndex]
          const selected = scores[questionIndex]

          return (
            <article className={`question-block ${selected ? 'answered' : ''}`} key={question.id}>
              <div className="q-check" aria-hidden="true">✓</div>
              <div className="q-header">
                <div className="q-num">{question.id}</div>
                <p className="q-text">{question.text}</p>
              </div>
              <div className="rating-row" role="radiogroup" aria-label={`Question ${question.id}`}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    className={`rating-btn ${selected === value ? 'selected' : ''}`}
                    data-val={value}
                    key={value}
                    onClick={() => onRate(questionIndex, value)}
                    type="button"
                    aria-pressed={selected === value}
                  >
                    <span className="r-num">{value}</span>
                    <span className="r-label">{ratingLabels[value]}</span>
                  </button>
                ))}
              </div>
            </article>
          )
        })}
      </div>

      <div className={`validation-msg ${showValidation ? 'show' : ''}`}>
        Please rate all statements before {isFinal ? 'submitting' : 'continuing'}.
      </div>

      <footer className="nav-footer">
        <button className="btn-back" onClick={onBack} type="button">Back</button>
        <button className={`btn-next ${isFinal ? 'btn-submit' : ''}`} onClick={onNext} type="button">
          {isFinal ? 'See My Results' : 'Continue'}
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <SectionHeader
        pill="WELCOME"
        title="Character & Temperament Blend Inventory"
        desc="A self-scoring assessment for leader growth and leadership reflection"
      />
      <div className="intro-body">
        <div className="intro-icon" aria-hidden="true">✦</div>
        <h1 className="intro-title">Discover How<br />You Lead & Learn</h1>
        <p className="intro-sub">
          This assessment helps leaders understand their natural personality tendencies, how they relate to others,
          and how they can grow as future-ready Role Models.
        </p>

        <div className="steps-list">
          {[
            ['Read each statement honestly.', 'Think about your natural tendencies - not who you want to be, but who you actually are.'],
            ['Rate each statement from 1 to 5.', 'There are no right or wrong answers.'],
            ['See your results instantly.', 'Your unique temperament blend will be revealed at the end.'],
          ].map(([title, body], index) => (
            <div className="step-item" key={title}>
              <div className="step-num">{index + 1}</div>
              <p className="step-text"><strong>{title}</strong> {body}</p>
            </div>
          ))}
        </div>

        <div className="scale-preview">
          <div className="scale-preview-label">Rating Scale</div>
          <div className="scale-dots">
            {[
              ['1', 'Strongly Disagree', '#dc2626'],
              ['2', 'Disagree', '#ea580c'],
              ['3', 'Neutral / Sometimes', '#d97706'],
              ['4', 'Agree', '#16a34a'],
              ['5', 'Strongly Agree', '#0891b2'],
            ].map(([value, label, color]) => (
              <div className="scale-dot" key={value}>
                <div className="scale-dot-num" style={{ background: color }}>{value}</div>
                <div className="scale-dot-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-start" onClick={onStart} type="button">
          Begin Assessment <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}

function ResultsScreen({ result, onRestart }: { result: AssessmentResult; onRestart: () => void }) {
  const maxPossible = 20
  const pct = (type: TemperamentType) => Math.round((result.totals[type] / maxPossible) * 100)

  return (
    <div className="results-wrap">
      <div className="results-hero">
        <div className="result-badge">Your Results Are In</div>
        <h1 className="result-blend-name">{result.profile.name}</h1>
        <div className="result-blend-nick">"{result.profile.nick}"</div>
      </div>

      <div className="scores-grid">
        {result.ranked.map(([type, score], index) => {
          const temperament = temperamentData[type]

          return (
            <article className="score-card" key={type}>
              <div className="score-card-top" style={{ background: temperament.color }}>
                <div>
                  <div className="score-card-name">{temperament.name}</div>
                  <div className="score-card-nick">{temperament.nick}</div>
                </div>
              </div>
              <div className="score-bar-wrap" style={{ background: `${temperament.color}33` }}>
                <div className="score-bar-fill" style={{ width: `${pct(type)}%`, background: temperament.color }} />
              </div>
              <div className="score-card-bottom">
                <div>
                  <div className="score-num" style={{ color: temperament.color }}>{score}</div>
                  <div className="score-label">out of 20</div>
                </div>
                <div className={index === 0 ? 'primary-crown' : 'secondary-tag'}>
                  {index === 0 ? 'Primary' : index === 1 ? 'Secondary' : index === 2 ? 'Tertiary' : 'Fourth'}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <ResultSection title="Your Temperament Blend">
        <div className="blend-card">
          <div className="blend-card-top">{result.profile.name}</div>
          <div className="blend-card-nick">"{result.profile.nick}"</div>
          <div className="blend-traits">
            {result.profile.traits.map((trait) => <span className="trait-chip" key={trait}>{trait}</span>)}
          </div>
          <div className="blend-grid">
            <div>
              <div className="blend-grid-label">School Role</div>
              <div className="blend-grid-val">{result.profile.schoolRole}</div>
            </div>
            <div>
              <div className="blend-grid-label">Under Stress</div>
              <div className="blend-grid-val">{result.profile.stress}</div>
            </div>
          </div>
        </div>
      </ResultSection>

      <ResultSection title="Strengths & Growth">
        <div className="two-col">
          <ListCard title="Strengths" color="var(--green)" items={result.strengths} />
          <ListCard title="Growth Areas" color="var(--red)" items={result.growth} />
        </div>
      </ResultSection>

      <ResultSection title="Stress & Communication">
        <div className="stress-card">
          <div className="stress-icon">!</div>
          <div>
            <div className="stress-title">Under Stress</div>
            <div className="stress-desc">{result.profile.stress}. Recognising this is the first step to growing through it.</div>
          </div>
        </div>
        <div className="church-card">
          <div className="church-role-icon">"</div>
          <div>
            <div className="church-role-title">Communication Style</div>
            <div className="church-role-desc">{result.primaryData.comm} - this is how you naturally express and process ideas.</div>
          </div>
        </div>
      </ResultSection>

      <ResultSection title="RMS Value Connection">
        <div className="biblical-card">
          <div className="biblical-icon">TERRIL</div>
          <div>
            <div className="biblical-name">{result.profile.rmsValue}</div>
            <div className="biblical-label">Your Role Model value connection</div>
          </div>
        </div>
      </ResultSection>

      <ResultSection title="A Word For You">
        <div className="scripture-block">
          <div className="scripture-text">"Raising godly leaders who positively influence their world."</div>
          <div className="scripture-ref">Role Model School</div>
        </div>
      </ResultSection>

      <div className="teaching-point">
        <p className="teaching-text">
          Your temperament explains your <span className="teaching-highlight">tendencies</span>, not your{' '}
          <span className="teaching-highlight">destiny</span>.<br />
          Character is built through discipline, wisdom, and consistent growth.<br /><br />
          <span className="gold-line">A true Role Model grows in Teamwork, Excellence, Respect, Responsibility, Innovation, and Love.</span>
        </p>
      </div>

      <button className="restart-btn" onClick={onRestart} type="button">Take Assessment Again</button>
    </div>
  )
}

function ResultSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="result-section">
      <div className="result-section-title">{title}</div>
      {children}
    </section>
  )
}

function ListCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="result-list-card">
      <div className="rlc-title" style={{ color }}>{title}</div>
      {items.map((item) => (
        <div className="rlc-item" key={item}>
          <span className="rlc-dot" style={{ background: color }} />
          {item}
        </div>
      ))}
    </div>
  )
}

function SectionHeader({ pill, title, desc }: { pill: string; title: string; desc: string }) {
  return (
    <div className="section-header">
      <div className="step-pill">{pill}</div>
      <h2 className="section-title">{title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
      <p className="section-desc">{desc}</p>
    </div>
  )
}

function BackgroundGeometry() {
  return (
    <div className="bg-geo" aria-hidden="true">
      <svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g1" cx="80%" cy="20%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="20%" cy="80%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="800" fill="url(#g1)" />
        <rect width="400" height="800" fill="url(#g2)" />
        <polygon points="350,0 400,0 400,120" fill="rgba(124,58,237,0.15)" />
        <polygon points="0,700 80,800 0,800" fill="rgba(245,158,11,0.1)" />
        <polygon points="380,400 400,350 400,450" fill="rgba(168,85,247,0.1)" />
        <line x1="0" y1="200" x2="400" y2="150" stroke="rgba(168,85,247,0.08)" strokeWidth="1" />
        <line x1="0" y1="400" x2="400" y2="320" stroke="rgba(245,158,11,0.06)" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default App
