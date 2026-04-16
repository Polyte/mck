// Image mappings for optimized WebP versions
export const imageMappings = {
  'IMG_3335.jpeg': {
    webp: 'IMG_3335.webp',
    original: 'IMG_3335.jpeg'
  },
  'IMG_3340.jpeg': {
    webp: 'IMG_3340.webp',
    original: 'IMG_3340.jpeg'
  },
  'IMG_3346.jpeg': {
    webp: 'IMG_3346.webp',
    original: 'IMG_3346.jpeg'
  },
  'IMG_3356.jpeg': {
    webp: 'IMG_3356.webp',
    original: 'IMG_3356.jpeg'
  },
  'IMG_3362.jpeg': {
    webp: 'IMG_3362.webp',
    original: 'IMG_3362.jpeg'
  },
  'IMG_3364.jpeg': {
    webp: 'IMG_3364.webp',
    original: 'IMG_3364.jpeg'
  },
  'IMG_3415.jpeg': {
    webp: 'IMG_3415.webp',
    original: 'IMG_3415.jpeg'
  },
  'IMG_3424.jpeg': {
    webp: 'IMG_3424.webp',
    original: 'IMG_3424.jpeg'
  },
  'IMG_3426.jpeg': {
    webp: 'IMG_3426.webp',
    original: 'IMG_3426.jpeg'
  },
  'IMG_3435.jpeg': {
    webp: 'IMG_3435.webp',
    original: 'IMG_3435.jpeg'
  },
  'IMG_3442.webp': {
    webp: 'IMG_3442.webp',
    original: 'IMG_3442.webp'
  },
  'IMG_3447.webp': {
    webp: 'IMG_3447.webp',
    original: 'IMG_3447.webp'
  },
  'innovation.jpeg': {
    webp: 'innovation.webp',
    original: 'innovation.jpeg'
  },
  '2013-10-25 15.56.25.jpg': {
    webp: '2013-10-25 15.56.25.webp',
    original: '2013-10-25 15.56.25.jpg'
  }
};

export function getWebpSrc(originalSrc) {
  const filename = originalSrc.split('/').pop();
  return imageMappings[filename]?.webp || originalSrc;
}
