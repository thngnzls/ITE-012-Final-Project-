"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { currency } from "../App"
import { toast } from "react-toastify"

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
  })

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const fetchList = async () => {
    try {
      const response = await axios.get("/api/product/list")
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post("/api/product/remove", { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      productId: product.productId || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "Men",
      subCategory: product.subCategory || "Topwear",
      bestseller: product.bestseller || false,
      sizes: product.sizes || [],
    })

  
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
  }

  const closeEditModal = () => {
    setEditingProduct(null)
    setFormData({
      productId: "",
      name: "",
      description: "",
      price: "",
      category: "Men",
      subCategory: "Topwear",
      bestseller: false,
      sizes: [],
    })

    // Reset image states
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use FormData to handle file uploads
      const updateFormData = new FormData()

      // Append all form fields
      updateFormData.append("id", editingProduct._id)
      updateFormData.append("name", formData.name)
      updateFormData.append("description", formData.description)
      updateFormData.append("price", formData.price)
      updateFormData.append("category", formData.category)
      updateFormData.append("subCategory", formData.subCategory)
      updateFormData.append("bestseller", formData.bestseller.toString())
      updateFormData.append("sizes", JSON.stringify(formData.sizes))

      // Append images if they exist
      if (image1) updateFormData.append("image1", image1)
      if (image2) updateFormData.append("image2", image2)
      if (image3) updateFormData.append("image3", image3)
      if (image4) updateFormData.append("image4", image4)

      const response = await axios.post("/api/product/update", updateFormData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        closeEditModal()
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Product ID</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List ------ */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr_3fr] md:grid-cols-[1fr_2fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12 h-12 object-cover" src={item.image && item.image[0]} alt="" />
            <p>{item.productId || item._id}</p>
            <p>{item.name}</p>
            <p>
              {item.category} - {item.subCategory}
            </p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-end md:justify-center gap-3">
              <span onClick={() => openEditModal(item)} className="cursor-pointer text-blue-500">
                EDIT
              </span>
              <span onClick={() => removeProduct(item._id)} className="cursor-pointer text-red-500">
                DELETE
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
              <p>
                <strong>Note:</strong> You only need to upload new images if you want to change them. If you leave the
                image fields empty, the existing images will be preserved.
              </p>
            </div>

            <form onSubmit={updateProduct}>
              <div className="mb-4">
                <p className="mb-2">Upload Image (Optional)</p>
                <div className="flex gap-2">
                  <label htmlFor="edit-image1" className="cursor-pointer">
                    <img
                      className="w-20 h-20 object-cover border"
                      src={
                        image1
                          ? URL.createObjectURL(image1)
                          : editingProduct.image && editingProduct.image[0]
                            ? editingProduct.image[0]
                            : "https://via.placeholder.com/80"
                      }
                      alt=""
                    />
                    <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="edit-image1" hidden />
                  </label>
                  <label htmlFor="edit-image2" className="cursor-pointer">
                    <img
                      className="w-20 h-20 object-cover border"
                      src={
                        image2
                          ? URL.createObjectURL(image2)
                          : editingProduct.image && editingProduct.image[1]
                            ? editingProduct.image[1]
                            : "https://via.placeholder.com/80"
                      }
                      alt=""
                    />
                    <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="edit-image2" hidden />
                  </label>
                  <label htmlFor="edit-image3" className="cursor-pointer">
                    <img
                      className="w-20 h-20 object-cover border"
                      src={
                        image3
                          ? URL.createObjectURL(image3)
                          : editingProduct.image && editingProduct.image[2]
                            ? editingProduct.image[2]
                            : "https://via.placeholder.com/80"
                      }
                      alt=""
                    />
                    <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="edit-image3" hidden />
                  </label>
                  <label htmlFor="edit-image4" className="cursor-pointer">
                    <img
                      className="w-20 h-20 object-cover border"
                      src={
                        image4
                          ? URL.createObjectURL(image4)
                          : editingProduct.image && editingProduct.image[3]
                            ? editingProduct.image[3]
                            : "https://via.placeholder.com/80"
                      }
                      alt=""
                    />
                    <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="edit-image4" hidden />
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2">Product Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full max-w-[500px] px-3 py-2 border"
                  required
                />
              </div>

              <div className="mb-4">
                <p className="mb-2">Product Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full max-w-[500px] px-3 py-2 border"
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mb-4">
                <div>
                  <p className="mb-2">Product Category</p>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border"
                  >
                    <option value="Men">Men's Formal Wear</option>
                    <option value="Women">Women's Formal Wear</option>
                    <option value="Business">Business Attire</option>
                    <option value="Traditional">Traditional Wear</option>
                    <option value="Special">Special Occassion</option>
                  </select>
                </div>

                <div>
                  <p className="mb-2">Sub Category</p>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Tuxedo">Tuxedo</option>
                    <option value="Dress">Dress</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <p className="mb-2">Product Price</p>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border sm:w-[120px]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2">Product Sizes</p>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40"].map((size) => (
                    <div key={size} onClick={() => toggleSize(size)} className="cursor-pointer">
                      <p className={`${formData.sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1`}>
                        {size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="checkbox"
                  id="bestseller"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleInputChange}
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                  Add to bestseller
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-200 rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default List;
