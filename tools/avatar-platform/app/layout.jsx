import { Providers } from './providers';
import { Header } from '@/components/Header';
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
					<Header />
					<div className="container mx-auto px-4">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
