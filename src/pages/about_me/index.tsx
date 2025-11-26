import { Grid } from "../../components/shared/Grid";
import { HSpacer } from "../../components/shared/HSpacer";
import { Text } from "../../components/shared/Text";
import { VSpacer } from "../../components/shared/VSpacer";

export const AboutMe = () => {
	const containerStyle: React.CSSProperties = {
		maxWidth: 920,
		padding: "28px",
		margin: "0 auto",
		height: "100%",
	};

	const bannerStyle: React.CSSProperties = {
		height: 160,
		borderRadius: 8,
		backgroundColor: "#0b5cff",
		backgroundImage: "url('/assets/profile-bg.jpg')",
		backgroundSize: "cover",
		backgroundPosition: "center",
		display: "flex",
		alignItems: "flex-end",
		padding: 16,
		color: "white",
	};

	return (
		<Grid style={containerStyle}>
			<Grid style={bannerStyle}>
				<Grid>
					<Text type="h1" style={{ margin: 0, color: "white" }}>
						Carlos Chuan
					</Text>
					<Text type="h4" style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
						Software Engineer @ Routal
					</Text>
				</Grid>
			</Grid>

			<VSpacer medium />

			<Grid style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<Text type="p" style={{ margin: 0 }}>
					Vilassar de Mar, Catalonia, Spain
				</Text>
			</Grid>

			<VSpacer medium />

			<Text type="h3">About</Text>
			<Text>
				As a Full-stack Software Engineer at Routal, I apply my full-stack
				development skills to create innovative and user-friendly web
				applications. I work with a small and agile team contributing to
				brainstorming, design, development, testing, and deployment of projects.
				I enjoy learning new technologies and frameworks and I always seek to
				improve code quality and performance.
			</Text>

			<VSpacer medium />

			<Text type="h3">Experience</Text>
			<Grid>
				<Text type="h4">Routal</Text>
				<Text type="p">
					Full-stack Software Engineer — Dec 2023 - Present · Barcelona, Hybrid
				</Text>

				<VSpacer small />

				<Text type="h4">CERCLE D'AVENTURA SL</Text>
				<Text type="p">
					Sailing Instructor — Jun 2017 - Sep 2023 · Premià de Mar
				</Text>
				<Text type="p">
					Managed groups and taught sailing; developed leadership and teaching
					skills alongside studies.
				</Text>

				<VSpacer small />

				<Text type="h4">The Hemp Ground</Text>
				<Text type="p">IT Specialist — May 2022 - Mar 2023 · Mataró</Text>
				<Text type="p">
					Maintained website and handled IT issues for a small business; gained
					practical problem-solving experience.
				</Text>
			</Grid>

			<VSpacer medium />

			<Text type="h3">Education</Text>
			<Grid>
				<Text type="p">
					Universitat de Barcelona — Grado en Ingeniería, Ingeniería informática
					(Sep 2020 - Jun 2025)
				</Text>
				<Text type="p">
					Australian College of Business Intelligence — Advanced Diploma in
					Information Technology
				</Text>
				<Text type="p">
					Escola Catalana Esport — Técnic Nivell 1, Vela (Jan 2021 - Mar 2021)
				</Text>
			</Grid>

			<VSpacer medium />

			<Text type="h3">Open to</Text>
			<Text>
				Software development roles, collaboration on web applications, algorithm
				visualisations, and front-end work.
			</Text>

			<VSpacer medium />

			<Text type="h3">Contact</Text>
			<Grid style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<a
					href="https://www.linkedin.com/in/carlos-chuan-5197271b1/"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn
				</a>
				<HSpacer />
				<span>GitHub: add link</span>
				<HSpacer />
				<span>Email: add email</span>
			</Grid>

			<VSpacer large />

			<Text type="p" style={{ color: "#444", fontSize: 13 }}>
				Note: I used the LinkedIn content you pasted (cleaned for clarity) and
				focused it on your software development experience. If you want exact
				verbatim copy or different ordering (e.g., education first), tell me and
				I will update it.
			</Text>
		</Grid>
	);
};
