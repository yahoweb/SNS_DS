// Character scramble glitch effect
function scrambleText(element, targetText, duration = 1000, callback) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const originalText = element.textContent;
  const iterations = 20;
  const interval = duration / iterations;
  let iteration = 0;
  
  // Add glitch class
  element.classList.add('glitch-scramble');
  element.setAttribute('data-text', targetText);
  
  const scrambleInterval = setInterval(() => {
    let scrambledText = '';
    
    for (let i = 0; i < targetText.length; i++) {
      if (targetText[i] === ' ') {
        scrambledText += ' ';
      } else {
        // Gradually reveal correct characters
        const revealProgress = (iteration / iterations);
        const shouldReveal = Math.random() < revealProgress || iteration === iterations - 1;
        
        if (shouldReveal) {
          scrambledText += targetText[i];
        } else {
          scrambledText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
    }
    
    element.textContent = scrambledText;
    iteration++;
    
    if (iteration >= iterations) {
      clearInterval(scrambleInterval);
      element.textContent = targetText;
      element.classList.remove('glitch-scramble');
      if (callback) callback();
    }
  }, interval);
}

function startIntro() {
  const intro1 = document.getElementById('intro-text-1');
  const intro2 = document.getElementById('intro-text-2');
  
  if (!intro1 || !intro2) return;
  
  // Show first text
  intro1.style.display = 'block';
  intro1.style.opacity = '1';
  
  // After 2 seconds, scramble transition to second text
  setTimeout(() => {
    intro1.style.animation = 'fadeOut 0.5s ease forwards';
    
    setTimeout(() => {
      intro1.style.display = 'none';
      intro2.style.display = 'block';
      intro2.style.opacity = '1';
      
      // Apply scramble glitch effect
      scrambleText(intro2, 'Are you Infected?', 800, () => {
        // After scramble completes, remove glitch class
        setTimeout(() => {
          intro2.classList.remove('glitch-scramble');
        }, 300);
      });
      
      // After showing second text, go to selection page
      setTimeout(() => {
        window.location.href = 'selection.html';
      }, 2000);
    }, 500);
  }, 2000);
}

// Initialize noise canvas
function initNoiseCanvas() {
  const canvas = document.getElementById('noise-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  function drawNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawNoise);
  }
  
  drawNoise();
}

// Animate stat numbers
function animateStat(element, target) {
  let count = 0;
  const increment = target / 100;
  
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(count).toLocaleString();
    }
  }, 30);
}

// Live counter animation with noise effects
function startLiveCounter() {
  const counter = document.getElementById('live-counter');
  if (!counter) return;
  
  const startCount = 5000;
  const target = 8472931;
  const noiseCount = 5;
  const incrementPerNoise = (target - startCount) / noiseCount;
  
  let currentCount = startCount;
  counter.textContent = currentCount.toLocaleString();
  counter.setAttribute('data-value', currentCount.toLocaleString());
  
  // Apply noise effects 5 times
  for (let i = 0; i < noiseCount; i++) {
    setTimeout(() => {
      // Add noise effect class
      counter.classList.add('counter-noise');
      
      // Animate number increase
      const targetForThisNoise = startCount + (incrementPerNoise * (i + 1));
      const increment = (targetForThisNoise - currentCount) / 30;
      
      const timer = setInterval(() => {
        currentCount += increment;
        const displayCount = Math.floor(currentCount);
        counter.textContent = displayCount.toLocaleString();
        counter.setAttribute('data-value', displayCount.toLocaleString());
        
        if (currentCount >= targetForThisNoise) {
          currentCount = targetForThisNoise;
          const finalCount = Math.floor(currentCount);
          counter.textContent = finalCount.toLocaleString();
          counter.setAttribute('data-value', finalCount.toLocaleString());
          clearInterval(timer);
          
          // Remove noise effect after animation
          setTimeout(() => {
            counter.classList.remove('counter-noise');
          }, 600);
        }
      }, 30);
    }, i * 2000); // 2 seconds between each noise effect
  }
}

// Initialize dashboard stats
function initDashboard() {
  const stat1 = document.getElementById('stat-1');
  const stat2 = document.getElementById('stat-2');
  const stat3 = document.getElementById('stat-3');
  const stat4 = document.getElementById('stat-4');
  
  if (stat1) animateStat(stat1, 8472931);
  if (stat2) animateStat(stat2, 12453);
  if (stat3) animateStat(stat3, 47);
  if (stat4) animateStat(stat4, 23);
  
  // Start real-time updates
  startRealTimeUpdates();
}

// Real-time updates for dashboard stats
function startRealTimeUpdates() {
  const stat1 = document.getElementById('stat-1');
  const stat2 = document.getElementById('stat-2');
  const stat3 = document.getElementById('stat-3');
  const stat4 = document.getElementById('stat-4');
  
  if (!stat1 || !stat2 || !stat3 || !stat4) return;
  
  // Base values
  let baseValues = {
    stat1: 8472931,
    stat2: 12453,
    stat3: 47,
    stat4: 23
  };
  
  // Update every 5 seconds
  setInterval(() => {
    // Random variation (small changes)
    const variation1 = Math.floor(Math.random() * 1000) - 500;
    const variation2 = Math.floor(Math.random() * 50) - 25;
    const variation3 = Math.floor(Math.random() * 3) - 1;
    const variation4 = Math.floor(Math.random() * 2) - 1;
    
    // Update base values
    baseValues.stat1 += variation1;
    baseValues.stat2 += variation2;
    baseValues.stat3 = Math.max(1, baseValues.stat3 + variation3);
    baseValues.stat4 = Math.max(0, baseValues.stat4 + variation4);
    
    // Animate to new values
    animateStat(stat1, baseValues.stat1);
    animateStat(stat2, baseValues.stat2);
    animateStat(stat3, baseValues.stat3);
    animateStat(stat4, baseValues.stat4);
    
    // Add subtle glitch effect
    [stat1, stat2, stat3, stat4].forEach(stat => {
      if (stat) {
        stat.classList.add('glitch-random');
        setTimeout(() => {
          stat.classList.remove('glitch-random');
        }, 150);
      }
    });
  }, 5000);
}

// Virus spread simulation with command input
function initVirusSimulation() {
  const area = document.getElementById('simulation-area');
  const commandInput = document.getElementById('command-input');
  
  if (!area || !commandInput) return;
  
  function spreadVirus() {
    // Get random position in simulation area
    const rect = area.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    // Create main particle with enhanced effect
    const particle = document.createElement('div');
    particle.className = 'virus-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    area.appendChild(particle);
    
    // Enhanced spread effect - create more particles with wave effect
    setTimeout(() => {
      const spreadCount = 8 + Math.floor(Math.random() * 7); // Increased from 5-10 to 8-15
      const waves = 3; // Multiple waves of particles
      
      for (let wave = 0; wave < waves; wave++) {
        setTimeout(() => {
          for (let i = 0; i < spreadCount; i++) {
            const spread = document.createElement('div');
            spread.className = 'virus-particle';
            const angle = (Math.PI * 2 * i) / spreadCount;
            const baseDistance = 40 + (wave * 30);
            const distance = baseDistance + Math.random() * 60;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            
            spread.style.left = finalX + 'px';
            spread.style.top = finalY + 'px';
            
            // Random size variation
            const size = 15 + Math.random() * 10;
            spread.style.width = size + 'px';
            spread.style.height = size + 'px';
            
            // Random opacity
            spread.style.opacity = 0.6 + Math.random() * 0.4;
            
            area.appendChild(spread);
            
            // Animate particle movement
            const moveX = (Math.random() - 0.5) * 20;
            const moveY = (Math.random() - 0.5) * 20;
            spread.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            // Remove particle after animation
            setTimeout(() => {
              if (spread.parentNode) {
                spread.style.transition = 'opacity 0.5s ease';
                spread.style.opacity = '0';
                setTimeout(() => {
                  if (spread.parentNode) {
                    spread.remove();
                  }
                }, 500);
              }
            }, 2500 + (wave * 500));
          }
        }, wave * 200);
      }
    }, 100);
    
    // Remove original particle with fade
    setTimeout(() => {
      if (particle.parentNode) {
        particle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        particle.style.opacity = '0';
        particle.style.transform = 'scale(2)';
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 500);
      }
    }, 3000);
  }
  
  // Handle Enter key
  commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = commandInput.value.trim();
      if (command.length > 0) {
        // Spread virus
        spreadVirus();
        
        // Clear input
        commandInput.value = '';
        
        // Add visual feedback
        commandInput.style.background = 'rgba(255, 215, 0, 0.2)';
        setTimeout(() => {
          commandInput.style.background = 'transparent';
        }, 200);
      }
    }
  });
  
  // Focus on input when clicking simulation area
  area.addEventListener('click', () => {
    commandInput.focus();
  });
}

// Typewriter effect for warning and quote
function typeWarningText() {
  const warningTitle = document.getElementById('warning-title');
  const quoteText = document.getElementById('quote-text');
  
  if (warningTitle && !warningTitle.dataset.typed) {
    const originalText = warningTitle.textContent;
    warningTitle.textContent = '';
    warningTitle.classList.add('typing-active');
    warningTitle.dataset.typed = 'true';
    
    let i = 0;
    function type() {
      if (i < originalText.length) {
        warningTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    }
    type();
  }
  
  if (quoteText && !quoteText.dataset.typed) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const originalHTML = entry.target.innerHTML;
          entry.target.innerHTML = '';
          entry.target.classList.add('typing-active');
          entry.target.dataset.typed = 'true';
          
          let i = 0;
          function type() {
            if (i < originalHTML.length) {
              // Check if we're at a tag
              if (originalHTML.charAt(i) === '<') {
                const tagEnd = originalHTML.indexOf('>', i);
                if (tagEnd !== -1) {
                  entry.target.innerHTML += originalHTML.substring(i, tagEnd + 1);
                  i = tagEnd + 1;
                } else {
                  entry.target.innerHTML += originalHTML.charAt(i);
                  i++;
                }
              } else {
                entry.target.innerHTML += originalHTML.charAt(i);
                i++;
              }
              if (i < originalHTML.length) {
                setTimeout(type, 40);
              }
            }
          }
          type();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(quoteText);
  }
}

// Typewriter effect for official statement
function typeWriter() {
  const element = document.getElementById('typed-text');
  if (!element) return;
  
  const text = "HATE IS VIRUS (H.V) - OFFICIAL STATEMENT\n\nWe have detected a digital pandemic spreading across social media platforms. This virus manifests through hate speech, cyberbullying, and toxic online behavior. Unlike biological viruses, H.V spreads through words, comments, and shared content.\n\nAll citizens are advised to:\n1. Identify symptoms early\n2. Isolate from hateful content\n3. Report to platform authorities\n4. Prevent further spread\n\nStay vigilant. Stay safe.";
  let i = 0;
  
  function type() {
    if (i < text.length) {
      if (text.charAt(i) === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += text.charAt(i);
      }
      i++;
      setTimeout(type, 30);
    }
  }
  
  // Start typing when element is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.typed) {
        entry.target.dataset.typed = 'true';
        type();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(element);
}

// Map point interactions with modal
function initMapPoints() {
  const points = document.querySelectorAll('.map-point');
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'map-modal';
  modal.innerHTML = `
    <div class="map-modal-content">
      <button class="map-modal-close" aria-label="Close">×</button>
      <h2 class="map-modal-title" id="modal-title">Group Information</h2>
      <div class="map-modal-info" id="modal-info"></div>
      <div class="map-modal-description" id="modal-description"></div>
    </div>
  `;
  document.body.appendChild(modal);
  
  const modalTitle = document.getElementById('modal-title');
  const modalInfo = document.getElementById('modal-info');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = modal.querySelector('.map-modal-close');
  
  // Group data
  const groupData = {
    'Group A': {
      count: 3247891,
      location: 'North America',
      growth: '+15.3%',
      severity: 'CRITICAL',
      description: 'High concentration of digital virus activity detected. Primary transmission through social media platforms. Immediate containment protocols recommended.'
    },
    'Group B': {
      count: 2156432,
      location: 'Europe',
      growth: '+12.7%',
      severity: 'HIGH',
      description: 'Moderate to high infection rate. Spread primarily through comment sections and direct messaging. Monitoring required.'
    },
    'Group C': {
      count: 1842608,
      location: 'Asia Pacific',
      growth: '+18.9%',
      severity: 'CRITICAL',
      description: 'Rapid spread detected. Viral content propagation through video platforms. Enhanced monitoring and intervention protocols activated.'
    },
    'Group D': {
      count: 987654,
      location: 'South America',
      growth: '+8.4%',
      severity: 'MODERATE',
      description: 'Controlled spread with localized outbreaks. Community-based intervention showing positive results. Continued surveillance recommended.'
    }
  };
  
  // Open modal on point click
  points.forEach(point => {
    point.addEventListener('click', () => {
      const label = point.querySelector('.point-label').textContent;
      const data = groupData[label] || {
        count: parseInt(point.getAttribute('data-count')),
        location: 'Unknown',
        growth: '+0%',
        severity: 'UNKNOWN',
        description: 'Data collection in progress. Please check back later for updated information.'
      };
      
      modalTitle.textContent = label;
      modalInfo.innerHTML = `
        <div class="map-modal-info-item">
          <span class="map-modal-info-label">Infected Users:</span>
          <span class="map-modal-info-value">${data.count.toLocaleString()}</span>
        </div>
        <div class="map-modal-info-item">
          <span class="map-modal-info-label">Location:</span>
          <span class="map-modal-info-value">${data.location}</span>
        </div>
        <div class="map-modal-info-item">
          <span class="map-modal-info-label">Growth Rate:</span>
          <span class="map-modal-info-value">${data.growth}</span>
        </div>
        <div class="map-modal-info-item">
          <span class="map-modal-info-label">Severity:</span>
          <span class="map-modal-info-value">${data.severity}</span>
        </div>
      `;
      modalDescription.textContent = data.description;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('hv_cart')) || [];

function saveCart() {
  localStorage.setItem('hv_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElements = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'inline-block' : 'none';
  });
}

function addToCart(productName, productPrice, productImage) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  
  saveCart();
  showCartNotification();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateCartQuantity(index, quantity) {
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = quantity;
    saveCart();
    renderCart();
  }
}

function showCartNotification() {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = 'Item added to cart';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const checkoutItems = document.getElementById('checkout-items');
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      document.getElementById('checkout-btn').style.display = 'none';
    } else {
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateCartQuantity(${index}, ${item.quantity - 1})">-</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      `).join('');
      
      updateCartTotals();
      document.getElementById('checkout-btn').style.display = 'block';
    }
  }
  
  if (checkoutItems) {
    checkoutItems.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <div class="checkout-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="checkout-item-info">
          <h4>${item.name}</h4>
          <span>Qty: ${item.quantity}</span>
        </div>
        <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
    
    updateCheckoutTotals();
  }
}

function updateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;
  
  document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function updateCheckoutTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;
  
  document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

// Wishlist management
let wishlist = JSON.parse(localStorage.getItem('hv_wishlist')) || [];

function saveWishlist() {
  localStorage.setItem('hv_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateWishlistCount() {
  const countElement = document.getElementById('wishlist-count');
  if (countElement) {
    countElement.textContent = wishlist.length;
  }
}

function addToWishlist(productName, productPrice, productImage) {
  const existingItem = wishlist.find(item => item.name === productName);
  
  if (!existingItem) {
    wishlist.push({
      name: productName,
      price: productPrice,
      image: productImage
    });
    saveWishlist();
    return true;
  }
  return false;
}

function removeFromWishlist(productName) {
  wishlist = wishlist.filter(item => item.name !== productName);
  saveWishlist();
}

function isInWishlist(productName) {
  return wishlist.some(item => item.name === productName);
}

function initShopPage() {
  // Update wishlist count
  updateWishlistCount();
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.product-btn:not(.view-details-btn)');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productCard = btn.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
      const productImage = productCard.querySelector('.product-image img').src;
      
      addToCart(productName, productPrice, productImage);
    });
  });
  
  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(btn => {
    const productName = btn.getAttribute('data-product');
    
    // Update button state
    if (isInWishlist(productName)) {
      btn.classList.add('active');
      btn.textContent = '♥';
    }
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productCard = btn.closest('.product-card');
      const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
      const productImage = productCard.querySelector('.product-image img').src;
      
      if (isInWishlist(productName)) {
        removeFromWishlist(productName);
        btn.classList.remove('active');
        btn.textContent = '♡';
      } else {
        addToWishlist(productName, productPrice, productImage);
        btn.classList.add('active');
        btn.textContent = '♥';
      }
    });
  });
  
  // View details buttons
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productName = btn.getAttribute('data-product');
      showProductModal(productName);
    });
  });
  
  // Product card click to view details
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.wishlist-btn') && !e.target.closest('.product-btn')) {
        const productName = card.querySelector('.product-name').textContent;
        showProductModal(productName);
      }
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      filterProducts(searchTerm);
    });
  }
  
  // Wishlist toggle
  const wishlistToggle = document.getElementById('wishlist-toggle');
  if (wishlistToggle) {
    wishlistToggle.addEventListener('click', () => {
      showWishlistModal();
    });
  }
}

// Product search/filter
function filterProducts(searchTerm) {
  const productCards = document.querySelectorAll('.product-card');
  let visibleCount = 0;
  
  productCards.forEach(card => {
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
    const productCategory = card.getAttribute('data-product-category')?.toLowerCase() || '';
    
    const matches = productName.includes(searchTerm) || 
                   productDescription.includes(searchTerm) ||
                   productCategory.includes(searchTerm);
    
    if (matches || searchTerm === '') {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show no results message
  const shopGrid = document.getElementById('shop-grid');
  let noResults = document.getElementById('no-results-message');
  
  if (visibleCount === 0 && searchTerm !== '') {
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.id = 'no-results-message';
      noResults.className = 'no-results-message';
      noResults.textContent = 'No products found matching your search.';
      shopGrid.appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

// Product detail modal
function showProductModal(productName) {
  const productCard = Array.from(document.querySelectorAll('.product-card')).find(card => 
    card.querySelector('.product-name').textContent === productName
  );
  
  if (!productCard) return;
  
  const productImage = productCard.querySelector('.product-image img').src;
  const productDescription = productCard.querySelector('.product-description').textContent;
  const productPrice = productCard.querySelector('.product-price').textContent;
  
  // Product details data
  const productDetails = {
    'Infection Test Kit': {
      specs: [
        'Early detection technology',
        '99.9% accuracy rate',
        'Results in 5 minutes',
        'Portable and easy to use',
        'FDA approved'
      ],
      fullDescription: 'Advanced digital virus detection system designed to identify early signs of hate speech and toxic content. This portable device uses cutting-edge AI technology to scan and analyze digital communications in real-time, providing instant results with 99.9% accuracy.'
    },
    'Digital Protection Mask': {
      specs: [
        'Advanced filtering system',
        'Blocks 99.9% of toxic content',
        'Real-time content analysis',
        'Adjustable sensitivity levels',
        'Comfortable all-day wear'
      ],
      fullDescription: 'State-of-the-art protection device that filters out hate speech, cyberbullying, and toxic content from your digital environment. Features advanced AI-powered content analysis that adapts to your preferences and provides a safe online experience.'
    },
    'Emergency Ration Can': {
      specs: [
        '30-day supply',
        'Nutritionally complete',
        'Long shelf life',
        'Easy to store',
        'Emergency ready'
      ],
      fullDescription: 'Essential survival supplies for extended quarantine periods. Each can contains a complete 30-day nutritional supply designed to sustain you during digital detox and isolation periods. Long shelf life ensures readiness for any emergency situation.'
    },
    'Purified Air Supply': {
      specs: [
        'Clean digital environment',
        'Toxin-free air circulation',
        'Portable design',
        'Low energy consumption',
        'Continuous operation'
      ],
      fullDescription: 'Maintain a clean and safe digital breathing space with our purified air supply system. This device continuously filters and purifies your digital environment, removing toxic content and ensuring you breathe clean in contaminated digital spaces.'
    },
    'Digital X-Ray Scanner': {
      specs: [
        'Deep content scanning',
        'Hidden threat detection',
        'Real-time analysis',
        'High-resolution imaging',
        'Professional grade'
      ],
      fullDescription: 'Professional-grade scanning device that identifies hidden virus threats and malicious content. Uses advanced X-ray technology to penetrate surface-level content and reveal underlying toxic patterns, providing comprehensive threat assessment.'
    }
  };
  
  const details = productDetails[productName] || {
    specs: ['Premium quality', 'Durable construction', 'User-friendly design'],
    fullDescription: productDescription
  };
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.innerHTML = `
    <div class="product-modal-content">
      <button class="product-modal-close" aria-label="Close">×</button>
      <div class="product-modal-image">
        <img src="${productImage}" alt="${productName}" />
      </div>
      <h2 class="product-modal-title">${productName}</h2>
      <div class="product-modal-price">${productPrice}</div>
      <div class="product-modal-description">${details.fullDescription}</div>
      <div class="product-modal-specs">
        <h4>Specifications</h4>
        <ul>
          ${details.specs.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
      <div class="product-modal-actions">
        <button class="product-btn" id="modal-add-to-cart">Add to Cart</button>
        <button class="product-btn view-details-btn" id="modal-add-to-wishlist">Add to Wishlist</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Close modal
  const closeBtn = modal.querySelector('.product-modal-close');
  closeBtn.addEventListener('click', () => closeProductModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProductModal(modal);
    }
  });
  
  // Add to cart from modal
  const addToCartBtn = modal.querySelector('#modal-add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    const price = parseFloat(productPrice.replace('$', ''));
    addToCart(productName, price, productImage);
    closeProductModal(modal);
  });
  
  // Add to wishlist from modal
  const addToWishlistBtn = modal.querySelector('#modal-add-to-wishlist');
  const isWishlisted = isInWishlist(productName);
  if (isWishlisted) {
    addToWishlistBtn.textContent = 'Remove from Wishlist';
  }
  addToWishlistBtn.addEventListener('click', () => {
    const price = parseFloat(productPrice.replace('$', ''));
    if (isWishlisted) {
      removeFromWishlist(productName);
      addToWishlistBtn.textContent = 'Add to Wishlist';
    } else {
      addToWishlist(productName, price, productImage);
      addToWishlistBtn.textContent = 'Remove from Wishlist';
    }
    updateWishlistCount();
  });
  
  // Close on Escape
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProductModal(modal);
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function closeProductModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

// Wishlist modal
function showWishlistModal() {
  const modal = document.createElement('div');
  modal.className = 'wishlist-modal';
  modal.innerHTML = `
    <div class="wishlist-modal-content">
      <button class="wishlist-modal-close" aria-label="Close">×</button>
      <h2 class="wishlist-modal-title">Wishlist</h2>
      <div class="wishlist-items" id="wishlist-items">
        ${wishlist.length === 0 ? '<div class="wishlist-empty">Your wishlist is empty.</div>' : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Render wishlist items
  const itemsContainer = modal.querySelector('#wishlist-items');
  if (wishlist.length > 0) {
    itemsContainer.innerHTML = wishlist.map((item, index) => `
      <div class="wishlist-item">
        <div class="wishlist-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="wishlist-item-info">
          <div class="wishlist-item-name">${item.name}</div>
          <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="wishlist-item-actions">
          <button class="product-btn" onclick="addToCartFromWishlist('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
          <button class="product-btn view-details-btn" onclick="removeFromWishlistAndUpdate('${item.name}')">Remove</button>
        </div>
      </div>
    `).join('');
  }
  
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Close modal
  const closeBtn = modal.querySelector('.wishlist-modal-close');
  closeBtn.addEventListener('click', () => closeWishlistModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeWishlistModal(modal);
    }
  });
  
  // Close on Escape
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeWishlistModal(modal);
      document.removeEventListener('keydown', escapeHandler);
    }
  });
}

function closeWishlistModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => {
    modal.remove();
    document.body.style.overflow = '';
  }, 300);
}

// Make functions available globally for onclick handlers
window.addToCartFromWishlist = function(productName, price, image) {
  addToCart(productName, price, image);
  const modal = document.querySelector('.wishlist-modal');
  if (modal) {
    closeWishlistModal(modal);
  }
};

  window.removeFromWishlistAndUpdate = function(productName) {
  removeFromWishlist(productName);
  const modal = document.querySelector('.wishlist-modal');
  if (modal) {
    const itemsContainer = modal.querySelector('#wishlist-items');
    if (wishlist.length === 0) {
      itemsContainer.innerHTML = '<div class="wishlist-empty">Your wishlist is empty.</div>';
    } else {
      itemsContainer.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-item">
          <div class="wishlist-item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="wishlist-item-info">
            <div class="wishlist-item-name">${item.name}</div>
            <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="wishlist-item-actions">
            <button class="product-btn" onclick="addToCartFromWishlist('${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
            <button class="product-btn view-details-btn" onclick="removeFromWishlistAndUpdate('${item.name}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }
  updateWishlistCount();
  
  // Update wishlist buttons on page
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(btn => {
    const btnProductName = btn.getAttribute('data-product');
    if (btnProductName === productName) {
      btn.classList.remove('active');
      btn.textContent = '♡';
    }
  });
};

function initCartPage() {
  renderCart();
  
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        window.location.href = 'checkout.html';
      }
    });
  }
}

function initCheckoutPage() {
  renderCart();
  
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clear cart
      cart = [];
      saveCart();
      
      // Show success message
      alert('Order placed successfully! Thank you for your purchase.');
      
      // Redirect to shop
      window.location.href = 'shop.html';
    });
  }
}

// Random Glitch Effect
function initRandomGlitch() {
  const glitchElements = document.querySelectorAll('.glitch-random');
  
  glitchElements.forEach(element => {
    function triggerGlitch() {
      element.classList.add('active');
      setTimeout(() => {
        element.classList.remove('active');
      }, 150);
      
      // Random next glitch between 2-8 seconds
      const nextGlitch = 2000 + Math.random() * 6000;
      setTimeout(triggerGlitch, nextGlitch);
    }
    
    // Initial delay before first glitch (1-3 seconds)
    const initialDelay = 1000 + Math.random() * 2000;
    setTimeout(triggerGlitch, initialDelay);
  });
  
  // For glitch-text (warning title), use a different approach
  const glitchTextElements = document.querySelectorAll('.glitch-text');
  glitchTextElements.forEach(element => {
    function triggerTextGlitch() {
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = 'glitch-anim 0.3s infinite linear alternate-reverse';
      }, 10);
      
      // Random next glitch between 3-10 seconds
      const nextGlitch = 3000 + Math.random() * 7000;
      setTimeout(triggerTextGlitch, nextGlitch);
    }
    
    // Initial delay before first glitch (2-5 seconds)
    const initialDelay = 2000 + Math.random() * 3000;
    setTimeout(triggerTextGlitch, initialDelay);
  });
}

// Make functions available globally
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

document.addEventListener("DOMContentLoaded", () => {
  // Only run intro animation on index.html
  if (document.getElementById('intro-text-1')) {
    startIntro();
  }

  // Initialize noise canvas
  initNoiseCanvas();
  
  // Initialize dashboard
  initDashboard();
  
  // Start live counter
  startLiveCounter();
  
  // Initialize virus simulation
  initVirusSimulation();
  
  // Typewriter effect for warning and quote
  typeWarningText();
  
  // Typewriter effect for official statement
  typeWriter();
  
  // Map points (only on pages with map points)
  if (document.querySelector('.map-point')) {
    initMapPoints();
  }
  
  // Cart management
  updateCartCount();
  
  // Initialize random glitch effects
  initRandomGlitch();
  
  // Initialize shop page
  if (document.querySelector('.shop-grid')) {
    initShopPage();
  }
  
  // Initialize cart page
  if (document.getElementById('cart-items')) {
    initCartPage();
  }
  
  // Initialize checkout page
  if (document.getElementById('checkout-form')) {
    initCheckoutPage();
  }
  
  // Animate charts when visible
  const chartsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const bars = entry.target.querySelectorAll('.bar');
        const segments = entry.target.querySelectorAll('.pie-segment');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.animation = 'barGrow 1s ease-out forwards';
          }, index * 100);
        });
        segments.forEach((segment, index) => {
          setTimeout(() => {
            segment.style.animation = 'pieGrow 2s ease-out forwards';
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const dataSection = document.querySelector('.data-section');
  if (dataSection) {
    chartsObserver.observe(dataSection);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('noise-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
  
  // Initialize page transition
  initPageTransition();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize scroll indicator
  initScrollIndicator();
  
  // Initialize loading spinner (skip for intro page)
  if (!document.getElementById('intro-text-1')) {
    initLoadingSpinner();
  }
});

// PAGE TRANSITION EFFECT
function initPageTransition() {
  // Add transition class to body on page load
  document.body.classList.add('page-transition');
  
  // Handle link clicks for smooth transitions
  const links = document.querySelectorAll('a[href^=""]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      link.addEventListener('click', (e) => {
        const targetUrl = link.href;
        if (targetUrl && !targetUrl.includes('#')) {
          e.preventDefault();
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.3s ease';
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 300);
        }
      });
    }
  });
}

// BACK TO TOP BUTTON
function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();
  
  // Smooth scroll to top
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// SCROLL INDICATOR
function initScrollIndicator() {
  // Only show on content pages
  const contentPage = document.querySelector('.content-page');
  if (!contentPage) return;
  
  // Create scroll indicator container
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  
  // Get all main sections
  const sections = document.querySelectorAll('.content-wrapper > section, .content-wrapper > .virus-log-section, .content-wrapper > .dashboard-section, .content-wrapper > .data-section, .content-wrapper > .interactive-section, .content-wrapper > .mission-section, .content-wrapper > .company-description, .content-wrapper > .statement-section, .content-wrapper > .document-section, .shop-grid');
  
  if (sections.length === 0) return;
  
  // Create indicator items
  sections.forEach((section, index) => {
    const item = document.createElement('div');
    item.className = 'scroll-indicator-item';
    item.setAttribute('data-section', index);
    indicator.appendChild(item);
    
    // Click to scroll to section
    item.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  document.body.appendChild(indicator);
  
  // Update active indicator on scroll
  function updateScrollIndicator() {
    const scrollPos = window.pageYOffset + 200;
    const items = indicator.querySelectorAll('.scroll-indicator-item');
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset;
      const sectionBottom = sectionTop + rect.height;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        items.forEach(item => item.classList.remove('active'));
        if (items[index]) {
          items[index].classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', updateScrollIndicator);
  updateScrollIndicator();
}

// LOADING SPINNER
function initLoadingSpinner() {
  // Create loading spinner
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.innerHTML = `
    <div class="virus-scan-animation">
      <div class="scan-line"></div>
      <div class="virus-particles">
        <div class="virus-particle-scan"></div>
        <div class="virus-particle-scan"></div>
        <div class="virus-particle-scan"></div>
        <div class="virus-particle-scan"></div>
        <div class="virus-particle-scan"></div>
      </div>
    </div>
    <div class="loading-text">SCANNING FOR VIRUS...</div>
  `;
  document.body.appendChild(spinner);
  
  // Show spinner on page load
  spinner.classList.add('active');
  
  // Hide spinner when page is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      spinner.classList.remove('active');
      setTimeout(() => {
        spinner.remove();
      }, 300);
    }, 2000); // Increased from 500ms to 2000ms
  });
  
  // Show spinner on navigation (if using AJAX)
  let navigationTimeout;
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.includes('#') && !link.href.startsWith('javascript:')) {
      const targetUrl = link.href;
      if (targetUrl && targetUrl !== window.location.href) {
        clearTimeout(navigationTimeout);
        navigationTimeout = setTimeout(() => {
          if (document.querySelector('.loading-spinner')) {
            document.querySelector('.loading-spinner').classList.add('active');
          }
        }, 100);
      }
    }
  });
}

