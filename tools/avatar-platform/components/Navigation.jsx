import { ProfileDropdown } from './ProfileDropdown';
import { SignInWithGoogleButton } from './SignInButton';
import { Link, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';

export const Navigation = ({ menuItems, user }) => {
	const isLoggedIn = !!user;

	return (
		<Navbar
			isBordered
			maxWidth="full"
			classNames={{ wrapper: 'container mx-auto px-4' }}
		>
			<NavbarContent justify="start">
				<NavbarContent className="mr-4">
					<NavbarMenuToggle className="sm:hidden" />
				</NavbarContent>
			</NavbarContent>
			<NavbarContent as="div" className="items-center" justify="end">
				<div className="mr-4 hidden flex-row gap-2 sm:flex">
					{menuItems.map(item => (
						<NavbarItem key={item.text}>
							<Link href={item.href}>
								{item.text}
							</Link>
						</NavbarItem>
					))}
				</div>
				{!isLoggedIn && <SignInWithGoogleButton />}
				{isLoggedIn && <ProfileDropdown user={user} />}
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map(item => (
					<NavbarMenuItem key={item.text}>
						<Link
							href={item.href}
							className="w-full"
							size="lg"
						>
							{item.text}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar >
	);
};
