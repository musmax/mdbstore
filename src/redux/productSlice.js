import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../apiClient"; // Import the Axios instance
import axios from "axios";

// Initial state
const initialState = {
    loading: false,
    products: [],
    error: null,
};

// Thunk for creating a product
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (productObject, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/products", productObject);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.errors || "An error occurred"
            );
        }
    }
);

// Thunk for fetching products
export const viewProducts = createAsyncThunk(
    "product/viewProducts",
    async (query = "", { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/products${query}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.errors || "An error occurred"
            );
        }
    }
);

// Thunk for getting a product
export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch the product"
            );
        }
    }
);

// Thunk for editing a product
export const editProduct = createAsyncThunk(
    "product/editProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await apiClient.patch(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update the product"
            );
        }
    }
);

// Thunk for deleting a product
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete the product"
            );
        }
    }
);


// Slice
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Product
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // View products
        builder
            .addCase(viewProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload; // Store fetched products
            })
            .addCase(viewProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // view product
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Edit Product
        builder
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const productReducer = productSlice.reducer;
