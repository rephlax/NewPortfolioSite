import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const HomeArea = ({ onNavigate }) => {
	const [hoveredOption, setHoveredOption] = useState(null);
	const [shootingStars, setShootingStars] = useState([]);

	// Navigation options with 90-degree spacing
	const navOptions = [
		{ id: "about", label: "About Me", angle: 0, color: "#60A5FA" },
		{ id: "projects", label: "Projects", angle: 90, color: "#A78BFA" },
		{ id: "skills", label: "Skills", angle: 180, color: "#F472B6" },
		{ id: "experience", label: "Experience", angle: 270, color: "#34D399" },
	];

	// Responsive sizing based on viewport
	const getSize = () => {
		const vw = Math.min(window.innerWidth, window.innerHeight);
		return {
			orbSize: Math.min(vw * 0.15, 160),
			orbitRadius: Math.min(vw * 0.3, 240),
		};
	};

	const [{ orbSize, orbitRadius }, setSize] = useState(getSize());

	// Update sizes on window resize
	useEffect(() => {
		const handleResize = () => setSize(getSize());
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Create shooting stars occasionally
	useEffect(() => {
		const interval = setInterval(() => {
			if (Math.random() > 0.7) {
				const id = Date.now();
				const angle = Math.random() * 60 + 30; // 30-90 degrees
				const distance = 400;

				setShootingStars((prev) => [
					...prev,
					{
						id,
						startX: Math.random() * window.innerWidth,
						startY: Math.random() * window.innerHeight * 0.5,
						angle,
						distance,
					},
				]);

				// Remove star after animation
				setTimeout(() => {
					setShootingStars((prev) => prev.filter((star) => star.id !== id));
				}, 1500);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	// Convert angle to x,y coordinates
	const angleToPosition = (angle) => {
		const radian = (angle * Math.PI) / 180;
		return {
			x: Math.cos(radian) * orbitRadius,
			y: Math.sin(radian) * orbitRadius,
		};
	};

	return (
		<div className="min-h-screen overflow-hidden">
			{/* Shooting stars */}
			<AnimatePresence>
				{shootingStars.map((star) => (
					<motion.div
						key={star.id}
						className="fixed"
						initial={{
							left: star.startX,
							top: star.startY,
							opacity: 0,
						}}
						animate={{
							left:
								star.startX +
								Math.cos((star.angle * Math.PI) / 180) * star.distance,
							top:
								star.startY +
								Math.sin((star.angle * Math.PI) / 180) * star.distance,
							opacity: [0, 1, 0],
						}}
						exit={{ opacity: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
					>
						<div
							className="w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
							style={{
								transform: `rotate(${star.angle}deg)`,
								transformOrigin: "right center",
								boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
							}}
						/>
					</motion.div>
				))}
			</AnimatePresence>

			{/* Orbital rings - positioned at window center */}
			<motion.div
				className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
				style={{
					width: orbitRadius * 2,
					height: orbitRadius * 2,
				}}
				animate={{ rotate: 360 }}
				transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
			/>

			{/* Center orb - positioned at window center */}
			<motion.div
				className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				animate={{
					scale: hoveredOption ? 1.05 : 1,
				}}
				transition={{ type: "spring", stiffness: 300 }}
			>
				{/* Orb glow */}
				<motion.div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
					style={{
						width: orbSize * 2,
						height: orbSize * 2,
						background: `radial-gradient(circle, ${
							hoveredOption
								? navOptions.find((o) => o.id === hoveredOption)?.color + "40"
								: "rgba(255,255,255,0.4)"
						} 0%, transparent 70%)`,
						filter: "blur(20px)",
					}}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.5, 0.8, 0.5],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				{/* Core orb */}
				<div
					className="relative rounded-full overflow-hidden"
					style={{
						width: orbSize,
						height: orbSize,
						background: "linear-gradient(135deg, #ffffff, #e0e7ff)",
						boxShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
					}}
				>
					{/* Shimmer effect */}
					<motion.div
						className="absolute inset-0"
						style={{
							background:
								"linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
						}}
						animate={{ x: [-orbSize, orbSize] }}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				</div>
			</motion.div>

			{/* Navigation options - positioned from window center */}
			{navOptions.map((option, index) => {
				const { x, y } = angleToPosition(option.angle);

				return (
					<motion.div
						key={option.id}
						className="fixed"
						style={{
							left: `calc(50% + ${x}px)`,
							top: `calc(50% + ${y}px)`,
						}}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: index * 0.1, type: "spring" }}
					>
						{/* Energy beam */}
						{hoveredOption === option.id && (
							<svg
								className="fixed pointer-events-none"
								style={{
									left: "50%",
									top: "50%",
									transform: "translate(-50%, -50%)",
									width: Math.abs(x) * 2 + 100,
									height: Math.abs(y) * 2 + 100,
								}}
							>
								<motion.line
									x1="50%"
									y1="50%"
									x2={`calc(50% + ${x}px)`}
									y2={`calc(50% + ${y}px)`}
									stroke={option.color}
									strokeWidth="2"
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{ pathLength: 1, opacity: 0.6 }}
									transition={{ duration: 0.3 }}
									style={{ filter: `drop-shadow(0 0 10px ${option.color})` }}
								/>
							</svg>
						)}

						{/* Button */}
						<motion.button
							className="-translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-full font-semibold text-white"
							style={{
								background:
									hoveredOption === option.id
										? `linear-gradient(135deg, ${option.color}40, ${option.color}20)`
										: "rgba(255, 255, 255, 0.1)",
								border: `1px solid ${
									hoveredOption === option.id
										? option.color
										: "rgba(255, 255, 255, 0.2)"
								}`,
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onHoverStart={() => setHoveredOption(option.id)}
							onHoverEnd={() => setHoveredOption(null)}
							onClick={() => onNavigate(option.id)}
						>
							{option.label}
						</motion.button>
					</motion.div>
				);
			})}
		</div>
	);
};

export default HomeArea;
