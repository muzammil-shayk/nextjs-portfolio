'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'motion/react';

const viewport = { once: true, amount: 0.2 };
const ACCESS_KEY = '5e50e80f-e87d-40a9-84a5-8753b0faf380';

const Contact = () => {
  const [status, setStatus] = useState(null); // { ok: boolean, message: string }
  const [sending, setSending] = useState(false);

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

  const fieldClass =
    'w-full p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white text-black placeholder-gray-500 dark:bg-darkHover/30 dark:border-white/90 dark:text-white dark:placeholder-white/60';

  return (
    <section
      id="contact"
      className="w-full px-6 sm:px-[12%] py-10 scroll-mt-24 mt-16 bg-[url('/footer-bg-color.png')] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none"
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5 }}
        className="text-center mt-2 text-lg font-ovo"
      >
        Connect with me
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-4xl sm:text-5xl font-ovo"
      >
        Get in touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        I&apos;d love to hear from you. If you have any questions, comments or
        feedback, please use the form below.
      </motion.p>
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        {/* Honeypot: bots fill it, people never see it. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <div>
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your E-Mail"
              required
              className={fieldClass}
            />
          </div>
        </div>
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows="6"
          placeholder="Enter your message"
          required
          className={`${fieldClass} mb-6`}
        ></textarea>
        <motion.button
          whileHover={{ scale: sending ? 1 : 1.05 }}
          transition={{ duration: 0.3 }}
          type="submit"
          disabled={sending}
          className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover"
        >
          {sending ? 'Sending…' : 'Submit Now'}{' '}
          <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </motion.button>
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-center min-h-8 ${
            status?.ok === false ? 'text-red-600 dark:text-red-400' : ''
          }`}
        >
          {status?.message ?? ''}
        </p>
      </motion.form>
    </section>
  );
};

export default Contact;
