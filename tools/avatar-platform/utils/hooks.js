import { useMemo, useState } from 'react';

export const useTableFilter = (items, key, initialFilterValue) => {
	const [filter, setFilter] = useState(initialFilterValue);
	const filteredItems = useMemo(() => {
		if (filter === '')
			return items;

		return items.filter(item =>
			item[key] === filter);
	}, [items, key, filter]);

	return [filteredItems, filter, setFilter];
};

export const useTableSearch = (items, key, initialFilterValue) => {
	const [filter, setFilter] = useState(initialFilterValue);
	const filteredItems = useMemo(() => {
		if (filter === '')
			return items;

		return items.filter(item =>
			item[key].toLowerCase().includes(filter.toLowerCase()));
	}, [items, key, filter]);

	return [filteredItems, filter, setFilter];
};

export const useTableSort = (items, sortDescriptor) => useMemo(() => {
	return [...items].sort((a, b) => {
		const first = a[sortDescriptor.column];
		const second = b[sortDescriptor.column];
		const cmp = first < second ? -1 : first > second ? 1 : 0;

		return sortDescriptor.direction === 'descending' ? -cmp : cmp;
	});
}, [sortDescriptor, items]);
