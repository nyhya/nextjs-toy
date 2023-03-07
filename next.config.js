/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://prod-my-todo-test-api-service.ap-northeast-2.elasticbeanstalk.com:path*`,
			},
			// {
			// 	source: '/api/:path*',
			// 	destination: `호출주소`,
			// },
		];
	},
};

module.exports = nextConfig;
