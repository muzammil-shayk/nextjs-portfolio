import { ImageResponse } from 'next/og';

export const alt =
  'Muhammad Muzammil, full stack engineer: web, mobile and desktop. Available for work, remote or on-site in Lahore.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Same night ground, paper ink and single lime accent as the site.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#101400',
        color: '#ebeee0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: '#d2ff00',
          }}
        />
        <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.8 }}>
          AVAILABLE FOR WORK · REMOTE OR ON-SITE IN LAHORE
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 34, letterSpacing: 6, opacity: 0.8 }}>
          MUHAMMAD
        </div>
        <div
          style={{
            fontSize: 168,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -4,
          }}
        >
          MUZAMMIL
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            padding: '14px 28px',
            borderRadius: 999,
            background: '#d2ff00',
            color: '#101400',
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          Full Stack Engineer
        </div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>
          Web · Mobile · Desktop · AI
        </div>
      </div>
    </div>,
    size
  );
}
