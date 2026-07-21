import Link from 'next/link'
import { 
  Bot, FileSearch, Mail, BarChart3, Zap, Shield, 
  ArrowRight, CheckCircle2, Star, Users, TrendingUp,
  Linkedin, Briefcase, Globe, Clock, Target
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LoopCV</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4">
                Log In
              </Link>
              <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Job Search Automation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Apply to <span className="gradient-text">1,000+ Jobs</span>
            <br />Automatically
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            LoopCV is an AI job application agent that runs continuously in the background — 
            scanning thousands of new postings every day, matching them against your profile, 
            and applying on your behalf.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/dashboard" className="btn-primary text-lg flex items-center justify-center gap-2">
              Start Applying Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg">
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Job Boards', value: '50+', icon: Globe },
              { label: 'Jobs Applied', value: '1M+', icon: Briefcase },
              { label: 'Interviews', value: '3x More', icon: TrendingUp },
              { label: 'Users', value: '10K+', icon: Users },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">We apply across all major job boards</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['LinkedIn', 'Indeed', 'Glassdoor', 'Workday', 'Greenhouse', 'Lever', 'Ashby', 'ZipRecruiter'].map((name) => (
              <div key={name} className="text-xl font-semibold text-gray-400">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="gradient-text">Land Your Dream Job</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI handles the entire job search process so you can focus on interview prep
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: 'AI Auto-Apply',
                description: 'Automatically fills and submits job applications across Greenhouse, Lever, Workday, Ashby, and LinkedIn Easy Apply.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: FileSearch,
                title: 'Smart Job Matching',
                description: 'AI scores each job against your profile, ensuring you only apply to roles where you are a strong fit.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Target,
                title: 'CV Tailoring',
                description: 'Automatically customizes your resume for each job posting, optimizing keywords for ATS systems.',
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: Mail,
                title: 'Email Outreach',
                description: 'Finds recruiter emails and sends personalized outreach messages to hiring managers.',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                description: 'Track applications, response rates, interview callbacks, and optimize your job search strategy.',
                color: 'from-brand-500 to-indigo-500',
              },
              {
                icon: Shield,
                title: 'A/B Testing',
                description: 'Test different CV versions and see which one performs best with real employers.',
                color: 'from-pink-500 to-rose-500',
              },
            ].map((feature, i) => (
              <div key={i} className="stat-card card-hover">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How LoopCV Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Your CV',
                description: 'Upload your resume and tell us what kind of job you are looking for. Our AI analyzes your profile.',
              },
              {
                step: '02',
                title: 'Set Your Preferences',
                description: 'Choose job titles, locations, salary range, and which companies to target or exclude.',
              },
              {
                step: '03',
                title: 'AI Does the Rest',
                description: 'Our agent runs 24/7, searching, matching, tailoring, and applying to jobs while you sleep.',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-brand-100 absolute -top-4 -left-4">{step.step}</div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah K.',
                role: 'Software Engineer',
                text: 'I got 5 interview calls in just one week! The AI tailoring is incredible.',
                rating: 5,
              },
              {
                name: 'Michael R.',
                role: 'Product Manager',
                text: 'Applied to 200+ jobs while I was on vacation. Came back to 12 interviews.',
                rating: 5,
              },
              {
                name: 'Priya M.',
                role: 'Data Scientist',
                text: 'The email outreach feature alone is worth it. Direct access to hiring managers.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div key={i} className="stat-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Automate Your Job Search?
          </h2>
          <p className="text-xl mb-10 text-white/80">
            Join thousands of job seekers who landed their dream jobs with LoopCV
          </p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold py-4 px-10 rounded-xl text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-white/60 text-sm">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">LoopCV</span>
              </div>
              <p className="text-sm">AI-powered job search automation platform.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © 2026 LoopCV. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
