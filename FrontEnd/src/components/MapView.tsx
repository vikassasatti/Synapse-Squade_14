import { MapPin, Navigation } from 'lucide-react';

interface MapMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
  price: number;
}

interface MapViewProps {
  markers: MapMarker[];
  highlightedId?: number;
  onMarkerClick: (id: number) => void;
}

export function MapView({ markers, highlightedId, onMarkerClick }: MapViewProps) {
  const stockColors = {
    'in-stock': '#10B981',
    'low-stock': '#F59E0B',
    'out-of-stock': '#EF4444'
  };

  return (
    <div className="h-full bg-gray-100 rounded-2xl overflow-hidden relative">
      {/* Map Background with Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Map Content */}
      <div className="relative h-full p-8">
        <div className="absolute top-4 left-4 right-4 bg-white rounded-xl shadow-md p-4 z-10">
          <div className="flex items-center gap-2 text-gray-700">
            <Navigation className="w-5 h-5 text-blue-600" />
            <span>Interactive Map View</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-20 right-4 bg-white rounded-xl shadow-md p-4 space-y-2 z-10">
          <p className="text-gray-700">Stock Status</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-600">Low Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-600">Out of Stock</span>
            </div>
          </div>
        </div>

        {/* Map Markers */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 800 600" className="max-w-full max-h-full">
            {/* Road lines */}
            <line x1="100" y1="300" x2="700" y2="300" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="400" y1="50" x2="400" y2="550" stroke="#cbd5e1" strokeWidth="2" />

            {/* Pharmacy Markers */}
            {markers.map((marker, index) => {
              const x = 200 + (index % 3) * 200;
              const y = 150 + Math.floor(index / 3) * 200;
              const isHighlighted = highlightedId === marker.id;
              const color = stockColors[marker.stock];

              return (
                <g
                  key={marker.id}
                  onClick={() => onMarkerClick(marker.id)}
                  className="cursor-pointer transition-transform hover:scale-110"
                  transform={`translate(${x}, ${y})`}
                >
                  {/* Pulse effect for highlighted */}
                  {isHighlighted && (
                    <circle
                      r="30"
                      fill={color}
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}
                  
                  {/* Pin */}
                  <path
                    d="M0,-25 C-10,-25 -18,-17 -18,-7 C-18,2 0,20 0,20 C0,20 18,2 18,-7 C18,-17 10,-25 0,-25 Z"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    className={isHighlighted ? 'drop-shadow-lg' : 'drop-shadow'}
                  />
                  
                  {/* Inner circle */}
                  <circle
                    r="5"
                    cy="-10"
                    fill="white"
                  />

                  {/* Price label */}
                  <g transform="translate(0, 30)">
                    <rect
                      x="-25"
                      y="-10"
                      width="50"
                      height="20"
                      rx="10"
                      fill="white"
                      stroke={color}
                      strokeWidth="2"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fontSize="12"
                      fontWeight="600"
                      fill={color}
                    >
                      ₹{marker.price}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* User location */}
            <g transform="translate(400, 300)">
              <circle r="15" fill="#2563EB" opacity="0.2" />
              <circle r="8" fill="#2563EB" />
              <circle r="3" fill="white" />
            </g>
          </svg>
        </div>

        {/* User location label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
          Your Location
        </div>
      </div>
    </div>
  );
}
