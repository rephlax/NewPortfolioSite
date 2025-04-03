import { useState, useEffect } from "react";
import "./App.css";
import { motion, useAnimate, useScroll, useTransform } from "motion/react";
import InitialAnimation from "./components/InitialAnimation";
import AboutMe from "./components/AboutMe";

function App() {
	const { scrollYProgress } = useScroll();
	const globalScroll = useTransform(scrollYProgress, [0, 1], [0, 5]);

	return (
		<>
			<div className="bg-black" style={{ height: "500vh" }}>
				<InitialAnimation globalScroll={globalScroll} />
				<AboutMe globalScroll={globalScroll} />
			</div>
		</>
	);
}

export default App;
