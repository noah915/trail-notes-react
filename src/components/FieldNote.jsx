import { ArrowUpRight, Compass } from 'lucide-react'

function FieldNote() {
  return (
    <aside className="field-note" id="field-note" aria-label="Field note">
      <div className="field-note-mark"><Compass size={22} aria-hidden="true" /></div>
      <p className="field-note-label">A SMALL REMINDER</p>
      <p className="field-note-copy">
        Leave the trail better than you found it. Take only photos, pack out what you pack in, and give wildlife room.
      </p>
      <a href="https://lnt.org/why/7-principles/" target="_blank" rel="noreferrer">
        The seven principles <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </aside>
  )
}

export default FieldNote
