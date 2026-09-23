import {
  apiGet,
  apiPost,
} from "@/lib/core/server";

/* =========================================================
   TYPES
========================================================= */

export type InfluencerPlatform =
  | "tiktok"
  | "instagram"
  | "youtube";

export type InfluencerSortBy =
  | "relevance"
  | "followers"
  | "engagement";

export interface InfluencerScraperInput {
  targets: string[];
  platforms: InfluencerPlatform[];
  sortBy?: InfluencerSortBy;
  maxRecentPostsPerProfile?: number;
  maxInfluencersPerTarget?: number;
}

export interface InfluencerRecentPost {
  id?: string;
  url?: string;
  caption?: string;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  publishedAt?: string;
}

export interface InfluencerProfile {
  inputTarget: string;
  inputTargetIndex?: number;
  platform: InfluencerPlatform | string;
  matchType?: string;
  rank?: number;
  username?: string;
  handle?: string;
  displayName?: string;
  profileUrl?: string;
  bio?: string;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  likeCount?: number;
  engagementRate?: number;
  isVerified?: boolean;
  isVisible?: boolean;
  location?: string[];
  categories?: string[];
  avatarUrl?: string;
  externalUrl?: string;
  emails?: string[];
  recentPosts?: InfluencerRecentPost[];
  evidenceUrls?: string[];
}

export interface InfluencerScraperResult {
  targets: string[];
  platforms: InfluencerPlatform[];
  sortBy: InfluencerSortBy;
  totalProfiles: number;
  profiles: InfluencerProfile[];
}

/* =========================================================
   START RESPONSE
========================================================= */

export interface StartInfluencerRunResponse {
  success: boolean;
  message?: string;
  runId: string;
  status: string;
}

/* =========================================================
   RUN STATUS RESPONSE
========================================================= */

export interface InfluencerRunStatusResponse {
  success: boolean;
  runId: string;
  status: string;
  partial: boolean;
  profiles: InfluencerProfile[];
  totalProfiles: number;
  message?: string;
}

/* =========================================================
   START SCRAPER
========================================================= */

export const scrapeInfluencers =
  async (
    data: InfluencerScraperInput
  ): Promise<StartInfluencerRunResponse> => {
    return apiPost<StartInfluencerRunResponse>(
      "/api/v1/seller/influencers",
      data
    );
  };

/* =========================================================
   GET RUN STATUS
========================================================= */

export const getInfluencerRun =
  async (
    runId: string
  ): Promise<InfluencerRunStatusResponse> => {
    return apiGet<InfluencerRunStatusResponse>(
      `/api/v1/seller/influencers/run/${encodeURIComponent(
        runId
      )}`
    );
  };