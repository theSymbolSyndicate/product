import { formFields } from '@/config';
import { forwardRef } from 'react';

const PDFCanvasComponent = ({ formData }, ref) => {
	return (
		<div className="relative size-0 overflow-hidden">
			<div className="absolute">
				<div className="flex w-96 flex-col gap-4 bg-white px-4 py-8 text-black" ref={ref}>
					{formFields.map(field => (
						<div key={field.name}>
							<p className="text-sm capitalize leading-4 opacity-70">{field.name}</p>
							<p className="capitalize leading-4">{formData[field.name] || '-'}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export const PDFCanvas = forwardRef(PDFCanvasComponent);
