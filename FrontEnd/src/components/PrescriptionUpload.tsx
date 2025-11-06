import { useState } from 'react';
import { Upload, X, Camera, Loader2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PrescriptionUploadProps {
  onClose: () => void;
  onConfirm: (medicines: string[]) => void;
}

export function PrescriptionUpload({ onClose, onConfirm }: PrescriptionUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [detectedMedicines, setDetectedMedicines] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsAnalyzed(true);
        setDetectedMedicines([
          'Paracetamol 500mg',
          'Amoxicillin 250mg',
          'Vitamin D3 1000IU'
        ]);
      }, 2500);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const removeMedicine = (index: number) => {
    setDetectedMedicines(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    if (detectedMedicines.length > 0) {
      onConfirm(detectedMedicines);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Upload Prescription</h2>
            <p className="text-gray-600">AI will extract medicine names automatically</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 space-y-6">
          {!isAnalyzed && !isAnalyzing && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700">Drag and drop your prescription here</p>
                  <p className="text-gray-500">or</p>
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    Choose File
                  </div>
                </label>
                <p className="text-gray-400">Supports: JPG, PNG, PDF</p>
              </div>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
              <div className="text-center">
                <p className="text-gray-900">Analyzing prescription...</p>
                <p className="text-gray-500">AI is extracting medicine names</p>
              </div>
            </div>
          )}

          {/* Analyzed State */}
          {isAnalyzed && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <span>Prescription analyzed successfully</span>
              </div>

              <div>
                <label className="text-gray-700">Detected Medicines (editable)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detectedMedicines.map((medicine, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg"
                    >
                      {medicine}
                      <button
                        onClick={() => removeMedicine(index)}
                        className="ml-2 hover:text-blue-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleConfirm}
                className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                Confirm & Search Nearby Availability
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
