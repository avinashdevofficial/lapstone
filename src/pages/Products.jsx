import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Grid, List, Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { products, categories, brands, conditions } from '../data/products'
import './Products.css'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    brand: [],
    condition: [],
    priceRange: [0, 3500],
    sortBy: 'featured'
  })

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setFilters(prev => ({ ...prev, category }))
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.processor.toLowerCase().includes(query)
      )
    }

    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category)
    }

    if (filters.brand.length > 0) {
      result = result.filter(p => filters.brand.includes(p.brand))
    }

    if (filters.condition.length > 0) {
      result = result.filter(p =>
        filters.condition.includes(p.condition.toLowerCase().replace(' ', '-'))
      )
    }

    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        result.sort((a, b) => b.discount - a.discount)
        break
      case 'featured':
      default:
        result.sort((a, b) => b.featured - a.featured)
    }

    return result
  }, [filters, searchQuery])

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }))
    if (categoryId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand]
    }))
  }

  const handleConditionToggle = (condition) => {
    setFilters(prev => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition]
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      brand: [],
      condition: [],
      priceRange: [0, 3500],
      sortBy: 'featured'
    })
    setSearchParams({})
    setSearchQuery('')
  }

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.brand.length +
    filters.condition.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 3500 ? 1 : 0)

  return (
    <div className="products-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="page-header-content">
            <h1 className="page-title">
              {filters.category !== 'all'
                ? categories.find(c => c.id === filters.category)?.name
                : 'All Laptops'}
            </h1>
            <p className="page-subtitle">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'laptop' : 'laptops'} found
            </p>
          </div>
        </motion.div>

        <div className="products-toolbar">
          <div className="toolbar-left">
            <button
              className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="filter-count">{activeFilterCount}</span>
              )}
            </button>

            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="toolbar-right">
            <select
              className="sort-select"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>

            <div className="view-toggles">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="products-layout">
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside
                className="filters-sidebar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="filters-header">
                  <h3>Filters</h3>
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear All
                  </button>
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">Category</h4>
                  <div className="filter-options">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`filter-chip ${filters.category === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">Brand</h4>
                  <div className="filter-checkboxes">
                    {brands.map(brand => (
                      <label key={brand} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.brand.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                        />
                        <span className="checkbox-custom" />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">Condition</h4>
                  <div className="filter-checkboxes">
                    {conditions.map(condition => (
                      <label key={condition.id} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition.id)}
                          onChange={() => handleConditionToggle(condition.id)}
                        />
                        <span className="checkbox-custom" />
                        <span>{condition.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">Price Range</h4>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                      }))}
                      className="price-input"
                    />
                    <span className="price-separator">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value) || 3500]
                      }))}
                      className="price-input"
                    />
                  </div>
                </div>

                <div className="filters-actions">
                  <Button fullWidth onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="products-content">
            {filteredProducts.length > 0 ? (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                className="no-products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="no-products-icon">🔍</div>
                <h3>No laptops found</h3>
                <p>Try adjusting your filters or search query</p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

