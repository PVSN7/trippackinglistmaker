import React, { useState, useEffect } from 'react';

const PackingListGenerator = () => {
  const [tripType, setTripType] = useState('');
  const [duration, setDuration] = useState('');
  const [destination, setDestination] = useState('');
  const [packingList, setPackingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const tripTypes = ['Business', 'Vacation', 'Adventure', 'Family Visit'];
  const durations = ['Weekend (1-3 days)', 'Short trip (4-7 days)', 'Long trip (1-2 weeks)', 'Extended (2+ weeks)'];
  
  const essentials = [
    { item: 'Passport/ID', category: 'essentials' },
    { item: 'Wallet with cash/cards', category: 'essentials' },
    { item: 'Phone and charger', category: 'essentials' },
    { item: 'Travel insurance details', category: 'essentials' },
    { item: 'Medications', category: 'essentials' }
  ];
  
  // Weather icon mapping
  const weatherIcons = {
    'Hot': '☀️',
    'Cold': '❄️',
    'Rainy': '🌧️',
    'Mild': '🌤️',
    'Varied': '🌦️'
  };
  
  useEffect(() => {
    if (packingList.length > 0 && !isLoading) {
      setShowList(true);
    }
  }, [packingList, isLoading]);
  
  // Simulated weather API function
  const fetchWeatherData = (destination) => {
    // This is a simulation - in a real app, you would integrate with a weather API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation of different weather patterns based on destination
        const destinations = {
          'hawaii': { condition: 'Rainy', temp: '75°F (24°C)', forecast: 'Rain expected for the next 2 weeks' },
          'alaska': { condition: 'Cold', temp: '20°F (-6°C)', forecast: 'Cold with possible snow' },
          'miami': { condition: 'Hot', temp: '85°F (29°C)', forecast: 'Sunny and humid' },
          'paris': { condition: 'Mild', temp: '65°F (18°C)', forecast: 'Partly cloudy with occasional rain' },
          'london': { condition: 'Rainy', temp: '60°F (15°C)', forecast: 'Frequent light rain expected' },
          'tokyo': { condition: 'Varied', temp: '70°F (21°C)', forecast: 'Mix of sun and rain' },
          'sydney': { condition: 'Hot', temp: '80°F (27°C)', forecast: 'Sunny and dry' },
          'new york': { condition: 'Varied', temp: '65°F (18°C)', forecast: 'Mild with variable conditions' },
          'cairo': { condition: 'Hot', temp: '90°F (32°C)', forecast: 'Hot and dry' },
          'bangkok': { condition: 'Hot', temp: '88°F (31°C)', forecast: 'Hot and humid with occasional rain' }
        };
        
        // Default weather if destination not found
        let weather = { condition: 'Varied', temp: '70°F (21°C)', forecast: 'Variable conditions expected' };
        
        // Check if destination exists in our simulation
        const destLower = destination.toLowerCase();
        for (const [key, value] of Object.entries(destinations)) {
          if (destLower.includes(key)) {
            weather = value;
            break;
          }
        }
        
        resolve(weather);
      }, 1000);
    });
  };
  
  const getItemCategory = (item) => {
    if (item.category) return item.category;
    return 'other';
  };
  
  const filteredPackingList = activeCategory === 'all' 
    ? packingList 
    : packingList.filter(item => getItemCategory(item) === activeCategory);
  
  const generatePackingList = async () => {
    if (!tripType || !duration || !destination) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setShowList(false);
    
    // Fetch weather data
    const weather = await fetchWeatherData(destination);
    setWeatherInfo(weather);
    
    // Generate packing list based on trip type, duration, and weather
    let newPackingList = [...essentials];
    
    // Add trip type specific items
    if (tripType === 'Business') {
      newPackingList = [...newPackingList,
        { item: 'Formal attire (suits/dresses)', category: 'clothing' },
        { item: 'Business cards', category: 'business' },
        { item: 'Laptop and charger', category: 'electronics' },
        { item: 'Notebook and pen', category: 'business' },
        { item: 'Portable presentation materials', category: 'business' }
      ];
    } else if (tripType === 'Vacation') {
      newPackingList = [...newPackingList,
        { item: 'Casual clothes', category: 'clothing' },
        { item: 'Swimwear', category: 'clothing' },
        { item: 'Beach towel', category: 'accessories' },
        { item: 'Sunglasses', category: 'accessories' },
        { item: 'Camera', category: 'electronics' },
        { item: 'Travel guide/maps', category: 'travel' }
      ];
    } else if (tripType === 'Adventure') {
      newPackingList = [...newPackingList,
        { item: 'Hiking boots/appropriate footwear', category: 'clothing' },
        { item: 'Backpack', category: 'accessories' },
        { item: 'Water bottle', category: 'accessories' },
        { item: 'Compass/GPS', category: 'travel' },
        { item: 'First aid kit', category: 'health' },
        { item: 'Multi-tool', category: 'accessories' }
      ];
    } else if (tripType === 'Family Visit') {
      newPackingList = [...newPackingList,
        { item: 'Casual clothes', category: 'clothing' },
        { item: 'Small gifts', category: 'personal' },
        { item: 'Family photos', category: 'personal' },
        { item: 'Games/entertainment', category: 'entertainment' },
        { item: 'Comfortable shoes', category: 'clothing' }
      ];
    }
    
    // Add duration specific items
    if (duration === 'Weekend (1-3 days)') {
      newPackingList = [...newPackingList,
        { item: '3 sets of clothes', category: 'clothing' },
        { item: 'Small toiletry bag', category: 'toiletries' }
      ];
    } else if (duration === 'Short trip (4-7 days)') {
      newPackingList = [...newPackingList,
        { item: '7 sets of clothes', category: 'clothing' },
        { item: 'Full toiletry kit', category: 'toiletries' },
        { item: 'Laundry bag', category: 'accessories' }
      ];
    } else if (duration === 'Long trip (1-2 weeks)') {
      newPackingList = [...newPackingList,
        { item: '10-14 sets of clothes', category: 'clothing' },
        { item: 'Full toiletry kit', category: 'toiletries' },
        { item: 'Laundry supplies', category: 'toiletries' },
        { item: 'Extra shoes', category: 'clothing' }
      ];
    } else if (duration === 'Extended (2+ weeks)') {
      newPackingList = [...newPackingList,
        { item: '14+ sets of clothes', category: 'clothing' },
        { item: 'Full toiletry kit', category: 'toiletries' },
        { item: 'Laundry supplies', category: 'toiletries' },
        { item: 'Extra shoes', category: 'clothing' },
        { item: 'Additional medications', category: 'health' }
      ];
    }
    
    // Add weather specific items based on API response
    if (weather.condition === 'Hot') {
      newPackingList = [...newPackingList,
        { item: 'Lightweight clothing', category: 'clothing' },
        { item: 'Hat/cap', category: 'accessories' },
        { item: 'Sunscreen', category: 'toiletries' },
        { item: 'Sunglasses', category: 'accessories' },
        { item: 'Insect repellent', category: 'toiletries' },
        { item: 'Cooling towel', category: 'accessories' },
        { item: 'Refillable water bottle', category: 'accessories' }
      ];
    } else if (weather.condition === 'Cold') {
      newPackingList = [...newPackingList,
        { item: 'Warm jacket/coat', category: 'clothing' },
        { item: 'Sweaters/layers', category: 'clothing' },
        { item: 'Gloves', category: 'accessories' },
        { item: 'Hat', category: 'accessories' },
        { item: 'Scarf', category: 'accessories' },
        { item: 'Thermal underwear', category: 'clothing' },
        { item: 'Warm socks', category: 'clothing' },
        { item: 'Lip balm', category: 'toiletries' }
      ];
    } else if (weather.condition === 'Rainy') {
      newPackingList = [...newPackingList,
        { item: 'Waterproof jacket/raincoat', category: 'clothing' },
        { item: 'Umbrella', category: 'accessories' },
        { item: 'Waterproof footwear', category: 'clothing' },
        { item: 'Quick-dry clothing', category: 'clothing' },
        { item: 'Plastic bags for wet items', category: 'accessories' },
        { item: 'Waterproof phone case', category: 'electronics' },
        { item: 'Extra socks', category: 'clothing' }
      ];
    } else if (weather.condition === 'Mild') {
      newPackingList = [...newPackingList,
        { item: 'Light jacket/sweater', category: 'clothing' },
        { item: 'Mix of short and long sleeves', category: 'clothing' },
        { item: 'Light scarf', category: 'accessories' },
        { item: 'Comfortable walking shoes', category: 'clothing' }
      ];
    } else if (weather.condition === 'Varied') {
      newPackingList = [...newPackingList,
        { item: 'Layerable clothing', category: 'clothing' },
        { item: 'Light jacket', category: 'clothing' },
        { item: 'Rain gear', category: 'accessories' },
        { item: 'Hat/cap', category: 'accessories' },
        { item: 'Sunscreen', category: 'toiletries' },
        { item: 'Umbrella', category: 'accessories' },
        { item: 'Versatile footwear', category: 'clothing' }
      ];
    }
    
    // Remove duplicates (comparing item names)
    const uniqueItems = [];
    const seen = new Set();
    for (const itemObj of newPackingList) {
      if (!seen.has(itemObj.item)) {
        seen.add(itemObj.item);
        uniqueItems.push(itemObj);
      }
    }
    
    setPackingList(uniqueItems);
    setIsLoading(false);
  };
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(packingList.map(item => getItemCategory(item)))];
  
  // Generate category color
  const getCategoryColor = (category) => {
    const colorMap = {
      'essentials': 'bg-purple-100 text-purple-800',
      'clothing': 'bg-blue-100 text-blue-800',
      'toiletries': 'bg-green-100 text-green-800',
      'electronics': 'bg-yellow-100 text-yellow-800',
      'accessories': 'bg-pink-100 text-pink-800',
      'health': 'bg-red-100 text-red-800',
      'business': 'bg-gray-100 text-gray-800',
      'personal': 'bg-indigo-100 text-indigo-800',
      'entertainment': 'bg-orange-100 text-orange-800',
      'travel': 'bg-teal-100 text-teal-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg transition-all duration-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Packing List Generator</h1>
        <p className="text-gray-600">Smart recommendations based on your destination's weather</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type of Visit</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="">Select type</option>
            {tripTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="p-4 bg-white rounded shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration of Travel</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Select duration</option>
            {durations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        
        <div className="p-4 bg-white rounded shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Hawaii, Paris, Tokyo"
          />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <button 
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
          onClick={generatePackingList}
        >
          Generate Packing List
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-12 animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Analyzing your destination's weather patterns...</p>
          <p className="text-gray-500">Building your personalized packing recommendations</p>
        </div>
      )}
      
      {showList && packingList.length > 0 && !isLoading && weatherInfo && (
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-500 animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Your Travel Essentials</h2>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-3">{weatherIcons[weatherInfo.condition] || '🌍'}</span>
              <h3 className="text-lg font-medium text-blue-700">Weather in {destination}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Condition:</span> 
                <span className="ml-2 px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{weatherInfo.condition}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Temperature:</span> <span className="text-gray-800">{weatherInfo.temp}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Forecast:</span> <span className="text-gray-800">{weatherInfo.forecast}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <span className="text-lg font-medium text-gray-700 mr-2">Trip Details:</span>
              <span className="px-3 py-1 mr-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">{tripType}</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">{duration}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            {filteredPackingList.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start p-2 rounded-md transition-all duration-300 transform hover:bg-blue-50 hover:shadow-sm animate-fadeIn"
                style={{animationDelay: `${index * 50}ms`}}
              >
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full mr-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="flex-1">
                  <span className="text-gray-800">{item.item}</span>
                  {item.category && (
                    <span className={`ml-2 inline-block px-2 py-0.5 text-xs rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">This packing list is customized based on your travel parameters and current weather conditions at {destination}. Safe travels!</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PackingListGenerator;
