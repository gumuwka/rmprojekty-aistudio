import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '5o97uyui',
  dataset: 'production',
  useCdn: false, // Set to false so updates appear immediately without cache delay
  apiVersion: '2024-03-01', // Use a recent date
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
