const capabilities = [
  {
    ref: '/ 01',
    title: 'Tournament automation',
    body: 'Bots that handle the official room end to end — lobby setup, slotting, live scoring, and results — nothing run by hand.',
  },
  {
    ref: '/ 02',
    title: 'Broadcast partnerships',
    body: 'We plug into broadcast production crews, feeding them clean, real-time data and overlays straight from the room.',
  },
  {
    ref: '/ 03',
    title: 'Creator websites',
    body: 'Custom-built sites for creators to showcase their content, grow an audience, and own their corner of the internet.',
  },
  {
    ref: '/ 04',
    title: 'Merch storefronts',
    body: 'A built-in store on every creator site — drop products, take orders, and keep the revenue.',
  },
]

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">
            <span className="tick" /> What we forge
          </div>
          <h2 className="fx-head">Two things, done properly.</h2>
          <p>
            We build the automation that keeps official esports rooms running for the productions
            that broadcast them, and the websites that let creators sell their merch.
          </p>
        </div>

        <div className="manifest reveal">
          {capabilities.map((c) => (
            <div className="cap" key={c.ref}>
              <span className="ref">{c.ref}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
