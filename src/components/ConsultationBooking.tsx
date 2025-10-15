import { memo, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Video,
  MapPin,
  Award,
  Shield,
  Gift
} from 'lucide-react'

interface ConsultationBookingProps {
  onBooking?: (data: any) => void
}

const ConsultationBooking = memo(({ onBooking }: ConsultationBookingProps) => {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    consultationType: '',
    date: '',
    time: '',
    contact: {
      name: '',
      email: '',
      phone: '',
      company: ''
    },
    projectDetails: ''
  })

  const consultationTypes = [
    {
      id: 'initial',
      name: 'Initial Project Consultation',
      duration: '30 minutes',
      price: 'FREE',
      description: 'Discuss your project requirements and get expert advice',
      icon: User,
      color: 'bg-construction-lime',
      benefits: [
        'Project feasibility assessment',
        'Preliminary cost estimation',
        'Timeline planning guidance',
        'Regulatory requirements overview'
      ]
    },
    {
      id: 'technical',
      name: 'Technical Construction Review',
      duration: '60 minutes',
      price: 'FREE',
      description: 'In-depth technical analysis and Construction consultation',
      icon: Shield,
      color: 'bg-construction-blue',
      benefits: [
        'Detailed technical evaluation',
        'Construction solution proposals',
        'Risk assessment and mitigation',
        'Specifications and standards review'
      ]
    },
    {
      id: 'site',
      name: 'On-Site Assessment',
      duration: '2-3 hours',
      price: 'FREE',
      description: 'Comprehensive site visit and evaluation',
      icon: MapPin,
      color: 'bg-construction-orange',
      benefits: [
        'Physical site inspection',
        'Geotechnical assessment',
        'Access and logistics planning',
        'Environmental considerations'
      ]
    }
  ]

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBooking = () => {
    onBooking?.(bookingData)
    setStep(4) // Success step
  }

  const selectedConsultation = consultationTypes.find(c => c.id === bookingData.consultationType)

  return (
    <Card className="card-construction max-w-4xl mx-auto">
      <CardContent className="p-10">
        {step !== 4 && (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 gradient-construction rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Calendar className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-bold text-construction-navy mb-4">
                Book Your FREE Consultation
              </h2>
              <p className="text-xl text-construction-steel">
                Get expert construction advice from our certified engineers
              </p>
              
              {/* Special offer badge */}
              <Badge className="mt-6 bg-construction-lime text-white text-lg px-6 py-3 animate-pulse-slow">
                <Gift className="w-5 h-5 mr-2" />
                Limited Time: All Consultations FREE
              </Badge>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center mb-10">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber 
                      ? 'bg-construction-orange text-white' 
                      : 'bg-construction-gray text-construction-steel'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-construction-orange' : 'bg-construction-gray'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 1: Consultation Type */}
        {step === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-construction-navy text-center mb-8">
              Choose Your Consultation Type
            </h3>
            <div className="space-y-6">
              {consultationTypes.map((consultation) => (
                <Card
                  key={consultation.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    bookingData.consultationType === consultation.id 
                      ? 'border-construction-orange shadow-construction-lg' 
                      : 'border-construction-orange/20 hover:border-construction-orange hover:shadow-construction'
                  }`}
                  onClick={() => setBookingData({ ...bookingData, consultationType: consultation.id })}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 ${consultation.color} rounded-2xl flex items-center justify-center text-white`}>
                        <consultation.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-construction-navy">{consultation.name}</h4>
                          <Badge className="bg-construction-lime text-white font-bold">
                            {consultation.price}
                          </Badge>
                        </div>
                        <p className="text-construction-steel mb-4">{consultation.description}</p>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-construction-orange" />
                            <span className="text-sm font-semibold text-construction-steel">{consultation.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Video className="w-4 h-4 text-construction-blue" />
                            <span className="text-sm font-semibold text-construction-steel">Online or In-Person</span>
                          </div>
                        </div>
                        
                        {/* Benefits */}
                        <div className="grid grid-cols-2 gap-2">
                          {consultation.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-construction-lime" />
                              <span className="text-sm text-construction-steel">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && selectedConsultation && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-construction-navy mb-2">
                Schedule Your {selectedConsultation.name}
              </h3>
              <Badge className="bg-construction-blue text-white px-4 py-2">
                {selectedConsultation.duration} • {selectedConsultation.price}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                  Select Date
                </Label>
                <Input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="text-lg p-4"
                />
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-lg font-semibold text-construction-navy mb-4 block">
                  Select Time
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setBookingData({ ...bookingData, time })}
                      className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                        bookingData.time === time
                          ? 'bg-construction-orange text-white'
                          : 'bg-construction-gray text-construction-steel hover:bg-construction-orange hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-construction-gray p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-construction-navy mb-6">What to Expect</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedConsultation.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-construction-lime mt-1" />
                    <div>
                      <span className="font-semibold text-construction-navy">{benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-construction-navy text-center mb-8">
              Your Contact Information
            </h3>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold text-construction-navy mb-2 block">Full Name *</Label>
                  <Input
                    placeholder="Your full name"
                    value={bookingData.contact.name}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      contact: { ...bookingData.contact, name: e.target.value }
                    })}
                    className="p-4"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-construction-navy mb-2 block">Company/Organization</Label>
                  <Input
                    placeholder="Your company name"
                    value={bookingData.contact.company}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      contact: { ...bookingData.contact, company: e.target.value }
                    })}
                    className="p-4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-semibold text-construction-navy mb-2 block">Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={bookingData.contact.email}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      contact: { ...bookingData.contact, email: e.target.value }
                    })}
                    className="p-4"
                  />
                </div>

                <div>
                  <Label className="font-semibold text-construction-navy mb-2 block">Phone Number *</Label>
                  <Input
                    placeholder="+27 XX XXX XXXX"
                    value={bookingData.contact.phone}
                    onChange={(e) => setBookingData({
                      ...bookingData,
                      contact: { ...bookingData.contact, phone: e.target.value }
                    })}
                    className="p-4"
                  />
                </div>
              </div>

              <div>
                <Label className="font-semibold text-construction-navy mb-2 block">
                  Project Details (Optional)
                </Label>
                <Textarea
                  placeholder="Tell us about your project requirements, budget, timeline, and any specific concerns..."
                  value={bookingData.projectDetails}
                  onChange={(e) => setBookingData({ ...bookingData, projectDetails: e.target.value })}
                  className="p-4 min-h-24"
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gradient-to-r from-construction-orange to-construction-yellow p-6 rounded-2xl text-white">
                <h4 className="text-xl font-bold mb-4">Booking Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Consultation:</span>
                    <span className="font-semibold">{selectedConsultation?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-semibold">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-semibold">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{selectedConsultation?.duration}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/30 pt-2">
                    <span>Cost:</span>
                    <span className="font-bold text-2xl">{selectedConsultation?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-construction-lime rounded-full flex items-center justify-center text-white mx-auto mb-8">
              <CheckCircle className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl font-bold text-construction-navy mb-4">
              Consultation Booked Successfully!
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-construction-steel mb-8">
                Thank you for booking your free consultation with McKeywa Projects. 
                We'll send you a confirmation email with meeting details and a calendar invite.
              </p>
              
              <div className="bg-construction-gray p-8 rounded-2xl mb-8">
                <h3 className="text-xl font-bold text-construction-navy mb-6">What Happens Next?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-construction-orange rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-construction-navy">Confirmation Email</h4>
                      <p className="text-construction-steel">You'll receive a confirmation email within 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-construction-orange rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-construction-navy">Pre-consultation Call</h4>
                      <p className="text-construction-steel">Our team will call you 24 hours before to confirm details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-construction-orange rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-construction-navy">Expert Consultation</h4>
                      <p className="text-construction-steel">Meet with our certified engineers and get expert advice</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setStep(1)
                    setBookingData({
                      consultationType: '',
                      date: '',
                      time: '',
                      contact: { name: '', email: '', phone: '', company: '' },
                      projectDetails: ''
                    })
                  }}
                  variant="outline"
                  className="border-construction-orange text-construction-orange hover:bg-construction-orange hover:text-white px-8 py-4"
                >
                  Book Another
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Only show if not on success step */}
        {step < 4 && (
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

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !bookingData.consultationType) ||
                  (step === 2 && (!bookingData.date || !bookingData.time))
                }
                className="btn-construction px-8 py-4"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={handleBooking}
                disabled={!bookingData.contact.name || !bookingData.contact.email || !bookingData.contact.phone}
                className="btn-construction px-8 py-4"
              >
                Confirm Booking
                <Calendar className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
})

ConsultationBooking.displayName = 'ConsultationBooking'

export { ConsultationBooking }