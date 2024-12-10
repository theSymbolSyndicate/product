import imageCompression from 'browser-image-compression';

/**
 * Compresses the image
 * @param {File} imageFile - The image file
 * @returns {Promise<File>} - The compressed image file
 */
export const compressImageFile = async imageFile => {
	const maxSizeMB = 1;
	const fileSizeMB = imageFile.size / 1024 / 1024;

	if (fileSizeMB < maxSizeMB)
		return imageFile;

	const options = {
		maxSizeMB,
		maxWidthOrHeight: 1024,
		useWebWorker: true
	};

	return imageCompression(imageFile, options);
};
