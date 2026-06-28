import { Feather, ArrowRight, Edit3, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-bg dark:bg-ink-dark-bg text-ink-text dark:text-white font-sans transition-colors duration-300 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-transparent dark:border-ink-dark-border">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <Feather className="w-7 h-7 text-ink-btn" />
          <span>QuillSpace</span>
        </div>

        <div className="flex items-center gap-6 font-medium text-sm">
          <Link
            to="/login"
            className="text-gray-700 dark:text-gray-300 hover:text-ink-btn transition-colors"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-ink-btn text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-sm dark:shadow-black/30"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Where good ideas
              <br />
              <span className="relative text-ink-btn">
                find their readers.
                <svg
                  className="absolute left-0 -bottom-1 w-full h-3 text-ink-sidebar/60 dark:text-[#3F5B56] -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-lg">
              QuillSpace is an open platform where readers discover thoughtful
              ideas and writers—from experts to first-time authors—share stories
              that inspire, educate, and connect people.
            </p>

            <div className="flex gap-4 pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-ink-btn text-white px-7 py-3 rounded-xl font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-md dark:shadow-black/30"
              >
                Start Reading
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-ink-sidebar dark:bg-ink-dark-sidebar rounded-4xl rotate-3 scale-105 opacity-50 -z-10"></div>

            <div className="bg-white dark:bg-ink-dark-card rounded-4xl border border-teal-50 dark:border-ink-dark-border shadow-xl dark:shadow-black/30 p-8 space-y-4 transition-colors duration-300">
              <FeatureCard
                icon={<Edit3 className="w-6 h-6 text-ink-btn" />}
                title="Sleek Editor"
                desc="Write beautifully with a distraction-free editor built for focus."
              />

              <FeatureCard
                icon={<Users className="w-6 h-6 text-ink-btn" />}
                title="Growing Community"
                desc="Share your thoughts and connect with readers around the world."
              />

              <FeatureCard
                icon={<BookOpen className="w-6 h-6 text-ink-btn" />}
                title="Curated Stories"
                desc="Explore quality articles tailored to your interests."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-ink-bg/50 dark:hover:bg-[#313943] transition-colors">
      <div className="p-3 rounded-xl bg-ink-bg dark:bg-ink-dark-sidebar">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>

        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>
    </div>
  );
}
