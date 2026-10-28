import Link from 'next/link';

export const metadata = { title: 'Off the circuit — Muhammad Muzammil' };

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col justify-between bg-night px-4 py-8 text-paper [container-type:inline-size] sm:px-8"
    >
      <p className="label">Error 404</p>
      <div>
        <p className="display text-[34cqw] leading-[0.8]">404</p>
        <h1 className="display mt-6 text-[clamp(1.8rem,5vw,4rem)]">
          This road does not exist
        </h1>
        <Link href="/" className="btn mt-8 bg-lime text-night">
          Back to the start
        </Link>
      </div>
    </main>
  );
}
