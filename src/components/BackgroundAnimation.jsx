import React from "react";
import { motion, useAnimate } from "motion/react";

const BackgroundAnimation = ({ children }) => {
	return (
		<div
			id="background-container"
			className="relative min-h-screen w-full overflow-hidden"
		>
			<div className="fixed inset-0 -z-10 bg-black">
				<motion.div
					className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-xl"
					animate={{
						x: [0, 100, 50, 0],
						y: [0, 50, 100, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default BackgroundAnimation;
