export const flattenOptions = (arr: { children: string[] }[]) => {
	return arr.map((it) => it.children.map((ot) => ot)).flat();
};
