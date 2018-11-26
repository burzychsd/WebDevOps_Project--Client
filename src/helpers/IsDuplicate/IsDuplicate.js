export const isDuplicate = (arr, val) => {
	const duplicates = arr.filter(a => a === val);

	return duplicates.length === 0 ? false : true;
}