import React from 'react';
import { 
  Watch, Battery, Smartphone, Droplets, 
  Heart, Bell, Music, Palette
} from 'lucide-react';

const features = [
  {
    icon: <Watch className="w-6 h-6" />,
    title: "Premium Design",
    description: "Sleek aluminum alloy case with premium finish"
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "Long Battery Life",
    description: "Up to 10 days of usage on a single charge"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Universal Compatibility",
    description: "Works with iOS and Android devices"
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "IPX-6 Waterproof",
    description: "Protected against splashes and rain"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Health Monitoring",
    description: "24/7 heart rate and sleep tracking"
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Smart Notifications",
    description: "Stay connected with notification island"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Music Control",
    description: "Control playback directly from your wrist"
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Custom Watch Faces",
    description: "1000+ customizable watch faces"
  }
];

export function FeatureDescription() {
  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience Next-Level Smart Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Packed with advanced technology and premium features for an enhanced lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}