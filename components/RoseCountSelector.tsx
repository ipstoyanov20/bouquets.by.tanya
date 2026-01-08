'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface RoseCountSelectorProps {
  value: number;
  onChange: (count: number) => void;
  min?: number;
  max?: number;
}

export function RoseCountSelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 100 
}: RoseCountSelectorProps) {
  const [manualMode, setManualMode] = useState(false);
  const presets = [3, 7, 11, 17, 21, 33, 50, 99];

  const handlePresetClick = (count: number) => {
    onChange(count);
    setManualMode(false);
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    } else if (e.target.value === '') {
      onChange(min);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preset Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Брой рози
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((count) => (
            <button
              key={count}
              onClick={() => handlePresetClick(count)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${!manualMode && value === count
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Или изберете ръчно ({min}-{max})
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={value <= min}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Намали"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            onFocus={() => setManualMode(true)}
            min={min}
            max={max}
            className={`
              w-20 px-3 py-2 text-center border rounded-lg font-semibold
              ${manualMode
                ? 'border-rose-600 ring-2 ring-rose-200'
                : 'border-gray-300'
              }
              focus:outline-none focus:border-rose-600 focus:ring-2 focus:ring-rose-200
            `}
          />
          
          <button
            onClick={handleIncrement}
            disabled={value >= max}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Увеличи"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
