import { memo, useState, useEffect } from 'react'

const ConstructionPreloader = memo(() => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-construction-navy overflow-hidden">
      {/* Animated Construction Blueprint Background */}
      <div className="absolute inset-0 blueprint-construction opacity-30"></div>
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0">
        <div className="construction-grid-animated"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          {/* Animated Logo Construction */}
          <div className="relative mb-16">
            <div className="construction-logo-container">
              {/* Building Animation */}
              <div className="building-animation">
                <div className="foundation"></div>
                <div className="floor floor-1"></div>
                <div className="floor floor-2"></div>
                <div className="floor floor-3"></div>
                <div className="crane">
                  <div className="crane-base"></div>
                  <div className="crane-arm"></div>
                  <div className="crane-hook"></div>
                </div>
              </div>
              
              {/* Company Logo */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 gradient-construction rounded-2xl flex items-center justify-center text-white shadow-construction-xl animate-pulse-slow">
                  <span className="text-3xl font-bold">M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Name with Typewriter Effect */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 typewriter-animation">
              McKeywa Projects
            </h1>
            <p className="text-construction-yellow font-semibold text-xl tracking-wider">
              CONSTRUCTION EXCELLENCE
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="mb-8">
            <div className="bg-construction-steel/30 rounded-full h-3 overflow-hidden mb-4">
              <div 
                className="h-full gradient-construction rounded-full transition-all duration-300 ease-out progress-bar-glow"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-construction-yellow font-mono">
              <span>Loading...</span>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <div className="loading-dot"></div>
              <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
              <span className="ml-4 loading-text">
                {progress < 25 && "Initializing construction systems..."}
                {progress >= 25 && progress < 50 && "Loading project blueprints..."}
                {progress >= 50 && progress < 75 && "Preparing Construction tools..."}
                {progress >= 75 && progress < 95 && "Finalizing safety protocols..."}
                {progress >= 95 && "Ready to build excellence!"}
              </span>
            </div>
          </div>

          {/* Floating Construction Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="floating-element" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>🏗️</div>
            <div className="floating-element" style={{ top: '30%', right: '15%', animationDelay: '1s' }}>🔧</div>
            <div className="floating-element" style={{ bottom: '25%', left: '20%', animationDelay: '2s' }}>⚡</div>
            <div className="floating-element" style={{ top: '40%', right: '25%', animationDelay: '3s' }}>🚧</div>
            <div className="floating-element" style={{ bottom: '35%', right: '10%', animationDelay: '4s' }}>🏢</div>
          </div>
        </div>
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
})

ConstructionPreloader.displayName = 'ConstructionPreloader'

export { ConstructionPreloader }