import React, { useState, useEffect } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useTime,
	useSpring,
} from "motion/react";

import mePhoto from "../assets/me.jpg";

// Cube face configuration
const CUBE_FACES = [
	{
		name: "front",
		text: "Scroll to start!",
		transform: (size) => `translateZ(${size / 2}px)`,
	},
	{
		name: "back",
		text: "Responsive",
		transform: (size) => `rotateY(180deg) translateZ(${size / 2}px)`,
	},
	{
		name: "right",
		text: "Experience",
		transform: (size) => `rotateY(90deg) translateZ(${size / 2}px)`,
	},
	{
		name: "left",
		text: "Accessibility",
		transform: (size) => `rotateY(-90deg) translateZ(${size / 2}px)`,
	},
	{
		name: "top",
		text: "Performance",
		transform: (size) => `rotateX(90deg) translateZ(${size / 2}px)`,
	},
	{
		name: "bottom",
		text: "Animation",
		transform: (size) => `rotateX(-90deg) translateZ(${size / 2}px)`,
	},
];

// Animated text component with glow effect
const AnimatedText = ({ text }) => {
	return (
		<div className="flex flex-wrap items-center justify-center w-full">
			{text.split("").map((letter, index) => (
				<motion.span
					key={index}
					className="inline-block font-bold"
					style={{
						marginRight: letter === " " ? "0.3em" : "0.05em",
						fontSize: "clamp(1.2rem, 3vw, 2rem)",
						color: "transparent",
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						filter: "drop-shadow(0 0 20px rgba(102, 126, 234, 0.5))",
					}}
					animate={{
						filter: [
							"drop-shadow(0 0 20px rgba(102, 126, 234, 0.5))",
							"drop-shadow(0 0 30px rgba(118, 75, 162, 0.8))",
							"drop-shadow(0 0 20px rgba(102, 126, 234, 0.5))",
						],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						delay: index * 0.05,
						ease: "easeInOut",
					}}
				>
					{letter}
				</motion.span>
			))}
		</div>
	);
};

// Enhanced 3D cube component
const Cube = () => {
	const time = useTime();
	const [cubeSize, setCubeSize] = useState(300);

	// Responsive sizing
	useEffect(() => {
		const updateSize = () => {
			const vw = Math.min(window.innerWidth, window.innerHeight);
			setCubeSize(Math.min(vw * 0.4, 300));
		};
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	// Smooth rotation animations
	const rotateX = useSpring(
		useTransform(time, (t) => (t / 10000) * 360),
		{
			stiffness: 50,
			damping: 20,
		}
	);
	const rotateY = useSpring(
		useTransform(time, (t) => (t / 8000) * 360),
		{
			stiffness: 50,
			damping: 20,
		}
	);
	const rotateZ = useSpring(
		useTransform(time, (t) => (t / 12000) * 360),
		{
			stiffness: 50,
			damping: 20,
		}
	);

	return (
		<div className="relative" style={{ perspective: "1000px" }}>
			{/* Ambient glow */}
			<motion.div
				className="absolute rounded-full"
				style={{
					width: cubeSize * 2,
					height: cubeSize * 2,
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					background:
						"radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)",
					filter: "blur(40px)",
				}}
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="relative"
				style={{
					width: cubeSize,
					height: cubeSize,
					transformStyle: "preserve-3d",
					rotateX,
					rotateY,
					rotateZ,
				}}
			>
				{CUBE_FACES.map((face) => (
					<motion.div
						key={face.name}
						className="absolute flex items-center justify-center p-5"
						style={{
							width: cubeSize,
							height: cubeSize,
							transform: face.transform(cubeSize),
							transformStyle: "preserve-3d",
							backfaceVisibility: "hidden",
							background: "rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(10px)",
							border: "1px solid rgba(255, 255, 255, 0.2)",
							boxShadow: "inset 0 0 30px rgba(102, 126, 234, 0.2)",
						}}
						whileHover={{
							background: "rgba(255, 255, 255, 0.15)",
							boxShadow: "inset 0 0 40px rgba(118, 75, 162, 0.3)",
						}}
					>
						<AnimatedText text={face.text} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

// Section component for cleaner code
const ScrollSection = ({ opacity, children, className = "" }) => (
	<motion.div
		className={`absolute inset-0 flex items-center justify-center ${className}`}
		style={{ opacity }}
	>
		{children}
	</motion.div>
);

// Main component
const InitialAnimation = ({ onComplete, isMobile }) => {
	const { scrollYProgress } = useScroll();
	const [showScrollHint, setShowScrollHint] = useState(true);

	// Scroll progress transforms
	const cubeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const nameOpacity = useTransform(
		scrollYProgress,
		[0.25, 0.4, 0.45, 0.55],
		[0, 1, 1, 0]
	);
	const greetingOpacity = useTransform(
		scrollYProgress,
		[0.6, 0.7, 0.75, 0.85],
		[0, 1, 1, 0]
	);
	const startOpacity = useTransform(scrollYProgress, [0.9, 1.0], [0, 1]);

	// Handle scroll completion
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (value) => {
			if (value >= 0.95) onComplete?.();
		});
		return unsubscribe;
	}, [scrollYProgress, onComplete]);

	// Hide scroll hint after delay
	useEffect(() => {
		if (isMobile) {
			const timer = setTimeout(() => setShowScrollHint(false), 5000);
			return () => clearTimeout(timer);
		}
	}, [isMobile]);

	return (
		<>
			{/* Scroll container */}
			<div style={{ height: "500vh" }} />

			{/* Fixed animation container */}
			<div className="fixed inset-0 flex items-center justify-center z-10">
				<div className="relative w-full h-full">
					{/* Cube section */}
					<ScrollSection opacity={cubeOpacity}>
						<Cube />
					</ScrollSection>

					{/* Name section */}
					<ScrollSection opacity={nameOpacity}>
						<div className="text-center px-4 space-y-6">
							<motion.h2
								className="text-white m-0"
								style={{
									fontSize: "clamp(2rem, 6vw, 4rem)",
									textShadow: "0 0 30px rgba(255,255,255,0.5)",
								}}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.6 }}
							>
								My name is Luke...
							</motion.h2>
							<motion.div
								className="relative mx-auto"
								style={{
									width: isMobile
										? "clamp(120px, 40vw, 200px)"
										: "clamp(150px, 25vw, 250px)",
									height: isMobile
										? "clamp(120px, 40vw, 200px)"
										: "clamp(150px, 25vw, 250px)",
								}}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<img
									src={mePhoto}
									alt="Luke"
									className="w-full h-full rounded-full object-cover border-4 border-white"
									style={{
										objectPosition: "center 20%",
										boxShadow: "0 0 40px rgba(255,255,255,0.4)",
									}}
								/>
								<motion.div
									className="absolute inset-0 rounded-full"
									style={{
										background:
											"radial-gradient(circle, transparent 60%, rgba(102, 126, 234, 0.2) 100%)",
									}}
									animate={{
										scale: [1, 1.1, 1],
										opacity: [0.5, 0.8, 0.5],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								/>
							</motion.div>
						</div>
					</ScrollSection>

					{/* Greeting section */}
					<ScrollSection opacity={greetingOpacity}>
						<motion.h2
							className="text-white text-center px-4 m-0"
							style={{
								fontSize: "clamp(2.5rem, 8vw, 5rem)",
								textShadow: "0 0 40px rgba(255,255,255,0.6)",
							}}
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							Nice to meet you!
						</motion.h2>
					</ScrollSection>

					{/* Start section */}
					<ScrollSection opacity={startOpacity}>
						<motion.h2
							className="text-white text-center px-4 m-0"
							style={{
								fontSize: "clamp(2.5rem, 8vw, 5rem)",
								textShadow: "0 0 40px rgba(255,255,255,0.6)",
							}}
							animate={{
								scale: [1, 1.05, 1],
								textShadow: [
									"0 0 40px rgba(255,255,255,0.6)",
									"0 0 60px rgba(102, 126, 234, 0.8)",
									"0 0 40px rgba(255,255,255,0.6)",
								],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							Let's get started!
						</motion.h2>
					</ScrollSection>
				</div>
			</div>

			{/* Mobile scroll hint */}
			{isMobile && showScrollHint && (
				<motion.div
					className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 0.8, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
				>
					<div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center space-x-2">
						<motion.svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							animate={{ y: [0, 5, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							<path d="M12 5v14M19 12l-7 7-7-7" />
						</motion.svg>
						<span className="text-sm font-medium">Scroll to continue</span>
					</div>
				</motion.div>
			)}

			{/* Skip button */}
			<motion.button
				className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full z-20 font-medium"
				onClick={onComplete}
				whileHover={{
					scale: 1.05,
					backgroundColor: "rgba(255, 255, 255, 0.2)",
				}}
				whileTap={{ scale: 0.95 }}
			>
				Skip Intro
			</motion.button>
		</>
	);
};

export default InitialAnimation;
