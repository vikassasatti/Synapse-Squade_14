import { X, Pill } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SubstitutesModalProps {
  medicineName: string;
  onClose: () => void;
}

export function SubstitutesModal({ medicineName, onClose }: SubstitutesModalProps) {
  const substitutes = [
    {
      name: 'Paracetamol 500mg (Generic)',
      manufacturer: 'Various',
      price: 45.00,
      similarity: 100,
      stock: 'in-stock',
      description: 'Generic version with same active ingredient'
    },
    {
      name: 'Calpol 500mg',
      manufacturer: 'GlaxoSmithKline',
      price: 65.00,
      similarity: 95,
      stock: 'in-stock',
      description: 'Brand variant with same composition'
    },
    {
      name: 'Dolo 650mg',
      manufacturer: 'Micro Labs',
      price: 55.00,
      similarity: 85,
      stock: 'low-stock',
      description: 'Higher dosage alternative'
    },
    {
      name: 'Tylenol 500mg',
      manufacturer: 'Johnson & Johnson',
      price: 75.00,
      similarity: 95,
      stock: 'in-stock',
      description: 'International brand equivalent'
    },
    {
      name: 'Metacin 500mg',
      manufacturer: 'Sun Pharma',
      price: 48.00,
      similarity: 98,
      stock: 'in-stock',
      description: 'Cost-effective alternative'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Substitute Medicines</h2>
            <p className="text-gray-600">Alternative options for {medicineName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {substitutes.map((substitute, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Pill className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-gray-900">{substitute.name}</h3>
                      <p className="text-gray-500">{substitute.manufacturer}</p>
                    </div>

                    <p className="text-gray-600">{substitute.description}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1">
                        {substitute.similarity}% Chemical Similarity
                      </Badge>
                      <Badge className={`rounded-lg px-3 py-1 ${
                        substitute.stock === 'in-stock'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {substitute.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                      </Badge>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex-shrink-0 text-right space-y-3">
                    <div>
                      <p className="text-gray-500">Starting from</p>
                      <p className="text-blue-600">₹{substitute.price.toFixed(2)}</p>
                    </div>
                    <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
                      Find Nearby
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600">ℹ️</span>
            </div>
            <div>
              <p className="text-gray-700">Always consult your doctor before switching medicines</p>
              <p className="text-gray-500">Chemical similarity is calculated based on active ingredients and composition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
