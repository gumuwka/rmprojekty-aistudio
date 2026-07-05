import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'radmar',

  projectId: '5o97uyui',
  dataset: 'production',

  plugins: [
    presentationTool({
      previewUrl: 'http://localhost:3000',
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Treści strony')
          .items([
            S.listItem()
              .title('Ustawienia Strony')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Strona Główna')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('O Nas')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Usługi'),
            S.documentTypeListItem('project').title('Realizacje'),
            S.documentTypeListItem('news').title('Aktualności'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
