"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  ExternalLink,
  Users,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

import {
  getInfluencerRun,
  scrapeInfluencers,
} from "@/lib/api/influencerScraper";

import type {
  InfluencerPlatform,
  InfluencerSortBy,
  InfluencerProfile,
} from "@/lib/api/influencerScraper";
import Image from "next/image";

interface SearchState {
  targets: string[];
  platforms: InfluencerPlatform[];
  sortBy: InfluencerSortBy;
  maxRecentPostsPerProfile: number;
  maxInfluencersPerTarget: number;
}

interface SearchResult {
  targets: string[];
  platforms: InfluencerPlatform[];
  sortBy: InfluencerSortBy;
  totalProfiles: number;
  profiles: InfluencerProfile[];
}

const DEFAULT_SEARCH: SearchState = {
  targets: ["skincare creator", "fitness creator"],
  platforms: ["instagram", "youtube"],
  sortBy: "relevance",
  maxRecentPostsPerProfile: 6,
  maxInfluencersPerTarget: 10,
};

const formatNumber = (value?: number) => {
  if (value === undefined || value === null) {
    return "—";
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
};

const formatEngagement = (value?: number) => {
  if (value === undefined || value === null) {
    return "—";
  }

  return `${value.toFixed(2)}%`;
};

const getPlatformIcon = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case "instagram":
      return <FaInstagram className="h-4 w-4" />;

    case "youtube":
      return <FaYoutube className="h-4 w-4" />;

    case "tiktok":
      return <FaTiktok className="h-4 w-4" />;

    default:
      return <Users className="h-4 w-4" />;
  }
};

const getPlatformLabel = (platform?: string) => {
  if (!platform) {
    return "Platform";
  }

  return (
    platform.charAt(0).toUpperCase() +
    platform.slice(1)
  );
};

export default function InfluencerScraperPage() {
  const [targets, setTargets] = useState(
    DEFAULT_SEARCH.targets.join("\n")
  );

  const [platforms, setPlatforms] = useState<
    InfluencerPlatform[]
  >(DEFAULT_SEARCH.platforms);

  const [sortBy, setSortBy] =
    useState<InfluencerSortBy>(
      DEFAULT_SEARCH.sortBy
    );

  const [
    maxRecentPostsPerProfile,
    setMaxRecentPostsPerProfile,
  ] = useState(
    DEFAULT_SEARCH.maxRecentPostsPerProfile
  );

  const [
    maxInfluencersPerTarget,
    setMaxInfluencersPerTarget,
  ] = useState(
    DEFAULT_SEARCH.maxInfluencersPerTarget
  );

  const [runId, setRunId] = useState<string | null>(
    null
  );

  const [runStatus, setRunStatus] =
    useState<string | null>(null);

  const [isSearching, setIsSearching] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  const [result, setResult] =
    useState<SearchResult | null>(null);

  const [activeSearch, setActiveSearch] =
    useState<SearchState | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const normalizedTargets = useMemo(() => {
    return targets
      .split("\n")
      .map((target) => target.trim())
      .filter(Boolean);
  }, [targets]);

  const togglePlatform = (
    platform: InfluencerPlatform
  ) => {
    setPlatforms((current) => {
      if (current.includes(platform)) {
        return current.filter(
          (item) => item !== platform
        );
      }

      return [...current, platform];
    });
  };

  const handleSearch = async () => {
    setError(null);
    setResult(null);
    setRunStatus(null);
    setLastUpdated(null);

    if (normalizedTargets.length === 0) {
      setError(
        "Please enter at least one search target."
      );
      return;
    }

    if (platforms.length === 0) {
      setError(
        "Please select at least one platform."
      );
      return;
    }

    const searchConfig: SearchState = {
      targets: normalizedTargets,
      platforms,
      sortBy,
      maxRecentPostsPerProfile,
      maxInfluencersPerTarget,
    };

    try {
      setIsSearching(true);
      setActiveSearch(searchConfig);

      const response = await scrapeInfluencers(
        searchConfig
      );

      if (!response.success || !response.runId) {
        throw new Error(
          response.message ||
            "Failed to start influencer scraper."
        );
      }

      setRunId(response.runId);
      setRunStatus(response.status);
    } catch (err) {
      setIsSearching(false);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to start influencer scraper."
      );
    }
  };

  useEffect(() => {
    if (!runId || !activeSearch) {
      return;
    }

    let cancelled = false;

    const pollRun = async () => {
      try {
        const response = await getInfluencerRun(
          runId
        );

        if (cancelled) {
          return;
        }

        setRunStatus(response.status);
        setLastUpdated(new Date());

        const nextResult: SearchResult = {
          targets: activeSearch.targets,
          platforms: activeSearch.platforms,
          sortBy: activeSearch.sortBy,
          totalProfiles:
            response.totalProfiles,
          profiles: response.profiles ?? [],
        };

        setResult(nextResult);

        const status =
          response.status?.toUpperCase();

        if (status === "SUCCEEDED") {
          setIsSearching(false);
          return;
        }

        if (
          status === "ABORTED" ||
          status === "TIMED-OUT" ||
          status === "FAILED"
        ) {
          setIsSearching(false);

          if (
            response.profiles &&
            response.profiles.length > 0
          ) {
            setResult(nextResult);
          } else {
            setError(
              `Actor run ended with status ${response.status}. No influencer results were available.`
            );
          }

          return;
        }

        /**
         * RUNNING
         * READY
         * ABORTING
         * TIMING-OUT
         *
         * Keep polling.
         */
      } catch (err) {
        if (cancelled) {
          return;
        }

        setIsSearching(false);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to get scraper status."
        );
      }
    };

    pollRun();

    const interval = window.setInterval(
      pollRun,
      2500
    );

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [runId, activeSearch]);

  const searchStatusLabel = (() => {
    if (!runStatus) {
      return "";
    }

    switch (runStatus.toUpperCase()) {
      case "READY":
        return "Preparing...";

      case "RUNNING":
        return "Searching...";

      case "ABORTING":
        return "Stopping...";

      case "TIMING-OUT":
        return "Finishing...";

      case "SUCCEEDED":
        return "Completed";

      case "ABORTED":
        return "Stopped";

      case "TIMED-OUT":
        return "Timed out";

      case "FAILED":
        return "Failed";

      default:
        return runStatus;
    }
  })();

  const isTerminalStatus = [
    "SUCCEEDED",
    "ABORTED",
    "TIMED-OUT",
    "FAILED",
  ].includes(
    runStatus?.toUpperCase() ?? ""
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">


            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Influencer Scraper
              </h1>

              <p className="text-sm text-slate-500">
                Find public influencers across
                social platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Targets */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Search targets
              </label>

              <textarea
                value={targets}
                onChange={(event) =>
                  setTargets(event.target.value)
                }
                rows={5}
                placeholder={
                  "skincare creator\nfitness creator\nfashion influencer"
                }
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Enter one keyword or target per line.
              </p>
            </div>

            {/* Platforms */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Platforms
              </label>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "instagram",
                    "youtube",
                    "tiktok",
                  ] as InfluencerPlatform[]
                ).map((platform) => {
                  const selected =
                    platforms.includes(platform);

                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() =>
                        togglePlatform(platform)
                      }
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                        selected
                          ? "border-[#0F766E] bg-[#0F766E] text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {getPlatformIcon(platform)}

                      {getPlatformLabel(platform)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Result order
              </label>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as InfluencerSortBy
                  )
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                <option value="relevance">
                  Relevance
                </option>

                <option value="followers">
                  Followers
                </option>

                <option value="engagement">
                  Engagement
                </option>
              </select>
            </div>

            {/* Influencers per target */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Influencers per target
              </label>

              <select
                value={maxInfluencersPerTarget}
                onChange={(event) =>
                  setMaxInfluencersPerTarget(
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                {[5, 10, 20, 30, 50].map(
                  (value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Recent posts */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Recent posts per profile
              </label>

              <select
                value={maxRecentPostsPerProfile}
                onChange={(event) =>
                  setMaxRecentPostsPerProfile(
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                {[0, 3, 6, 10, 15, 20].map(
                  (value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <div className="text-xs text-slate-500">
              {normalizedTargets.length} target
              {normalizedTargets.length !== 1
                ? "s"
                : ""}{" "}
              · {platforms.length} platform
              {platforms.length !== 1 ? "s" : ""}
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 font-['Poppins'] text-base font-medium text-white transition-all duration-200 hover:bg-[#0B625C] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search Influencers
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

            <div>
              <p className="text-sm font-medium text-red-800">
                Search error
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Status */}
        {runStatus && (
          <div
            className={`mt-5 flex items-center justify-between gap-4 rounded-lg border p-4 ${
              isTerminalStatus
                ? "border-slate-200 bg-slate-50"
                : "border-blue-200 bg-blue-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {isTerminalStatus ? (
                runStatus.toUpperCase() ===
                "SUCCEEDED" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-slate-600" />
                )
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              )}

              <div>
                <p className="text-sm font-medium text-slate-900">
                  {searchStatusLabel}
                </p>

                {result && (
                  <p className="text-xs text-slate-500">
                    {result.totalProfiles} influencer
                    {result.totalProfiles !== 1
                      ? "s"
                      : ""}{" "}
                    found
                  </p>
                )}
              </div>
            </div>

            {lastUpdated && (
              <span className="hidden text-xs text-slate-400 sm:block">
                Updated{" "}
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {/* Partial Result Notice */}
        {result &&
          result.profiles.length > 0 &&
          runStatus &&
          [
            "ABORTED",
            "TIMED-OUT",
            "FAILED",
          ].includes(
            runStatus.toUpperCase()
          ) && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Partial results available
                  </p>

                  <p className="mt-1 text-sm text-amber-800">
                    Search stopped with status{" "}
                    <strong>
                      {runStatus}
                    </strong>
                    . Showing{" "}
                    <strong>
                      {result.profiles.length}
                    </strong>{" "}
                    available influencer
                    {result.profiles.length !==
                    1
                      ? "s"
                      : ""}.
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Results */}
        {result &&
          result.profiles.length > 0 && (
            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Influencer Results
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {result.totalProfiles} result
                    {result.totalProfiles !== 1
                      ? "s"
                      : ""}{" "}
                    found
                  </p>
                </div>

                {isSearching && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Updating results...
                  </div>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {result.profiles.map(
                  (profile, index) => (
                    <div
                      key={`${profile.platform}-${profile.profileUrl ?? profile.username ?? index}-${index}`}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                    >
                      {/* Profile Header */}
                      <div className="p-5">
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                            {profile.avatarUrl ? (
                              <Image
                                src={profile.avatarUrl}
                                alt={
                                  profile.displayName ||
                                  profile.username ||
                                  "Influencer"
                                }
                                className="h-full w-full object-cover"
                                height={512}
                                width={512}
                              />
                            ) : (
                              <Users className="h-5 w-5 text-slate-400" />
                            )}
                          </div>

                          {/* Name */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-sm font-semibold text-slate-900">
                                {profile.displayName ||
                                  profile.username ||
                                  profile.handle ||
                                  "Unknown influencer"}
                              </h3>

                              {profile.isVerified && (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-500" />
                              )}
                            </div>

                            {profile.handle && (
                              <p className="mt-0.5 truncate text-xs text-slate-500">
                                {profile.handle}
                              </p>
                            )}

                            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                              {getPlatformIcon(
                                profile.platform
                              )}

                              <span>
                                {getPlatformLabel(
                                  profile.platform
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                          <p className="mt-4 line-clamp-3 text-sm leading-5 text-slate-600">
                            {profile.bio}
                          </p>
                        )}

                        {/* Metrics */}
                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="rounded-lg border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">
                              Followers
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {formatNumber(
                                profile.followerCount
                              )}
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">
                              Following
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {formatNumber(
                                profile.followingCount
                              )}
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">
                              Posts
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {formatNumber(
                                profile.postCount
                              )}
                            </p>
                          </div>

                          <div className="rounded-lg border border-slate-200 p-3">
                            <p className="text-xs text-slate-500">
                              Engagement
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {formatEngagement(
                                profile.engagementRate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Link */}
                      {profile.profileUrl && (
                        <div className="border-t border-slate-100 p-4">
                          <a
                            href={
                              profile.profileUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            View Profile
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* Empty State */}
        {!isSearching &&
          result &&
          result.profiles.length === 0 &&
          !error && (
            <div className="mt-7 rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <Users className="mx-auto h-8 w-8 text-slate-400" />

              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                No influencers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try different keywords or
                platforms.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}