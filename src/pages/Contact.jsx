import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const contactItems = [
  { Icon: Mail,   label: 'Email Us',   text: 'support@shopzone.com' },
  { Icon: Phone,  label: 'Call Us',    text: '+1 (555) 123-4567' },
  { Icon: MapPin, label: 'Visit Us',   text: '123 Commerce St, Tech City, CA' },
  { Icon: Clock,  label: 'Hours',      text: 'Mon–Fri, 9am–6pm PST' },
];

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.", {
      style: { background: '#0f172a', color: '#fff', borderRadius: '4px', fontSize: '0.875rem' },
    });
    e.target.reset();
  };

  return (
    <div style={{ color: 'var(--text-main)' }}>

      {/* ── Header ── */}
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-base)', padding: '5rem 2rem', textAlign: 'center' }}>
        <div className="main-content">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ marginBottom: '0.75rem' }}>Get in touch</h1>
            <p style={{ fontSize: '1.0625rem', maxWidth: 480, margin: '0 auto' }}>
              Have a question or just want to say hello? We reply to every message within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="main-content" style={{ padding: '5rem 2rem' }}>
        <div className="contact-main-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left: Contact info */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem' }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {contactItems.map(({ Icon, label, text }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-base)' }}>
                    <Icon size={18} strokeWidth={1.75} color="var(--text-muted)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-subtle)', margin: '0 0 0.2rem' }}>{label}</p>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-main)', fontWeight: 500, margin: 0 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem' }}>Send a message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="contact-names-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup label="First Name">
                  <input className="input-base" type="text" placeholder="John" required />
                </FormGroup>
                <FormGroup label="Last Name">
                  <input className="input-base" type="text" placeholder="Doe" required />
                </FormGroup>
              </div>
              <FormGroup label="Email Address">
                <input className="input-base" type="email" placeholder="john@example.com" required />
              </FormGroup>
              <FormGroup label="Subject">
                <input className="input-base" type="text" placeholder="How can we help?" required />
              </FormGroup>
              <FormGroup label="Message">
                <textarea
                  className="input-base"
                  rows={5}
                  placeholder="Tell us more details…"
                  required
                  style={{ resize: 'vertical', lineHeight: 1.6 }}
                />
              </FormGroup>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', fontSize: '0.9375rem' }}>
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</label>
      {children}
    </div>
  );
}
