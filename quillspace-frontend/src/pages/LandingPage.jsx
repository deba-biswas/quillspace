import { Feather, ArrowRight, Edit3, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-bg font-sans text-ink-text flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <Feather className="w-7 h-7 text-ink-btn" />
          QuillSpace
        </div>

        <div className="flex items-center gap-6 font-medium text-sm">
          <Link to="/login" className="hover:text-ink-btn transition-colors">
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-ink-btn text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-8">
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Where good ideas <br />
              <span className="text-ink-btn relative">
                find their readers.
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-ink-sidebar/60 -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              QuillSpace is an open platform where readers find dynamic
              thinking, and where expert and undiscovered voices can share their
              writing on any topic.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-ink-btn text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Start Reading <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="relative">
            <div className="absolute inset-0 bg-ink-sidebar rounded-4xl transform rotate-3 scale-105 -z-10 opacity-50"></div>

            <div className="bg-white p-8 rounded-4xl shadow-xl border border-teal-50 space-y-6">
              <FeatureCard
                icon={<Edit3 className="text-ink-btn w-6 h-6" />}
                title="Sleek Editor"
                desc="A distraction-free rich text editor designed for focus."
              />

              <FeatureCard
                icon={<Users className="text-ink-btn w-6 h-6" />}
                title="Vibrant Community"
                desc="Connect with readers who care about your niche."
              />

              <FeatureCard
                icon={<BookOpen className="text-ink-btn w-6 h-6" />}
                title="Curated Feeds"
                desc="Discover tailored content that matters to you."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable feature card displayed on the landing page
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start p-4 hover:bg-ink-bg/50 rounded-xl transition-colors cursor-default">
    <div className="p-3 bg-ink-bg rounded-lg">{icon}</div>

    <div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);
