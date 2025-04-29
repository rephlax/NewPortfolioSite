import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const generateStars = (count) => {
	return Array.from({ length: count }, () => ({
		x: Math.random() * 100, // % position
		y: Math.random() * 100, // % position
		size: Math.random() * 3 + 2, // px size between 2-5px (increased minimum size)
		duration: Math.random() * 4 + 2, // animation duration between 2-6s
		delay: Math.random() * 10, // random delay to start
	}));
};

const BackgroundAnimation = ({ children }) => {
	const [stars] = useState(() => generateStars(150));

	return (
		<div
			id="background-container"
			className="relative min-h-screen w-full overflow-hidden"
		>
			<div className="fixed inset-0 z-[-1] bg-black">
				{/* Star field */}
				{stars.map((star, index) => (
					<motion.div
						key={index}
						className="absolute rounded-full"
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							background:
								"radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.1) 90%)",
						}}
						animate={{
							opacity: [0.3, 0.9, 0.3],
							scale: [0.8, 1.2, 0.8],
						}}
						transition={{
							duration: star.duration,
							repeat: Infinity,
							delay: star.delay,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* The content stays at the default z-index */}
			<div className="relative min-h-screen">{children}</div>
		</div>
	);
};

export default BackgroundAnimation;
