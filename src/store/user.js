import Cooke from 'js-cookie'
export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cooke.set('token', val)
        },
        clearToken(state) {
            state.token = ''
            Cooke.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cooke.get('token')
        }
    }
}