import { Box, Image, Progress, VStack, Text, HStack, IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiSelectionAllThin, PiShapesThin } from 'react-icons/pi';
import { removeBackground, Config } from '@imgly/background-removal';

interface AIProcessorProps {
	originalImage: string;
	onProcessed: (processedImageBlob: Blob) => void;
	activeTool: 'restore' | 'erase' | null;
}

const MotionBox = motion(Box);

const AIProcessor: FC<AIProcessorProps> = ({ originalImage, onProcessed, activeTool }) => {
	const [stage, setStage] = useState<'processing' | 'refined'>('processing');
	const [progress, setProgress] = useState(0);
	const [processedUrl, setProcessedUrl] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<'original' | 'processed'>('processed');
	const toast = useToast();

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const originalImgRef = useRef<HTMLImageElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		let active = true;

		const processImage = async () => {
			try {
				const config: Config = {
					progress: (_key: string, current: number, total: number) => {
						if (active) {
							const perc = Math.round((current / total) * 100);
							setProgress((prev) => (prev !== perc ? perc : prev));
						}
					},
					model: 'isnet_quint8',
					proxyToWorker: true,
				};

				const blob = await removeBackground(originalImage, config);

				if (active) {
					const url = URL.createObjectURL(blob);
					setProcessedUrl(url);
					setStage('refined');
					onProcessed(blob);

					// Load processed image onto canvas
					const img = new window.Image();
					img.crossOrigin = 'anonymous';
					img.onload = () => {
						if (canvasRef.current) {
							const canvas = canvasRef.current;
							canvas.width = img.width;
							canvas.height = img.height;
							const ctx = canvas.getContext('2d');
							if (ctx) {
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								ctx.drawImage(img, 0, 0);
							}
						}
					};
					img.src = url;
				}
			} catch (error) {
				if (active) {
					toast({
						title: 'Background removal failed',
						description: 'Please try another image or check your connection.',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});
					console.error('BG Removal Error:', error);
				}
			}
		};

		processImage();

		return () => {
			active = false;
			if (processedUrl) URL.revokeObjectURL(processedUrl);
		};
	}, [originalImage]);

	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		if (!activeTool || stage !== 'refined' || viewMode !== 'processed') return;
		setIsDrawing(true);
		draw(e);
	};

	const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
		if (!isDrawing) return;
		draw(e);
	};

	const handleMouseUp = () => {
		if (isDrawing) {
			setIsDrawing(false);
			updateParent();
		}
	};

	const draw = (e: React.MouseEvent | React.TouchEvent) => {
		const canvas = canvasRef.current;
		if (!canvas || !activeTool) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

		const x = (clientX - rect.left) * (canvas.width / rect.width);
		const y = (clientY - rect.top) * (canvas.height / rect.height);

		ctx.lineWidth = 30;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		if (activeTool === 'erase') {
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x, y);
			ctx.stroke();
		} else if (activeTool === 'restore' && originalImgRef.current) {
			ctx.globalCompositeOperation = 'source-over';
			ctx.save();
			ctx.beginPath();
			ctx.arc(x, y, 15, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(originalImgRef.current, 0, 0, canvas.width, canvas.height);
			ctx.restore();
		}
	};

	const updateParent = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.toBlob((blob) => {
				if (blob) {
					onProcessed(blob);
					const newUrl = URL.createObjectURL(blob);
					setProcessedUrl((prev) => {
						if (prev) URL.revokeObjectURL(prev);
						return newUrl;
					});
				}
			}, 'image/png');
		}
	};

	return (
		<VStack spacing={8} w="100%" align="stretch">
			<Box
				position="relative"
				w="100%"
				pt="100%" // 1:1 Aspect Ratio
				borderRadius="lg"
				bg="neutral.50"
				overflow="hidden"
				border="1px solid"
				borderColor="neutral.100"
				cursor={activeTool ? 'crosshair' : 'default'}
			>
				<Box position="absolute" inset={0} p={8} display="flex" alignItems="center" justifyContent="center">
					<AnimatePresence mode="wait">
						{viewMode === 'original' ? (
							<MotionBox
								key="original"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								w="100%"
								h="100%"
							>
								<Image
									ref={originalImgRef}
									src={originalImage}
									w="100%"
									h="100%"
									objectFit="contain"
									crossOrigin="anonymous"
									filter="grayscale(0.5)"
								/>
							</MotionBox>
						) : (
							<MotionBox
								key="processed"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								w="100%"
								h="100%"
								position="relative"
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
								onTouchStart={handleMouseDown}
								onTouchMove={handleMouseMove}
								onTouchEnd={handleMouseUp}
							>
								{/* Visual placeholder while processing */}
								{stage === 'processing' && (
									<Image
										src={originalImage}
										w="100%"
										h="100%"
										objectFit="contain"
										crossOrigin="anonymous"
										opacity={0.3}
									/>
								)}

								{/* Canvas for manual editing */}
								<canvas
									ref={canvasRef}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
										display: stage === 'refined' ? 'block' : 'none',
									}}
								/>

								{/* Keep original hidden but loaded for restoration */}
								<img
									ref={originalImgRef}
									src={originalImage}
									crossOrigin="anonymous"
									style={{ display: 'none' }}
									alt=""
								/>

								{stage === 'processing' && (
									<MotionBox
										position="absolute"
										top={0}
										left={0}
										w="100%"
										h="2px"
										bg="brand.500"
										boxShadow="0 0 15px var(--chakra-colors-brand-500)"
										animate={{
											top: ['0%', '100%', '0%'],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'linear',
										}}
									/>
								)}
							</MotionBox>
						)}
					</AnimatePresence>
				</Box>

				{stage === 'processing' && (
					<Box position="absolute" bottom={0} left={0} w="100%">
						<Progress value={progress} size="xs" colorScheme="brand" bg="transparent" borderRadius="0" />
					</Box>
				)}
			</Box>

			<HStack justify="space-between" align="center">
				<VStack align="flex-start" spacing={1}>
					<Text fontSize="xs" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" color="neutral.800">
						{stage === 'processing'
							? 'AI Deconstruction...'
							: activeTool
								? `${activeTool.toUpperCase()} MODE ACTIVE`
								: 'Curation Ready'}
					</Text>
					<Text fontSize="10px" color="neutral.400" fontWeight="600">
						{stage === 'refined'
							? activeTool
								? 'Paint manually to refine details'
								: 'Background removed successfully'
							: 'Analyzing geometry and texture'}
					</Text>
				</VStack>

				{stage === 'refined' && (
					<HStack spacing={2} bg="neutral.50" p={1} borderRadius="full">
						<Tooltip label="Original" fontSize="xs">
							<IconButton
								aria-label="Original View"
								icon={<PiSelectionAllThin />}
								size="sm"
								variant={viewMode === 'original' ? 'solid' : 'ghost'}
								colorScheme={viewMode === 'original' ? 'brand' : 'gray'}
								rounded="full"
								onClick={() => setViewMode('original')}
							/>
						</Tooltip>
						<Tooltip label="Clean PNG" fontSize="xs">
							<IconButton
								aria-label="Processed View"
								icon={<PiShapesThin />}
								size="sm"
								variant={viewMode === 'processed' ? 'solid' : 'ghost'}
								colorScheme={viewMode === 'processed' ? 'brand' : 'gray'}
								rounded="full"
								onClick={() => setViewMode('processed')}
							/>
						</Tooltip>
					</HStack>
				)}
			</HStack>
		</VStack>
	);
};

export default AIProcessor;
