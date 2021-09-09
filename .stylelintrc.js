module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-prettier/recommended',
    ],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'at-rule-no-unknown': null,
        'no-empty-source': null,
        'no-invalid-position-at-import-rule': null,
        'block-no-empty': null,
        'no-descending-specificity': null,
    },
};
