import { Star, MapPin, Phone, Navigation, Bookmark, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface PharmacyCardProps {
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
  onClick: () => void;
  isHighlighted?: boolean;
}

export function PharmacyCard({
  name,
  rating,
  reviews,
  distance,
  price,
  stock,
  stockPercentage,
  address,
  isRecommended,
  isOpen,
  onClick,
  isHighlighted
}: PharmacyCardProps) {
  const stockConfig = {
    'in-stock': { label: 'In Stock', color: 'bg-green-100 text-green-700', badgeColor: 'bg-green-500' },
    'low-stock': { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700', badgeColor: 'bg-yellow-500' },
    'out-of-stock': { label: 'Out of Stock', color: 'bg-red-100 text-red-700', badgeColor: 'bg-red-500' }
  };

  const config = stockConfig[stock];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
        isHighlighted ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
      } ${isRecommended ? 'ring-2 ring-blue-300' : ''}`}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Recommended
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span>{reviews} reviews</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Address & Distance */}
      <div className="flex items-start gap-2 mb-4 text-gray-600">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p>{address}</p>
          <p className="text-blue-600">{distance} km away</p>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500">Price</p>
          <p className="text-blue-600">₹{price.toFixed(2)}</p>
        </div>
        <div>
          <Badge className={`${config.color} rounded-lg px-3 py-1`}>
            {config.label}
          </Badge>
          <div className="mt-2">
            <Progress value={stockPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        <Badge variant={isOpen ? "default" : "secondary"} className={`rounded-lg ${isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {isOpen ? 'Open Now' : 'Closed'}
        </Badge>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation className="w-4 h-4 mr-1" />
          Navigate
        </Button>
        <Button
          variant="outline"
          className="rounded-xl border-gray-300 hover:bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Phone className="w-4 h-4 mr-1" />
          Call
        </Button>
        <Button
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          Reserve
        </Button>
      </div>
    </div>
  );
}
