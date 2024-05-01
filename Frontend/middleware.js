import store from "@/store/store";

export function isLoggedin({to, from, next}) {
    if(!store.getters.token) next('/login')
    next();
}

export function isGuest({to, from, next}) {
    if(store.getters.token) next('/')
    next();
}