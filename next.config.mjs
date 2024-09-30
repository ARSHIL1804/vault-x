/** @type {import('next').NextConfig} */
export default {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/account',
          permanent: false, // Set to true if this should be a permanent redirect (301)
        },
      ];
    },
};
