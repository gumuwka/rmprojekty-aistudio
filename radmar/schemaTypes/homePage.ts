import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Strona Główna',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Sekcja Hero',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Tytuł (użyj nowej linii dla przełamania tekstu)', type: 'text', rows: 2 }),
        defineField({ name: 'subtitle', title: 'Podtytuł', type: 'text', rows: 3 }),
        defineField({ name: 'cta', title: 'Tekst przycisku CTA', type: 'string' }),
        defineField({ name: 'bgImage', title: 'Zdjęcie w tle', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'mapSection',
      title: 'Sekcja Mapy',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Główny nagłówek', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Opis', type: 'text', rows: 3 }),
        defineField({ name: 'bgImage', title: 'Zdjęcie mapy (opcjonalnie)', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'tile1',
          title: 'Kafelek 1',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
            defineField({ name: 'desc', title: 'Opis', type: 'text', rows: 3 }),
          ],
        }),
        defineField({
          name: 'tile2',
          title: 'Kafelek 2',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
            defineField({ name: 'desc', title: 'Opis', type: 'text', rows: 3 }),
          ],
        }),
        defineField({
          name: 'tile3',
          title: 'Kafelek 3',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
            defineField({ name: 'desc', title: 'Opis', type: 'text', rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'servicesIntro',
      title: 'Wstęp do sekcji usług',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Nagłówek', type: 'string' }),
        defineField({ name: 'desc', title: 'Opis', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Najczęściej zadawane pytania (FAQ)',
      type: 'array',
      of: [
        defineField({
          name: 'faqItem',
          type: 'object',
          fields: [
            defineField({ name: 'q', title: 'Pytanie', type: 'string' }),
            defineField({ name: 'a', title: 'Odpowiedź', type: 'text', rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Sekcja wezwania do akcji (nad formularzem)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Nagłówek', type: 'string' }),
        defineField({ name: 'desc', title: 'Opis', type: 'text', rows: 3 }),
        defineField({ name: 'bullet1', title: 'Punkt wypunktowany 1', type: 'string' }),
        defineField({ name: 'bullet2', title: 'Punkt wypunktowany 2', type: 'string' }),
        defineField({ name: 'bullet3', title: 'Punkt wypunktowany 3', type: 'string' }),
      ],
    }),
  ],
})
