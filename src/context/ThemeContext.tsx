import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeCtx = { isDark: boolean; toggle: () => void; mounted: boolean };

const ThemeContext = createContext<ThemeCtx>({ isDark: true, toggle: () => { }, mounted: false });

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	const [isDark, setIsDark] = useState<boolean>(() => {
		const stored = localStorage.getItem("cc-theme");
		return stored !== null ? stored === "dark" : true;
	});
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light",
		);
		localStorage.setItem("cc-theme", isDark ? "dark" : "light");
	}, [isDark]);

	const toggle = () => setIsDark((v) => !v);

	return (
		<ThemeContext.Provider value={{ isDark, toggle, mounted }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
