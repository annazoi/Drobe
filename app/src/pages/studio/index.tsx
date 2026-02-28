import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import CreateOutfit from '../closet/CreateOutfit';
import { FC } from 'react';

const Studio: FC = () => {
	return (
		<Box w="100%" py={6} px={12} pt={{ base: '80px', md: 6 }}>
			<VStack spacing={8} align="stretch">
				<Box>
					<Heading size="2xl" fontWeight="900" letterSpacing="tight">
						STUDIO
					</Heading>
					<Text
						color="neutral.400"
						fontSize="xs"
						fontWeight="700"
						letterSpacing="widest"
						textTransform="uppercase"
					>
						The Creative Hub
					</Text>
				</Box>

				<CreateOutfit />
			</VStack>
		</Box>
	);
};

export default Studio;
