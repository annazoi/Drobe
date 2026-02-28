import {
	Box,
	Heading,
	IconButton,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Flex,
	Icon,
	HStack,
	Spacer,
} from '@chakra-ui/react';
import { CiMenuBurger } from 'react-icons/ci';
import { PiCoatHangerLight } from 'react-icons/pi';
import MenuContent from './MenuContent';

const NavigationBar = (props: any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex minH="100vh" bg="neutral.50">
			{/* Slim Top Bar for Mobile */}
			{/* ... (Mobile Top Bar code remains same) ... */}
			<Box
				display={{ base: 'flex', lg: 'none' }}
				position="fixed"
				top={0}
				left={0}
				right={0}
				h="64px"
				bg="white"
				borderBottom="1px solid"
				borderColor="neutral.200"
				px={4}
				alignItems="center"
				zIndex={100}
			>
				<IconButton
					variant="ghost"
					onClick={onOpen}
					aria-label="open menu"
					icon={<Icon as={CiMenuBurger} boxSize={6} />}
				/>
				<HStack ml={4} spacing={2}>
					<Icon as={PiCoatHangerLight} boxSize={6} color="brand.500" />
					<Heading size="md" letterSpacing="tight">
						DROBE
					</Heading>
				</HStack>
			</Box>

			{/* Desktop Side Rail - Sticky */}
			<Box
				display={{ base: 'none', lg: 'flex' }}
				flexDirection="column"
				w="280px"
				h="100vh"
				position="sticky"
				top={0}
				bg="white"
				borderRight="1px solid"
				borderColor="neutral.200"
				py={8}
				px={6}
				zIndex={100}
			>
				<HStack mb={12} spacing={3} px={2}>
					<Icon as={PiCoatHangerLight} boxSize={8} color="brand.500" />
					<Heading size="lg" letterSpacing="0.1em" fontWeight="800">
						DROBE
					</Heading>
				</HStack>

				<MenuContent />

				<Spacer />

				{/* Profile/Bottom section */}
				<Box px={2} py={4} borderTop="1px solid" borderColor="neutral.100">
					<Heading size="xs" color="neutral.400" textTransform="uppercase" letterSpacing="widest">
						v1.0.0
					</Heading>
				</Box>
			</Box>

			{/* Mobile Drawer (code remains same) */}
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent bg="white">
					<DrawerHeader borderBottomWidth="1px" px={6} py={6}>
						<HStack spacing={3}>
							<Icon as={PiCoatHangerLight} boxSize={6} color="brand.500" />
							<Heading size="md">DROBE</Heading>
						</HStack>
					</DrawerHeader>
					<DrawerBody px={4} py={6}>
						<MenuContent />
					</DrawerBody>
				</DrawerContent>
			</Drawer>

			{/* Main Content Area - Full Width, Body Scroll */}
			<Box flex="1" p={0} as="main" bg="neutral.50" minW={0}>
				{props.children}
			</Box>
		</Flex>
	);
};

export default NavigationBar;
