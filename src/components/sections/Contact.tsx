import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import SectionHeader from '@/components/ui/SectionHeader';
import emailjs from '@emailjs/browser';
import.meta.env
type FormState = { name: string; email: string; subject: string; message: string };
type Status = 'idle' | 'sending' | 'success';

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const forms = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    
const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
  
 if(forms.current){
    emailjs
      .sendForm(
       serviceId,     
        templateId,    // replace
        forms.current,
        publicKey
            )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send message");
        }
      );
    }

  

    await new Promise((r) => setTimeout(r, 1400));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    }, 4000);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-slate-600 text-sm transition-all duration-200 outline-none focus:ring-1 focus:ring-indigo-500/60 ${
      touched[field] && !form[field]
        ? 'border-red-500/40 focus:border-red-500/60'
        : 'border-white/[0.08] focus:border-indigo-500/50'
    }`;

  const contactLinks = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: 'text-indigo-400' },
    { icon: Github, label: 'GitHub', value: 'dasireddynarendarreddy', href: personalInfo.github, color: 'text-slate-300' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin, color: 'text-cyan-400' },
    { icon: MapPin, label: 'Location', value: 'India · Open to Remote', href: null, color: 'text-emerald-400' },
  ];

  return (
    <section id="contact" className="section py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to chat? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl border border-white/[0.06] p-6 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Open to Opportunities</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm actively looking for full-time roles and interesting freelance projects. Response time: within 24 hours.
              </p>
            </div>

            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-5 py-4 glass glass-hover rounded-xl border border-white/[0.06] group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{link.label}</div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{link.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-5 py-4 glass rounded-xl border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <link.icon className={`w-4 h-4 ${link.color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{link.label}</div>
                      <div className="text-sm text-slate-300 font-medium">{link.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl border border-white/[0.06] p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form ref={forms} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1.5">Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your name"
                        required
                        disabled={status === 'sending'}
                        className={inputClass('name')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1.5">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="your@email.com"
                        required
                        disabled={status === 'sending'}
                        className={inputClass('email')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Subject *</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project inquiry, job opportunity..."
                      required
                      disabled={status === 'sending'}
                      className={inputClass('subject')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      disabled={status === 'sending'}
                      rows={5}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
