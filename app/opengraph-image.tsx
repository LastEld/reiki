import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reiki Healing - Find Balance and Inner Peace'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          backgroundImage:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Reiki Healing
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#d4a574',
              textAlign: 'center',
            }}
          >
            Find Balance and Inner Peace
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#a0a0b0',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            Professional Energy Healing Sessions
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
