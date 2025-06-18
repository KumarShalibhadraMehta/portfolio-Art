document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block"
          item.style.animation = "fadeIn 0.5s ease"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Add click handlers for portfolio items
  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Add modal or detailed view functionality here
      console.log("Portfolio item clicked:", item)
    })
  })
})
