'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Network,
  Target,
  Compass,
  FileText,
  ChevronRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    title: 'Reformular el problema',
    subtitle: 'Contexto y exploración',
    text: 'Miramos el reto con otros ojos para entender qué lo está reproduciendo y dónde se abre una oportunidad real.',
    icon: Compass,
  },
  {
    title: 'Dar sentido',
    subtitle: 'Estrategia y propuesta de valor',
    text: 'Traducimos complejidad en una dirección clara, una narrativa útil y líneas de acción con criterio.',
    icon: Sparkles,
  },
  {
    title: 'Hacer',
    subtitle: 'Conceptualización y diseño',
    text: 'Aterrizamos la dirección en un brief, un portafolio inicial de intervenciones y una primera vía de acción.',
    icon: Target,
  },
  {
    title: 'Crear impacto',
    subtitle: 'Prototipado y desarrollo',
    text: 'Definimos qué poner en marcha primero, qué aprender y qué señales indicarían que el cambio empieza a ser real.',
    icon: Network,
  },
];

const benefits = [
  'Aclara qué problema merece ser resuelto de verdad.',
  'Distingue síntoma, sistema, tensiones y actores.',
  'Convierte ambigüedad en dirección con impacto.',
  'Te deja un brief útil para conversar, decidir y actuar.',
];

const previewSections = [
  'The Challenge',
  'What makes this systemic',
  'Actors and relationships',
  'Opportunity areas',
  'First action',
];

const inputClassName =
  'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#f5efe6] outline-none transition placeholder:text-[#f5efe6]/35 focus:border-[#ffd98e]/50 focus:ring-2 focus:ring-[#ffd98e]/15';

const emptyBrief = {
  title: 'Un brief claro para empezar',
  challenge: '',
  context: '',
  desiredOutcome: '',
  firstRead: '',
  firstAction: '',
};

export default function DotSystemicImpactLanding() {
  const [form, setForm] = useState({
    challenge: '',
    context: 'organización',
    goal: '',
    email: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [brief, setBrief] = useState(emptyBrief);

  const previewTitle = useMemo(() => {
    if (!form.challenge.trim()) return 'Un brief claro para empezar';
    return form.challenge.trim().slice(0, 60) + (form.challenge.trim().length > 60 ? '…' : '');
  }, [form.challenge]);

  const isLoading = status === 'loading';
  const hasResult = status === 'success';

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setError('');
      setAssistantMessage('');
      setBrief(emptyBrief);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    setAssistantMessage('');

    try {
      const response = await fetch('/api/systemic-impact-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'No hemos podido generar el brief ahora mismo.');
      }

      setBrief({
        title: data?.brief?.title || previewTitle,
        challenge: data?.brief?.challenge || form.challenge,
        context: data?.brief?.context || `Este reto se sitúa principalmente en el ámbito de ${form.context}.`,
        desiredOutcome:
          data?.brief?.desiredOutcome ||
          form.goal ||
          'Aclarar una primera dirección estratégica y detectar por dónde merece empezar el cambio.',
        firstRead:
          data?.brief?.firstRead ||
          'Lo que asoma aquí no parece solo un problema de ejecución. Merece una lectura más estructural para distinguir síntoma, sistema y oportunidad de acción.',
        firstAction:
          data?.brief?.firstAction ||
          'Diseñar un primer piloto o iniciativa con alcance acotado, decisiones trazables y capacidad real de priorización compartida.',
      });
      setAssistantMessage(data?.assistantMessage || 'Ya tienes una base para seguir con una conversación guiada.');
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error inesperado.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0d14] text-[#f5efe6]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#6b7cff]/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[16rem] h-[30rem] w-[30rem] rounded-full bg-[#ff9d6c]/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[25%] h-[22rem] w-[22rem] rounded-full bg-[#ffd98e]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#f5efe6]" />
            <span className="text-2xl font-semibold tracking-tight">dot.</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[#f5efe6]/70 md:flex">
            <a href="#formulario" className="transition hover:text-white">Empezar</a>
            <a href="#como-funciona" className="transition hover:text-white">Cómo funciona</a>
            <a href="#preview" className="transition hover:text-white">Preview</a>
          </nav>
          <Button asChild className="rounded-full bg-[#f5efe6] px-5 text-[#10131d] hover:bg-white">
            <a href="#formulario">Probar prototipo</a>
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-14 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-20 lg:pt-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#f5efe6]/80"
            >
              <Sparkles className="h-4 w-4 text-[#ffd98e]" />
              dot. Systemic Impact Brief Builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-6xl xl:text-7xl"
            >
              De reto complejo a dirección con impacto.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-[#f5efe6]/72 md:text-xl"
            >
              Una experiencia guiada para reformular el problema, entender el sistema, detectar oportunidades y aterrizar una primera vía de acción con criterio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="rounded-full bg-[#f5efe6] px-7 text-base text-[#10131d] hover:bg-white">
                <a href="#formulario">
                  Empezar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 px-7 text-base text-[#f5efe6] hover:bg-white/10 hover:text-white">
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-12 grid gap-3 sm:grid-cols-2"
            >
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ffd98e]" />
                  <p className="text-sm leading-6 text-[#f5efe6]/78">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            id="formulario"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative scroll-mt-28"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 blur-2xl" />
            <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-[#111623]/85 shadow-2xl backdrop-blur">
              <CardContent className="p-0">
                <div className="border-b border-white/10 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#f5efe6]/55">Empieza aquí</p>
                      <p className="mt-1 text-lg font-medium">Cuéntanos tu reto</p>
                    </div>
                    <div className="rounded-full border border-[#ffd98e]/30 bg-[#ffd98e]/10 px-3 py-1 text-xs text-[#ffd98e]">
                      2 min
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 md:grid-cols-[1.02fr_0.98fr]">
                  <form onSubmit={handleSubmit} className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-sm text-[#f5efe6]/72">¿Qué reto quieres abordar?</label>
                        <textarea
                          rows={5}
                          value={form.challenge}
                          onChange={(e) => handleChange('challenge', e.target.value)}
                          className={`${inputClassName} min-h-[140px] resize-none`}
                          placeholder="Describe el reto con tus palabras. Qué está pasando, a quién afecta o por qué te importa ahora."
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-[#f5efe6]/72">¿Dónde se sitúa este reto?</label>
                        <select
                          value={form.context}
                          onChange={(e) => handleChange('context', e.target.value)}
                          className={inputClassName}
                        >
                          <option className="bg-[#10131d]" value="organización">Organización</option>
                          <option className="bg-[#10131d]" value="territorio">Territorio</option>
                          <option className="bg-[#10131d]" value="proyecto">Proyecto</option>
                          <option className="bg-[#10131d]" value="política pública">Política pública</option>
                          <option className="bg-[#10131d]" value="causa o movimiento">Causa o movimiento</option>
                          <option className="bg-[#10131d]" value="otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-[#f5efe6]/72">¿Qué te gustaría obtener?</label>
                        <input
                          value={form.goal}
                          onChange={(e) => handleChange('goal', e.target.value)}
                          className={inputClassName}
                          placeholder="Por ejemplo: una dirección más clara, un primer piloto o una forma mejor de explicar el reto."
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-[#f5efe6]/72">Email <span className="text-[#f5efe6]/35">(opcional)</span></label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={inputClassName}
                          placeholder="nombre@organizacion.com"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-5 text-[#f5efe6]/45">
                        Este prototipo puede servir como punto de partida para una conversación, un brief o una exploración más profunda.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="rounded-full bg-[#f5efe6] px-6 text-[#10131d] hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generando…
                          </>
                        ) : (
                          <>
                            Generar primer brief
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  <div className="p-5">
                    <div className="mb-5 flex items-center gap-2 text-sm text-[#f5efe6]/55">
                      <FileText className="h-4 w-4" />
                      Vista previa en vivo
                    </div>

                    {status === 'idle' && (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.03] p-4 text-sm leading-6 text-[#f5efe6]/62">
                          Completa el formulario y genera un primer punto de partida. Aquí aparecerá una previsualización del brief.
                        </div>

                        <div className="space-y-3">
                          {previewSections.map((section, index) => (
                            <div key={section} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                              <div className="mb-2 flex items-center gap-2 text-sm text-[#f5efe6]">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-xs text-[#f5efe6]/70">
                                  {index + 1}
                                </span>
                                {section}
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 rounded-full bg-white/10" />
                                <div className="h-2 w-11/12 rounded-full bg-white/10" />
                                <div className="h-2 w-8/12 rounded-full bg-white/10" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {status === 'loading' && (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-[#ffd98e]/20 bg-[#ffd98e]/10 p-4 text-sm leading-6 text-[#f5efe6]/76">
                          Estamos generando una primera lectura del reto. Esto puede tardar unos segundos.
                        </div>
                        <div className="space-y-3">
                          {previewSections.map((section, index) => (
                            <div key={section} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 animate-pulse">
                              <div className="mb-2 flex items-center gap-2 text-sm text-[#f5efe6]">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-xs text-[#f5efe6]/70">
                                  {index + 1}
                                </span>
                                {section}
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 rounded-full bg-white/10" />
                                <div className="h-2 w-10/12 rounded-full bg-white/10" />
                                <div className="h-2 w-7/12 rounded-full bg-white/10" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 text-red-300" />
                            <div>
                              <p className="text-sm font-medium text-[#f5efe6]">No hemos podido generar el brief</p>
                              <p className="mt-1 text-sm leading-6 text-[#f5efe6]/68">{error}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {hasResult && (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-[#ffd98e]/25 bg-[#ffd98e]/10 p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#ffd98e]" />
                            <div>
                              <p className="text-sm font-medium text-[#f5efe6]">Primer brief generado con OpenAI</p>
                              <p className="mt-1 text-sm leading-6 text-[#f5efe6]/68">
                                {assistantMessage || 'Ya tienes una base para seguir con una conversación guiada.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">Challenge</div>
                          <p className="text-sm leading-6 text-[#f5efe6]/76">{brief.challenge}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">Context</div>
                          <p className="text-sm leading-6 text-[#f5efe6]/76">{brief.context}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">Desired outcome</div>
                          <p className="text-sm leading-6 text-[#f5efe6]/76">{brief.desiredOutcome}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">First read</div>
                          <p className="text-sm leading-6 text-[#f5efe6]/76">{brief.firstRead}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">First action</div>
                          <p className="text-sm leading-6 text-[#f5efe6]/76">{brief.firstAction}</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                          <Button className="rounded-full bg-[#f5efe6] text-[#10131d] hover:bg-white">
                            Continuar experiencia
                          </Button>
                          <Button variant="outline" className="rounded-full border-white/15 bg-white/5 text-[#f5efe6] hover:bg-white/10 hover:text-white">
                            Enviar por email
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[#ffd98e]">Cómo funciona</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Una metodología pensada para pasar de la complejidad a la acción.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#f5efe6]/68 md:text-lg">
              No empieza proponiendo soluciones. Empieza entendiendo qué tipo de problema tienes delante y qué dirección merece abrirse.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <Card className="h-full rounded-[1.75rem] border-white/10 bg-white/[0.04] backdrop-blur">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5efe6] text-[#10131d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mb-4 text-sm text-[#ffd98e]">0{index + 1}. {step.subtitle}</div>
                      <h3 className="text-xl font-medium tracking-tight">{step.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#f5efe6]/70">{step.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="preview" className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#ffd98e]">Lo que te llevas</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Un brief claro para conversar, decidir y empezar.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#f5efe6]/70 md:text-lg">
              La experiencia traduce la conversación en un artefacto útil: reto, condiciones del sistema, actores, oportunidades, palancas y primer movimiento.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Diagnóstico estructurado del reto, no solo del síntoma.',
                'Mapa inicial de actores, tensiones y oportunidades.',
                'Dirección estratégica con trade-offs explícitos.',
                'Una primera acción de 30–90 días para empezar con criterio.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                  <ChevronRight className="mt-0.5 h-4 w-4 text-[#ffd98e]" />
                  <p className="text-sm leading-6 text-[#f5efe6]/76">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="rounded-[2rem] border-white/10 bg-white/[0.04]">
            <CardContent className="p-6 md:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#f5efe6]/55">Ejemplo de salida</p>
                  <h3 className="mt-1 text-2xl font-medium tracking-tight">Participation beyond the ritual</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#f5efe6]/65">
                  7 min aprox.
                </div>
              </div>

              <div className="space-y-5 text-sm leading-7 text-[#f5efe6]/76">
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">The challenge</div>
                  <p>Muchas organizaciones quieren trabajar con jóvenes, pero diseñan procesos y decisiones sin darles agencia real.</p>
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">What makes this systemic</div>
                  <p>El problema no es de intención, sino de tiempos, incentivos, riesgo, diseño institucional y rendición de cuentas.</p>
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">Direction</div>
                  <p>La prioridad no debería ser añadir más actividades participativas, sino mover el punto de entrada de la juventud al momento en que aún se decide qué importa.</p>
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#ffd98e]">First action</div>
                  <p>Diseñar un primer piloto o iniciativa con alcance acotado, decisiones trazables y capacidad real de priorización compartida.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-2 lg:px-10 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] px-6 py-10 md:px-10 md:py-12">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,217,142,0.18),transparent_55%)]" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.22em] text-[#ffd98e]">Siguiente paso</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Si esto abre algo, podemos convertirlo en proyecto real.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#f5efe6]/70 md:text-lg">
                El prototipo sirve para empezar. Luego puede convertirse en una experiencia conversacional conectada a OpenAI o en una puerta de entrada a un trabajo más profundo con dot.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-[#f5efe6] px-7 text-[#10131d] hover:bg-white">
                  <a href="#formulario">Volver al formulario</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 px-7 text-[#f5efe6] hover:bg-white/10 hover:text-white">
                  Hablar con dot
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
