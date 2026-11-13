export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

/** Single source of truth for team names — used by the Team section and blog author bylines. */
export const team: TeamMember[] = [
  { name: "Oweicho", role: "Founder & CEO", image: "/images/team_ethan.png" },
  { name: "Olivia Carter", role: "Head of Growth", image: "/images/team_olivia.png" },
  { name: "Sophia Bennett", role: "Brand Strategist", image: "/images/team_sophia.png" },
];

export function getTeamMember(name: string): TeamMember {
  const m = team.find((t) => t.name === name);
  if (!m) throw new Error(`Unknown team member: ${name}`);
  return m;
}
