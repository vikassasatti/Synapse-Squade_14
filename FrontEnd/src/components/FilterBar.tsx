import { Sparkles, DollarSign, MapPin, Package, SlidersHorizontal } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onShowSubstitutes: () => void;
  resultsCount: number;
}

export function FilterBar({ activeFilter, onFilterChange, onShowSubstitutes, resultsCount }: FilterBarProps) {
  const filters = [
    { id: 'recommended', label: 'Recommended', icon: Sparkles },
    { id: 'price', label: 'Lowest Price', icon: DollarSign },
    { id: 'distance', label: 'Nearest', icon: MapPin },
    { id: 'stock', label: 'In Stock', icon: Package }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
              {resultsCount} Results
            </Badge>
            <Button
              variant="outline"
              onClick={onShowSubstitutes}
              className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Show Substitute Medicines
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
