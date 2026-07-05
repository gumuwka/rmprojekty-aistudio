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
            S.documentTypeListItem('service').title('Usługi'),
            S.documentTypeListItem('project').title('Realizacje'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
