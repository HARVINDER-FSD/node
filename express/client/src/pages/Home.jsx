"use client"

import { useState } from "react"

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]

  const handleInputChange = (field, value) => {
    if (field.startsWith("rating.")) {
      const ratingField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [ratingField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Product title is required" })
      return false
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setMessage({ type: "error", text: "Please enter a valid price" })
      return false
    }
    if (!formData.description.trim()) {
      setMessage({ type: "error", text: "Product description is required" })
      return false
    }
    if (!formData.category) {
      setMessage({ type: "error", text: "Please select a category" })
      return false
    }
    if (!formData.image.trim()) {
      setMessage({ type: "error", text: "Product image URL is required" })
      return false
    }
    if (
      !formData.rating.rate ||
      isNaN(Number(formData.rating.rate)) ||
      Number(formData.rating.rate) < 0 ||
      Number(formData.rating.rate) > 5
    ) {
      setMessage({ type: "error", text: "Please enter a valid rating (0-5)" })
      return false
    }
    if (!formData.rating.count || isNaN(Number(formData.rating.count)) || Number(formData.rating.count) < 0) {
      setMessage({ type: "error", text: "Please enter a valid review count" })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        title: formData.title.trim(),
        price: Number.parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image.trim(),
        rating: {
          rate: Number.parseFloat(formData.rating.rate),
          count: Number.parseInt(formData.rating.count),
        },
      }

      const response = await fetch("http://localhost:1212/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to add product")
      }

      const result = await response.json()
      setMessage({ type: "success", text: "Product added successfully!" })

      // Reset form
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: {
          rate: "",
          count: "",
        },
      })

      console.log("Product added:", result)
    } catch (error) {
      console.error("Error adding product:", error)
      setMessage({ type: "error", text: "Failed to add product. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: {
        rate: "",
        count: "",
      },
    })
    setMessage(null)
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "20px",
    },
    header: {
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "24px",
      marginBottom: "24px",
      maxWidth: "800px",
      margin: "0 auto 24px auto",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#111827",
      margin: "0 0 8px 0",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    subtitle: {
      color: "#6b7280",
      margin: 0,
    },
    formCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "800px",
      margin: "0 auto",
      overflow: "hidden",
    },
    formHeader: {
      background: "linear-gradient(to right, #dbeafe, #e0e7ff)",
      padding: "16px 24px",
      borderBottom: "1px solid #e5e7eb",
    },
    formTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    formContent: {
      padding: "24px",
    },
    alert: {
      padding: "16px",
      borderRadius: "6px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    alertSuccess: {
      backgroundColor: "#f0fdf4",
      border: "1px solid #bbf7d0",
      color: "#166534",
    },
    alertError: {
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#dc2626",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    gridRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "4px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
      boxSizing: "border-box",
    },
    imagePreview: {
      marginTop: "8px",
    },
    previewImg: {
      width: "80px",
      height: "80px",
      objectFit: "contain",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      paddingTop: "24px",
      borderTop: "1px solid #e5e7eb",
      flexWrap: "wrap",
    },
    submitButton: {
      flex: 1,
      minWidth: "200px",
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "12px 24px",
      borderRadius: "6px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.2s",
    },
    resetButton: {
      backgroundColor: "white",
      color: "#374151",
      padding: "12px 24px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    spinner: {
      width: "16px",
      height: "16px",
      border: "2px solid white",
      borderTop: "2px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  }

  return (
    <div style={styles.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Add New Product</h1>
        <p style={styles.subtitle}>Add a new product to your store inventory</p>
      </div>

      {/* Form Card */}
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}> Product Information</h2>
        </div>

        <div style={styles.formContent}>
          {message && (
            <div
              style={{
                ...styles.alert,
                ...(message.type === "success" ? styles.alertSuccess : styles.alertError),
              }}
            >
              <span>{message.type === "success" ? "✅" : "❌"}</span>
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.gridRow}>
              {/* Product Title */}
              <div style={{ ...styles.inputGroup, ...styles.fullWidth }}>
                <label htmlFor="title" style={styles.label}>
                  Product Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter product title"
                  style={styles.input}
                  required
                />
              </div>

              {/* Price */}
              <div style={styles.inputGroup}>
                <label htmlFor="price" style={styles.label}>
                  Price ($) *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  style={styles.input}
                  required
                />
              </div>

              {/* Category */}
              <div style={styles.inputGroup}>
                <label htmlFor="category" style={styles.label}>
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div style={{ ...styles.inputGroup, ...styles.fullWidth }}>
                <label htmlFor="image" style={styles.label}>
                  Image URL *
                </label>
                <input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  style={styles.input}
                  required
                />
                {formData.image && (
                  <div style={styles.imagePreview}>
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      style={styles.previewImg}
                      onError={(e) => {
                        e.target.style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{ ...styles.inputGroup, ...styles.fullWidth }}>
                <label htmlFor="description" style={styles.label}>
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter product description"
                  style={styles.textarea}
                  required
                />
              </div>

              {/* Rating */}
              <div style={styles.inputGroup}>
                <label htmlFor="rating-rate" style={styles.label}>
                  Rating (0-5) *
                </label>
                <input
                  id="rating-rate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating.rate}
                  onChange={(e) => handleInputChange("rating.rate", e.target.value)}
                  placeholder="4.5"
                  style={styles.input}
                  required
                />
              </div>

              {/* Review Count */}
              <div style={styles.inputGroup}>
                <label htmlFor="rating-count" style={styles.label}>
                  Review Count *
                </label>
                <input
                  id="rating-count"
                  type="number"
                  min="0"
                  value={formData.rating.count}
                  onChange={(e) => handleInputChange("rating.count", e.target.value)}
                  placeholder="100"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div style={styles.buttonGroup}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  ...(loading ? { opacity: 0.5, cursor: "not-allowed" } : {}),
                }}
                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#2563eb")}
                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#3b82f6")}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Adding Product...
                  </>
                ) : (
                  <>➕ Add Product</>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                style={styles.resetButton}
                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#f9fafb")}
                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "white")}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
