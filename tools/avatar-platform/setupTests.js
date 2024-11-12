import '@testing-library/jest-dom';

const originalEnv = { ...process.env };
const envMock = {};
process.env = {
	...originalEnv,
	...envMock
};

beforeEach(() => {
	jest.spyOn(console, 'error').mockImplementation(jest.fn());
	jest.spyOn(console, 'warn').mockImplementation(jest.fn());
});
