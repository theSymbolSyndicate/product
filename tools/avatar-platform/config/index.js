export { default as formFields } from './form-fields.json';

export const config = {
	SUBDIRECTORY: process.env.NEXT_PUBLIC_SUBDIRECTORY,
	WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
	REQUEST_TIMEOUT: +process.env.NEXT_PUBLIC_REQUEST_TIMEOUT,
	MONGO_URI: process.env.MONGO_URI
};
