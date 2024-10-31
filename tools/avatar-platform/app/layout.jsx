import { Providers } from './providers';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export const metadata = {
	title: 'Avatar Platform'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="dark">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
