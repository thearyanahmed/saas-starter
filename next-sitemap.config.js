/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || 'https://your-domain.com',
  generateRobotsTxt: true,
  exclude: [
    '/dashboard/*',
    '/api/*',
    '/sign-in',
    '/sign-up',
    '/_next/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/sign-in', '/sign-up'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'weekly';
    } else if (path === '/pricing') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    }

    return customConfig;
  },
};