const fetchExistingCategories = async (items) => {
	try {
		const existingCategories = new Set();

		const currentItems = items;

		currentItems.forEach((item) => {
			const categoryId = item.category.id;
			existingCategories.add(categoryId);
		});

		return existingCategories;
	} catch (error) {
		console.error("Error fetching categories from wardrobes: ", error);
	}
};

const sortExistingCategories = async (items) => {
	const generalCategories = {
		tops: new Set(),
		bottoms: new Set(),
		shoes: new Set(),
		outerwear: new Set(),
		accessories: new Set(),
		dresses: new Set(),
	};

	const existingCategories = await fetchExistingCategories(items);

	existingCategories.forEach((categoryId) => {
		if ([1, 4, 9, 10].includes(categoryId)) {
			generalCategories.tops.add(categoryId);
		} else if ([2, 7, 8].includes(categoryId)) {
			generalCategories.bottoms.add(categoryId);
		} else if (categoryId == 3) {
			generalCategories.outerwear.add(categoryId);
		} else if (categoryId == 5) {
			generalCategories.dresses.add(categoryId);
		} else if (categoryId == 6) {
			generalCategories.shoes.add(categoryId);
		} else if (categoryId == 11) {
			generalCategories.accessories.add(categoryId);
		}
	});

	return generalCategories;
};

export const selectRandomSubcategories = async (items) => {
	const selectedIds = [];

	const generalCategories = await sortExistingCategories(items);

	const outerwear = Array.from(generalCategories.outerwear);
	const accessories = Array.from(generalCategories.accessories);
	const shoes = Array.from(generalCategories.shoes);
	const tops = Array.from(generalCategories.tops);
	const bottoms = Array.from(generalCategories.bottoms);
	const dresses = Array.from(generalCategories.dresses);

	if (outerwear.length > 0) {
		selectedIds.push(outerwear[0]);
	}
	if (accessories.length > 0) {
		selectedIds.push(accessories[0]);
	}

	if (shoes.length > 0) {
		selectedIds.push(shoes[0]);
	}

	const isDress = Math.random() < 0.8 ? 0 : 1;
	if (isDress && dresses.length > 0) {
		selectedIds.push(dresses[0]);
	} else {
		if (tops.length > 0) {
			const randomTop = Math.floor(Math.random() * tops.length);
			selectedIds.push(tops[randomTop]);
		}

		if (bottoms.length > 0) {
			const randomBottom = Math.floor(Math.random() * bottoms.length);
			selectedIds.push(bottoms[randomBottom]);
		}
	}

	return selectedIds;
};
