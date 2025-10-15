import { memo, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  MapPin,
  Users,
  Truck,
  HardHat,
  Camera,
  Download,
  Share2,
  Filter,
  Search,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react'

interface TimelineEvent {
  id: string
  title: string
  description: string
  date: Date
  status: 'completed' | 'in-progress' | 'pending' | 'delayed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  location: string
  team: string[]
  progress: number
  images?: string[]
  duration: number
  dependencies?: string[]
  category: 'foundation' | 'structure' | 'finishing' | 'inspection' | 'delivery'
}

const InteractiveTimeline = memo(() => {
  const [selectedProject, setSelectedProject] = useState('bridge-a1')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban' | 'calendar'>('timeline')
  const [liveUpdates, setLiveUpdates] = useState(true)

  // Sample timeline data with enhanced information
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Site Survey & Planning',
      description: 'Comprehensive site analysis, soil testing, and detailed project planning phase',
      date: new Date('2024-01-15'),
      status: 'completed',
      priority: 'high',
      location: 'N1 Highway, Johannesburg',
      team: ['John Smith', 'Sarah Wilson', 'Mike Chen'],
      progress: 100,
      duration: 14,
      category: 'foundation',
      images: ['survey1.jpg', 'soil-test.jpg']
    },
    {
      id: '2',
      title: 'Foundation Excavation',
      description: 'Deep excavation for bridge foundations with reinforced concrete pouring',
      date: new Date('2024-02-01'),
      status: 'completed',
      priority: 'critical',
      location: 'N1 Highway, Bridge Site A',
      team: ['Mike Chen', 'James Brown', 'Lisa Davis'],
      progress: 100,
      duration: 21,
      category: 'foundation',
      dependencies: ['1']
    },
    {
      id: '3',
      title: 'Steel Structure Assembly',
      description: 'Assembly and installation of pre-fabricated steel bridge components',
      date: new Date('2024-03-01'),
      status: 'in-progress',
      priority: 'high',
      location: 'N1 Highway, Bridge Site A',
      team: ['David Wilson', 'Emma Taylor', 'Tom Anderson'],
      progress: 75,
      duration: 35,
      category: 'structure'
    },
    {
      id: '4',
      title: 'Concrete Deck Pouring',
      description: 'Pouring reinforced concrete deck with specialized aggregate mixture',
      date: new Date('2024-04-10'),
      status: 'pending',
      priority: 'high',
      location: 'N1 Highway, Bridge Site A',
      team: ['Mike Chen', 'Sarah Wilson'],
      progress: 0,
      duration: 14,
      category: 'structure',
      dependencies: ['3']
    },
    {
      id: '5',
      title: 'Safety Railings & Finishing',
      description: 'Installation of safety barriers, lighting, and final surface treatments',
      date: new Date('2024-05-01'),
      status: 'pending',
      priority: 'medium',
      location: 'N1 Highway, Bridge Site A',
      team: ['Lisa Davis', 'Tom Anderson'],
      progress: 0,
      duration: 18,
      category: 'finishing',
      dependencies: ['4']
    },
    {
      id: '6',
      title: 'Final Inspection & Testing',
      description: 'Comprehensive structural testing, load testing, and safety certification',
      date: new Date('2024-05-25'),
      status: 'pending',
      priority: 'critical',
      location: 'N1 Highway, Bridge Site A',
      team: ['John Smith', 'Construction Team'],
      progress: 0,
      duration: 7,
      category: 'inspection',
      dependencies: ['5']
    }
  ]

  const projects = [
    { id: 'bridge-a1', name: 'N1 Highway Bridge A', progress: 68, status: 'in-progress' },
    { id: 'road-r24', name: 'R24 Road Extension', progress: 45, status: 'in-progress' },
    { id: 'bridge-m1', name: 'M1 Overpass Upgrade', progress: 90, status: 'finishing' },
    { id: 'infra-or', name: 'OR Tambo Infrastructure', progress: 25, status: 'planning' }
  ]

  const filteredEvents = timelineEvents.filter(event => {
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-construction-lime text-white'
      case 'in-progress': return 'bg-construction-orange text-white'
      case 'pending': return 'bg-construction-yellow text-construction-dark'
      case 'delayed': return 'bg-construction-red text-white'
      default: return 'bg-construction-steel text-white'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-construction-red'
      case 'high': return 'border-l-construction-orange'
      case 'medium': return 'border-l-construction-yellow'
      case 'low': return 'border-l-construction-lime'
      default: return 'border-l-construction-steel'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'foundation': return <Target className="w-5 h-5" />
      case 'structure': return <HardHat className="w-5 h-5" />
      case 'finishing': return <Award className="w-5 h-5" />
      case 'inspection': return <CheckCircle className="w-5 h-5" />
      case 'delivery': return <Truck className="w-5 h-5" />
      default: return <Calendar className="w-5 h-5" />
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdates) return

    const interval = setInterval(() => {
      // Simulate progress updates for in-progress items
      // This would be replaced with real API calls
      console.log('Checking for project updates...')
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [liveUpdates])

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-construction-navy mb-2">Live Project Timeline</h2>
          <p className="text-construction-steel">Real-time construction progress tracking</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className={`${liveUpdates ? 'bg-construction-lime' : 'bg-construction-steel'} text-white animate-pulse-slow`}>
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse-slow"></div>
            {liveUpdates ? 'LIVE' : 'OFFLINE'}
          </Badge>
          
          <Button
            onClick={() => setLiveUpdates(!liveUpdates)}
            variant="outline"
            className="border-construction-orange text-construction-orange hover:bg-construction-orange hover:text-white"
          >
            {liveUpdates ? <PauseCircle className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
            {liveUpdates ? 'Pause' : 'Resume'} Updates
          </Button>
        </div>
      </div>

      {/* Project Selector */}
      <Card className="border-construction-orange/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-construction-navy">Active Projects</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-construction-orange" />
              <span className="text-sm font-semibold text-construction-steel">Overall Progress: 62%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left hover-lift ${
                  selectedProject === project.id
                    ? 'border-construction-orange bg-construction-orange/10'
                    : 'border-construction-orange/20 hover:border-construction-orange/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-construction-navy">{project.name}</h4>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className="mb-2" />
                <p className="text-sm text-construction-steel">{project.progress}% Complete</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="border-construction-orange/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-construction-steel" />
                <input
                  type="text"
                  placeholder="Search timeline events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-construction-orange/20 rounded-xl focus:border-construction-orange focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-construction-orange/20 rounded-xl focus:border-construction-orange focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="delayed">Delayed</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-construction-orange/20 rounded-xl focus:border-construction-orange focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="foundation">Foundation</option>
                <option value="structure">Structure</option>
                <option value="finishing">Finishing</option>
                <option value="inspection">Inspection</option>
                <option value="delivery">Delivery</option>
              </select>

              <div className="flex items-center bg-construction-gray rounded-xl p-1">
                {['timeline', 'kanban', 'calendar'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      viewMode === mode
                        ? 'bg-construction-orange text-white'
                        : 'text-construction-steel hover:text-construction-orange'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className={`border-l-8 ${getPriorityColor(event.priority)} border-r border-t border-b border-construction-orange/20 hover:shadow-construction-lg transition-all duration-300 hover-lift animate-on-scroll-left`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-construction-orange/20 rounded-xl flex items-center justify-center text-construction-orange">
                          {getCategoryIcon(event.category)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-construction-navy">{event.title}</h3>
                          <p className="text-construction-steel">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className="border-construction-orange text-construction-orange">
                          {event.priority} priority
                        </Badge>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-construction-steel">Progress</span>
                        <span className="text-sm font-bold text-construction-orange">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} className="h-3" />
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-construction-orange" />
                        <span className="text-sm text-construction-steel">
                          {event.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-construction-orange" />
                        <span className="text-sm text-construction-steel">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-construction-orange" />
                        <span className="text-sm text-construction-steel">{event.duration} days</span>
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center space-x-4 mb-4">
                      <Users className="w-4 h-4 text-construction-orange" />
                      <div className="flex items-center space-x-2">
                        {event.team.map((member, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="border-construction-orange text-construction-orange hover:bg-construction-orange hover:text-white">
                        <Camera className="w-4 h-4 mr-2" />
                        View Photos
                      </Button>
                      <Button variant="outline" size="sm" className="border-construction-blue text-construction-blue hover:bg-construction-blue hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" size="sm" className="border-construction-yellow text-construction-yellow hover:bg-construction-yellow hover:text-construction-dark">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Update
                      </Button>
                    </div>
                  </div>

                  {/* Live Status Indicator */}
                  {event.status === 'in-progress' && (
                    <div className="bg-construction-orange/10 rounded-xl p-4 text-center min-w-[200px]">
                      <div className="w-16 h-16 bg-construction-orange/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-slow">
                        <Zap className="w-8 h-8 text-construction-orange animate-heartbeat" />
                      </div>
                      <h4 className="font-bold text-construction-orange mb-2">ACTIVE NOW</h4>
                      <p className="text-sm text-construction-steel mb-3">Work in progress</p>
                      <div className="flex items-center justify-center space-x-1 text-xs text-construction-steel">
                        <div className="w-2 h-2 bg-construction-lime rounded-full animate-pulse-slow"></div>
                        <span>Live tracking enabled</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Real-time Updates Footer */}
      <Card className="border-construction-orange/20 bg-construction-orange/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-construction-orange rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white animate-pulse-slow" />
              </div>
              <div>
                <h4 className="font-bold text-construction-navy">Real-Time Construction Updates</h4>
                <p className="text-sm text-construction-steel">
                  Last updated: {new Date().toLocaleTimeString()} • Next update in 2 minutes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-construction-orange text-construction-orange hover:bg-construction-orange hover:text-white">
                <Bell className="w-4 h-4 mr-2" />
                Enable Notifications
              </Button>
              <Button className="bg-construction-orange hover:bg-construction-red text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Timeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

InteractiveTimeline.displayName = 'InteractiveTimeline'

export { InteractiveTimeline }