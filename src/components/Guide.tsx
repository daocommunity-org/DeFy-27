import { LINKS } from '../config/links'
import { CRITERIA, EVENT, QUESTIONS, RULES } from '../data/event'
import { Link } from '../lib/router'
import { Icon } from './Icon'
import { Frame, RegisterButton, SectionHead } from './ui'

// "What do I do?": the steps, the Round 1 questions and the rules in one
// place. No reveal animation here: people deep-link to it looking for answers.

export function Guide() {
  return (
    <Frame id="guide" className="guide">
      <SectionHead
        n="02"
        eyebrow="How it works"
        title="What you need to do"
        sub="There are two rounds. Round 1 is online and has already started. Teams that qualify are invited to Round 2, the final round, in person at VIT Chennai."
      />

      <div className="guide__top">
        <div className="guide__do">
          <h3 className="guide__h">Round 1, online now</h3>
          <ol className="guide__steps">
            <li>Form a team of 4–6 and get every member registered on Unstop.</li>
            <li>
              Pick <Link to="/#tracks">one of the three tracks</Link> and a real problem within it.
            </li>
            <li>Work out your Web3 solution and the business behind it.</li>
            <li>
              Answer the questions on Unstop and submit by <strong>{EVENT.submissionsCloseLabel}</strong>.
            </li>
          </ol>

          <h3 className="guide__h">Round 2, in person</h3>
          <p className="guide__next">
            The top {EVENT.shortlisted} teams are notified, confirm by RSVP, and build the idea they submitted over 24 hours at {EVENT.city} on {EVENT.dates}.
          </p>
          <RegisterButton />
        </div>

        <div className="qsheet" id="questions">
          <div className="qsheet__head">
            <h3 className="guide__h">Your Round 1 submission</h3>
            <p>Cover all five. Draft them with your team before you fill in the form.</p>
          </div>
          <ol className="qsheet__list">
            {QUESTIONS.map(({ q, help }) => (
              <li key={q}>
                <p className="qsheet__q">{q}</p>
                <p className="qsheet__help">{help}</p>
              </li>
            ))}
          </ol>
          <p className="qsheet__judged">
            <span>Judged on</span> {CRITERIA.join(', ')}.
          </p>
        </div>
      </div>

      <div className="rules" id="rules">
        <h3 className="guide__h">The rules</h3>
        <dl>
          {RULES.map(({ k, v }) => (
            <div key={k} className="rules__row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="guide__ask">
        <p>Still have a question?</p>
        <Link to="/#faq" className="textlink">
          Read the FAQ <Icon name="right" />
        </Link>
        {LINKS.whatsappCommunity && (
          <a className="textlink" href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer">
            Ask on WhatsApp <Icon name="arrow" />
          </a>
        )}
      </div>
    </Frame>
  )
}
