'use client';

import { Sparkles, Calendar, Users, Zap, FileText, Mail, TrendingDown, Clock, Target, ArrowRight, CheckCircle2, Briefcase, BarChart3, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">HireAI</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#product" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Product
            </Link>
            <Link href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Features
            </Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Solutions
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Hiring Platform
          </div>

          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white lg:text-6xl">
            AI-Powered Hiring Automation for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Modern Enterprises
            </span>
          </h1>

          <p className="mb-8 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
            Automate interviews, shortlist faster, and reduce hiring costs using AI. Reduce time-to-hire by 70% and improve quality of hires.
          </p>

          {/* <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/40">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-2 px-8 text-base font-semibold">
              Request Demo
            </Button>
          </div> */}
        </section>

        {/* Product Section */}
        <section id="product" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Complete Hiring Lifecycle in One Platform
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                HireAI streamlines your entire recruitment process from candidate sourcing to onboarding. Replace manual workflows with intelligent automation.
              </p>
              <ul className="space-y-4">
                {['Schedule interviews in seconds', 'Auto-screen 1000+ candidates', 'Generate AI-powered insights', 'Automated email campaigns'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Product Dashboard Preview</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white dark:bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Everything you need to hire smarter and faster
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Calendar className="h-6 w-6" />}
                title="Smart Scheduling"
                description="AI-driven interview scheduling that finds optimal times for all participants"
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Automated Screening"
                description="Pre-screen candidates automatically with intelligent questionnaires"
                gradient="from-purple-500 to-pink-500"
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6" />}
                title="AI Shortlisting"
                description="Let AI match candidates to your job requirements instantly"
                gradient="from-teal-500 to-emerald-500"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Live Interviews"
                description="Conduct real-time video interviews with AI note-taking"
                gradient="from-orange-500 to-red-500"
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6" />}
                title="AI Reports"
                description="Auto-generate detailed candidate assessment reports"
                gradient="from-indigo-500 to-purple-500"
              />
              <FeatureCard
                icon={<Mail className="h-6 w-6" />}
                title="Auto Notifications"
                description="Keep everyone updated with automated email campaigns"
                gradient="from-cyan-500 to-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Built for Every Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Tailored solutions for your organization size
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <SolutionCard
              title="Startups"
              description="Scale your team without hiring extra HR staff"
              features={['5 active jobs', 'Up to 500 candidates', 'Basic reports', 'Email support']}
              icon={<Users className="h-8 w-8" />}
            />
            <SolutionCard
              title="Mid-Market"
              description="Streamline hiring across multiple departments"
              features={['Unlimited jobs', 'Unlimited candidates', 'Advanced analytics', 'Priority support']}
              icon={<BarChart3 className="h-8 w-8" />}
              highlighted
            />
            <SolutionCard
              title="Enterprise"
              description="Custom workflows for large-scale recruitment"
              features={['Custom integrations', 'Dedicated account manager', 'API access', '24/7 support']}
              icon={<Briefcase className="h-8 w-8" />}
            />
          </div>
        </section>

        {/* Pricing Section */}
        {/* <section id="pricing" className="bg-white dark:bg-slate-900/50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Choose the perfect plan for your hiring needs
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <PricingCard
                name="Starter"
                price="$299"
                description="Perfect for small teams"
                features={['Up to 10 jobs', '500 candidates/month', 'Basic scheduling', 'Email support']}
              />
              <PricingCard
                name="Professional"
                price="$799"
                description="For growing companies"
                features={['Unlimited jobs', '5000 candidates/month', 'AI screening', 'Advanced reports', 'Priority support']}
                highlighted
              />
              <PricingCard
                name="Enterprise"
                price="Custom"
                description="For large organizations"
                features={['Everything in Pro', 'Custom workflows', 'API access', 'Dedicated support', 'SSO & compliance']}
              />
            </div>
          </div>
        </section> */}

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-8 mb-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">HireAI</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  AI-powered hiring automation for modern enterprises.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Features</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Security</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">About</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Blog</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</Link></li>
                  <li><Link href="#" className="hover:text-slate-900 dark:hover:text-white">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2024 HireAI. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
    </div>
  );
}

function SolutionCard({ title, description, features, icon, highlighted }: { title: string; description: string; features: string[]; icon: React.ReactNode; highlighted?: boolean }) {
  return (
    <div className={`rounded-2xl border p-8 transition-all ${highlighted ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 ring-2 ring-blue-600' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50'}`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${highlighted ? 'bg-gradient-to-br from-blue-600 to-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'} mb-4`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className={highlighted ? 'w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white' : 'w-full'} variant={highlighted ? 'default' : 'outline'}>
        Learn More <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function PricingCard({ name, price, description, features, highlighted }: { name: string; price: string; description: string; features: string[]; highlighted?: boolean }) {
  return (
    <div className={`rounded-2xl border p-8 transition-all ${highlighted ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 ring-2 ring-blue-600' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50'}`}>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-slate-900 dark:text-white">{price}</span>
        {price !== 'Custom' && <span className="text-slate-600 dark:text-slate-400">/month</span>}
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className={highlighted ? 'w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white' : 'w-full'} variant={highlighted ? 'default' : 'outline'}>
        Get Started
      </Button>
    </div>
  );
}
