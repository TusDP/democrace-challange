import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
    {
        stylistic: {
            indent: 4,
        },
        rules: {
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style'],
            }],
        },
    },
    unocss.configs.flat,
)
