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

export type TFieldCondition<TForm> = {
	name: keyof TForm;
	type: 'in' | 'not-in' | 'equals' | 'not-equals';
	values?: Array<unknown>;
	value?: unknown;
};
