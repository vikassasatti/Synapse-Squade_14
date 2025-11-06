import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FilterBar } from './FilterBar';
import { PharmacyCard } from './PharmacyCard';
import { MapView } from './MapView';
import { SubstitutesModal } from './SubstitutesModal';

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
  lat: number;
  lng: number;
}

interface ResultsPageProps {
  searchQuery: string;
  pharmacies: Pharmacy[];
  onBack: () => void;
  onPharmacyClick: (pharmacy: Pharmacy) => void;
}

export function ResultsPage({ searchQuery, pharmacies, onBack, onPharmacyClick }: ResultsPageProps) {
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [highlightedId, setHighlightedId] = useState<number | undefined>();
  const [showSubstitutes, setShowSubstitutes] = useState(false);

  const sortedPharmacies = [...pharmacies].sort((a, b) => {
    switch (activeFilter) {
      case 'price':
        return a.price - b.price;
      case 'distance':
        return a.distance - b.distance;
      case 'stock':
        return b.stockPercentage - a.stockPercentage;
      case 'recommended':
      default:
        return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
    }
  });

  const mapMarkers = pharmacies.map(p => ({
    id: p.id,
    name: p.name,
    lat: p.lat,
    lng: p.lng,
    stock: p.stock,
    price: p.price
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900">Results for "{searchQuery}"</h1>
              <p className="text-gray-600">Found {pharmacies.length} nearby pharmacies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onShowSubstitutes={() => setShowSubstitutes(true)}
        resultsCount={pharmacies.length}
      />

      {/* Main Content - Split View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - List View */}
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
            {sortedPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                onMouseEnter={() => setHighlightedId(pharmacy.id)}
                onMouseLeave={() => setHighlightedId(undefined)}
              >
                <PharmacyCard
                  {...pharmacy}
                  onClick={() => onPharmacyClick(pharmacy)}
                  isHighlighted={highlightedId === pharmacy.id}
                />
              </div>
            ))}
          </div>

          {/* Right Panel - Map View */}
          <div className="hidden lg:block sticky top-32 h-[calc(100vh-280px)]">
            <MapView
              markers={mapMarkers}
              highlightedId={highlightedId}
              onMarkerClick={(id) => {
                const pharmacy = pharmacies.find(p => p.id === id);
                if (pharmacy) {
                  setHighlightedId(id);
                  // Scroll to pharmacy card
                  const element = document.getElementById(`pharmacy-${id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Substitutes Modal */}
      {showSubstitutes && (
        <SubstitutesModal
          medicineName={searchQuery}
          onClose={() => setShowSubstitutes(false)}
        />
      )}
    </div>
  );
}
