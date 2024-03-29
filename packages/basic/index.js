const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['import', 'unicorn', 'promise', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: { extensions: ['.ts', '.js', '.json'] },
            // 处理 ts.config baseUrl 的路径设置
            typescript: {},
        },
    },
    rules: {
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
            },
        ],
        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        'import/prefer-default-export': OFF,
        'import/no-unresolved': ERROR,
        'import/no-dynamic-require': OFF,

        'unicorn/better-regex': ERROR,
        'unicorn/prevent-abbreviations': OFF,
        'unicorn/filename-case': [
            ERROR,
            {
                cases: {
                    // 默认使用中划线命名
                    kebabCase: true,
                    // 小驼峰
                    camelCase: false,
                    // 下划线
                    snakeCase: false,
                    // 组件名使用大驼峰
                    pascalCase: true,
                },
            },
        ],
        'unicorn/no-array-instanceof': WARN,
        'unicorn/no-for-loop': WARN,
        'unicorn/prefer-add-event-listener': [ERROR, { excludedPackages: ['koa', 'sax'] }],
        'unicorn/prefer-query-selector': ERROR,
        'unicorn/no-null': OFF,
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
        // Array#reduce() and Array#reduceRight() usually result in hard-to-read and less performant code.
        // In almost every case, it can be replaced by .map, .filter, or a for-of loop.
        // It's only somewhat useful in the rare case of summing up numbers, which is allowed by default.
        'unicorn/no-array-reduce': OFF,
        /**
         * typescript 语法相关字段
         */
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/no-empty-function': WARN,
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        'no-use-before-define': OFF,
        '@typescript-eslint/no-use-before-define': ERROR,
        // js 的 no-shadow 规则会导致 eslint 误识别 enum 类型
        'no-shadow': OFF,
        '@typescript-eslint/no-shadow': ERROR,
        // 关闭 js 的检查，仅使用 ts 的以允许类方法重载
        'lines-between-class-members': OFF,
        '@typescript-eslint/lines-between-class-members': [ERROR, 'always', { 'exceptAfterOverload': true }],

        // TODO: 这个error好烦，先关闭了
        'class-methods-use-this': OFF,
        'no-continue': ERROR,
        // typescript 的 unused 其实并不需要
        // '@typescript-eslint/no-unused-vars': WARN,
        'no-unused-vars': WARN,
        'no-unused-expressions': WARN,
        'no-plusplus': OFF,
        'no-console': OFF,
        // 我就是喜欢使用for of
        'no-restricted-syntax': [OFF, 'iterators/generators'],

        /**
         * 代码格式相关的规则，代替prettier
         */
        'indent': [ERROR, 4, { SwitchCase: 1 }],
        // 空格相关的规则
        'keyword-spacing': ERROR,
        // 控制对象的空格 e.g: { a: 123 }
        'object-curly-spacing': [ERROR, 'always'],
        'lines-between-class-members': [ERROR, 'always'],
        // 同一个对象内部，是否使用单引号、双引号保持一致即可
        'quote-props': [ERROR, 'consistent'],
        'semi': [ERROR, 'always'],
        'max-len': [ERROR, 120],
        'quotes': [ERROR, 'single'],
        'brace-style': [ERROR, 'stroustrup', { 'allowSingleLine': false }],
        // 换行符，不同的系统不一样，不做要求
        'linebreak-style': OFF,
        // 控制对象、数组的换行，要么全部换行，要么全部不换行，保持一致即可
        'object-curly-newline': [ERROR, { consistent: true }],
        'array-bracket-newline': [ERROR, 'consistent'],
        'array-element-newline': [ERROR, 'consistent'],
        'no-multiple-empty-lines': [
            ERROR,
            {
                'max': 1,
                'maxBOF': 0,
                // 与 eol-last 规则保持一致
                'maxEOF': 1,
            },
        ],
        /**
         * typescript 代码格式相关字段
         */
        '@typescript-eslint/indent': [ERROR, 4],
        '@typescript-eslint/type-annotation-spacing': [ERROR, { after: true }],
        '@typescript-eslint/member-delimiter-style': [
            ERROR,
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    requireLast: false,
                },
                multilineDetection: 'brackets',
            }
        ],
        
    },
    // node 工具链都是js文件，针对这些js文件单独配置部分 rule
    overrides: [{
        files: ['**/*.js'],
        rules: {
            'unicorn/prefer-module': OFF,
            'no-shadow': ERROR,
            'no-use-before-define': ERROR,
            'lines-between-class-members': ERROR,
        },
    }],
};
