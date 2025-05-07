import { defineComponent } from 'vue';
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue';

export default defineComponent({
    components: {
        AppNav: Nav,
    },
    setup() {
        const logout = () => {
            setToken('');

            window.location.href = '/';
        };

        return {
            logout,
        };
    },
});