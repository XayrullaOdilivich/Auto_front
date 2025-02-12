import { defineStore } from 'pinia';
import axios from '@/vuex/axios.js';

export const useAuthStore= defineStore({
    id: 'auth',
    state: () => ({
        accessToken: null,
        refreshToken: null,
    }),
    actions: {
        async fetchToken(data) {
            try {
                const response = await axios.post('/auth/signin', data);
                console.log('Serverdan javob', response.data);

                const accessToken = response.data.data.tokens.accessToken.token;
                const refreshToken = response.data.data.tokens.refreshToken.token;

                if (accessToken && refreshToken) {
                    this.accessToken = accessToken;
                    this.refreshToken = refreshToken;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    console.log("Tokenlar saqlandi:", accessToken, refreshToken);
                    return accessToken;
                } else {
                    console.error("Tokenlar yo‘q!");
                    throw new Error("Tokenlar yo‘q yoki noto‘g‘ri format!");
                }

            } catch (error) {
                console.error('Xato yuz berdi:', error);
                throw error;

            }
        },
    },
    getters: {
        getToken: (state) => state.accessToken,
    },
});
