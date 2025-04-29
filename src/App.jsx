import { useState, useEffect } from "react";
import "./App.css";
import { AnimatePresence } from "motion/react";
import InitialAnimation from "./components/InitialAnimation";
import AboutMe from "./components/AboutMe";
import HomeArea from "./components/HomeArea";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
	// State to track which section should be visible
	const [currentSection, setCurrentSection] = useState("initial");

	// State to track loading (for transitions)
	const [isLoading, setIsLoading] = useState(true);

	// Detect screen size for responsive adjustments
	const [isMobileDevice, setIsMobileDevice] = useState(false);

	// Check for mobile device on mount
	useEffect(() => {
		const checkMobileDevice = () => {
			setIsMobileDevice(window.innerWidth < 768);
		};

		// Initial check
		checkMobileDevice();

		// Add resize listener
		window.addEventListener("resize", checkMobileDevice);

		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => {
			window.removeEventListener("resize", checkMobileDevice);
			clearTimeout(timer);
		};
	}, []);

	const handleIntroComplete = () => {
		setCurrentSection("home");
	};

	const handleHomeSelection = (selectedSection) => {
		setCurrentSection(selectedSection);
	};

	const navigateToHome = () => {
		setCurrentSection("home");
	};

	// If still loading, show minimal loading state
	if (isLoading) {
		return (
			<div className="fixed inset-0 bg-black flex items-center justify-center">
				<div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<BackgroundAnimation>
			<AnimatePresence mode="wait">
				{/* Initial Animation Section */}
				{currentSection === "initial" && (
					<InitialAnimation
						key="initial"
						onComplete={handleIntroComplete}
						isMobile={isMobileDevice}
					/>
				)}

				{/* Home Section */}
				{currentSection === "home" && (
					<HomeArea key="home" onNavigate={handleHomeSelection} />
				)}

				{/* About Section */}
				{currentSection === "about" && (
					<div className="min-h-screen flex items-center justify-center text-white">
						<div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg max-w-2xl">
							<h1 className="text-3xl font-bold mb-4">About Me</h1>
							<p className="mb-6">About section TBD</p>
							<button
								className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-full"
								onClick={navigateToHome}
							>
								Back to Home
							</button>
						</div>
					</div>
				)}

				{currentSection === "projects" && (
					<div className="min-h-screen flex items-center justify-center text-white">
						<div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg max-w-2xl">
							<h1 className="text-3xl font-bold mb-4">Projects</h1>
							<p className="mb-6">Project section TBD</p>
							<button
								className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-full"
								onClick={navigateToHome}
							>
								Back to Home
							</button>
						</div>
					</div>
				)}

				{currentSection === "skills" && (
					<div className="min-h-screen flex items-center justify-center text-white">
						<div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg max-w-2xl">
							<h1 className="text-3xl font-bold mb-4">Skills</h1>
							<p className="mb-6">Skill section TBD</p>
							<button
								className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-full"
								onClick={navigateToHome}
							>
								Back to Home
							</button>
						</div>
					</div>
				)}

				{currentSection === "experience" && (
					<div className="min-h-screen flex items-center justify-center text-white">
						<div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg max-w-2xl">
							<h1 className="text-3xl font-bold mb-4">Experience</h1>
							<p className="mb-6">Experience section TBD</p>
							<button
								className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-full"
								onClick={navigateToHome}
							>
								Back to Home
							</button>
						</div>
					</div>
				)}
			</AnimatePresence>
		</BackgroundAnimation>
	);
}

export default App;
