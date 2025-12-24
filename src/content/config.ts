import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		author: z.string().default('IPTalons Research Security Team'),
		image: z.string().optional(),
		tags: z.array(z.string()).default([]),
		category: z.string().default('General'),
		subtitle: z.string().optional(),
	}),
});

export const collections = {
	'blog': blogCollection,
};
