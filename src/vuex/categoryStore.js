import { defineStore } from "pinia"
import axios from "@/vuex/axios.js"

export const useGetStore = defineStore("getStore", {
    state: () => ({
        data: []
    }),
    actions: {
        async fetchData(url) { // 🟢 Universal `GET` metodi
            try {
                const response = await axios.get(url)
                this.data = response.data.data;
                console.log(`GET so‘rov (${url}):`, response.data);
                return response.data.data; // 🔹 Natijani qaytarish
            } catch (error) {
                console.error(`GET so‘rov (${url}) xatolik:`, error)
                throw error
            }
        },
    },
});
