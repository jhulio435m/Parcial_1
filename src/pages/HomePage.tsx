import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/common/Button';
import { Calendar, Users, ChefHat, Star, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/6551145/pexels-photo-6551145.jpeg?auto=compress&cs=tinysrgb&w=1600')" 
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Experience Exceptional <span className="text-secondary-500">Fine Dining</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-200">
            Indulge in an unforgettable culinary journey with our exquisite menu and elegant atmosphere. Reserve your table today for a dining experience like no other.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/reserve')}
              className="px-8 py-3 text-lg"
            >
              Reserve a Table
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/menu')}
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-gray-900"
            >
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-semibold text-center mb-12 text-gray-900">
            Why Choose <span className="text-primary-500">Fine Dining</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-500 bg-opacity-10 p-4 rounded-full mb-4">
                <ChefHat className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-800">Exquisite Cuisine</h3>
              <p className="text-gray-600">
                Our award-winning chefs prepare exceptional dishes using only the finest seasonal ingredients, creating an unforgettable culinary experience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-500 bg-opacity-10 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-800">Elegant Atmosphere</h3>
              <p className="text-gray-600">
                Immerse yourself in our sophisticated ambiance, perfect for romantic dinners, special celebrations, and memorable business gatherings.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-500 bg-opacity-10 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-800">Easy Reservations</h3>
              <p className="text-gray-600">
                Our convenient online reservation system makes it simple to book your table, view availability, and manage your dining plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-500 rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div 
                className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1600')" 
                }}
              ></div>
              
              <div className="md:w-1/2 p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Reserve Your Table Today</h2>
                <p className="mb-6 text-white text-opacity-90">
                  Don't miss out on an exceptional dining experience. Make a reservation now to secure your preferred date and time.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    <span>Perfect for groups of all sizes</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>Special occasion packages available</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>Open 7 days a week for dinner</span>
                  </div>
                </div>
                
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/reserve')}
                  className="mt-8 text-gray-900"
                >
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-semibold text-center mb-12 text-gray-900">
            What Our Guests Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "An extraordinary dining experience from start to finish. The service was impeccable, and the food was absolutely divine. I'll definitely be coming back."
              </p>
              <div className="font-semibold text-gray-800">— Emily R.</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Perfect for our anniversary dinner. The ambiance was romantic, and the tasting menu with wine pairings was exceptional. Their reservation system made planning so easy."
              </p>
              <div className="font-semibold text-gray-800">— Michael & Sarah T.</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-secondary-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I hosted a business dinner here and was thoroughly impressed. The private dining area was elegant, and the staff accommodated our every need. Highly recommended."
              </p>
              <div className="font-semibold text-gray-800">— James L.</div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;