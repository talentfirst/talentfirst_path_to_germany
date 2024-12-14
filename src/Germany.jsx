import React, { useState } from 'react';
import { ChevronDown, Star, Users, BookOpen, Briefcase } from 'lucide-react';
import logo from './assets/logo-highdef.png'

import { TypeFormGermany } from './TypeForm';


const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="text-teal-500 mb-4">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="h-1 w-0 group-hover:w-full bg-teal-500 transition-all duration-300 mt-4" />
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg">
    <div className="text-4xl font-bold mb-2">{value}</div>
    <div>{label}</div>
  </div>
);

const TimelineItem = ({ number, title, description, icon: Icon }) => (
  <div className="flex items-center gap-8">
    <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
      {number}
    </div>
    <div className="bg-white p-6 rounded-xl shadow-lg flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={20} className="text-teal-500" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, testimonial }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
        <span className="text-teal-500 text-lg font-bold">{name[0]}</span>
      </div>
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-gray-600 text-sm">{role}</div>
      </div>
    </div>
    <p className="text-gray-600">{testimonial}</p>
    <div className="flex gap-1 mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="fill-current text-yellow-400" />
      ))}
    </div>
  </div>
);

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Germany() {
    const [showForm, setShowForm] = useState(false);




    const handleForm = () => {
        setShowForm(true)
    }




  
    const features = [
      {
        icon: BookOpen,
        title: "Speed Learning",
        description: "From zero to B2 German in just 4 months with our accelerated program!"
      },
      {
        icon: Briefcase,
        title: "Job Assistance",
        description: "We are actively partnering with universities, companies and industry bodies to provide jobs to our candidates"
      },
      {
        icon: Users,
        title: "Visa Support",
        description: "Full relocation assistance from A to Z. We handle the paperwork!"
      }
    ];
  
    const stats = [
      { value: "1K+", label: "Success Stories" },
      { value: "180", label: "Days Average" },
      { value: "95%", label: "Success Rate" },
      { value: "50K€+", label: "Avg Starting Salary" }
    ];
  
    const timeline = [
      {
        number: 1,
        icon: BookOpen,
        title: "German Foundations",
        description: "Intensive A1-A2 German with our top-notch faculty"
      },
      {
        number: 2,
        icon: Users,
        title: "Professional German",
        description: "B1-B2 level with focus on your industry vocabulary"
      },
      {
        number: 3,
        icon: Briefcase,
        title: "Job Prep & Placement",
        description: "Interview training, CV preparation, and direct job placement assistance"
      }
    ];
  
    const testimonials = [
      {
        name: "Ralph Menezes",
        role: "Software Engineer in Berlin",
        testimonial: "From basic German to a tech job in Berlin in just 6 months. Best decision ever!"
      },
      {
        name: "Nitesh Diwan",
        role: "Data Scientist in Munich",
        testimonial: "The placement assistance helped me a lot. Now I'm working at my dream company!"
      }
    ];
  
    const faqs = [
      {
        question: "Do I need any prior German knowledge?",
        answer: "No, our program is designed for complete beginners and we'll take you from A1 to B2!"
      },
      {
        question: "How does the job placement assistance work?",
        answer: "Talentfirst is actively reaching out to companies helping them find the right talent."
      }
    ];
  
    return (
      <>
        {showForm ? (
          <TypeFormGermany onTypeFormClose={()=>setShowForm(false)} />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">

<div className="flex items-center sticky top-0 z-50 p-5 ml-20">
                        
                            <img src={logo} alt="TalentFirst Logo" className="h-10 w-auto" />
                        
                    </div>
            {/* Hero */}
            <header className="min-h-screen flex items-center justify-center text-center p-4">
              <div>
                <h1 className="text-6xl font-bold mb-6">
                  Launch Your German Career
                  <div className="text-teal-600">in 180 Days!</div>
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
                  Zero to Job-Ready: Master German, Land Your Dream Role,<br></br>
                  <span className="text-teal-600 text-2xl font-bold"> Over 1 million Job Vacancies!</span>
                </p>
                <button
                  onClick={handleForm}
                  className="bg-teal-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-teal-700 transition-colors duration-200"
                >
                  Start Your Journey
                </button>
              </div>
            </header>
  
            {/* Features */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </section>
  
            {/* Stats */}
            <section className="py-20 bg-teal-600 text-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                  ))}
                </div>
              </div>
            </section>
  
            {/* Timeline */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Your 180-Day Journey</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                  {timeline.map((item, index) => (
                    <TimelineItem key={index} {...item} />
                  ))}
                </div>
              </div>
            </section>
  
            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                  ))}
                </div>
              </div>
            </section>
  
            {/* FAQ */}
            <section className="py-20">
              <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-4xl font-bold text-center mb-16">FAQ</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <FAQ key={index} {...faq} />
                  ))}
                </div>
              </div>
            </section>
  
            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-8">Ready to Launch Your German Career?</h2>
                <p className="text-xl mb-8">
                  Join 200+ successful professionals who transformed their careers with us!
                </p>
                <button 
                  onClick={handleForm}
                  className="bg-white text-teal-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-teal-50 transition-colors duration-200"
                >
                  Get Started Now
                </button>
              </div>
            </section>
          </div>
        )}
      </>
    );
  }