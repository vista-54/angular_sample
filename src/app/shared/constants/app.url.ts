import { environment } from '../../../environments/environment';

const api = environment.apiHost;

export const APP_URL = {
    'auth': {
        login: api + 'login',
        register: api + 'register',
        logout: api + 'logout',
        forgot: api + 'user/forgot',
        confirm: api + 'user/confirm',
        change: api + 'user/change',
        role: api + 'role',
        save: api + 'set-device'
    },
    'user': {
        index: api + 'users/all',
        store: api + 'user',
        create: api + 'register',
        update: api + 'user',
        role: api + 'role',
        invite: api + 'invite',
        delete: api + 'user/delete'
    },
    'product': {
        index: api + 'product',
        update: api + 'product',
        create: api + 'product',
        delete: api + 'product/delete',
        provider: api + 'provider',
        category: api + 'category',
        post_file: api + 'product/import'
    },
    'push': {
        push: api + 'notification'
    },
    'cart': {
        index: api + 'order'
    },
    'provider': {
        index: api + 'provider',
        create: api + 'provider',
        update: api + 'provider',
        delete: api + 'provider',
        categories: api + 'categories'
    },
    'about': {
        index: api + 'about'
    },
    'specialization': {
        index: api + 'specialization',
        create: api + 'specialization',
        update: api + 'specialization',
        delete: api + 'specialization'
    }

};
