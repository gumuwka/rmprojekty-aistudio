import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia Strony',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Adres E-mail',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Link do Facebooka',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Adres lub obszar działania',
      type: 'string',
    }),
  ],
})
