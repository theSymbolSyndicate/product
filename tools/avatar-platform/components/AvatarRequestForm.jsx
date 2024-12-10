'use client';
import { submitAvatarForm } from '@/app/actions';
import { compressImageFile } from '@/utils/client';
import { Button, Input } from '@nextui-org/react';
import Form from 'next/form';
import { useActionState, useCallback } from 'react';
import { IoIosCloudUpload as UploadIcon } from 'react-icons/io';
import { RiMailSendLine as SendIcon } from 'react-icons/ri';

export const AvatarRequestForm = ({ fields }) => {
	const handleFormSubmission = useCallback(async (prevState, formData) => {
		// Compress image files before submitting
		const imageFiles = formData.getAll('files');
		const compressedImageFiles = await Promise.all(imageFiles.map(file => compressImageFile(file)));

		// Remove the original files and append the compressed files
		formData.delete('files');
		compressedImageFiles.forEach(file => formData.append('files', file));

		// Submit the form
		submitAvatarForm(prevState, formData);
	}, []);
	const [state, action, isPending] = useActionState(handleFormSubmission, {});

	return (
		<Form action={action} className="flex w-full flex-col items-end gap-4 md:max-w-xl">
			{fields.map(field => (
				<Input
					key={field.name}
					name={field.name}
					placeholder=" "
					label={field.text}
					labelPlacement="outside"
					variant="faded"
				/>
			))}
			<Input
				type="file"
				multiple
				accept="image/*"
				name="files"
				label={'Reference Images'}
				labelPlacement="outside"
				variant="faded"
				startContent={
					<UploadIcon className="pointer-events-none mb-0.5 shrink-0 text-slate-400 dark:text-white/90" />
				}
			/>
			<Button
				type="submit"
				className="w-full"
				color="primary"
				startContent={<SendIcon />}
				isLoading={isPending}
			>
                Submit
			</Button>
		</Form>
	);
};
