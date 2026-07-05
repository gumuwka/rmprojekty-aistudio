const { createClient } = require('@sanity/client');
const client = createClient({ projectId: '5o97uyui', dataset: 'production', useCdn: false, apiVersion: '2024-03-01' });
Promise.all([
  client.fetch('*[_type == "service"]{..., "id": id.current, "image": image.asset->url, "gallery": gallery[].asset->url}'),
  client.fetch('*[_type == "project"]{..., "id": id.current, "image": image.asset->url, "gallery": gallery[].asset->url}'),
  client.fetch('*[_type == "news"]{..., "id": id.current, "image": image.asset->url}'),
  client.fetch('*[_type == "homePage"][0]{..., "hero": {...hero, "bgImage": hero.bgImage.asset->url}, "mapSection": {...mapSection, "bgImage": mapSection.bgImage.asset->url}}'),
  client.fetch('*[_type == "aboutPage"][0]{..., "image": image.asset->url}'),
  client.fetch('*[_type == "siteSettings"][0]')
]).then(() => console.log('SUCCESS')).catch(e => console.error('ERROR:', e.message));
