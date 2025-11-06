import { ArrowLeft, Star, MapPin, Clock, Phone, Share2, Navigation, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface PharmacyDetailProps {
  pharmacy: {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    address: string;
    distance: number;
    price: number;
    stock: 'in-stock' | 'low-stock' | 'out-of-stock';
    stockPercentage: number;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    phone: string;
    aiScore: number;
  };
  onBack: () => void;
}

export function PharmacyDetail({ pharmacy, onBack }: PharmacyDetailProps) {
  const stockConfig = {
    'in-stock': { label: 'In Stock', color: 'bg-green-100 text-green-700' },
    'low-stock': { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' },
    'out-of-stock': { label: 'Out of Stock', color: 'bg-red-100 text-red-700' }
  };

  const config = stockConfig[pharmacy.stock];

  const substitutes = [
    { name: 'Paracetamol 500mg (Generic)', price: 45.00, stock: 'in-stock', similarity: 100 },
    { name: 'Calpol 500mg', price: 65.00, stock: 'in-stock', similarity: 95 },
    { name: 'Dolo 650mg', price: 55.00, stock: 'low-stock', similarity: 85 }
  ];

  const nearbyStores = [
    { name: 'MedPlus Pharmacy', distance: 0.8, price: 52.00, stock: 'in-stock' },
    { name: 'Apollo Pharmacy', distance: 1.2, price: 58.00, stock: 'in-stock' },
    { name: 'Wellness Forever', distance: 1.5, price: 48.00, stock: 'low-stock' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900">{pharmacy.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              {/* Rating & Status */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-900">{pharmacy.rating}</span>
                  <span className="text-gray-500">({pharmacy.reviews} reviews)</span>
                </div>
                <Badge variant={pharmacy.isOpen ? "default" : "secondary"} className={`rounded-lg ${pharmacy.isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {pharmacy.isOpen ? 'Open Now' : 'Closed'}
                </Badge>
                {pharmacy.isOpen && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Closes at {pharmacy.closeTime}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-700">{pharmacy.address}</p>
                  <p className="text-blue-600">{pharmacy.distance} km away</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-gray-700">{pharmacy.phone}</p>
              </div>

              <Separator />

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-2">Price</p>
                  <p className="text-blue-600">₹{pharmacy.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2">Availability</p>
                  <Badge className={`${config.color} rounded-lg px-3 py-1`}>
                    {config.label}
                  </Badge>
                  <Progress value={pharmacy.stockPercentage} className="h-2 mt-2" />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
                  Reserve
                </Button>
                <Button variant="outline" className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Navigation className="w-4 h-4 mr-2" />
                  Directions
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Substitute Medicines */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-900 mb-4">Substitute Medicines</h2>
              <div className="space-y-3">
                {substitutes.map((sub, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-gray-900">{sub.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 rounded-lg">
                          {sub.similarity}% Similar
                        </Badge>
                        <Badge className={sub.stock === 'in-stock' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} variant="secondary">
                          {sub.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600">₹{sub.price.toFixed(2)}</p>
                      <Button size="sm" variant="outline" className="mt-2 rounded-lg">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Stores */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-900 mb-4">Nearby Stores with Similar Medicine</h2>
              <div className="space-y-3">
                {nearbyStores.map((store, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="text-gray-900">{store.name}</p>
                      <p className="text-gray-600">{store.distance} km away</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600">₹{store.price.toFixed(2)}</p>
                      <Badge className={store.stock === 'in-stock' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} variant="secondary">
                        {store.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Score Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-md p-6 text-white sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3>AI Recommendation Score</h3>
              </div>
              
              <div className="text-center py-8">
                <div className="text-6xl mb-2">{pharmacy.aiScore}</div>
                <p className="text-blue-100">out of 100</p>
              </div>

              <Separator className="bg-white/20 my-6" />

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Price Score</span>
                    <span>50%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-white/20" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Distance Score</span>
                    <span>30%</span>
                  </div>
                  <Progress value={90} className="h-2 bg-white/20" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Availability Score</span>
                    <span>20%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-white/20" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <p className="text-blue-100">
                  This pharmacy offers the best combination of competitive pricing, convenient location, and reliable stock availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
