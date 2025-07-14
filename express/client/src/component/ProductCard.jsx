"use client"

const ProductCard = ({ product, onDelete }) => {
  const handleBuyNow = () => {
    console.log("Buy now clicked for product:", product.id)
    alert(`Added "${product.title}" to cart!`)
  }

  const handleDelete = () => {
    onDelete(product.id)
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "men's clothing":
        return { backgroundColor: "#dbeafe", color: "#1e40af" }
      case "women's clothing":
        return { backgroundColor: "#fce7f3", color: "#be185d" }
      case "jewelery":
        return { backgroundColor: "#fef3c7", color: "#d97706" }
      case "electronics":
        return { backgroundColor: "#d1fae5", color: "#065f46" }
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" }
    }
  }

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
  }

  const deleteButtonStyle = {
    position: "absolute",
    top: "8px",
    left: "8px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    zIndex: 10,
    transition: "background-color 0.2s",
  }

  const imageContainerStyle = {
    position: "relative",
    height: "200px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  }

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  }

  const badgeStyle = {
    position: "absolute",
    top: "8px",
    right: "8px",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    ...getCategoryColor(product.category),
  }

  const contentStyle = {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "8px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: "48px",
  }

  const descriptionStyle = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "12px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    flexGrow: 1,
  }

  const priceRatingStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  }

  const priceStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#059669",
  }

  const ratingStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
  }

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background-color 0.2s",
  }

  return (
    <div
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={deleteButtonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#dc2626")}
        title="Delete Product"
      >
        🗑️
      </button>

      {/* Image Section */}
      <div style={imageContainerStyle}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          style={imageStyle}
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=200&width=200"
          }}
        />
        <span style={badgeStyle}>{product.category}</span>
      </div>

      {/* Content Section */}
      <div style={contentStyle}>
        <h3 style={titleStyle}>{product.title}</h3>
        <p style={descriptionStyle}>{product.description}</p>

        <div style={priceRatingStyle}>
          <span style={priceStyle}>${product.price}</span>
          <div style={ratingStyle}>
            <span style={{ color: "#fbbf24" }}>⭐</span>
            <span style={{ fontWeight: "500" }}>{product.rating.rate}</span>
            <span style={{ color: "#6b7280" }}>({product.rating.count})</span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          <span>🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
