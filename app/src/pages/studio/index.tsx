import { Box, VStack } from '@chakra-ui/react';
import CreateOutfit from '../closet/CreateOutfit';
import { FC } from 'react';

const Studio: FC = () => {
	return (
		<Box w="100%" py={6} px={12} pt={{ base: '80px', md: 6 }}>
			<VStack spacing={8} align="stretch">
				<CreateOutfit />
			</VStack>
		</Box>
	);
};

export default Studio;
