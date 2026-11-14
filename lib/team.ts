export type TeamMember = {
  name: string;
  role: string;
};

/** Single source of truth for team names — used by blog author bylines. */
export const team: TeamMember[] = [
  { name: "Oweicho", role: "Founder & CEO" },
  { name: "Olivia Carter", role: "Head of Growth" },
  { name: "Sophia Bennett", role: "Brand Strategist" },
];

export function getTeamMember(name: string): TeamMember {
  const m = team.find((t) => t.name === name);
  if (!m) throw new Error(`Unknown team member: ${name}`);
  return m;
}
