import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Realizacja',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł projektu',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokalizacja',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Opis projektu',
      type: 'text',
    }),
    defineField({
      name: 'scope',
      title: 'Zakres prac',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria zdjęć',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
