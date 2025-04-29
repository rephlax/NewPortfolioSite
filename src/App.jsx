import { useState } from "react";
import "./App.css";
import { AnimatePresence } from "motion/react";
import InitialAnimation from "./components/InitialAnimation";
import AboutMe from "./components/AboutMe";
import HomeArea from "./components/HomeArea";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
	// State to track which section should be visible
	const [currentSection, setCurrentSection] = useState("initial");

	// Function to handle completion of initial animation
	const handleIntroComplete = () => {
		setCurrentSection("home");
	};

	const handleHomeSelection = (selectedSection) => {
		setCurrentSection(selectedSection);
	};

	const navigateToHome = () => {
		setCurrentSection("home");
	};

	return (
		<BackgroundAnimation>
			<div>
				<AnimatePresence mode="wait">
					{/* Initial Animation Section */}
					{currentSection === "initial" && (
						<InitialAnimation key="initial" onComplete={handleIntroComplete} />
					)}

					{/* Home Section */}
					{currentSection === "home" && (
						<HomeArea key="home" onNavigate={handleHomeSelection} />
					)}

					{/* About Section */}
					{currentSection === "about" && (
						<AboutMe key="about" onBackToHome={navigateToHome} />
					)}
				</AnimatePresence>
			</div>
		</BackgroundAnimation>
	);
}

export default App;
