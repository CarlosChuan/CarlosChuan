import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "../components/shared/Grid";
import { HSpacer } from "../components/shared/HSpacer";
import { ROUTE_NAME, routes } from "../constants/Routes";

const HeaderButtons = styled(Grid)`
	cursor: pointer;
	border-bototm: 1px solid transparent;

	&:hover {
		border-bottom: 1px solid white;
	}
`;

const Sections = [
	{
		label: "Home",
		url: routes.getRoute(ROUTE_NAME.ROOT),
	},
	{
		label: "Projects",
		url: routes.getRoute(ROUTE_NAME.PROJECTS.ROOT),
	},
	{
		label: "About me",
		url: routes.getRoute(ROUTE_NAME.GENERAL.BIO),
	},
];

export const Header = () => {
	const navigate = useNavigate();
	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Grid
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					height: "60px",
					width: "70%",
				}}
			>
				{Sections.map((section, idx) => (
					<>
						<HeaderButtons
							onClick={() => {
								navigate(section.url);
							}}
						>
							{section.label}
						</HeaderButtons>
						{idx !== Sections.length - 1 && <HSpacer medium />}
					</>
				))}
			</Grid>
		</Grid>
	);
};
