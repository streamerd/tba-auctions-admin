import React from "react";
import { MainContainer } from "./LayoutComponents/LayoutComponents";
import { Navbar } from "./components/Navbar/Navbar";

interface RenderProps {
	children: React.ReactNode;
}
const Render: React.FC<RenderProps> = ({ children }) => {
	return (
		<MainContainer>
			<Navbar />
			{children}
		</MainContainer>
	);
};

export default Render;
