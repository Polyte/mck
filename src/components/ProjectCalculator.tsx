import { memo, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { 
  Calculator,
  Building2,
  Route,
  Droplets,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  CheckCircle
} from 'lucide-react'

interface ProjectCalculatorProps {
  onComplete?: (data: any) => void
}

const ProjectCalculator = memo(({ onComplete }: ProjectCalculatorProps) => {
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    type: '',
    size: 1000,
    timeline: 6,
    complexity: 'standard',
    location: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const projectTypes = [
    {
      id: 'road',
      name: 'Road Construction',
      icon: Route,
      description: 'Highway, provincial roads, urban streets',
      baseRate: 2500,
      color: 'text-construction-orange'
    },
    {
      id: 'bridge',
      name: 'Bridge Construction',
      icon: Building2,
      description: 'Pedestrian, vehicle, railway bridges',
      baseRate: 8500,
      color: 'text-construction-blue'
    },
    {
      id: 'water',
      name: 'Water Infrastructure',
      icon: Droplets,
      description: 'Treatment plants, distribution systems',
      baseRate: 6200,
      color: 'text-construction-lime'
    },
    {
      id: 'municipal',
      name: 'Municipal Projects',
      icon: Zap,
      description: 'Public facilities, utilities, parks',
      baseRate: 3800,
      color: 'text-construction-yellow'
    }
  ]

  const complexityMultipliers = {
    basic: { multiplier: 0.8, label: 'Basic', description: 'Standard construction methods' },
    standard: { multiplier: 1.0, label: 'Standard', description: 'Industry standard specifications' },
    advanced: { multiplier: 1.3, label: 'Advanced', description: 'Premium materials and methods' },
    complex: { multiplier: 1.6, label: 'Complex', description: 'Cutting-edge Construction solutions' }
  }

  const calculateEstimate = () => {
    const selectedType = projectTypes.find(t => t.id === projectData.type)
    if (!selectedType) return 0

    const baseRate = selectedType.baseRate
    const sizeMultiplier = projectData.size / 1000
    const complexityMultiplier = complexityMultipliers[projectData.complexity as keyof typeof complexityMultipliers].multiplier
    const timelineMultiplier = projectData.timeline < 4 ? 1.2 : projectData.timeline > 12 ? 0.9 : 1.0

    return Math.round(baseRate * sizeMultiplier * complexityMultiplier * timelineMultiplier)
  }

  const estimate = calculateEstimate()
  const estimateRange = {
    min: Math.round(estimate * 0.85),
    max: Math.round(estimate * 1.15)
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleComplete = () => {
    onComplete?.({
      ...projectData,
      estimate: estimateRange
    })
  }

  const progress = (step / 4) * 100

  return (
    <Card className="card-construction max-w-4xl mx-auto">
      <CardContent className="p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 gradient-construction rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Calculator className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-construction-navy mb-4">
            Project Cost Calculator
          </h2>
          <p className="text-xl text-construction-steel">
            Get an instant estimate for your construction project
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-construction-steel">Progress</span>
              <span className="text-sm font-semibold text-construction-orange">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-construction-gray rounded-full h-3">
              <div 
                className="gradient-construction h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-construction-navy text-center mb-8">
              What type of project do you need?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    projectData.type === type.id 
                      ? 'border-construction-orange shadow-construction-lg' 
                      : 'border-construction-orange/20 hover:border-construction-orange hover:shadow-construction'
                  }`}
                  onClick={() => setProjectData({ ...projectData, type: type.id })}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 gradient-construction rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                      <type.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-construction-navy mb-2">{type.name}</h4>
                    <p className="text-construction-steel mb-4">{type.description}</p>
                    <Badge className="bg-construction-gray text-construction-orange">
                      From R{type.baseRate.toLocaleString()}/unit
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Size & Timeline */}
        {step === 2 && (
          <div className="space-y-10">
            <h3 className="text-2xl font-bold text-construction-navy text-center mb-8">
              Project specifications
            </h3>
            
            <div className="space-y-8">
              <div>
                <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                  Project Size: {projectData.size.toLocaleString()} units
                </Label>
                <Slider
                  value={[projectData.size]}
                  onValueChange={(value) => setProjectData({ ...projectData, size: value[0] })}
                  max={10000}
                  min={100}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-construction-steel mt-2">
                  <span>100 units</span>
                  <span>10,000+ units</span>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                  Timeline: {projectData.timeline} months
                </Label>
                <Slider
                  value={[projectData.timeline]}
                  onValueChange={(value) => setProjectData({ ...projectData, timeline: value[0] })}
                  max={36}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-construction-steel mt-2">
                  <span>2 months</span>
                  <span>36+ months</span>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                  Complexity Level
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(complexityMultipliers).map(([key, value]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all duration-300 ${
                        projectData.complexity === key 
                          ? 'border-construction-orange shadow-construction' 
                          : 'border-construction-orange/20 hover:border-construction-orange'
                      }`}
                      onClick={() => setProjectData({ ...projectData, complexity: key })}
                    >
                      <CardContent className="p-6 text-center">
                        <h5 className="font-bold text-construction-navy mb-1">{value.label}</h5>
                        <p className="text-xs text-construction-steel">{value.description}</p>
                        <Badge className="mt-2 bg-construction-yellow text-construction-dark">
                          {value.multiplier}x
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-construction-navy text-center mb-8">
              Project location
            </h3>
            <div className="max-w-md mx-auto">
              <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                City/Province
              </Label>
              <Input
                placeholder="e.g., Johannesburg, Gauteng"
                value={projectData.location}
                onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
                className="text-lg p-6"
              />
              <p className="text-construction-steel mt-4 text-center">
                Location affects material costs and logistics
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Contact & Results */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-construction-navy mb-4">
                Your Project Estimate
              </h3>
              <div className="bg-gradient-to-r from-construction-orange to-construction-yellow p-8 rounded-3xl text-white mb-8">
                <div className="text-5xl font-bold mb-2">
                  R{estimateRange.min.toLocaleString()} - R{estimateRange.max.toLocaleString()}
                </div>
                <p className="text-xl opacity-90">Estimated project cost</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="max-w-md mx-auto space-y-6">
              <h4 className="text-xl font-bold text-construction-navy text-center mb-6">
                Get detailed quote sent to you
              </h4>
              
              <div>
                <Label className="font-semibold text-construction-navy mb-2 block">Full Name</Label>
                <Input
                  placeholder="Your full name"
                  value={projectData.contact.name}
                  onChange={(e) => setProjectData({
                    ...projectData,
                    contact: { ...projectData.contact, name: e.target.value }
                  })}
                  className="p-4"
                />
              </div>

              <div>
                <Label className="font-semibold text-construction-navy mb-2 block">Email Address</Label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={projectData.contact.email}
                  onChange={(e) => setProjectData({
                    ...projectData,
                    contact: { ...projectData.contact, email: e.target.value }
                  })}
                  className="p-4"
                />
              </div>

              <div>
                <Label className="font-semibold text-construction-navy mb-2 block">Phone Number</Label>
                <Input
                  placeholder="+27 XX XXX XXXX"
                  value={projectData.contact.phone}
                  onChange={(e) => setProjectData({
                    ...projectData,
                    contact: { ...projectData.contact, phone: e.target.value }
                  })}
                  className="p-4"
                />
              </div>

              {/* Benefits */}
              <div className="bg-construction-gray p-6 rounded-2xl">
                <h5 className="font-bold text-construction-navy mb-4">You'll receive:</h5>
                <div className="space-y-3">
                  {[
                    'Detailed project breakdown',
                    'Free 30-minute consultation',
                    'Timeline and milestone planning',
                    'Material specifications guide'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-construction-lime" />
                      <span className="text-construction-steel">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-construction-orange text-construction-orange hover:bg-construction-orange hover:text-white px-8 py-4"
            >
              Previous
            </Button>
          )}
          
          <div className="flex-1" />

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={step === 1 && !projectData.type}
              className="btn-construction px-8 py-4"
            >
              Continue
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!projectData.contact.name || !projectData.contact.email}
              className="btn-construction px-8 py-4"
            >
              Get Detailed Quote
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

ProjectCalculator.displayName = 'ProjectCalculator'

export { ProjectCalculator }