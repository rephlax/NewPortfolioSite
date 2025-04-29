import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const HomeArea = ({ onNavigate }) => {
	const [activeOption, setActiveOption] = useState(null);

	// State to track screen size for responsive adjustments
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	// Check screen size on mount and when window resizes
	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		// Initial check
		checkScreenSize();

		// Add resize listener
		window.addEventListener("resize", checkScreenSize);

		// Clean up
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const navOptions = [
		{ id: "about", label: "About Me", angle: 0 },
		{ id: "projects", label: "Projects", angle: 90 },
		{ id: "skills", label: "Skills", angle: 180 },
		{ id: "experience", label: "Experience", angle: 270 },
	];

	const handleNavClick = (optionId) => {
		if (activeOption === optionId) {
			setActiveOption(null);
			return;
		}

		setActiveOption(optionId);

		setTimeout(() => {
			onNavigate(optionId);
		}, 800);
	};

	return (
		<motion.div
			className="flex items-center justify-center min-h-screen relative px-4 py-8 overflow-y-scroll overscroll-none h-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Center orb */}
			<div className="relative">
				{/* Glow effect (placed behind) */}
				<motion.div
					className="absolute rounded-full bg-white opacity-60"
					style={{
						// Responsive sizing for the glow
						width: isSmallScreen ? "180px" : "260px",
						height: isSmallScreen ? "180px" : "260px",
						left: isSmallScreen ? "-20px" : "-30px",
						top: isSmallScreen ? "-20px" : "-30px",
						filter: "blur(30px)",
						zIndex: 9,
					}}
					animate={{
						opacity: [0.2, 0.7, 0.2],
						scale: [0.65, 0.9, 0.65],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				{/* Solid white center */}
				<motion.div
					id="white-orb"
					className="rounded-full z-10 relative"
					style={{
						// Responsive sizing for the orb
						width: isSmallScreen ? "140px" : "200px",
						height: isSmallScreen ? "140px" : "200px",
						boxShadow: "0 0 30px 5px rgba(255, 255, 255, 0.3)",
						background:
							"radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.1) 90%)",
					}}
					animate={{
						boxShadow: [
							"0 0 30px 5px rgba(255, 255, 255, 0.3)",
							"0 0 40px 10px rgba(255, 255, 255, 0.5)",
							"0 0 30px 5px rgba(255, 255, 255, 0.3)",
						],
						scale: [0.5, 0.7, 0.5],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			{/* Navigation options - with responsive positioning */}
			{navOptions.map((option) => (
				<motion.div
					key={option.id}
					className="absolute cursor-pointer text-white font-bold"
					style={{
						// Responsive text size
						fontSize: isSmallScreen ? "1rem" : "1.25rem",
					}}
					initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
					animate={{
						// Responsive positioning - smaller radius on small screens
						x:
							Math.cos((option.angle * Math.PI) / 180) *
							(isSmallScreen ? 120 : 180),
						y:
							Math.sin((option.angle * Math.PI) / 180) *
							(isSmallScreen ? 120 : 180),
						scale: 1,
						opacity: 1,
					}}
					transition={{
						type: "spring",
						stiffness: 100,
						damping: 15,
						delay: option.angle / 1000,
					}}
					onClick={() => handleNavClick(option.id)}
				>
					<div className="p-2 md:p-4 text-center">{option.label}</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default HomeArea;
