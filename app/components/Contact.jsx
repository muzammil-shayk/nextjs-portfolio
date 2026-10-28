'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { motionOk, revealLines } from '../lib/reveal';

const ACCESS_KEY = '5e50e80f-e87d-40a9-84a5-8753b0faf380';

const fieldClass =
  'w-full border-0 border-b border-night/40 bg-transparent py-3 text-lg text-night placeholder:text-night/55 focus:border-night focus:outline-none focus-visible:outline-none';

const Contact = () => {
  const root = useRef(null);
  const [status, setStatus] = useState(null); // { ok: boolean, message: string }
  const [sending, setSending] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => revealLines('.contact-title'));
    },
    { scope: root }
  );

  const onSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    setSending(true);
    setStatus(null);

    const formData = new FormData(form);
    formData.append('access_key', ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus({ ok: true, message: 'Thanks! Your message was sent.' });
        form.reset();
      } else {
        setStatus({
          ok: false,
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus({
        ok: false,
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative z-10 rounded-t-[2.5rem] bg-lime px-4 pt-20 pb-24 text-night sm:px-8 sm:pt-28 lg:pb-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label">Connect with me</p>
          <h2 className="contact-title display mt-5 text-[clamp(2.6rem,5.6vw,5.5rem)]">
            Let&apos;s build something
          </h2>
          <p className="mt-8 max-w-md text-lg">
            I&apos;d love to hear from you. If you have any questions, comments
            or feedback, use the form.
          </p>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-6 lg:pt-14">
          {/* Honeypot: bots fill it, people never see it. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="label">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                required
                className={fieldClass}
              />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="message" className="label">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me about the project"
              required
              className={`${fieldClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            data-cursor="Send"
            data-magnetic
            className="btn mt-10 bg-night !text-paper hover:!text-night disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? 'Sending…' : 'Send message'}
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 min-h-8 font-medium ${
              status?.ok === false ? 'text-red-800' : ''
            }`}
          >
            {status?.message ?? ''}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
