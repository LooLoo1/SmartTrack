import { useEffect, useState } from "react";

enum ColorType {
	Var = "Var",
	CSSVar = "--",
	Hex = "Hex",
	Rgb = "Rgb",
	Rgba = "Rgba",
	Hls = "Hls",
	String = "String",
}
const COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RGB_REGEX = /^rgb(a)?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+(\.\d+)?)?\s*\)$/;
const HSL_REGEX = /^hsl(a)?\(\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?%\s*,\s*\d+(\.\d+)?%\s*(,\s*\d+(\.\d+)?)?\s*\)$/;

const getAllCSSVariableNames = (styleSheets: StyleSheetList = document.styleSheets): string[] => {
	const cssVars: string[] = [];

	for (let i = 0; i < styleSheets.length; i++) {
		const styleSheet = styleSheets[i] as CSSStyleSheet;

		try {
			if (styleSheet.cssRules) {
				for (let j = 0; j < styleSheet.cssRules.length; j++) {
					const cssRule = styleSheet.cssRules[j] as CSSStyleRule;

					try {
						if (cssRule.style) {
							for (let k = 0; k < cssRule.style.length; k++) {
								const name = cssRule.style[k];

								if (name.startsWith("--") && !cssVars.includes(name)) {
									cssVars.push(name);
								}
							}
						}
					} catch (error) {
						console.error(error);
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	return cssVars;
};

const extractCSSVariableName = (str: string): string => {
	const startIdx = str.indexOf("--");
	const endIdx = str.lastIndexOf(")");

	if (startIdx !== -1 && endIdx !== -1) {
		return str.substring(startIdx, endIdx);
	}

	return str;
};

const validColor = (str: string) => {
	if (str.startsWith("var")) {
		return ColorType.Var;
	}
	if (str.startsWith("--")) {
		return ColorType.CSSVar;
	}
	if (COLOR_REGEX.test(str)) {
		return ColorType.Hex;
	}
	if (RGB_REGEX.test(str)) {
		return str.startsWith("rgba") ? ColorType.Rgba : ColorType.Rgb;
	}
	if (HSL_REGEX.test(str)) {
		return ColorType.Hls;
	}
	return ColorType.String;
};

const stringToColor = (str: string): string => {
	if (str.includes(",")) {
		str = `rgb(${str})`;
	}
	const type = validColor(str);

	if (type === "Var") {
		str = extractCSSVariableName(str);
	}
	if (str.startsWith("--")) {
		const color = getComputedStyle(document.documentElement).getPropertyValue(str);
		if (color.includes(",")) {
			str = `rgb(${color})`;
		} else {
			str = color;
		}
	}
	if (type === "String") {
		return str;
	}

	return str;
};

const colorCSSVariable = getAllCSSVariableNames().filter((val) => val.includes("color"));
type ColorCSSVariables = (typeof colorCSSVariable)[number] | string;

const useCSSVariable = (variable: ColorCSSVariables, defaultValue?: ColorCSSVariables): ColorCSSVariables => {
	const [value, setValue] = useState<ColorCSSVariables>(defaultValue || "");

	useEffect(() => {
		const handleCSSVariableChange = () => {
			const variableValue = stringToColor(variable) || stringToColor(defaultValue || "");
			setValue(variableValue);
		};

		handleCSSVariableChange();

		window.addEventListener("resize", handleCSSVariableChange);
		return () => {
			window.removeEventListener("resize", handleCSSVariableChange);
		};
	}, [variable, defaultValue]);

	return value;
};

export default useCSSVariable;
