import { useEffect, useState } from "react";
import { fallbackStats, personalInfo } from "../data/portfolioData";

const getJson = (url, signal) => fetch(url, { signal }).then((response) => (response.ok ? response.json() : null));

// Live GitHub and LeetCode numbers. Both services are third-party and occasionally down,
// so the page starts from (and stays on) the fallback values if a request fails.
export default function useProfileStats() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getJson(`https://api.github.com/users/${personalInfo.githubUsername}`, signal)
      .then((data) => {
        if (typeof data?.public_repos === "number") {
          setStats((previous) => ({ ...previous, githubRepos: data.public_repos }));
        }
      })
      .catch(() => {});

    getJson(`https://leetcode-api-faisalshohag.vercel.app/${personalInfo.leetcodeUsername}`, signal)
      .then((data) => {
        if (typeof data?.totalSolved === "number" && data.totalSolved > 0) {
          setStats((previous) => ({
            ...previous,
            leetcode: {
              total: data.totalSolved,
              easy: data.easySolved ?? previous.leetcode.easy,
              medium: data.mediumSolved ?? previous.leetcode.medium,
              hard: data.hardSolved ?? previous.leetcode.hard,
            },
          }));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return stats;
}
