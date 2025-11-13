import type { TNavLink } from '$lib/models';

export const navlinks: TNavLink[] = [
	{
		id: 'home',
		label: 'Home',
		href: '/'
	}
];

export const homePageNavlinks: TNavLink[] = [
	{
		id: 'contact',
		label: 'Contact us',
		href: '/contact-us'
	},
	{
		id: 'how-to-use',
		label: 'How to use',
		href: '/how-to-use'
	}
];

export const appNavlinks: TNavLink[] = [
	{
		id: 'home',
		label: 'Home',
		href: '/home'
	},
	{
		id: 'how-to-use',
		label: 'How to use',
		href: '/how-to-use'
	}
];
