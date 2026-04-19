// Toggle mobile menu (hamburger)
  (function(){
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  })();

  // Share button (Web Share API with clipboard fallback)
  (function(){
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) return;
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: document.title,
        text: 'SG Mobile Fix Setia Alam',
        url: location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(location.href);
          alert('Link telah disalin ke papan keratan.');
          return;
        }
        // fallback copy
        const tmp = document.createElement('input');
        document.body.appendChild(tmp);
        tmp.value = location.href;
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
        alert('Link telah disalin ke papan keratan.');
      } catch (err) {
        console.error('Share failed:', err);
        alert('Tidak dapat kongsi pautan — cuba salin secara manual.');
      }
    });
  })();

// =========================================
// 📌 Library css tailwind 
// =========================================

    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#1e3a8a',
            secondary: '#f97316',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    };


// ========================================
// 📌 navbar butang share & humburger
// ========================================
// FIX: Wait for DOM to be fully loaded

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const shareBtn = document.getElementById('share-btn');
  
  // DEBUG: Check if elements exist
  console.log('hamburger:', hamburger);
  console.log('mobileMenu:', mobileMenu);
  console.log('mobileMenuLinks:', mobileMenuLinks.length);
  console.log('shareBtn:', shareBtn);
  
  // Add null checking for safety
  if (!hamburger) {
    console.error('ERROR: Element #hamburger tidak ditemukan!');
    return;
  }
  
  if (!mobileMenu) {
    console.error('ERROR: Element #mobile-menu tidak ditemukan!');
    return;
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    const icon = hamburger.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.replace('fa-times', 'fa-bars');
      // Remove event listener for outside click
      document.removeEventListener('click', handleClickOutside);
    } else {
      icon.classList.replace('fa-bars', 'fa-times');
      // Add event listener for outside click
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 10);
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    const icon = hamburger.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
    document.removeEventListener('click', handleClickOutside);
  }
  
  // Handle click outside mobile menu
  function handleClickOutside(event) {
    // If click is outside mobile menu AND outside hamburger button
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMobileMenu();
    }
  }
  
  // Event listeners - ONLY ADD IF ELEMENT EXISTS
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    toggleMobileMenu();
  });
  
  // Close menu when any link is clicked (for mobile)
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Only close on mobile screens
      if (window.innerWidth < 768) {
        closeMobileMenu();
      }
    });
  });
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchor links (not external links)
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close mobile menu first
          if (window.innerWidth < 768) {
            closeMobileMenu();
          }
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Share functionality - check if shareBtn exists
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: 'SG Mobile Fix Setia Alam',
          text: 'Kedai servis telefon terbaik di Setia Alam',
          url: window.location.href
        });
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        
        // Show temporary notification
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Link Disalin!';
        shareBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.classList.remove('bg-green-500');
        }, 2000);
      }
    });
  }
  
  // Close menu on window resize (if resized to desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove('hidden');
      const icon = hamburger.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
      document.removeEventListener('click', handleClickOutside);
    } else if (!mobileMenu.classList.contains('hidden')) {
      // If mobile menu is open and window is resized to mobile, keep click outside listener
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 10);
    }
  });
});


// =======================================
// 📌 menu senarai perkhidmatan 
// ======================================= 

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));
        filterButtons.forEach(btn => btn.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-800'));
        
        this.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-800');
        this.classList.add('active', 'bg-primary', 'text-white');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter service cards
        serviceCards.forEach(card => {
          const categories = card.getAttribute('data-category');
          
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.display = 'block';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
    
    // WhatsApp button animation
    const whatsappBtn = document.querySelector('a[href*="wa.me"]');
    whatsappBtn.addEventListener('mouseenter', function() {
      this.querySelector('i').style.transform = 'scale(1.2)';
    });
    whatsappBtn.addEventListener('mouseleave', function() {
      this.querySelector('i').style.transform = 'scale(1)';
    });
  });



// =========================================
// 📌 sistem tema & multi bahasa
// =========================================

// JavaScript: Theme, Language & PWA
// ========== THEME SYSTEM ==========
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check saved theme or system preference
let currentTheme = localStorage.getItem('theme') || 
                   (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme
function applyTheme(theme) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(currentTheme);

// Toggle theme
themeToggle.addEventListener('click', (e) => {
  e.preventDefault();
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});

// ========== LANGUAGE SYSTEM ==========
const languageToggle = document.getElementById('language-toggle');
const languageText = document.getElementById('language-text');

// Language data (extend this for all text on page)
const translations = {
  en: {
    // Navigation
    'navTitle': 'SG Mobile Fix Setia Alam',
    'shareBtn': 'Share',
    'location': 'Store GPS Location',
    'email': 'Store Email',
    'whatsapp': 'Store WhatsApp',
    'technician': 'Senior Technician',
    'services': 'Service List',
    'appointment': 'Make Appointment',
    'themeToggle': 'Night mode/ Light mode',
    'languageToggle': 'Bahasa Malaysia/ English',
    
    // Service Page
    'servicesTitle': 'Phone Repair Services',
    'servicesDesc': 'We provide various high-quality phone repair services at affordable prices',
    'allServices': 'All Services',
    'iphone': 'iPhone',
    'android': 'Android',
    'tablet': 'Tablet',
    'originalParts': 'Original Parts',
    'orderNow': 'Order Now',
    'whatsappInquiry': 'WhatsApp Us for Any Inquiry',
    'priceNote': 'All prices start from, actual price depends on device model and damage',
    
    // Social Media
    'socialTitle': 'Follow Us on Social Media',
    'installApp': 'Install App',
    'openApp': 'Open App'
  },
  ms: {
    'navTitle': 'SG Mobile Fix Setia Alam',
    'shareBtn': 'Kongsi',
    'location': 'Lokasi GPS Kedai',
    'email': 'Email Kedai',
    'whatsapp': 'WhatsApp Kedai',
    'technician': 'Teknikal Senior',
    'services': 'Senarai Perkhidmatan',
    'appointment': 'Buat Temujanji',
    'themeToggle': 'Mode Malam/ Mode Siang',
    'languageToggle': 'Bahasa Malaysia/ English',
    
    'servicesTitle': 'Perkhidmatan Pembaikan Telefon',
    'servicesDesc': 'Kami menyediakan pelbagai perkhidmatan pembaikan telefon berkualiti tinggi dengan harga berpatutan',
    'allServices': 'Semua Perkhidmatan',
    'iphone': 'iPhone',
    'android': 'Android',
    'tablet': 'Tablet',
    'originalParts': 'Alat Ganti Original',
    'orderNow': 'Buat Tempahan',
    'whatsappInquiry': 'WhatsApp Kami untuk Sebarang Pertanyaan',
    'priceNote': 'Semua harga adalah bermula dari, harga sebenar bergantung kepada model dan kerosakan peranti',
    
    'socialTitle': 'Ikuti Kami di Media Sosial',
    'installApp': 'Pasang Aplikasi',
    'openApp': 'Buka Aplikasi'
  }
};

let currentLang = localStorage.getItem('language') || 'ms';

// Translate all elements with data-i18n attribute
function applyLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update toggle button text
  if (languageText) {
    languageText.textContent = lang === 'en' ? 'Bahasa Malaysia/ English' : 'Bahasa Malaysia/ English';
  }
  
  localStorage.setItem('language', lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize language
applyLanguage(currentLang);

// Toggle language
languageToggle.addEventListener('click', (e) => {
  e.preventDefault();
  currentLang = currentLang === 'en' ? 'ms' : 'en';
  applyLanguage(currentLang);
});

// ========== PWA SYSTEM ==========
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered: ', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Install Prompt
let deferredPrompt;
const installBtn = document.createElement('button');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button
  installBtn.innerHTML = `
    <div class="pwa-install-prompt">
      <div class="flex items-center mb-2">
        <i class="fas fa-mobile-alt text-primary mr-2"></i>
        <span class="font-bold" data-i18n="installApp">Install App</span>
      </div>
      <button id="install-pwa-btn" class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
        <i class="fas fa-download mr-2"></i>
        <span data-i18n="installApp">Install App</span>
      </button>
      <button id="open-pwa-btn" class="w-full mt-2 border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition">
        <i class="fas fa-external-link-alt mr-2"></i>
        <span data-i18n="openApp">Open App</span>
      </button>
    </div>
  `;
  
  document.body.appendChild(installBtn);
  
  document.getElementById('install-pwa-btn').addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted install');
      }
      deferredPrompt = null;
      installBtn.remove();
    });
  });
  
  document.getElementById('open-pwa-btn').addEventListener('click', () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      window.location.reload();
    }
  });
});

// Detect if app is running in standalone mode
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Running in PWA mode');
}

// ========== UPDATE HTML ATTRIBUTES ==========
// Add data-i18n attributes to your HTML elements
// Example:
// <h2 data-i18n="servicesTitle">Perkhidmatan Pembaikan Telefon</h2>
// <span data-i18n="orderNow">Buat Tempahan</span>




// =======================================
// 📌 Ai chatbot system
// =======================================

    // Chatbot functionality
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const speakBtn = document.getElementById('speak-btn');
    let lastResponse = '';

    // Predefined FAQ responses in Malay
    const faqResponses = {
      'harga': 'Harga servis untuk skrin bermula dari RM150-RM450 bergantung pada model telefon. Untuk bateri: RM80-RM200. Kami akan memberikan anggaran tepat selepas pemeriksaan percuma.',
      'tempoh': 'Tempoh pembaikan biasanya mengambil masa 1-2 jam untuk kebanyakan servis. Untuk kerosakan kompleks, ia mungkin mengambil masa sehingga sehari. Kami akan maklumkan anda terlebih dahulu jika ada kelewatan.',
      'model': 'Kami menyokong semua model iPhone dan Android termasuk Samsung, Huawei, Xiaomi, OPPO dan lain-lain. Sila berikan model telefon anda untuk semakan lanjut.',
      'waktu': 'Waktu operasi kami: Isnin - Jumaat (9:00 AM - 8:00 PM), Sabtu (9:00 AM - 6:00 PM), Ahad (10:00 AM - 4:00 PM). Kami tutup pada hari cuti umum.',
      'lokasi': 'Lokasi kedai: SG Mobile Setia Alam, No. 12, Jalan Setia Dagang 1/2, Setia Alam, 40170 Shah Alam. Anda boleh klik butang "Lihat Lokasi Kedai" di bahagian atas untuk arahan pemanduan.',
      'default': 'Maaf, saya tidak faham soalan anda. Sila tanya tentang harga, tempoh pembaikan, model telefon, waktu operasi, atau lokasi kedai.'
    };

    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('flex', isUser ? 'justify-end' : 'justify-start');
      
      const bubble = document.createElement('div');
      bubble.classList.add('rounded-2xl', 'px-5', 'py-3', 'max-w-xs', 'md:max-w-md', 'shadow');
      
      if (isUser) {
        bubble.classList.add('bg-primary', 'text-white', 'rounded-tr-none');
      } else {
        bubble.classList.add('bg-gray-100', 'text-gray-800', 'rounded-tl-none');
      }
      
      bubble.innerHTML = text;
      messageDiv.appendChild(bubble);
//      chatMessages.appendChild(messageDiv);
//      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    function getResponse(question) {
      const cleanQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
      
      if (cleanQuestion.includes('harga') || cleanQuestion.includes('price') || cleanQuestion.includes('bayar') || cleanQuestion.includes('kos')) {
        return faqResponses['harga'];
      } 
      else if (cleanQuestion.includes('tempoh') || cleanQuestion.includes('masa') || cleanQuestion.includes('berapa lama') || cleanQuestion.includes('siap')) {
        return faqResponses['tempoh'];
      } 
      else if (cleanQuestion.includes('model') || cleanQuestion.includes('jenis') || cleanQuestion.includes('iphone') || cleanQuestion.includes('samsung') || cleanQuestion.includes('android')) {
        return faqResponses['model'];
      } 
      else if (cleanQuestion.includes('waktu') || cleanQuestion.includes('operasi') || cleanQuestion.includes('buka') || cleanQuestion.includes('jam') || cleanQuestion.includes('tutup')) {
        return faqResponses['waktu'];
      } 
      else if (cleanQuestion.includes('lokasi') || cleanQuestion.includes('alamat') || cleanQuestion.includes('mana') || cleanQuestion.includes('google maps') || cleanQuestion.includes('waze')) {
        return faqResponses['lokasi'];
      } 
      else {
        return faqResponses['default'];
      }
    }

    function sendMessage() {
      const question = userInput.value.trim();
      if (question === '') return;
      
      addMessage(question, true);
      userInput.value = '';
      
      const response = getResponse(question);
      lastResponse = response;
      
      // Show typing indicator
      setTimeout(() => {
        addMessage('<i class="fas fa-ellipsis-h"></i>', false);
      }, 300);
      
      // Show actual response after delay
      setTimeout(() => {
        const lastMessage = chatMessages.lastChild;
        if (lastMessage) {
          chatMessages.removeChild(lastMessage);
        }
        addMessage(response, false);
      }, 1500);
    }

//      sendBtn.addEventListener('click', sendMessage);
//    userInput.addEventListener('keypress', function(e) {
//      if (e.key === 'Enter') {
//        sendMessage();
//      }
//    });

    // Text-to-Speech functionality
    function speak(text) {
      if ('speechSynthesis' in window) {
        // Clean HTML tags from text
        const cleanText = text.replace(/<[^>]*>/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'ms-MY'; // Malay Malaysia
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      } else {
        alert('Ciri Text-to-Speech tidak disokong oleh pelayar anda.');
      }
    }

//    speakBtn.addEventListener('click', function() {
//      if (lastResponse) 
//        speak(lastResponse);
//      } else {
//        alert('Tiada jawapan untuk dibaca.
//Sila ajukan soalan terlebih dahulu.');
//      }
//    });

    // Initialize chatbot with welcome message after delay
    setTimeout(() => {
      addMessage('Helo! Saya adalah AI Pembantu Servis 24/7. Bagaimana saya boleh membantu anda hari ini?', false);
    }, 800);
