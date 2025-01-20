import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "https://mdbstorebe-express.onrender.com/v1",
});

// Attach the access token to every request
apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                console.log("Stored Refresh Token:", refreshToken); // Debugging
                if (refreshToken) {
                    // Send refreshToken with the correct key
                    const response = await axios.post(
                        "https://mdbstorebe-express.onrender.com/v1/auth/refresh-tokens",
                        { refreshToken: refreshToken } // Correct key
                    );

                    // Update tokens in localStorage
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("refreshToken", response.data.refreshToken);

                    // Retry the failed request with the new token
                    error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                    return apiClient.request(error.config);
                } else {
                    console.error("No refresh token available in localStorage");
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Optional: Clear localStorage and redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
