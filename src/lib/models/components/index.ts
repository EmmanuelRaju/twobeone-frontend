export type TNavLink = {
	id: string;
	label: string;
	href?: string;
	hide?: {
		sm?: boolean;
		md?: boolean;
		lg?: boolean;
	};
	disabled?: boolean;
	children?: TNavLink[];
};
