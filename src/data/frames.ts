/**
 * LIFE IN FRAMES · photograph manifest.
 *
 * Photographs are Thanishka's real hackathon & college moments, synced from
 * her LinkedIn posts. To add more: upload the photo, then add one line here.
 */

import codecarnivalPrizeCertificate from "@/assets/codecarnival-prize-certificate.jpg.asset.json";
import codecarnivalWinnersStage from "@/assets/codecarnival-winners-stage.jpg.asset.json";
import codecarnivalTeam from "@/assets/codecarnival-team.jpg.asset.json";
import codecarnivalArena from "@/assets/codecarnival-arena.jpg.asset.json";
import technovitVitCampus from "@/assets/technovit-vit-campus.jpg.asset.json";
import ieeeXtremeLeaderboard from "@/assets/ieee-xtreme-leaderboard.jpg.asset.json";
import technovitCertificate from "@/assets/technovit-certificate.jpg.asset.json";
import byteblazeCertificate from "@/assets/byteblaze-certificate.jpg.asset.json";
import byteblazeBuild from "@/assets/byteblaze-build.jpg.asset.json";
import techRoulettePoster from "@/assets/tech-roulette-poster.jpg.asset.json";
import techRouletteTeam from "@/assets/tech-roulette-team.jpg.asset.json";
import techRouletteFriends from "@/assets/tech-roulette-friends.jpg.asset.json";
import techRouletteCertificate from "@/assets/tech-roulette-certificate.jpg.asset.json";
import byteblazeWorkspace from "@/assets/byteblaze-workspace.jpg.asset.json";
import techsprintPoster from "@/assets/techsprint-poster.jpg.asset.json";
import techsprintTeam from "@/assets/techsprint-team.jpg.asset.json";
import techsprintCertificate from "@/assets/techsprint-certificate.jpg.asset.json";
import techsWithFriends from "@/assets/techsprint-with-friends.jpg.asset.json";

export interface Frame {
  src: string;
  caption?: string;
}

export const frames: Frame[] = [
  { src: codecarnivalPrizeCertificate.url, caption: "Code Carnival 2K26 · 2nd Prize" },
  { src: techsprintTeam.url, caption: "TechSprint · Team GoZim" },
  { src: ieeeXtremeLeaderboard.url, caption: "IEEE Xtreme 19.0 · global leaderboard" },
  { src: technovitVitCampus.url, caption: "technoVIT '26 · VIT Chennai" },
  { src: codecarnivalWinnersStage.url, caption: "Code Carnival 2K26 · on stage" },
  { src: techRoulettePoster.url, caption: "Tech Roulette 2026" },
  { src: byteblazeBuild.url, caption: "ByteBlaze · building under pressure" },
  { src: codecarnivalTeam.url, caption: "Code Carnival 2K26 · with the team" },
  { src: technovitCertificate.url, caption: "technoVIT '26 · participation" },
  { src: techsprintPoster.url, caption: "TechSprint · 6 hrs hackathon" },
  { src: byteblazeCertificate.url, caption: "ByteBlaze · certificate" },
  { src: techRouletteTeam.url, caption: "Tech Roulette 2026 · with the team" },
  { src: codecarnivalArena.url, caption: "Code Carnival 2K26 · the arena" },
  { src: techsprintCertificate.url, caption: "TechSprint · participation" },
  { src: techRouletteFriends.url, caption: "Tech Roulette 2026 · hackathon hours" },
  { src: byteblazeWorkspace.url, caption: "ByteBlaze · the battle station" },
  { src: techRouletteCertificate.url, caption: "Tech Roulette 2026 · participation" },
  { src: techsWithFriends.url, caption: "TechSprint · with friends" },
];
