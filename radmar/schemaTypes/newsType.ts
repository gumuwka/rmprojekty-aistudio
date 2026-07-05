import { defineField, defineType } from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'Aktualności',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł wpisu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Identyfikator (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Data dodania',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      }
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Zajawka (krótki wstęp)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'content',
      title: 'Treść główna',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
