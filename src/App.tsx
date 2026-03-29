/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Leaf, 
  IceCream, 
  Star, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight, 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Clock, 
  Phone,
  ChevronRight,
  ShoppingBag,
  Award
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isBestSeller?: boolean;
  isLimited?: boolean;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  // Coffee & Espresso
  { name: "Espresso", description: "Rich, intense Italian roast with a golden crema.", price: "$3.50", category: "Coffee & Espresso", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=400" },
  { name: "Americano", description: "Espresso shots topped with hot water for a smooth finish.", price: "$4.00", category: "Coffee & Espresso", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400" },
  { name: "Cappuccino", description: "Equal parts espresso, steamed milk, and airy foam.", price: "$4.50", category: "Coffee & Espresso", isBestSeller: true, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400" },
  { name: "Flat White", description: "Velvety micro-foam poured over a double shot of espresso.", price: "$4.75", category: "Coffee & Espresso", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400" },
  { name: "Latte", description: "Creamy espresso balanced with perfectly steamed milk.", price: "$4.50", category: "Coffee & Espresso", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400" },
  { name: "Iced Coffee", description: "Chilled espresso served over ice for a crisp caffeine kick.", price: "$4.25", category: "Coffee & Espresso", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400" },
  
  // Specialty Drinks
  { name: "Matcha Latte", description: "Premium grade Japanese matcha whisked with creamy milk.", price: "$5.50", category: "Specialty Drinks", isBestSeller: true, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400" },
  { name: "Iced Matcha", description: "Refreshing whisked matcha served over ice.", price: "$5.50", category: "Specialty Drinks", image: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=400" },
  { name: "Spanish Latte", description: "Sweetened condensed milk meets bold espresso.", price: "$5.25", category: "Specialty Drinks", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400" },
  { name: "Caramel Latte", description: "Our classic latte infused with rich buttery caramel.", price: "$5.00", category: "Specialty Drinks", image: "https://images.unsplash.com/photo-1595434066389-01303c744f02?auto=format&fit=crop&q=80&w=400" },
  { name: "Vanilla Latte", description: "Smooth espresso with a hint of Madagascar vanilla.", price: "$5.00", category: "Specialty Drinks", image: "https://images.unsplash.com/photo-1572286258217-31582113f49c?auto=format&fit=crop&q=80&w=400" },
  { name: "Mocha", description: "Espresso and dark chocolate blended with steamed milk.", price: "$5.25", category: "Specialty Drinks", image: "https://images.unsplash.com/photo-1544787210-2213d64ad977?auto=format&fit=crop&q=80&w=400" },
  
  // Cold & Refreshing
  { name: "Iced Latte", description: "The classic latte, chilled to perfection.", price: "$4.75", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400" },
  { name: "Cold Brew", description: "12-hour slow-steeped coffee for ultimate smoothness.", price: "$5.00", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400" },
  { name: "Frappé", description: "Blended coffee treat topped with whipped cream.", price: "$5.50", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400" },
  { name: "Iced Tea (Peach)", description: "House-brewed tea with a sweet peach infusion.", price: "$4.50", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400" },
  { name: "Iced Tea (Lemon)", description: "Zesty and refreshing classic lemon iced tea.", price: "$4.50", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400" },
  { name: "Iced Tea (Hibiscus)", description: "Floral and tart hibiscus tea, naturally caffeine-free.", price: "$4.50", category: "Cold & Refreshing", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400" },
  
  // Signature Drinks
  { name: "Napoli Special Latte", description: "Our secret blend of spices and premium Italian espresso.", price: "$6.50", category: "Signature Drinks", isBestSeller: true, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400" },
  { name: "Pistachio Matcha", description: "Earthy matcha layered with sweet pistachio cream.", price: "$6.75", category: "Signature Drinks", isLimited: true, image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=400" },
  { name: "Hazelnut Cream Cold Brew", description: "Smooth cold brew topped with a nutty hazelnut cold foam.", price: "$6.25", category: "Signature Drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400" },
  { name: "Strawberry Matcha Fusion", description: "Vibrant matcha layered over fresh strawberry purée.", price: "$6.50", category: "Signature Drinks", isBestSeller: true, image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400" },
];

const ADD_ONS = [
  { name: "Oat Milk / Almond Milk", price: "+$0.75" },
  { name: "Flavors (Vanilla, Caramel, Hazelnut)", price: "+$0.50" },
  { name: "Extra Espresso Shot", price: "+$1.00" },
];

const REVIEWS = [
  { name: "Sofia R.", role: "Lifestyle Blogger", text: "The Pistachio Matcha is a literal dream. The most aesthetic cafe in the city, hands down.", rating: 5 },
  { name: "Marco V.", role: "Coffee Enthusiast", text: "Finally, a place that understands Italian espresso culture but makes it modern. The Napoli Special is a must-try.", rating: 5 },
  { name: "Elena G.", role: "Digital Nomad", text: "Perfect vibes for working and the Spanish Latte is the best I've ever had. 10/10.", rating: 5 },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2">
          <span className="bg-brand-espresso text-brand-cream px-2 py-0.5 rounded">ME</span>
          <span className="text-brand-espresso">NAPOLI</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Menu', 'Story', 'Experience', 'Visit'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="#menu" className="bg-brand-espresso text-brand-cream px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-gold transition-all duration-300">
            Order Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-espresso" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-cream shadow-xl py-10 px-6 md:hidden flex flex-col gap-6 items-center"
          >
            {['Menu', 'Story', 'Experience', 'Visit'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-xl font-serif">
                {item}
              </a>
            ))}
            <button className="w-full bg-brand-espresso text-brand-cream py-4 rounded-xl font-medium">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Coffee" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-espresso/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-brand-gold font-medium tracking-[0.3em] uppercase text-sm mb-6">
            L'Arte del Bere Moderno
          </span>
          <h1 className="text-5xl md:text-8xl text-brand-cream font-serif leading-[1.1] mb-8">
            Elevate Your <br />
            <span className="italic">Daily Ritual</span>
          </h1>
          <p className="text-brand-cream/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Experience the fusion of Italian tradition and modern urban lifestyle. 
            Premium matcha, artisanal espresso, and signature blends crafted for the bold.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#menu" className="w-full sm:w-auto bg-brand-gold text-brand-espresso px-10 py-4 rounded-full font-semibold text-lg hover:bg-brand-cream transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group">
              Order Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#menu" className="w-full sm:w-auto border border-brand-cream text-brand-cream px-10 py-4 rounded-full font-semibold text-lg hover:bg-brand-cream hover:text-brand-espresso transition-all duration-300 flex items-center justify-center">
              Explore Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center justify-center w-32 h-32 bg-brand-cream rounded-full border-2 border-brand-gold text-brand-espresso p-4 text-center shadow-2xl rotate-12"
      >
        <span className="text-[10px] uppercase tracking-tighter font-bold">Voted Best</span>
        <span className="text-xs font-serif italic">Matcha Latte</span>
        <span className="text-[10px] uppercase tracking-tighter font-bold">2025</span>
      </motion.div>
    </section>
  );
};

const BrandStory = () => {
  return (
    <section id="story" className="py-24 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                alt="ME Napoli Vibe" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 aspect-square rounded-2xl overflow-hidden border-8 border-brand-cream shadow-2xl hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=500" 
                alt="Latte Art" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-brand-gold font-semibold tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              From Napoli with <br />
              <span className="italic text-brand-gold">Modern Soul</span>
            </h2>
            <p className="text-lg text-brand-espresso/80 leading-relaxed font-light">
              ME Napoli was born from a simple obsession: bringing the effortless elegance of Italian coffee culture to the modern urban explorer. We don't just serve drinks; we curate experiences.
            </p>
            <p className="text-lg text-brand-espresso/80 leading-relaxed font-light">
              Whether it's our meticulously sourced Japanese matcha or our signature Italian espresso roast, every ingredient is chosen for its ability to transform your moment into something extraordinary.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-3xl font-serif text-brand-gold">100%</h4>
                <p className="text-xs uppercase tracking-widest font-bold mt-2">Artisanal Sourcing</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-brand-gold">24/7</h4>
                <p className="text-xs uppercase tracking-widest font-bold mt-2">Vibrant Energy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BestSellersSection = () => {
  const bestSellers = MENU_ITEMS.filter(item => item.isBestSeller);

  return (
    <section id="best-sellers" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-semibold tracking-widest uppercase text-sm">Most Loved</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-4 italic">Best Sellers</h2>
          <p className="text-brand-espresso/60 font-light max-w-xl mx-auto">Our community's top picks, crafted to perfection every single time.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-gold text-brand-espresso px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Popular
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif">{item.name}</h3>
                  <span className="text-brand-gold font-serif">{item.price}</span>
                </div>
                <p className="text-xs text-brand-espresso/60 font-light line-clamp-2">{item.description}</p>
                <button className="w-full mt-4 py-2 border border-brand-espresso rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-espresso hover:text-brand-cream transition-all">
                  Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = ["Coffee & Espresso", "Specialty Drinks", "Cold & Refreshing", "Signature Drinks"];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-semibold tracking-widest uppercase text-sm">The Collection</span>
          <h2 className="text-4xl md:text-6xl font-serif mt-4 mb-8 italic">Artisanal Beverages</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-2 text-sm uppercase tracking-widest font-bold transition-all duration-300 border-b-2 ${activeCategory === cat ? 'border-brand-gold text-brand-espresso' : 'border-transparent text-brand-espresso/40 hover:text-brand-espresso'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(item => item.category === activeCategory).map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex gap-6 items-center border-b border-brand-cream pb-8"
              >
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-serif group-hover:text-brand-gold transition-colors">{item.name}</h3>
                      {item.isBestSeller && (
                        <span className="bg-brand-gold/10 text-brand-gold text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Best Seller</span>
                      )}
                      {item.isLimited && (
                        <span className="bg-brand-espresso text-brand-cream text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Limited</span>
                      )}
                    </div>
                    <div className="text-lg font-serif text-brand-gold">{item.price}</div>
                  </div>
                  <p className="text-sm text-brand-espresso/60 font-light leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add-ons */}
        <div className="mt-20 bg-brand-cream p-8 md:p-12 rounded-3xl">
          <h3 className="text-2xl font-serif mb-8 text-center">Customize Your Drink</h3>
          <div className="flex flex-wrap justify-center gap-10">
            {ADD_ONS.map((addon) => (
              <div key={addon.name} className="flex items-center gap-4">
                <span className="text-sm font-medium uppercase tracking-widest">{addon.name}</span>
                <span className="text-brand-gold font-serif">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SignatureExperience = () => {
  const features = [
    { icon: <Award className="text-brand-gold" size={32} />, title: "Premium Sourcing", desc: "We use only the highest grade Japanese matcha and Italian-roasted beans." },
    { icon: <Star className="text-brand-gold" size={32} />, title: "Unique Flavors", desc: "Our signature blends are developed in-house to surprise your palate." },
    { icon: <Instagram className="text-brand-gold" size={32} />, title: "Aesthetic Design", desc: "Every drink is a masterpiece, designed to look as good as it tastes." },
  ];

  return (
    <section id="experience" className="py-24 bg-brand-espresso text-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">The Napoli Experience</h2>
          <p className="text-brand-cream/60 max-w-2xl mx-auto font-light">What makes us the city's favorite destination for specialty beverages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center space-y-6"
            >
              <div className="flex justify-center">{f.icon}</div>
              <h3 className="text-2xl font-serif">{f.title}</h3>
              <p className="text-brand-cream/70 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VisualGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold font-semibold tracking-widest uppercase text-sm">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2">Aesthetic Sips</h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
            Follow Us @MENapoli <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={img} alt="Drink" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic">Loved by the Community</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="p-8 rounded-3xl bg-brand-cream/50 space-y-4">
              <div className="flex gap-1 text-brand-gold">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-brand-espresso/80 italic font-light leading-relaxed">"{rev.text}"</p>
              <div>
                <p className="font-bold text-sm uppercase tracking-widest">{rev.name}</p>
                <p className="text-xs text-brand-gold font-medium">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-24 bg-brand-gold relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cream/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-serif text-brand-espresso mb-10">
          Ready for your <br />
          <span className="italic">Napoli moment?</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto bg-brand-espresso text-brand-cream px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
            Order Your Drink Now
          </button>
          <button className="w-full sm:w-auto border-2 border-brand-espresso text-brand-espresso px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-espresso hover:text-brand-cream transition-all">
            Visit Us Today
          </button>
        </div>
        <p className="mt-8 text-brand-espresso/60 font-medium uppercase tracking-[0.3em] text-xs">
          Open Daily 7:00 AM — 10:00 PM
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="visit" className="bg-brand-espresso text-brand-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <a href="#" className="text-3xl font-serif font-bold tracking-tighter flex items-center gap-2">
              <span className="bg-brand-cream text-brand-espresso px-2 py-0.5 rounded">ME</span>
              <span>NAPOLI</span>
            </a>
            <p className="text-brand-cream/50 font-light text-sm leading-relaxed">
              Premium Italian-inspired beverages for the modern lifestyle. Experience the art of drinking.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif">Quick Links</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm font-light">
              <li><a href="#menu" className="hover:text-brand-gold transition-colors">Menu</a></li>
              <li><a href="#story" className="hover:text-brand-gold transition-colors">Our Story</a></li>
              <li><a href="#experience" className="hover:text-brand-gold transition-colors">Experience</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Order Online</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif">Visit Us</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>123 Urban Piazza, <br />Milano District, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+1 (555) 012-3456</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-brand-gold shrink-0" />
                <span>Mon-Sun: 7am - 10pm</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-serif">Newsletter</h4>
            <p className="text-brand-cream/60 text-sm font-light">Join the club for exclusive offers and new drink alerts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-gold"
              />
              <button className="bg-brand-gold text-brand-espresso px-4 py-2 rounded-lg font-bold text-sm">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:row justify-between items-center gap-4 text-xs text-brand-cream/40 uppercase tracking-widest font-bold">
          <p>© 2026 ME Napoli. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-0 w-full z-40 px-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex justify-center md:justify-end">
            <button className="pointer-events-auto bg-brand-espresso text-brand-cream px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:bg-brand-gold transition-all duration-300 group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-sm">Order Now</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold/30 selection:text-brand-espresso">
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <BestSellersSection />
        <MenuSection />
        <SignatureExperience />
        <VisualGallery />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
