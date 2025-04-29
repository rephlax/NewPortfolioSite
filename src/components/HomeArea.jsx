import React, { useState } from "react";
import { motion, useTransform } from "motion/react";

const HomeArea = ({ onNavigate }) => {
	const [activeOption, setActiveOption] = useState(null);

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
			className="flex items-center justify-center h-screen relative"
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
						width: "260px",
						height: "260px",
						left: "-30px",
						top: "-30px",
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
						width: "200px",
						height: "200px",
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
			{/* Navigation options */}
			{navOptions.map((option) => (
				<motion.div
					key={option.id}
					className="absolute cursor-pointer text-white text-xl font-bold"
					initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
					animate={{
						x: Math.cos((option.angle * Math.PI) / 180) * 180,
						y: Math.sin((option.angle * Math.PI) / 180) * 180,
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
					{option.label}
				</motion.div>
			))}
		</motion.div>
	);
};

export default HomeArea;
