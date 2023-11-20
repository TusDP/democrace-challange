// formkit.config.ts

import { createAutoAnimatePlugin } from '@formkit/addons'
import { en, ru } from '@formkit/i18n'
import {
    autocomplete,
    createProPlugin,
    mask,
    rating,
    toggle,
} from '@formkit/pro'
import { defineFormKitConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import '@formkit/pro/genesis'

export default defineFormKitConfig(() => {
    // here we can access `useRuntimeConfig` because
    // our function will be called by Nuxt.

    // and we can use the variables to import secrets.
    //
    // ⚠️ this is just an example — if you want to use FormKit Pro
    // you will need to install the @formkit/pro dependency.
    const pro = createProPlugin('fk-8fba56bf2c', {
        rating,
        toggle,
        mask,
        autocomplete,
        // ... and any other Pro Inputs
    })

    return {
        locale: 'en',
        theme: 'genesis',

        // theme: 'genesis',

        plugins: [
            pro,
            createAutoAnimatePlugin(),
        ],

        locales: {
            en,
            ru,
        },

        config: {
            rules: {
                //   validdate: isStartDateValid,
            },
        },
    }
})
