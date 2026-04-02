import styled from "styled-components";
import { VSpacer } from "../../components/shared/VSpacer";

const PageWrap = styled.div`
	max-width: 920px;
	padding: 40px 28px 96px;
	margin: 0 auto;
`;

const Banner = styled.div`
	height: 160px;
	border-radius: 10px;
	background: linear-gradient(
		135deg,
		var(--color-primary-dark) 0%,
		var(--color-primary) 100%
	);
	display: flex;
	align-items: flex-end;
	padding: 22px;
`;

const BannerName = styled.h1`
	margin: 0;
	color: #fff;
	font-size: 1.9rem;
	font-weight: 800;
	letter-spacing: -0.02em;
`;

const BannerRole = styled.p`
	margin: 4px 0 0;
	color: rgba(255, 255, 255, 0.8);
	font-weight: 400;
	font-size: 0.9rem;
`;

const Location = styled.p`
	margin: 0;
	font-size: 0.8rem;
	color: var(--color-text-muted);
	font-family: var(--font-mono);
	letter-spacing: 0.5px;
`;

const SectionLabel = styled.h2`
	margin: 0 0 14px;
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-family: var(--font-mono);
	color: var(--color-primary);
`;

const BodyText = styled.p`
	margin: 0;
	color: var(--color-text-muted);
	line-height: 1.72;
	font-size: 0.95rem;
`;

const Divider = styled.hr`
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 0;
`;

const ExpCard = styled.div`
	border-left: 2px solid var(--color-primary);
	padding: 14px 18px;
	background: var(--color-surface);
	border-radius: 0 8px 8px 0;
	margin-bottom: 10px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const ExpTitle = styled.h3`
	margin: 0 0 3px;
	font-size: 0.95rem;
	font-weight: 600;
	color: var(--color-text);
`;

const ExpMeta = styled.p`
	margin: 0 0 6px;
	font-size: 0.78rem;
	color: var(--color-primary);
	font-family: var(--font-mono);
	letter-spacing: 0.3px;
`;

const ExpDesc = styled.p`
	margin: 0;
	font-size: 0.875rem;
	color: var(--color-text-muted);
	line-height: 1.55;
`;

const EduCard = styled.div`
	padding: 12px 16px;
	border: 1px solid var(--color-border);
	border-radius: 8px;
	background: var(--color-surface);
	margin-bottom: 8px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const EduText = styled.p`
	margin: 0;
	font-size: 0.875rem;
	color: var(--color-text-muted);
	line-height: 1.5;
`;

const EduStrong = styled.strong`
	color: var(--color-text);
`;

const ContactRow = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
`;

const ContactLink = styled.a`
	display: inline-flex;
	align-items: center;
	padding: 8px 16px;
	border-radius: 7px;
	border: 1px solid var(--color-border);
	background: var(--color-surface);
	color: var(--color-primary);
	font-size: 0.875rem;
	font-weight: 500;
	text-decoration: none;
	transition: border-color 120ms ease, background 120ms ease;

	&:hover {
		border-color: var(--color-primary);
		background: var(--color-primary-dim);
		text-decoration: none;
	}
`;


export const AboutMe = () => {
	return (
		<PageWrap>
			<Banner>
				<div>
					<BannerName>Carlos Chuan</BannerName>
					<BannerRole>Software Engineer @ Routal</BannerRole>
				</div>
			</Banner>

			<VSpacer medium />
			<Location>// Barcelona, Catalonia, Spain</Location>

			<VSpacer large />
			<Divider />
			<VSpacer large />

			<SectionLabel>about</SectionLabel>
			<BodyText>
				Full-stack engineer at Routal with a background in Computer Science
				(Universitat de Barcelona, graduating 2025). I work across the stack —
				React frontends to backend services — as part of a small, fast-moving
				product team. I'm drawn to problems at the intersection of UX and
				performance, and I enjoy building things that are simple to use but
				non-trivial to build.
			</BodyText>

			<VSpacer large />
			<Divider />
			<VSpacer large />

			<SectionLabel>experience</SectionLabel>
			<ExpCard>
				<ExpTitle>Routal</ExpTitle>
				<ExpMeta>
					Full-stack Software Engineer · Dec 2023 – Present · Barcelona, Hybrid
				</ExpMeta>
				<ExpDesc>
					Contributing to the full product lifecycle — from feature scoping and
					design to development, testing, and deployment — within a lean,
					cross-functional team. Working primarily with React and TypeScript on
					the frontend, alongside backend services.
				</ExpDesc>
			</ExpCard>
			<ExpCard>
				<ExpTitle>Cercle d'Aventura</ExpTitle>
				<ExpMeta>Sailing Instructor · Jun 2017 – Sep 2023 · Premià de Mar</ExpMeta>
				<ExpDesc>
					Taught sailing to groups across all skill levels over six seasons.
					Managed safety, logistics, and communication for groups of up to 20
					participants while balancing a full engineering degree.
				</ExpDesc>
			</ExpCard>
			<ExpCard>
				<ExpTitle>The Hemp Ground</ExpTitle>
				<ExpMeta>IT Specialist · May 2022 – Mar 2023 · Mataró</ExpMeta>
				<ExpDesc>
					Sole IT responsibility for a small retail business: website
					maintenance, hardware support, and day-to-day troubleshooting.
				</ExpDesc>
			</ExpCard>

			<VSpacer large />
			<Divider />
			<VSpacer large />

			<SectionLabel>education</SectionLabel>
			<EduCard>
				<EduText>
					<EduStrong>Universitat Politècnica de Catalunya</EduStrong> — M.Eng. in Electronics · Feb 2025 – Present
				</EduText>
			</EduCard>
			<EduCard>
				<EduText>
					<EduStrong>Universitat de Barcelona</EduStrong> — B.Eng. in Computer
					Science · Sep 2020 – Jun 2025
				</EduText>
			</EduCard>
			<EduCard>
				<EduText>
					<EduStrong>Australian College of Business Intelligence</EduStrong> —
					Advanced Diploma in Information Technology
				</EduText>
			</EduCard>
			<EduCard>
				<EduText>
					<EduStrong>Escola Catalana Esport</EduStrong> — Level 1 Sailing
					Instructor Certification · Jan – Mar 2021
				</EduText>
			</EduCard>

			<VSpacer large />
			<Divider />
			<VSpacer large />

			<SectionLabel>open to</SectionLabel>
			<BodyText>
				Full-time software engineering roles and freelance web development
				projects. Particularly interested in product-focused teams working on
				technically challenging problems — whether that's frontend, full-stack,
				or anything close to the metal.
			</BodyText>

			<VSpacer large />
			<Divider />
			<VSpacer large />

			<SectionLabel>contact</SectionLabel>
			<ContactRow>
				<ContactLink
					href="https://www.linkedin.com/in/carlos-chuan-5197271b1/"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn ↗
				</ContactLink>
				<ContactLink
					href="https://github.com/carloschuan"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub ↗
				</ContactLink>
				<ContactLink href="mailto:info@carloschuan.com">
					info@carloschuan.com
				</ContactLink>
			</ContactRow>

			<VSpacer large />
		</PageWrap>
	);
};
