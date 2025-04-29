import React, { useState, useEffect } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useTime,
	useSpring,
} from "motion/react";

import mePhoto from "../assets/me.jpg";

const keyword1 = "Experience";
const scrollText = "Scroll to start!";
const keyword2 = "Responsive";
const keyword3 = "Accessibility";
const keyword4 = "Performance";
const keyword5 = "Animation";

const AnimatedText = ({ text }) => {
	return (
		<div className="flex flex-wrap items-center justify-center w-full max-w-full">
			{Array.from(text).map((letter, index) => (
				<motion.span
					key={index}
					animate={{
						textShadow: [
							"0 0 4px rgba(65,105,225,0.9), 0 0 8px rgba(65,105,225,0.7), 0 0 12px rgba(65,105,225,0.5)",
							"0 0 4px rgba(138,43,226,0.9), 0 0 8px rgba(138,43,226,0.7), 0 0 12px rgba(138,43,226,0.5)",
							"0 0 4px rgba(255,20,147,0.9), 0 0 8px rgba(255,20,147,0.7), 0 0 12px rgba(255,20,147,0.5)",
							"0 0 4px rgba(138,43,226,0.9), 0 0 8px rgba(138,43,226,0.7), 0 0 12px rgba(138,43,226,0.5)",
							"0 0 4px rgba(65,105,225,0.9), 0 0 8px rgba(65,105,225,0.7), 0 0 12px rgba(65,105,225,0.5)",
						],
					}}
					transition={{
						textShadow: {
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
							delay: index * 0.1,
						},
					}}
					style={{
						display: "inline-block",
						marginRight: letter === " " ? "0.3rem" : "0.05rem",
						fontSize: "clamp(1rem, 4vw, 2rem)",
						fontWeight: "bold",
						color: "black",
					}}
				>
					{letter}
				</motion.span>
			))}
		</div>
	);
};

const Cube = () => {
	const time = useTime();
	const [size, setSize] = useState(300);
	const [halfSize, setHalfSize] = useState(150);

	useEffect(() => {
		const calculateSize = () => {
			const baseSize = 300;
			let newSize = baseSize;

			if (window.innerWidth < 768) {
				newSize = Math.min(window.innerWidth * 0.5, baseSize);
			}

			setSize(newSize);
			setHalfSize(newSize / 2);
		};

		calculateSize();

		window.addEventListener("resize", calculateSize);

		return () => window.removeEventListener("resize", calculateSize);
	}, []);

	const secRotation = useTransform(time, (t) => {
		const seconds = (t / 10000) * 6;
		return seconds * 6;
	});

	const fastRotation = useTransform(time, (t) => {
		const minutes = t / 5000;
		return minutes * 6;
	});

	const fastestRotation = useTransform(time, (t) => {
		const hours = t / 2500;
		return hours * 30;
	});

	const smoothSec = useSpring(secRotation, { stiffness: 100, damping: 20 });
	const smoothMin = useSpring(fastRotation, { stiffness: 100, damping: 20 });
	const smoothHour = useSpring(fastestRotation, {
		stiffness: 100,
		damping: 20,
	});

	return (
		<div className="scene" style={{ perspective: "800px" }}>
			<motion.div
				className="cube"
				style={{
					position: "relative",
					width: `${size}px`,
					height: `${size}px`,
					transformStyle: "preserve-3d",
					rotateX: smoothSec,
					rotateY: smoothMin,
					rotateZ: smoothHour,
				}}
			>
				{/* Front Face */}
				<motion.div
					className="face front"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={scrollText} />
				</motion.div>

				{/* Back Face */}
				<motion.div
					className="face back"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `rotateY(180deg) translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={keyword2} />
				</motion.div>

				{/* Right Face */}
				<motion.div
					className="face right"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `rotateY(90deg) translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={keyword1} />
				</motion.div>

				{/* Left Face */}
				<motion.div
					className="face left"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={keyword3} />
				</motion.div>

				{/* Top Face */}
				<motion.div
					className="face top"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `rotateX(90deg) translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={keyword4} />
				</motion.div>

				{/* Bottom Face */}
				<motion.div
					className="face bottom"
					style={{
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: "#ffffff",
						border: "1px solid #000000",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "20px",
						backfaceVisibility: "hidden",
						transformStyle: "preserve-3d",
						transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
					}}
				>
					<AnimatedText text={keyword5} />
				</motion.div>
			</motion.div>
		</div>
	);
};

const InitialAnimation = ({ onComplete, isMobile }) => {
	// Track scroll progress with local scrollYProgress
	const { scrollYProgress } = useScroll();

	// Listen for scroll completion to trigger navigation
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (latest) => {
			// When user scrolls to end (or close to it), trigger the completion
			if (latest >= 0.95) {
				onComplete && onComplete();
			}
		});

		return () => unsubscribe();
	}, [scrollYProgress, onComplete]);

	const [showScrollHint, setShowScrollHint] = useState(true);

	// Hide the scroll hint after 5 seconds
	useEffect(() => {
		if (isMobile) {
			const timer = setTimeout(() => {
				setShowScrollHint(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isMobile]);

	// Transform scroll progress to animation values
	const cubeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const myNameIsOpacity = useTransform(
		scrollYProgress,
		[0.25, 0.4, 0.45, 0.55],
		[0, 1, 1, 0]
	);
	const niceMeetYouOpacity = useTransform(
		scrollYProgress,
		[0.6, 0.7, 0.75, 0.85],
		[0, 1, 1, 0]
	);
	const letsStartOpacity = useTransform(scrollYProgress, [0.9, 1.0], [0, 1]);

	return (
		<>
			<div id="scroll-container" style={{ height: "500vh" }}></div>

			<div
				className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center"
				style={{ zIndex: 10 }}
			>
				<div
					className="animation-container px-4"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						position: "relative",
						height: "100vh",
						width: "100%",
					}}
				>
					{/* Initial cube animation */}
					<motion.div
						className="initial-section"
						style={{
							opacity: cubeOpacity,
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Cube />
					</motion.div>

					{/* My name is Luke section */}
					<motion.div
						style={{
							opacity: myNameIsOpacity,
							position: "absolute",
							top: "50%",
							left: 0,
							right: 0,
							transform: "translateY(-50%)",
							textAlign: "center",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: isMobile ? "1rem" : "2rem",
							padding: "0 1rem",
						}}
					>
						<motion.h2
							style={{
								color: "white",
								fontSize: "clamp(1.5rem, 6vw, 4rem)",
								margin: 0,
								marginBottom: "0.5rem",
								textShadow: "0 0 10px rgba(255,255,255,0.3)",
							}}
						>
							My name is Luke...
						</motion.h2>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<motion.img
								src={mePhoto}
								alt="Luke"
								style={{
									width: isMobile
										? "clamp(100px, 50vw, 200px)"
										: "clamp(150px, 30vw, 300px)",
									height: isMobile
										? "clamp(100px, 50vw, 200px)"
										: "clamp(150px, 30vw, 300px)",
									borderRadius: "50%",
									objectFit: "cover",
									objectPosition: "0px 5%",
									border: "4px solid white",
									boxShadow: "0 0 20px rgba(255,255,255,0.3)",
									margin: "0 auto",
									display: "block",
								}}
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.5 }}
							/>
						</div>
					</motion.div>

					{/* Nice to meet you section */}
					<motion.div
						style={{
							opacity: niceMeetYouOpacity,
							position: "absolute",
							top: "50%",
							left: 0,
							right: 0,
							transform: "translateY(-50%)",
							textAlign: "center",
							padding: "0 1rem",
						}}
					>
						<motion.h2
							style={{
								color: "white",
								fontSize: "clamp(1.75rem, 8vw, 5rem)",
								margin: 0,
								textShadow: "0 0 10px rgba(255,255,255,0.3)",
							}}
						>
							Nice to meet you!
						</motion.h2>
					</motion.div>

					{/* Let's get started section */}
					<motion.div
						style={{
							opacity: letsStartOpacity,
							position: "absolute",
							top: "50%",
							left: 0,
							right: 0,
							transform: "translateY(-50%)",
							textAlign: "center",
							padding: "0 1rem",
						}}
					>
						<motion.h2
							style={{
								color: "white",
								fontSize: "clamp(1.75rem, 8vw, 5rem)",
								margin: 0,
								textShadow: "0 0 10px rgba(255,255,255,0.3)",
							}}
							animate={{
								scale: [1, 1.05, 1],
							}}
							transition={{
								scale: {
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								},
							}}
						>
							Let's get started!
						</motion.h2>
					</motion.div>
				</div>
			</div>

			{/* Mobile scroll hint */}
			{isMobile && showScrollHint && (
				<motion.div
					className="fixed bottom-16 left-0 right-0 flex justify-center items-center z-30"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					exit={{ opacity: 0 }}
				>
					<div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-black text-sm flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
						Scroll to continue
					</div>
				</motion.div>
			)}

			{/* Skip button - responsive size and position */}
			<motion.button
				className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-white bg-opacity-20 text-black px-3 py-1 md:px-4 md:py-2 rounded-full z-20 text-sm md:text-base"
				onClick={() => onComplete && onComplete()}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				Skip Intro
			</motion.button>
		</>
	);
};

export default InitialAnimation;
