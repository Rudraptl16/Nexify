  // Stats Counter Animation
    function animateCounter(id, target, duration = 2000) {
      const element = document.getElementById(id);
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          element.innerText = target % 1 === 0 ? target : target.toFixed(1);
          clearInterval(timer);
        } else {
          element.innerText = target % 1 === 0 ? Math.floor(start) : start.toFixed(1);
        }
      }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter('stat-uptime', 99.9);
          animateCounter('stat-teams', 10000);
          animateCounter('stat-rating', 4.9);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Update stat elements with IDs
    document.querySelector('.hero-stats').id = 'hero-stats-trigger';
    const statItems = document.querySelectorAll('.stat-item h3');
    statItems[0].id = 'stat-uptime';
    statItems[1].id = 'stat-teams';
    statItems[2].id = 'stat-rating';
    statsObserver.observe(document.getElementById('hero-stats-trigger'));

    // Modal Logic
    const modal = document.getElementById('modal-overlay');
    const signupBtn = document.querySelectorAll('a[href="#"], .btn-primary, .btn-outline').forEach(btn => {
      if (btn.innerText.includes('Start') || btn.innerText.includes('Sign Up') || btn.innerText.includes('trial')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.add('active');
        });
      }
    });

    // Special handling for Sign In
    document.querySelectorAll('.btn-outline').forEach(btn => {
      if (btn.innerText.includes('Sign In')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.add('active');
          showForm('signin');
        });
      }
    });

    document.getElementById('modal-close').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    // Form Switching
    function showForm(type) {
      const signup = document.getElementById('signup-form-container');
      const signin = document.getElementById('signin-form-container');
      if (type === 'signin') {
        signup.style.display = 'none';
        signin.style.display = 'block';
      } else {
        signup.style.display = 'block';
        signin.style.display = 'none';
      }
    }

    document.getElementById('switch-to-signin').addEventListener('click', (e) => {
      e.preventDefault();
      showForm('signin');
    });
    document.getElementById('switch-to-signup').addEventListener('click', (e) => {
      e.preventDefault();
      showForm('signup');
    });

    // Form Validation
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      // Reset errors
      document.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
      document.querySelectorAll('.error-message').forEach(m => m.style.display = 'none');

      if (name.value.trim().length < 2) {
        name.classList.add('error');
        name.nextElementSibling.style.display = 'block';
        isValid = false;
      }
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('error');
        email.nextElementSibling.style.display = 'block';
        isValid = false;
      }
      if (password.value.length < 8) {
        password.classList.add('error');
        password.nextElementSibling.style.display = 'block';
        isValid = false;
      }

      if (isValid) {
        const btn = signupForm.querySelector('button');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        
        setTimeout(() => {
          document.getElementById('signup-form-container').innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
              <div style="width: 64px; height: 64px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
                <i class="fas fa-check"></i>
              </div>
              <h2>Welcome to Nexify!</h2>
              <p style="color: var(--text-muted); margin-top: 0.5rem;">Your account has been created successfully. Redirecting to dashboard...</p>
            </div>
          `;
          setTimeout(() => modal.classList.remove('active'), 2000);
        }, 1500);
      }
    });

    // Mouse Glow Effect
    const glow = document.getElementById('mouse-glow');
    window.addEventListener('mousemove', (e) => {
      glow.style.setProperty('--x', e.clientX + 'px');
      glow.style.setProperty('--y', e.clientY + 'px');
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Reveal Animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          // Close mobile menu if open
          document.getElementById('nav-links').classList.remove('active');
          
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });