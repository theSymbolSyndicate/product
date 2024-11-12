import Page from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
	it('renders welcome text', () => {
		// Arrange:
		const expectedText = 'Avatar Platform';

		// Act:
		render(<Page />);

		// Assert:
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
