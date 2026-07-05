import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'O Nas',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Główny nagłówek', type: 'string' }),
    defineField({ name: 'description', title: 'Opis pod nagłówkiem', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Zdjęcie', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'stat1_value', title: 'Statystyka 1 (Wartość)', type: 'string' }),
    defineField({ name: 'stat1_label', title: 'Statystyka 1 (Etykieta)', type: 'string' }),
    defineField({ name: 'stat2_value', title: 'Statystyka 2 (Wartość)', type: 'string' }),
    defineField({ name: 'stat2_label', title: 'Statystyka 2 (Etykieta)', type: 'string' }),
    
    defineField({ name: 'box1_title', title: 'Kafelek 1: Nagłówek', type: 'string' }),
    defineField({ name: 'box1_desc', title: 'Kafelek 1: Opis', type: 'text', rows: 3 }),
    
    defineField({ name: 'box2_title', title: 'Kafelek 2: Nagłówek', type: 'string' }),
    defineField({ name: 'box2_desc', title: 'Kafelek 2: Opis', type: 'text', rows: 3 }),
    
    defineField({ name: 'box3_title', title: 'Kafelek 3: Nagłówek', type: 'string' }),
    defineField({ name: 'box3_desc', title: 'Kafelek 3: Opis', type: 'text', rows: 3 }),
  ],
})
