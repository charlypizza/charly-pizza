import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer Section',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Footer Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Location Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'openingHours',
              title: 'Opening Hours',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'days',
                      title: 'Days',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'hours',
                      title: 'Hours',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'days',
                      subtitle: 'hours',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'legalMentions',
      title: 'Legal Mentions',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cgv',
      title: 'CGV (Terms & Conditions)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cookieBannerText',
      title: 'Cookie Banner Text',
      type: 'text',
      
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      
    }),
    defineField({
      name: 'createdByText',
      title: 'Created By Text',
      type: 'string',

    }),
    defineField({
      name: 'createdByUrl',
      title: 'Created By URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
    },
  },
});