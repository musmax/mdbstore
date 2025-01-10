import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    loading: false,
    categories: [],
    error: null,
};

// Thunk for creating a category
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (categoryObject, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://mdbstorebe-express.onrender.com/v1/categories",
                categoryObject
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.errors || "An error occurred"
            );
        }
    }
);

// Thunk for fetching categories
export const viewCategories = createAsyncThunk(
    "category/viewCategories",
    async (query = "", { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://mdbstorebe-express.onrender.com/v1/categories${query}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.errors || "An error occurred"
            );
        }
    }
);

// Thunk for getting category
export const getCategory = createAsyncThunk(
    "category/getCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://mdbstorebe-express.onrender.com/v1/categories/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error editing category:", error);

            // Return an error message
            return rejectWithValue(
                error.response?.data?.message || "Failed to edit category"
            );
        }
    }
);

// Thunk for getting category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `https://mdbstorebe-express.onrender.com/v1/categories/${id}`
            );
            return response.data;
        } catch (error) {
            console.error("Error deleting category:", error);

            // Return an error message
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete category"
            );
        }
    }
);

// Thunk for editing categories
export const editCategory = createAsyncThunk(
    "category/editCategory",
    async ({ id, categoryData }, { rejectWithValue }) => {
        try {
            // Make the PUT/PATCH request to update the category
            const response = await axios.patch(
                `https://mdbstorebe-express.onrender.com/v1/categories/${id}`,
                categoryData
            );

            return response.data;
        } catch (error) {
            console.error("Error editing category:", error);
            // Return an error message
            return rejectWithValue(
                error.response?.data?.message || "Failed to edit category"
            );
        }
    }
);

// Slice
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Category
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, action.payload];
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // View Categories
        builder
            .addCase(viewCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(viewCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload; // Store fetched categories
            })
            .addCase(viewCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // view Category
        builder
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Edit Category
        builder
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Category
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const categoryReducer = categorySlice.reducer;
