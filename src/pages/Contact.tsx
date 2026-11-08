import { profile } from '../data';
import { useMeta } from '../hooks/useMeta';
import { CopyEmail, Reveal } from '../components/ui';
import { SocialIcon } from '../components/SocialIcons';
import { useTimeZone } from '../hooks/useTime';

const FAQ = [
  {
    q: 'What are you looking for?',
    a: 'A full-stack role where I can own features end to end, or short freelance builds (a site, an app, an API) with a clear finish line.',
  },
  {
    q: 'Where are you based?',
    a: `${profile.location}. I work comfortably with teams in EAT, CET and US time zones, and I am set up for remote work.`,
  },
  {
    q: 'How fast do you reply?',
    a: 'Within a day, usually the same evening. For anything time-sensitive, message me on WhatsApp.',
  },
  {
    q: 'Email or WhatsApp?',
    a: `Email (${profile.email}) for briefs, attachments and anything you want in writing. WhatsApp (${profile.phone}) for quick questions and urgent timing.`,
  },
];

export default function Contact() {
  useMeta('Contact', 'Get in touch with Kalungi Isaac, a full-stack developer in Kampala, Uganda, for roles, freelance builds or collaboration.');
  const time = useTimeZone(profile.timezone);

  return (
    <section className="section contact dark-zone contact-page">
      <header className="page-head">
        <div className="section-head">
          <span className="label side">Contact</span>
        </div>
        <h1 className="page-title">
          <Reveal>Let&apos;s make something that works.</Reveal>
        </h1>
        <Reveal delay={0.1}>
          <p className="lead contact-lead">
            A product in mind, a role to fill, or just want to compare notes on Next.js. Email me, or send a WhatsApp if
            it is quicker. I read every message.
          </p>
        </Reveal>
      </header>

      <Reveal>
        <a href={`mailto:${profile.email}`} className="big-mail glass-dark" data-cursor="write">
          <span>{profile.email}</span>
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" aria-hidden>
            <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="contact-actions">
          <CopyEmail email={profile.email} />
          <a
            href={profile.whatsapp}
            className="pill-link pill-dark"
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="open"
          >
            <SocialIcon label="WhatsApp" size={14} />
            WhatsApp {profile.phone}
          </a>
          <span className="label contact-clock">It is {time} in Kampala right now</span>
        </div>
      </Reveal>

      <div className="contact-links">
        {profile.socials.map((s, i) => (
          <Reveal key={s.label} delay={0.08 + i * 0.04}>
            <a
              href={s.href}
              className="glass-dark"
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer noopener"
              data-cursor="open"
            >
              <SocialIcon label={s.label} size={14} />
              {s.label}
            </a>
          </Reveal>
        ))}
      </div>

      <div className="contact-faq">
        {FAQ.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05} className="faq-item">
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
