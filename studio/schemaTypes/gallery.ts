import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery Section',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: 'Gallery',
        subtitle: `${images?.length || 0} images`,
      };
    },
  },
});