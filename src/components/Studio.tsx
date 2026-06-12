const principles = [
  {
    n: '/ 01',
    title: 'Built for live',
    body:
      'Our bots run where it counts — inside the official room, in real time, with zero room for a missed score.',
  },
  {
    n: '/ 02',
    title: 'Creators keep the upside',
    body:
      'Your audience and your merch revenue are yours. We build the site and the store — you own them.',
  },
  {
    n: '/ 03',
    title: 'Made in Nepal, built to plug in',
    body:
      "Rooted in Kathmandu's Free Fire scene, engineered to partner with any broadcast production.",
  },
]

export default function Studio() {
  return (
    <section id="principles">
      <div className="wrap">
        <div className="eyebrow">
          <span className="tick" /> How we work
        </div>
        <h2 className="studio-h2">A studio, not a stream.</h2>

        <div className="prin-grid">
          {principles.map((p) => (
            <div className="prin reveal" key={p.n}>
              <div className="pn">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
