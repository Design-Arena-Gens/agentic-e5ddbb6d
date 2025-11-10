import { Shield } from 'lucide-react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
}

export default function Logo({ size = 'medium' }: LogoProps) {
  const sizes = {
    small: { icon: 20, text: '16px', subtext: '11px' },
    medium: { icon: 28, text: '20px', subtext: '13px' },
    large: { icon: 36, text: '24px', subtext: '14px' }
  }

  const currentSize = sizes[size]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        borderRadius: '12px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)'
      }}>
        <Shield size={currentSize.icon} color="white" strokeWidth={2.5} />
      </div>
      <div>
        <div style={{
          fontSize: currentSize.text,
          fontWeight: '700',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2
        }}>
          InsureHub Pro
        </div>
        <div style={{
          fontSize: currentSize.subtext,
          color: 'var(--text-light)',
          fontWeight: '500'
        }}>
          Insurance Broking Platform
        </div>
      </div>
    </div>
  )
}
