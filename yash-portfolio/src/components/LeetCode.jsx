import { useState, useEffect, useRef, useCallback } from 'react';
import './LeetCode.css';

/* ═══════════════════════════════════════════════════════════════
   API CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */
const API_BASE = 'https://alfa-leetcode-api.onrender.com';

/* ─── Fallback Demo Data ─── */
const DEMO_DATA = {
  username: 'demo-user',
  totalSolved: 342,
  totalQuestions: 3315,
  easySolved: 142,
  totalEasy: 829,
  mediumSolved: 168,
  totalMedium: 1732,
  hardSolved: 32,
  totalHard: 754,
  ranking: 12450,
  reputation: 180,
  contributionPoint: 420,
  contestAttend: 12,
  contestRating: 1523,
  contestGlobalRanking: 8542,
  contestTopPercentage: 8.5,
  contestBadges: { name: 'Guardian' },
  streak: 14,
  totalActiveDays: 180,
  submissionCalendar: generateDemoCalendar(),
  recentSubmissions: [
    { title: 'Longest Increasing Subsequence', titleSlug: 'longest-increasing-subsequence', timestamp: '1705000000', lang: 'cpp' },
    { title: 'Merge k Sorted Lists', titleSlug: 'merge-k-sorted-lists', timestamp: '1704900000', lang: 'python3' },
    { title: 'Trapping Rain Water', titleSlug: 'trapping-rain-water', timestamp: '1704800000', lang: 'javascript' },
    { title: 'Binary Tree Maximum Path Sum', titleSlug: 'binary-tree-maximum-path-sum', timestamp: '1704700000', lang: 'cpp' },
    { title: 'Design Twitter', titleSlug: 'design-twitter', timestamp: '1704600000', lang: 'java' },
  ],
  languageStats: [
    { languageName: 'C++', problemsSolved: 156 },
    { languageName: 'Python3', problemsSolved: 98 },
    { languageName: 'JavaScript', problemsSolved: 64 },
    { languageName: 'Java', problemsSolved: 24 },
  ],
  skillStats: {
    advanced: [
      { tagName: 'Dynamic Programming', problemsSolved: 42 },
      { tagName: 'Graph', problemsSolved: 28 },
      { tagName: 'Segment Tree', problemsSolved: 12 },
    ],
    intermediate: [
      { tagName: 'Binary Search', problemsSolved: 35 },
      { tagName: 'Two Pointers', problemsSolved: 30 },
      { tagName: 'Sliding Window', problemsSolved: 22 },
    ],
    fundamental: [
      { tagName: 'Array', problemsSolved: 85 },
      { tagName: 'Hash Table', problemsSolved: 60 },
      { tagName: 'Tree', problemsSolved: 45 },
    ],
  },
};

function generateDemoCalendar() {
  const cal = {};
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const key = Math.floor(d.getTime() / 1000).toString();
    if (Math.random() > 0.55) {
      cal[key] = Math.floor(Math.random() * 8) + 1;
    }
  }
  return cal;
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

const fetchGraphQL = async (query, variables = {}) => {
  const res = await fetchWithTimeout('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Referer': 'https://leetcode.com/',
    },
    body: JSON.stringify({ query, variables, operationName: null }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
};

/* ═══════════════════════════════════════════════════════════════
   UNIFIED DATA FETCHER
   ═══════════════════════════════════════════════════════════════ */
const fetchLeetCodeData = async (username) => {
  // ── Attempt 1: REST API (alfa-leetcode-api) ──
  try {
    const [profileRes, contestRes, calendarRes, langRes, skillRes] =
      await Promise.allSettled([
        fetchWithTimeout(`${API_BASE}/${username}/profile`),
        fetchWithTimeout(`${API_BASE}/${username}/contest`),
        fetchWithTimeout(`${API_BASE}/${username}/calendar`),
        fetchWithTimeout(`${API_BASE}/${username}/language`),
        fetchWithTimeout(`${API_BASE}/${username}/skill`),
      ]);

    const profile = profileRes.value?.ok ? await profileRes.value.json() : null;
    const contest = contestRes.value?.ok ? await contestRes.value.json() : null;
    const calendar = calendarRes.value?.ok ? await calendarRes.value.json() : null;
    const lang = langRes.value?.ok ? await langRes.value.json() : null;
    const skill = skillRes.value?.ok ? await skillRes.value.json() : null;

    // Parse calendar (profile returns object, /calendar returns JSON string)
    let submissionCalendar = {};
    if (profile?.submissionCalendar && typeof profile.submissionCalendar === 'object') {
      submissionCalendar = profile.submissionCalendar;
    } else if (calendar?.submissionCalendar) {
      try {
        submissionCalendar = typeof calendar.submissionCalendar === 'string'
          ? JSON.parse(calendar.submissionCalendar)
          : calendar.submissionCalendar;
      } catch { submissionCalendar = {}; }
    }

    // Recent submissions from profile
    let recentSubmissions = [];
    if (profile?.recentSubmissions && Array.isArray(profile.recentSubmissions)) {
      recentSubmissions = profile.recentSubmissions;
    }

    return {
      username,
      totalSolved: profile?.totalSolved ?? 0,
      totalQuestions: profile?.totalQuestions ?? 3315,
      easySolved: profile?.easySolved ?? 0,
      totalEasy: profile?.totalEasy ?? 829,
      mediumSolved: profile?.mediumSolved ?? 0,
      totalMedium: profile?.totalMedium ?? 1732,
      hardSolved: profile?.hardSolved ?? 0,
      totalHard: profile?.totalHard ?? 754,
      ranking: profile?.ranking ?? 0,
      reputation: profile?.reputation ?? 0,
      contributionPoint: profile?.contributionPoint ?? 0,
      attendedContestsCount: contest?.contestAttend ?? 0,
      rating: contest?.contestRating ?? 0,
      globalRanking: contest?.contestGlobalRanking ?? 0,
      topPercentage: contest?.contestTopPercentage ?? 0,
      badge: contest?.contestBadges ?? null,
      streak: calendar?.streak ?? 0,
      totalActiveDays: calendar?.totalActiveDays ?? 0,
      submissionCalendar,
      recentSubmissions,
      languageStats: lang?.languageProblemCount ?? [],
      skillStats: skill ?? DEMO_DATA.skillStats,
      source: 'rest',
    };
  } catch (restErr) {
    console.warn('REST API failed, trying GraphQL...', restErr);
  }

  // ── Attempt 2: GraphQL fallback ──
  try {
    const userSessionQuery = `
      query userSessionProgress($username: String!) {
        allQuestionsCount { difficulty count }
        matchedUser(username: $username) {
          profile { ranking reputation }
          submitStatsGlobal {
            acSubmissionNum { difficulty count submissions }
            totalSubmissionNum { difficulty count submissions }
          }
        }
      }`;
    const contestQuery = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount rating globalRanking totalParticipants topPercentage
          badge { name }
        }
      }`;
    const calendarQuery = `
      query userProfileCalendar($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) {
            streak totalActiveDays
            submissionCalendar
          }
        }
      }`;
    const recentQuery = `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id title titleSlug timestamp
        }
      }`;
    const langQuery = `
      query languageStats($username: String!) {
        matchedUser(username: $username) {
          languageProblemCount { languageName problemsSolved }
        }
      }`;
    const skillQuery = `
      query skillStats($username: String!) {
        matchedUser(username: $username) {
          tagProblemCounts {
            advanced { tagName problemsSolved }
            intermediate { tagName problemsSolved }
            fundamental { tagName problemsSolved }
          }
        }
      }`;

    const [sessionData, contestData, calendarData, recentData, langData, skillData] =
      await Promise.all([
        fetchGraphQL(userSessionQuery, { username }),
        fetchGraphQL(contestQuery, { username }),
        fetchGraphQL(calendarQuery, { username, year: new Date().getFullYear() }),
        fetchGraphQL(recentQuery, { username, limit: 5 }),
        fetchGraphQL(langQuery, { username }),
        fetchGraphQL(skillQuery, { username }),
      ]);

    const allQ = sessionData.allQuestionsCount || [];
    const acStats = sessionData.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (diff) => acStats.find(s => s.difficulty === diff)?.count || 0;
    const getTotal = (diff) => allQ.find(q => q.difficulty === diff)?.count || 0;

    let submissionCalendar = {};
    const calStr = calendarData.matchedUser?.userCalendar?.submissionCalendar;
    if (calStr) {
      try {
        submissionCalendar = typeof calStr === 'string' ? JSON.parse(calStr) : calStr;
      } catch { submissionCalendar = {}; }
    }

    return {
      username,
      totalSolved: getCount('All'),
      totalQuestions: getTotal('All'),
      easySolved: getCount('Easy'),
      totalEasy: getTotal('Easy'),
      mediumSolved: getCount('Medium'),
      totalMedium: getTotal('Medium'),
      hardSolved: getCount('Hard'),
      totalHard: getTotal('Hard'),
      ranking: sessionData.matchedUser?.profile?.ranking ?? 0,
      reputation: sessionData.matchedUser?.profile?.reputation ?? 0,
      contributionPoint: 0,
      attendedContestsCount: contestData.userContestRanking?.attendedContestsCount ?? 0,
      rating: contestData.userContestRanking?.rating ?? 0,
      globalRanking: contestData.userContestRanking?.globalRanking ?? 0,
      topPercentage: contestData.userContestRanking?.topPercentage ?? 0,
      badge: contestData.userContestRanking?.badge ?? null,
      streak: calendarData.matchedUser?.userCalendar?.streak ?? 0,
      totalActiveDays: calendarData.matchedUser?.userCalendar?.totalActiveDays ?? 0,
      submissionCalendar,
      recentSubmissions: recentData.recentAcSubmissionList || [],
      languageStats: langData.matchedUser?.languageProblemCount || [],
      skillStats: skillData.matchedUser?.tagProblemCounts || DEMO_DATA.skillStats,
      source: 'graphql',
    };
  } catch (graphqlErr) {
    console.error('GraphQL also failed:', graphqlErr);
    throw graphqlErr;
  }
};

/* ═══════════════════════════════════════════════════════════════
   UI COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const CircularProgress = ({ value, max, size = 150, stroke = 10, color, label, sublabel }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? Math.min(value / max, 1) : 0;
  const [animated, setAnimated] = useState(0);
  const pct = Math.round(progress * 100);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(progress), 400);
    return () => clearTimeout(t);
  }, [progress]);

  const glowId = `glow-${color.replace('#', '')}`;

  return (
    <div className="lc-circle-wrap">
      <svg width={size} height={size} className="lc-circle-svg">
        <defs>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - animated * circumference}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)', filter: `url(#${glowId})` }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="lc-circle-text">
        <span className="lc-circle-val" style={{ color }}>{value}</span>
        <span className="lc-circle-max">/ {max}</span>
        <span className="lc-circle-pct">{pct}%</span>
      </div>
      <div className="lc-circle-label">{label}</div>
      {sublabel && <div className="lc-circle-sublabel">{sublabel}</div>}
    </div>
  );
};


const CountUp = ({ end, duration = 1500, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setVal(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const LeetCode = ({ username = 'yashrawat' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [usingDemo, setUsingDemo] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);
    setUsingDemo(false);
    try {
      const realData = await fetchLeetCodeData(username);
      setData(realData);
    } catch (err) {
      console.warn('Using demo data due to API error:', err);
      setData({ ...DEMO_DATA, username });
      setUsingDemo(true);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatTime = (ts) => {
    const sec = typeof ts === 'string' ? parseInt(ts) : ts;
    const diff = Math.floor((Date.now() / 1000 - sec) / 3600);
    if (diff < 1) return 'Just now';
    if (diff < 24) return `${diff}h ago`;
    if (diff < 168) return `${Math.floor(diff / 24)}d ago`;
    return `${Math.floor(diff / 168)}w ago`;
  };

  const langColors = ['#00f5ff', '#7c3aed', '#f59e0b', '#10b981', '#f43f5e', '#ec4899'];

  const langIcon = (lang) => {
    const map = {
      cpp: 'C++', python: 'Py', python3: 'Py', javascript: 'JS', java: 'Java',
      typescript: 'TS', go: 'Go', rust: 'Rust', csharp: 'C#', c: 'C',
      kotlin: 'Kt', swift: 'Sw',
    };
    return map[lang?.toLowerCase()] || (lang ? lang.slice(0, 2).toUpperCase() : '—');
  };

  if (loading) {
    return (
      <section className="lc-section" id="leetcode">
        <div className="lc-loading">
          <div className="lc-spinner" />
          <p>Fetching LeetCode stats for <span className="lc-loading-user">@{username}</span>...</p>
        </div>
      </section>
    );
  }

  const d = data || DEMO_DATA;
  const totalPct = d.totalQuestions > 0 ? Math.round((d.totalSolved / d.totalQuestions) * 100) : 0;
  const easyPct = d.totalEasy > 0 ? Math.round((d.easySolved / d.totalEasy) * 100) : 0;
  const medPct = d.totalMedium > 0 ? Math.round((d.mediumSolved / d.totalMedium) * 100) : 0;
  const hardPct = d.totalHard > 0 ? Math.round((d.hardSolved / d.totalHard) * 100) : 0;

  return (
    <section className="lc-section" id="leetcode">
      {/* ── Header ── */}
      <div className="lc-header">
        <div className="lc-header-left">
          <div className="lc-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.544-4.543c-.467-.466-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.543-4.543c.467-.467 1.113-.702 1.824-.702s1.357.235 1.823.702l2.697 2.606c.39.39 1.024.39 1.414 0l2.79-2.79c.39-.39.39-1.024 0-1.414l-2.79-2.79c-1.17-1.17-2.723-1.815-4.487-1.815s-3.317.645-4.487 1.815L1.29 10.59C.12 11.76-.525 13.313-.525 15.077s.645 3.317 1.815 4.487l4.544 4.543c1.17 1.17 2.723 1.815 4.487 1.815s3.317-.645 4.487-1.815l2.79-2.79c.39-.39.39-1.024 0-1.414l-2.79-2.79c-.39-.39-1.024-.39-1.414 0zM22.19 1.81c-1.17-1.17-2.723-1.815-4.487-1.815s-3.317.645-4.487 1.815l-2.79 2.79c-.39.39-.39 1.024 0 1.414l2.79 2.79c.39.39 1.024.39 1.414 0l2.697-2.606c.467-.467 1.113-.702 1.824-.702s1.357.235 1.823.702l4.543 4.543c.467.467.702 1.15.702 1.863s-.235 1.357-.702 1.824l-4.543 4.543c-.467.467-1.113.702-1.824.702s-1.357-.235-1.823-.702l-2.697-2.606c-.39-.39-1.024-.39-1.414 0l-2.79 2.79c-.39.39-.39 1.024 0 1.414l2.79 2.79c1.17 1.17 2.723 1.815 4.487 1.815s3.317-.645 4.487-1.815l4.544-4.543c1.17-1.17 1.815-2.723 1.815-4.487s-.645-3.317-1.815-4.487L22.19 1.81z"/>
            </svg>
          </div>
          <div>
            <h2 className="lc-title">LeetCode <span className="lc-gradient">Dashboard</span></h2>
            <p className="lc-subtitle">
              @{d.username} · Rank #{d.ranking ? d.ranking.toLocaleString() : '—'} · {d.totalSolved} solved
              {usingDemo && <span className="lc-demo-badge"> (Demo Data)</span>}
              {d.source && !usingDemo && <span className="lc-source-badge"> via {d.source.toUpperCase()}</span>}
            </p>
          </div>
        </div>
        <div className="lc-header-actions">
          {error && (
            <button className="lc-retry-btn" onClick={loadData}>
              ↻ Retry
            </button>
          )}
          <a
            href={`https://leetcode.com/u/${username}`}
            target="_blank"
            rel="noreferrer"
            className="lc-profile-link"
          >
            View Profile →
          </a>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="lc-tabs">
        {['overview'].map((tab) => (
          <button
            key={tab}
            className={`lc-tab ${activeTab === tab ? 'lc-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          OVERVIEW TAB
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="lc-tab-panel lc-fade-in">
          {/* Circular Stats */}
          <div className="lc-circles">
            <CircularProgress
              value={d.totalSolved} max={d.totalQuestions}
              color="#00f5ff" label="Total Solved" sublabel={`${totalPct}% of all`}
            />
            <CircularProgress
              value={d.easySolved} max={d.totalEasy}
              color="#10b981" label="Easy" sublabel={`${easyPct}% done`}
            />
            <CircularProgress
              value={d.mediumSolved} max={d.totalMedium}
              color="#f59e0b" label="Medium" sublabel={`${medPct}% done`}
            />
            <CircularProgress
              value={d.hardSolved} max={d.totalHard}
              color="#f43f5e" label="Hard" sublabel={`${hardPct}% done`}
            />
          </div>

          {/* Quick Stats Grid */}
          <div className="lc-stats-grid">
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#00f5ff' }}>🔥</div>
              <div className="lc-stat-value"><CountUp end={d.totalSolved} /></div>
              <div className="lc-stat-label">Total Solved</div>
            </div>
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#f59e0b' }}>🏆</div>
              <div className="lc-stat-value">{d.attendedContestsCount || '—'}</div>
              <div className="lc-stat-label">Contests</div>
            </div>
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#7c3aed' }}>⭐</div>
              <div className="lc-stat-value">{d.rating ? Math.round(d.rating) : '—'}</div>
              <div className="lc-stat-label">Rating</div>
            </div>
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#f43f5e' }}>📈</div>
              <div className="lc-stat-value">Top {d.topPercentage ? d.topPercentage.toFixed(1) : '—'}%</div>
              <div className="lc-stat-label">Global</div>
            </div>
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#10b981' }}>⚡</div>
              <div className="lc-stat-value"><CountUp end={d.streak || 0} /></div>
              <div className="lc-stat-label">Day Streak</div>
            </div>
            <div className="lc-stat-card">
              <div className="lc-stat-icon" style={{ color: '#ec4899' }}>🎯</div>
              <div className="lc-stat-value"><CountUp end={d.totalActiveDays || 0} /></div>
              <div className="lc-stat-label">Active Days</div>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="lc-card">
            <h3 className="lc-card-title">Recent Accepted Submissions</h3>
            <div className="lc-submissions">
              {d.recentSubmissions?.slice(0, 5).map((sub, i) => (
                <a
                  key={sub.id || `${sub.titleSlug}-${i}`}
                  href={`https://leetcode.com/problems/${sub.titleSlug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lc-sub-row"
                >
                  <div className="lc-sub-info">
                    <span className="lc-sub-status">✓</span>
                    <span className="lc-sub-title">{sub.title}</span>
                  </div>
                  <div className="lc-sub-meta">
                    <span className="lc-sub-lang">{langIcon(sub.lang)}</span>
                    <span className="lc-sub-time">{formatTime(sub.timestamp)}</span>
                  </div>
                </a>
              ))}
              {(!d.recentSubmissions || d.recentSubmissions.length === 0) && (
                <p className="lc-empty">No recent submissions found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          ACTIVITY TAB
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'activity' && (
        <div className="lc-tab-panel lc-fade-in">
          <div className="lc-card">
            <h3 className="lc-card-title">
              Submission Heatmap
              <span className="lc-year">Last 365 Days · {d.totalActiveDays || 0} active days</span>
            </h3>
            <Heatmap data={d.submissionCalendar || {}} totalActiveDays={d.totalActiveDays} />
          </div>

          <div className="lc-card">
            <h3 className="lc-card-title">Languages Used</h3>
            <div className="lc-langs">
              {d.languageStats?.length > 0 ? d.languageStats.map((lang, i) => (
                <div key={i} className="lc-lang-chip" style={{ '--lang-color': langColors[i % langColors.length] }}>
                  <span className="lc-lang-dot" style={{ background: langColors[i % langColors.length] }} />
                  <span className="lc-lang-name">{lang.languageName}</span>
                  <span className="lc-lang-solved">{lang.problemsSolved}</span>
                </div>
              )) : (
                <p className="lc-empty">No language data available.</p>
              )}
            </div>
          </div>

          {d.badge?.name && (
            <div className="lc-card lc-badge-card">
              <h3 className="lc-card-title">Contest Badge</h3>
              <div className="lc-badge-display">
                <span className="lc-badge-icon">🏅</span>
                <span className="lc-badge-name">{d.badge.name}</span>
              </div>
            </div>
          )}
        </div>
      )}

    </section>
  );
};

export default LeetCode;