/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**', // Allow all image domains
    }],
  },
  // Remove the entire "experimental" section
}
