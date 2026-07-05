import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Usługa',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
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
      options: {
        list: [
          { title: 'Projekty i Ekspertyzy', value: 'projekty-i-ekspertyzy' },
          { title: 'Opinie i Uzgodnienia', value: 'opinie-i-uzgodnienia' },
          { title: 'Dofinansowania', value: 'dofinansowania' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'icon',
      title: 'Nazwa Ikony (np. Plane, Zap)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Krótki Opis',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullContent',
      title: 'Pełna Treść',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Główne Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'steps',
      title: 'Kroki procesu',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Nagłówek sekcji Cechy/Zalety',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Cechy / Zalety',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'priceInfo',
      title: 'Informacje o Cenie',
      type: 'string',
    }),
    defineField({
      name: 'legalBasis',
      title: 'Podstawa Prawna',
      type: 'text',
    }),
    defineField({
      name: 'usefulInfoTitle',
      title: 'Nagłówek sekcji Przydatne Informacje',
      type: 'string',
    }),
    defineField({
      name: 'usefulInfo',
      title: 'Przydatne Informacje',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirementsTitle',
      title: 'Nagłówek sekcji Wymagania',
      type: 'string',
    }),
    defineField({
      name: 'requiredDocuments',
      title: 'Wymagane Dokumenty',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirementsGroups',
      title: 'Grupy Wymagań',
      type: 'array',
      of: [
        defineField({
          name: 'group',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Nazwa Grupy' }),
            defineField({ name: 'items', type: 'array', title: 'Elementy', of: [{ type: 'string' }] }),
          ]
        })
      ]
    }),
    defineField({
      name: 'closingNote',
      title: 'Notatka Końcowa',
      type: 'text',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Obszar Działania',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'legalSafety',
      title: 'Bezpieczeństwo Prawne',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'extraNote',
      title: 'Dodatkowa Notatka',
      type: 'text',
    }),
  ],
})
