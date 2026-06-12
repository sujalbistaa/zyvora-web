import { Arrow } from './Icons'

const log = [
  'Official room created',
  '48 squads slotted',
  'Match 3 scores captured',
  'Standings pushed to overlay',
]

const steps = [
  'A broadcast production brings the event — we bring the bots.',
  'Our bots run the official room: lobby, slotting, live scoring, results.',
  'Clean data and overlays flow straight to the live broadcast, in real time.',
]

export default function Automation() {
  return (
    <section id="automation">
      <div className="wrap tour-grid">
        <div className="bracket reveal" aria-label="Sample room automation log">
          {log.map((line) => (
            <div className="match win" key={line}>
              <span>{line}</span>
              <span className="score">OK</span>
            </div>
          ))}
          <div className="match">
            <span>Feeding broadcast &middot; Match 4</span>
            <span className="live">&#9679; LIVE</span>
          </div>
        </div>

        <div className="tour-copy reveal">
          <div className="eyebrow eyebrow-flex">
            <span className="tick-molten" /> Inside the room
          </div>
          <h2 className="fx-head">We don&rsquo;t host. We automate.</h2>
          <ul>
            {steps.map((s, i) => (
              <li key={i}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span> {s}
              </li>
            ))}
          </ul>
          <a className="btn btn-molten" href="#join">
            Partner with us
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
