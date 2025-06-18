// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen")
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 3000)
})

// Tablet Interactions
document.addEventListener("DOMContentLoaded", () => {
  const tablet = document.getElementById("tablet")
  const appButtons = document.querySelectorAll(".app-button")
  const dockItems = document.querySelectorAll(".dock-item")
  const fabButtons = document.querySelectorAll(".fab-button")
  const entryCards = document.querySelectorAll(".entry-card")

  // Add touch/click effects to app buttons
  appButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Add click animation
      button.style.transform = "scale(0.9)"
      setTimeout(() => {
        button.style.transform = ""
      }, 150)

      // Get page URL
      const page = button.getAttribute("data-page")
      if (page) {
        setTimeout(() => {
          window.location.href = page
        }, 300)
      }
    })

    // Add hover sound effect (visual feedback)
    button.addEventListener("mouseenter", () => {
      button.style.filter = "brightness(1.2)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.filter = ""
    })
  })

  // Dock interactions
  dockItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()

      // Add click animation
      item.style.transform = "translateY(-5px) scale(0.9)"
      setTimeout(() => {
        item.style.transform = ""
      }, 150)

      const page = item.getAttribute("data-page")
      if (page) {
        setTimeout(() => {
          window.location.href = page
        }, 300)
      }
    })
  })

  // FAB button interactions
  fabButtons.forEach((fab) => {
    fab.addEventListener("click", (e) => {
      e.preventDefault()
      const action = fab.getAttribute("data-action")

      switch (action) {
        case "scroll-explore":
          smoothScrollTo(window.innerHeight)
          break
        case "quick-contact":
          window.location.href = "contact.html"
          break
        case "theme-toggle":
          toggleTheme()
          break
      }
    })
  })

  // Entry card interactions
  entryCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault()

      // Add click animation
      card.style.transform = "scale(0.95)"
      setTimeout(() => {
        card.style.transform = ""
      }, 150)

      const page = card.getAttribute("data-page")
      if (page) {
        setTimeout(() => {
          window.location.href = page
        }, 300)
      }
    })
  })

  // Scroll-based animations
  let scrollTimeout
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Parallax effect for tablet
    if (scrollY < windowHeight) {
      const parallaxValue = scrollY * 0.5
      tablet.style.transform = `translateY(${parallaxValue}px) scale(${1 - (scrollY / windowHeight) * 0.2})`
    }

    // Show/hide portfolio entry
    const portfolioEntry = document.getElementById("portfolio-entry")
    if (scrollY > windowHeight * 0.5) {
      portfolioEntry.style.opacity = "1"
      portfolioEntry.style.transform = "translateY(0)"
    } else {
      portfolioEntry.style.opacity = "0"
      portfolioEntry.style.transform = "translateY(50px)"
    }

    // Clear timeout and set new one for scroll end
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      // Auto-snap to sections
      if (scrollY > windowHeight * 0.3 && scrollY < windowHeight * 0.7) {
        smoothScrollTo(windowHeight)
      }
    }, 150)
  })

  // Touch gestures for mobile
  let touchStartY = 0
  let touchEndY = 0

  document.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY
  })

  document.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = touchStartY - touchEndY

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up - go to portfolio entry
        if (window.scrollY < window.innerHeight * 0.5) {
          smoothScrollTo(window.innerHeight)
        }
      } else {
        // Swipe down - go back to landing
        if (window.scrollY > window.innerHeight * 0.5) {
          smoothScrollTo(0)
        }
      }
    }
  }

  // Smooth scroll function
  function smoothScrollTo(target) {
    window.scrollTo({
      top: target,
      behavior: "smooth",
    })
  }

  // Theme toggle function
  function toggleTheme() {
    document.body.classList.toggle("light-theme")
    const themeIcon = document.querySelector(".fab-3 .fab-icon")
    if (document.body.classList.contains("light-theme")) {
      themeIcon.textContent = "☀️"
    } else {
      themeIcon.textContent = "🌙"
    }
  }

  // Add particle animation
  createParticles()

  function createParticles() {
    const particleContainer = document.querySelector(".bg-particles")
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255,255,255,${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `
      particleContainer.appendChild(particle)
    }
  }

  // Add CSS for particle animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .light-theme {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
            color: #1f2937;
        }
        
        .light-theme .landing-container {
            background: linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%);
        }
        
        .light-theme .screen-content {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            color: #1f2937;
        }
    `
  document.head.appendChild(style)

  // Add ripple effect to buttons
  function addRippleEffect(element) {
    element.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  }
  // Add ripple effect to all interactive elements
  ;[...appButtons, ...dockItems, ...fabButtons, ...entryCards].forEach(addRippleEffect)

  // Add CSS for ripple animation
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(rippleStyle)
})

// Preload pages for faster navigation
const pagesToPreload = ["portfolio.html", "about.html", "contact.html", "services.html"]
pagesToPreload.forEach((page) => {
  const link = document.createElement("link")
  link.rel = "prefetch"
  link.href = page
  document.head.appendChild(link)
})
