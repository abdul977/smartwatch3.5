import React from 'react'; 
import { ProductHeader } from '../components/ProductHeader'; 
import { ProductGallery } from '../components/ProductGallery'; 
import { PriceSection } from '../components/PriceSection'; 
import { ProductFeatures } from '../components/ProductFeatures'; 
import { Reviews } from '../components/Reviews'; 
import { ReviewForm } from '../components/ReviewForm'; 
import { FAQ } from '../components/FAQ'; 
import { StickyOrderBar } from '../components/StickyOrderBar'; 
import { TimerSection } from '../components/TimerSection'; 
import { VideoCarousel } from '../components/VideoCarousel';  

export function Landing() { 
  return ( 
    <div className="min-h-screen bg-gray-100 pb-32"> 
      <TimerSection /> 
      <ProductHeader />              
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-4xl xl:max-w-6xl"> 
        <div className="lg:grid lg:grid-cols-2 lg:gap-8"> 
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden"> 
            <ProductGallery /> 
          </div>                      
          <div className="mt-6 lg:mt-0"> 
            <div className="bg-white rounded-2xl shadow-sm"> 
              <PriceSection /> 
            </div> 
          </div> 
        </div>                  

        <div className="mt-8 space-y-6"> 
          {/* Move VideoCarousel here */}
          <div className="bg-white rounded-2xl shadow-sm">
            <VideoCarousel />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <ProductFeatures />
          </div>

          <div className="bg-white rounded-2xl shadow-sm"> 
            <Reviews /> 
          </div>                      

          <div className="bg-white rounded-2xl shadow-sm"> 
            <ReviewForm /> 
          </div> 

          <div className="bg-white rounded-2xl shadow-sm"> 
            <FAQ /> 
          </div> 
        </div> 
      </div>              
      <StickyOrderBar /> 
    </div> 
  ); 
}
