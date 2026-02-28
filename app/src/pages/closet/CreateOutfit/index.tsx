import { FC, useEffect, useRef, useState } from 'react';
import {
	Box,
	Image,
	HStack,
	VStack,
	useToast,
	Text,
	SimpleGrid,
	Textarea,
	Flex,
	Heading,
	Icon,
	IconButton,
	Tooltip,
	Divider,
} from '@chakra-ui/react';
import { useMutation, useQuery } from 'react-query';
import { authStore } from '../../../store/authStore';
import { CategorizedClothes, Clothe } from '../../../interfaces/clothe';
import { CLOTHE_TYPES } from '../../../constants/clotheTypes';
// removed Modal import
import { getClothes } from '../../../services/clothe';
import { NewOutfit } from '../../../interfaces/outfit';
import { createOutfit } from '../../../services/outfit';
import { categorizeClothes } from '../../../utils/categorizeClothes';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { OUTFIT_TYPES } from '../../../constants/outfittypes';
import {
	IoCloseOutline,
	IoTrashOutline,
	IoArrowForwardOutline,
	IoArrowBackOutline,
	IoLayersOutline,
} from 'react-icons/io5';
import { fabric } from 'fabric';
import { getCloudinaryUrl } from '../../../utils/cloudinary.utils';

const CreateOutfit: FC = () => {
	const { userId } = authStore((state) => state);
	const [clothes, setClothes] = useState<CategorizedClothes>();
	const [selectedClothes, setSelectedClothes] = useState<Clothe[]>([]);
	const [colorScheme, setColorScheme] = useState('');
	const [notes, setNotes] = useState('');
	const [type, setType] = useState('');

	const toast = useToast();
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const fabricCanvas = useRef<fabric.Canvas | null>(null);
	const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
	const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });

	// Initialize Fabric Canvas
	useEffect(() => {
		if (canvasContainerRef.current && !fabricCanvas.current) {
			const canvasEl = document.createElement('canvas');
			canvasContainerRef.current.appendChild(canvasEl);

			fabricCanvas.current = new fabric.Canvas(canvasEl, {
				width: 800,
				height: 600,
				backgroundColor: '#ffffff',
				preserveObjectStacking: true,
			});

			fabric.Object.prototype.set({
				transparentCorners: false,
				cornerColor: '#000000',
				cornerStyle: 'circle',
				borderColor: '#000000',
				cornerSize: 8,
				padding: 10,
			});

			const updateToolbarPos = () => {
				const activeObj = fabricCanvas.current?.getActiveObject();
				if (activeObj) {
					const rect = activeObj.getBoundingRect();
					setToolbarPos({
						top: rect.top + rect.height + 15,
						left: rect.left + rect.width / 2,
					});
					setActiveObject(activeObj);
				} else {
					setActiveObject(null);
				}
			};

			const canvas = fabricCanvas.current;
			canvas.on('selection:created', updateToolbarPos);
			canvas.on('selection:updated', updateToolbarPos);
			canvas.on('selection:cleared', () => setActiveObject(null));
			canvas.on('object:moving', updateToolbarPos);
			canvas.on('object:scaling', updateToolbarPos);
			canvas.on('object:rotating', updateToolbarPos);
		}

		return () => {
			if (fabricCanvas.current) {
				fabricCanvas.current.dispose();
				fabricCanvas.current = null;
			}
			if (canvasContainerRef.current) {
				canvasContainerRef.current.innerHTML = '';
			}
		};
	}, []);

	useQuery('clothes', () => getClothes({ userId: userId }), {
		onSuccess: (data: Clothe[]) => {
			categorizeClothes({ data, setClothes });
		},
	});

	const { mutate: CreateOutfitMutate, isLoading: CreateOutfitIsLoading } = useMutation({
		mutationFn: ({ clothes, colorScheme, notes, type }: NewOutfit) =>
			createOutfit({ clothes, colorScheme, notes, type }),
	});

	const handleSelectedClothes = (clothe: Clothe) => {
		const isSelected = selectedClothes.find((item) => item.id === clothe.id);
		if (isSelected) {
			setSelectedClothes(selectedClothes.filter((item) => item.id !== clothe.id));
			const canvas = fabricCanvas.current;
			if (canvas) {
				const objects = canvas.getObjects() as (fabric.Object & { clotheId?: string })[];
				const toRemove = objects.find((obj) => obj.clotheId === clothe.id);
				if (toRemove) {
					canvas.remove(toRemove);
					canvas.renderAll();
				}
			}
		} else {
			setSelectedClothes([...selectedClothes, clothe]);
			const canvas = fabricCanvas.current;
			if (canvas) {
				const optimizedUrl = getCloudinaryUrl(clothe.images[0].file, 400);
				const imageUrl = new URL(optimizedUrl);
				imageUrl.searchParams.append('t', Date.now().toString());

				fabric.Image.fromURL(
					imageUrl.toString(),
					(img) => {
						if (!img) return;
						img.set({
							left: 100 + Math.random() * 200,
							top: 100 + Math.random() * 200,
						});
						img.scaleToWidth(200);
						(img as any).clotheId = clothe.id;
						canvas.add(img);
						canvas.setActiveObject(img);
						canvas.renderAll();
					},
					{ crossOrigin: 'anonymous' },
				);
			}
		}
	};

	const handleNewOutfit = () => {
		if (selectedClothes.length === 0) {
			toast({ title: 'Please select at least one item', status: 'warning', position: 'top' });
			return;
		}

		if (fabricCanvas.current) {
			fabricCanvas.current.discardActiveObject();
			fabricCanvas.current.requestRenderAll();

			const dataUrl = fabricCanvas.current.toDataURL({
				format: 'png',
				quality: 1,
				multiplier: 2, // High resolution
			});

			// Convert dataUrl to File
			fetch(dataUrl)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], 'outfit.png', { type: 'image/png' });

					CreateOutfitMutate(
						{
							clothes: selectedClothes.map((item) => item.id),
							colorScheme: colorScheme,
							notes: notes,
							type: type,
							image: file,
						},
						{
							onSuccess: () => {
								toast({ title: 'Outfit curated', status: 'success', position: 'top' });
								handleClearCanvas();
							},
						},
					);
				});
		} else {
			// Fallback if canvas is not ready
			CreateOutfitMutate(
				{
					clothes: selectedClothes.map((item) => item.id),
					colorScheme: colorScheme,
					notes: notes,
					type: type,
				},
				{
					onSuccess: () => {
						toast({ title: 'Outfit curated', status: 'success', position: 'top' });
						handleClearCanvas();
					},
				},
			);
		}
	};

	const handleClearCanvas = () => {
		setSelectedClothes([]);
		fabricCanvas.current?.clear();
		if (fabricCanvas.current) {
			fabricCanvas.current.backgroundColor = '#ffffff';
			fabricCanvas.current.renderAll();
		}
		setActiveObject(null);
	};

	const deleteSelected = () => {
		if (activeObject) {
			const clotheId = (activeObject as any).clotheId;
			if (clotheId) {
				setSelectedClothes((prev) => prev.filter((c) => c.id !== clotheId));
			}
			fabricCanvas.current?.remove(activeObject);
			fabricCanvas.current?.discardActiveObject();
			setActiveObject(null);
		}
	};

	const bringToFront = () => {
		if (activeObject) {
			fabricCanvas.current?.bringToFront(activeObject);
			fabricCanvas.current?.requestRenderAll();
		}
	};

	const sendToBack = () => {
		if (activeObject) {
			fabricCanvas.current?.sendToBack(activeObject);
			// Ensure background stays at the very back if it exists
			if (fabricCanvas.current?.backgroundColor) {
				// Fabric handles backgroundColor separately, so this is usually fine
			}
			fabricCanvas.current?.requestRenderAll();
		}
	};

	return (
		<Box h="calc(100vh - 100px)" bg="white" overflow="hidden">
			<Flex h="100%" direction={{ base: 'column', lg: 'row' }}>
				{/* LEFT: Library Sidebar */}
				<Box
					w={{ base: '100%', lg: '320px' }}
					borderRight="1px solid"
					borderColor="gray.100"
					display="flex"
					flexDirection="column"
				>
					<Box p={5} borderBottom="1px solid" borderColor="gray.50">
						<Heading size="xs" textTransform="uppercase" letterSpacing="widest" color="gray.500">
							Closet Library
						</Heading>
					</Box>
					<Box flex="1" overflowY="auto" p={5}>
						<VStack spacing={8} align="stretch">
							{CLOTHE_TYPES.map((type, idx) => {
								const typeItems = clothes ? clothes[type.value] : [];
								if (!typeItems || typeItems.length === 0) return null;
								return (
									<Box key={idx}>
										<Text fontSize="xs" fontWeight="bold" mb={3} color="gray.400" letterSpacing="tighter">
											{type.label}
										</Text>
										<SimpleGrid columns={2} spacing={3}>
											{typeItems.map((clothe: Clothe) => {
												const isSelected = selectedClothes.some((i) => i.id === clothe.id);
												return (
													<Box
														key={clothe.id}
														onClick={() => handleSelectedClothes(clothe)}
														cursor="pointer"
														pos="relative"
														borderRadius="md"
														overflow="hidden"
														transition="transform 0.2s"
														_hover={{ transform: 'translateY(-2px)' }}
													>
														<Image
															src={getCloudinaryUrl(clothe.images[0].file, 200)}
															border="2px solid"
															borderColor={isSelected ? 'black' : 'transparent'}
															filter={isSelected ? 'none' : 'grayscale(0.4)'}
															opacity={isSelected ? 1 : 0.8}
														/>
													</Box>
												);
											})}
										</SimpleGrid>
									</Box>
								);
							})}
						</VStack>
					</Box>
				</Box>

				{/* CENTER: The Canvas Workspace */}
				<Flex flex="1" bg="gray.50" pos="relative" direction="column" align="center" justify="center" p={8}>
					<HStack
						pos="absolute"
						top={6}
						zIndex={10}
						bg="white"
						p={1}
						borderRadius="full"
						shadow="sm"
						border="1px solid"
						borderColor="gray.200"
					>
						<Button
							text="CLEAR"
							variant="ghost"
							onClick={() => fabricCanvas.current?.clear()}
							backgroundColor="transparent"
							_hover={{ backgroundColor: 'transparent' }}
							color="black"
						/>
						<Divider orientation="vertical" h="20px" />
						<Text fontSize="xs" fontWeight="bold" px={4} color="gray.500">
							{selectedClothes.length} ITEMS SELECTED
						</Text>
					</HStack>

					<Box
						bg="white"
						shadow="2xl"
						borderRadius="xl"
						overflow="hidden"
						w="100%"
						maxW="800px"
						h="100%"
						maxH="700px"
						pos="relative"
					>
						<div ref={canvasContainerRef} style={{ width: '100%', height: '100%' }} />

						{/* Floating Toolbar Fix */}
						{activeObject && (
							<HStack
								pos="absolute"
								top={`${toolbarPos.top}px`}
								left={`${toolbarPos.left}px`}
								transform="translateX(-50%)"
								bg="black"
								p={1}
								borderRadius="lg"
								shadow="dark-lg"
								zIndex={20}
							>
								<IconButton
									aria-label="Bring to Front"
									icon={<IoArrowForwardOutline style={{ transform: 'rotate(-90deg)' }} />}
									size="sm"
									color="white"
									variant="unstyled"
									onClick={(e) => {
										e.stopPropagation();
										bringToFront();
									}}
									rounded="full"
									display="flex"
									justifyContent="center"
								/>
								<IconButton
									aria-label="Send to Back"
									icon={<IoArrowBackOutline style={{ transform: 'rotate(-90deg)' }} />}
									size="sm"
									color="white"
									variant="unstyled"
									onClick={(e) => {
										e.stopPropagation();
										sendToBack();
									}}
									rounded="full"
									display="flex"
									justifyContent="center"
								/>
								<IconButton
									size="sm"
									variant="unstyled"
									color="white"
									icon={<IoTrashOutline />}
									onClick={() => {
										fabricCanvas.current?.remove(activeObject);
										setSelectedClothes((prev) => prev.filter((c) => (activeObject as any).clotheId !== c.id));
									}}
									aria-label="Delete"
									display="flex"
									justifyContent="center"
								/>
							</HStack>
						)}
					</Box>
				</Flex>

				{/* RIGHT: Curation Form */}
				<Box
					w={{ base: '100%', lg: '380px' }}
					borderLeft="1px solid"
					borderColor="gray.100"
					p={8}
					bg="white"
					display="flex"
					flexDirection="column"
				>
					<Heading size="xs" textTransform="uppercase" letterSpacing="widest" mb={8} color="gray.500">
						Outfit Details
					</Heading>

					<VStack spacing={6} align="stretch" flex="1">
						<Box>
							<Text fontSize="xs" fontWeight="800" mb={2}>
								OCCASION
							</Text>
							<Select
								onChange={(e: any) => setType(e.target.value)}
								options={OUTFIT_TYPES}
								placeholder="Select Occasion..."
							/>
						</Box>

						<Box>
							<Text fontSize="xs" fontWeight="800" mb={2}>
								COLOR PALETTE
							</Text>
							<Textarea
								placeholder="E.g., Earthy tones with gold accents"
								onChange={(e) => setColorScheme(e.target.value)}
								bg="gray.50"
								border="none"
								_focus={{ bg: 'white', ring: '1px solid black' }}
							/>
						</Box>

						<Box>
							<Text fontSize="xs" fontWeight="800" mb={2}>
								STYLING NOTES
							</Text>
							<Textarea
								placeholder="How should this be worn?"
								h="120px"
								onChange={(e) => setNotes(e.target.value)}
								bg="gray.50"
								border="none"
								_focus={{ bg: 'white', ring: '1px solid black' }}
							/>
						</Box>
					</VStack>

					<Button
						text="SAVE OUTFIT"
						w="100%"
						h="50px"
						onClick={() => {
							/* Call mutate */
						}}
						isDisabled={selectedClothes.length === 0}
					/>
				</Box>
			</Flex>
		</Box>
	);
};

export default CreateOutfit;
