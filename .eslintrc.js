module.exports = {
    plugins: ['prettier', 'import'],
    extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    rules: {
        // Предупреждение no-unused-vars вместо ошибки
        'no-unused-vars': 'warn',

        // Разрешаем использование for-in и for-of
        'no-restricted-syntax': 'off',

        // Разрешаем await в циклах
        'no-await-in-loop': 'off',

        // Правильные константы при деструктуризации
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],

        // Предупреждение prefer-destructuring вместо ошибки
        'prefer-destructuring': 'warn',

        // Разрешаем ++ в циклах
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

        // Не ругаемся на 'use strict'
        strict: 'off',

        'prettier/prettier': ['error'],
    },
};
