import { AvatarRequestForm } from '@/components/AvatarRequestForm';
import { formFields } from '@/config';

export const metadata = {
	name: 'Dashboard',
	description: 'Dashboard'
};

const text = 'As you embark with us on our voyage, we encouraged you to create a character for yourself that both protects your real identity online, as well as contributes to our story as we build the future together. Our community and team consists of some crazy avatar characters, so be as imaginitive as you like! Just make sure it’s not offensive racially, sexually, religiously or politically.\n\nBy filling out the following form fields, you’ll give our talented art team some fun and valuable reference to build from. The resulting art piece will consist of a full color character in a unique ‘scene’ that fits “YOU” and fits into our space pirate ethos. The full art piece and separate character avatar assets will be yours to keep for use in Discord and other social media platforms as you choose.\n\nHave fun!';

export default async function FormSubmissionPage() {
	return (
		<div className="flex w-full flex-col items-center gap-4 py-4">
			<div className="flex w-full flex-col gap-4 md:max-w-xl">
				<div>
					<h1>Avatar Art</h1>
					<h3>Request Form</h3>
				</div>
				<p className="whitespace-pre-line">
					{text}
				</p>
				<AvatarRequestForm fields={formFields} />
			</div>
		</div>
	);
}
