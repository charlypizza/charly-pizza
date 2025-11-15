import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'instagram',
  title: 'Instagram Section',
  type: 'document',
  fields: [
    defineField({
      name: 'profileUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'posts',
      title: 'Instagram Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Post Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alwaysColor',
              title: 'Always Show in Color (on desktop)',
              type: 'boolean',
              initialValue: false,
              description: 'If checked, this image will show in color on desktop instead of grayscale',
            },
          ],
          preview: {
            select: {
              media: 'image',
              alwaysColor: 'alwaysColor',
            },
            prepare({ media, alwaysColor }) {
              return {
                title: alwaysColor ? 'Always Color' : 'Grayscale on Desktop',
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      profileUrl: 'profileUrl',
      posts: 'posts',
    },
    prepare({ profileUrl, posts }) {
      return {
        title: 'Instagram Section',
        subtitle: `${posts?.length || 0} posts - ${profileUrl}`,
      };
    },
  },
});