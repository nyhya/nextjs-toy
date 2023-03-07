module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended', // 해당 플러그인의 권장 규칙을 사용합니다.
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', '@emotion'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn', // 사용안한 변수는 경고
		'@typescript-eslint/no-use-before-define': ['warn'], // 선언하기 전에 사용 한다면 경고
	},
};
