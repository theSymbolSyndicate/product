import { config } from '@/config';

export const timestampToText = timestamp => {
	const date = new Date(timestamp);
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour24: true
	};
	const dateFormatter = new Intl.DateTimeFormat('en-GB', options);

	return dateFormatter.format(date);
};

/**
* Creates website local URL with subdirectory if it exists
* @param {string} url - The URL
* @returns {string} - The URL with subdirectory
*/
export const createLocalUrl = url => {
	const subdirectory = config.SUBDIRECTORY || '';
	return `${subdirectory}${url}`;
};
