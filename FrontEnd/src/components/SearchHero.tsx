import { Search, Camera, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  onUploadClick: () => void;
}

export function SearchHero({ onSearch, onUploadClick }: SearchHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  // Floating elements animation
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-300/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Medicine Finder</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-white text-4xl lg:text-6xl leading-tight">
                Find Medicine,{' '}
                <span className="relative inline-block">
                  <motion.span
                    className="relative z-10 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0%', '100%', '0%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    Compare Prices
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-300/30 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
                , Save Money
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-blue-100 text-lg"
              >
                Get AI-powered recommendations for nearby pharmacies with real-time pricing and availability
              </motion.p>
            </motion.div>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <motion.div
                className="relative"
                animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search medicine name or upload prescription"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="pl-14 pr-4 py-7 rounded-2xl bg-white shadow-2xl border-0 focus:ring-4 focus:ring-white/30 text-lg"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 -z-10"
                  animate={isFocused ? { opacity: 0.1, scale: 1.05 } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <div className="flex gap-4">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-7 rounded-2xl bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Medicine
                  </Button>
                </motion.div>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={onUploadClick}
                    className="w-full py-7 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500 border-0 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Scan Prescription
                  </Button>
                </motion.div>
              </div>
            </motion.form>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              {[
                { value: '5000+', label: 'Pharmacies', icon: TrendingUp },
                { value: '50K+', label: 'Medicines', icon: Shield },
                { value: '99%', label: 'Accuracy', icon: Zap }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                >
                  <stat.icon className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                  <div className="text-white text-xl">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Floating Pills */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl shadow-2xl transform rotate-12"
            />
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 1 }
              }}
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-2xl"
            />
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 2 }
              }}
              className="absolute top-1/3 -right-5 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-2xl transform -rotate-12"
            />

            {/* Main Illustration Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-white/30 rounded-full w-32 mb-2" />
                    <div className="h-2 bg-white/20 rounded-full w-24" />
                  </div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-3 bg-white/40 rounded-full w-24" />
                        <div className="h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-16" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-2 bg-white/30 rounded-full flex-1" />
                        <div className="h-2 bg-white/30 rounded-full flex-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pulse indicator */}
                <motion.div
                  className="flex items-center gap-2 text-white"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-white/80">Live Updates</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 lg:h-24"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
