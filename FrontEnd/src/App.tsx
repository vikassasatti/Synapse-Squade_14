import { useState } from 'react';
import { Upload, Sparkles, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { SearchHero } from './components/SearchHero';
import { PrescriptionUpload } from './components/PrescriptionUpload';
import { ResultsPage } from './components/ResultsPage';
import { PharmacyDetail } from './components/PharmacyDetail';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';

interface Pharmacy {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  distance: number;
  price: number;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockPercentage: number;
  address: string;
  isRecommended?: boolean;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  phone: string;
  aiScore: number;
  lat: number;
  lng: number;
}

type Page = 'home' | 'results' | 'detail';

// Mock pharmacy data
const mockPharmacies: Pharmacy[] = [
  {
    id: 1,
    name: 'Apollo Pharmacy',
    rating: 4.8,
    reviews: 1250,
    distance: 0.5,
    price: 52.00,
    stock: 'in-stock',
    stockPercentage: 95,
    address: '123 Main Street, Downtown',
    isRecommended: true,
    isOpen: true,
    openTime: '08:00 AM',
    closeTime: '10:00 PM',
    phone: '+1 (555) 123-4567',
    aiScore: 92,
    lat: 0,
    lng: 0
  },
  {
    id: 2,
    name: 'MedPlus Healthcare',
    rating: 4.6,
    reviews: 890,
    distance: 1.2,
    price: 48.50,
    stock: 'in-stock',
    stockPercentage: 78,
    address: '456 Oak Avenue, Medical District',
    isOpen: true,
    openTime: '07:00 AM',
    closeTime: '11:00 PM',
    phone: '+1 (555) 234-5678',
    aiScore: 88,
    lat: 0,
    lng: 0
  },
  {
    id: 3,
    name: 'Wellness Forever',
    rating: 4.5,
    reviews: 645,
    distance: 0.8,
    price: 55.00,
    stock: 'low-stock',
    stockPercentage: 25,
    address: '789 Pine Road, City Center',
    isOpen: true,
    openTime: '09:00 AM',
    closeTime: '09:00 PM',
    phone: '+1 (555) 345-6789',
    aiScore: 75,
    lat: 0,
    lng: 0
  },
  {
    id: 4,
    name: 'HealthFirst Pharmacy',
    rating: 4.7,
    reviews: 1120,
    distance: 1.5,
    price: 50.00,
    stock: 'in-stock',
    stockPercentage: 88,
    address: '321 Maple Drive, Healthcare Plaza',
    isOpen: true,
    openTime: '08:30 AM',
    closeTime: '10:30 PM',
    phone: '+1 (555) 456-7890',
    aiScore: 85,
    lat: 0,
    lng: 0
  },
  {
    id: 5,
    name: 'CarePoint Medical Store',
    rating: 4.4,
    reviews: 523,
    distance: 2.0,
    price: 45.00,
    stock: 'in-stock',
    stockPercentage: 92,
    address: '567 Cedar Lane, Suburb Area',
    isOpen: false,
    openTime: '10:00 AM',
    closeTime: '08:00 PM',
    phone: '+1 (555) 567-8901',
    aiScore: 78,
    lat: 0,
    lng: 0
  },
  {
    id: 6,
    name: 'PharmEasy Express',
    rating: 4.9,
    reviews: 1580,
    distance: 0.3,
    price: 58.00,
    stock: 'in-stock',
    stockPercentage: 100,
    address: '890 Elm Street, Shopping District',
    isOpen: true,
    openTime: '24/7',
    closeTime: 'Always Open',
    phone: '+1 (555) 678-9012',
    aiScore: 90,
    lat: 0,
    lng: 0
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showUpload, setShowUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('results');
  };

  const handleUploadConfirm = (medicines: string[]) => {
    // Use the first detected medicine for search
    if (medicines.length > 0) {
      setSearchQuery(medicines[0]);
      setShowUpload(false);
      setCurrentPage('results');
    }
  };

  const handlePharmacyClick = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setCurrentPage('detail');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
    setSelectedPharmacy(null);
  };

  const handleBackToResults = () => {
    setCurrentPage('results');
    setSelectedPharmacy(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation onUploadClick={() => setShowUpload(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <SearchHero
              onSearch={handleSearch}
              onUploadClick={() => setShowUpload(true)}
            />
            
            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by Advanced AI</span>
                </motion.div>
                <h2 className="text-gray-900 mb-4">Why Choose MediLocator?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Our AI-powered platform helps you find the best pharmacy for your needs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🤖',
                    gradient: 'from-blue-500 to-cyan-500',
                    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
                    title: 'AI-Powered Recommendations',
                    description: 'Smart algorithms analyze price, distance, and availability to recommend the best option',
                    delay: 0
                  },
                  {
                    icon: '📍',
                    gradient: 'from-green-500 to-emerald-500',
                    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
                    title: 'Real-Time Availability',
                    description: 'Check live stock status and prices from thousands of pharmacies near you',
                    delay: 0.2
                  },
                  {
                    icon: '💰',
                    gradient: 'from-purple-500 to-pink-500',
                    bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
                    title: 'Save Money',
                    description: 'Compare prices across pharmacies and find the most affordable options',
                    delay: 0.4
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl -z-10"
                      style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                    />
                    <div className={`${feature.bg} rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-white`}>
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-4xl">{feature.icon}</span>
                      </motion.div>
                      <h3 className="text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50 py-20 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-gray-900 mb-4">How It Works</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Find your medicine in three simple steps
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                  {/* Connecting lines */}
                  <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 origin-left"
                    />
                  </div>

                  {[
                    {
                      number: '1',
                      title: 'Search or Upload',
                      description: 'Enter medicine name or upload prescription',
                      icon: Sparkles,
                      color: 'from-blue-500 to-cyan-500',
                      delay: 0
                    },
                    {
                      number: '2',
                      title: 'Compare Options',
                      description: 'View nearby pharmacies with prices and availability',
                      icon: MapPin,
                      color: 'from-purple-500 to-pink-500',
                      delay: 0.2
                    },
                    {
                      number: '3',
                      title: 'Reserve & Go',
                      description: 'Reserve your medicine and get directions',
                      icon: DollarSign,
                      color: 'from-green-500 to-emerald-500',
                      delay: 0.4
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: step.delay }}
                      className="relative text-center group"
                    >
                      {/* Step number badge */}
                      <motion.div
                        className="relative mx-auto mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-2xl relative z-10`}
                          animate={{
                            boxShadow: [
                              '0 10px 30px rgba(0,0,0,0.2)',
                              '0 15px 40px rgba(0,0,0,0.3)',
                              '0 10px 30px rgba(0,0,0,0.2)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="text-center">
                            <div className="text-white text-2xl mb-1">{step.number}</div>
                            <step.icon className="w-6 h-6 text-white mx-auto" />
                          </div>
                        </motion.div>
                        
                        {/* Pulse effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30`}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0, 0.3]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: step.delay + 0.3 }}
                      >
                        <h3 className="text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                          {step.description}
                        </p>
                      </motion.div>

                      {/* Arrow for desktop */}
                      {index < 2 && (
                        <motion.div
                          className="hidden md:block absolute top-12 -right-6 text-purple-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: step.delay + 0.5 }}
                        >
                          <ArrowRight className="w-8 h-8" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center mt-16"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <span className="flex items-center gap-2">
                      Get Started Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                  {[
                    { value: '500K+', label: 'Happy Users', color: 'from-blue-500 to-cyan-500' },
                    { value: '5000+', label: 'Partner Pharmacies', color: 'from-purple-500 to-pink-500' },
                    { value: '1M+', label: 'Searches Daily', color: 'from-green-500 to-emerald-500' },
                    { value: '4.9★', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="text-center"
                    >
                      <motion.div
                        className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent text-4xl mb-2`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </>
        )}

        {currentPage === 'results' && (
          <ResultsPage
            searchQuery={searchQuery}
            pharmacies={mockPharmacies}
            onBack={handleBackToHome}
            onPharmacyClick={handlePharmacyClick}
          />
        )}

        {currentPage === 'detail' && selectedPharmacy && (
          <PharmacyDetail
            pharmacy={selectedPharmacy}
            onBack={handleBackToResults}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Upload Button */}
      {currentPage !== 'home' && (
        <Button
          onClick={() => setShowUpload(true)}
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-2xl bg-blue-600 hover:bg-blue-700 z-40"
        >
          <Upload className="w-6 h-6" />
        </Button>
      )}

      {/* Prescription Upload Modal */}
      {showUpload && (
        <PrescriptionUpload
          onClose={() => setShowUpload(false)}
          onConfirm={handleUploadConfirm}
        />
      )}
    </div>
  );
}
