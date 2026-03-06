// ─────────────────────────────────────────────
// RunIt! Mock Data — UC Berkeley area courts & games
// ─────────────────────────────────────────────

export const CURRENT_USER = {
  user_id: 'u_001',
  full_name: 'Vishwa',
  email: 'vishwa@berkeley.edu',
  profile_photo_url: null,
  skill_level: 'Intermediate',
  preferred_radius: 5,
  reliability_score: 92,
  reliability_badge: 'Reliable',
  games_attended_count: 14,
  games_hosted_count: 5,
  bio: 'Cal junior. Pickup hoops after class is my therapy.',
  created_at: '2025-09-01',
};

export const USERS = [
  CURRENT_USER,
  {
    user_id: 'u_002',
    full_name: 'Marcus Johnson',
    profile_photo_url: null,
    skill_level: 'Advanced',
    reliability_score: 97,
    reliability_badge: 'Reliable',
    games_attended_count: 32,
    games_hosted_count: 12,
    bio: 'Hooped at community college. Now I just run pickup.',
  },
  {
    user_id: 'u_003',
    full_name: 'Aiden Park',
    profile_photo_url: null,
    skill_level: 'Intermediate',
    reliability_score: 85,
    reliability_badge: 'Reliable',
    games_attended_count: 9,
    games_hosted_count: 2,
    bio: 'CS major who shoots threes.',
  },
  {
    user_id: 'u_004',
    full_name: 'Jasmine Torres',
    profile_photo_url: null,
    skill_level: 'Beginner',
    reliability_score: 0,
    reliability_badge: 'New',
    games_attended_count: 1,
    games_hosted_count: 0,
    bio: 'Just moved to Berkeley, looking for runs!',
  },
  {
    user_id: 'u_005',
    full_name: 'Devon Williams',
    profile_photo_url: null,
    skill_level: 'Advanced',
    reliability_score: 78,
    reliability_badge: 'Reliable',
    games_attended_count: 18,
    games_hosted_count: 6,
    bio: 'Ex-varsity. Competitive but friendly.',
  },
  {
    user_id: 'u_006',
    full_name: 'Priya Sharma',
    profile_photo_url: null,
    skill_level: 'Intermediate',
    reliability_score: 90,
    reliability_badge: 'Reliable',
    games_attended_count: 11,
    games_hosted_count: 3,
    bio: 'Grad student. Love a good half-court game.',
  },
  {
    user_id: 'u_007',
    full_name: 'Chris Nakamura',
    profile_photo_url: null,
    skill_level: 'Beginner',
    reliability_score: 60,
    reliability_badge: 'New',
    games_attended_count: 3,
    games_hosted_count: 0,
    bio: 'Learning the game. Patient teammates appreciated.',
  },
  {
    user_id: 'u_008',
    full_name: 'Tyler Reed',
    profile_photo_url: null,
    skill_level: 'Advanced',
    reliability_score: 95,
    reliability_badge: 'Reliable',
    games_attended_count: 27,
    games_hosted_count: 9,
    bio: 'Point guard energy. I bring the ball.',
  },
];

export const COURTS = [
  {
    court_id: 'c_001',
    court_name: 'RSF Outdoor Courts',
    address: '2301 Bancroft Way',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94720',
    latitude: 37.8685,
    longitude: -122.2625,
    indoor_outdoor: 'Outdoor',
    court_type: 'Full court',
    is_active: true,
    notes: '2 full courts behind the RSF. Lights until 10pm.',
  },
  {
    court_id: 'c_002',
    court_name: 'People\'s Park Courts',
    address: '2556 Haste St',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94704',
    latitude: 37.8658,
    longitude: -122.2565,
    indoor_outdoor: 'Outdoor',
    court_type: 'Half court',
    is_active: true,
    notes: 'Half court. Good for 3v3.',
  },
  {
    court_id: 'c_003',
    court_name: 'San Pablo Park',
    address: '2800 Park St',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94702',
    latitude: 37.8573,
    longitude: -122.2867,
    indoor_outdoor: 'Outdoor',
    court_type: 'Full court',
    is_active: true,
    notes: 'Great public court. Can get busy on weekends.',
  },
  {
    court_id: 'c_004',
    court_name: 'James Kenney Park',
    address: '1720 8th St',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94710',
    latitude: 37.8790,
    longitude: -122.2880,
    indoor_outdoor: 'Outdoor',
    court_type: 'Full court',
    is_active: true,
    notes: 'Solid rims. Less crowded on weekdays.',
  },
  {
    court_id: 'c_005',
    court_name: 'Grove Park',
    address: '1730 Oregon St',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94703',
    latitude: 37.8760,
    longitude: -122.2720,
    indoor_outdoor: 'Outdoor',
    court_type: 'Half court',
    is_active: true,
    notes: 'Chill spot for casual half-court games.',
  },
  {
    court_id: 'c_006',
    court_name: 'Willard Park',
    address: '2730 Hillegass Ave',
    city: 'Berkeley',
    state: 'CA',
    zip_code: '94705',
    latitude: 37.8630,
    longitude: -122.2530,
    indoor_outdoor: 'Outdoor',
    court_type: 'Half court',
    is_active: true,
    notes: 'Quiet neighborhood court. Good for beginners.',
  },
];

// Helper: generate dates relative to today
const today = new Date();
const day = (offset, hour, minute = 0) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const GAMES = [
  {
    game_id: 'g_001',
    host_id: 'u_002',
    court_id: 'c_001',
    scheduled_start_time: day(0, 17, 30),
    scheduled_end_time: day(0, 19, 0),
    skill_level: 'Intermediate',
    max_players: 10,
    description: 'After-class 5s. Bring water — no fountain nearby.',
    status: 'open',
    created_at: day(-1, 10),
  },
  {
    game_id: 'g_002',
    host_id: 'u_005',
    court_id: 'c_003',
    scheduled_start_time: day(1, 10, 0),
    scheduled_end_time: day(1, 12, 0),
    skill_level: 'Advanced',
    max_players: 10,
    description: 'Competitive 5v5. Come ready to run.',
    status: 'open',
    created_at: day(-1, 14),
  },
  {
    game_id: 'g_003',
    host_id: 'u_001',
    court_id: 'c_002',
    scheduled_start_time: day(2, 16, 0),
    scheduled_end_time: day(2, 17, 30),
    skill_level: 'Beginner',
    max_players: 6,
    description: 'Chill 3v3, all skill levels welcome. Let\'s hoop!',
    status: 'open',
    created_at: day(0, 8),
  },
  {
    game_id: 'g_004',
    host_id: 'u_008',
    court_id: 'c_004',
    scheduled_start_time: day(1, 18, 0),
    scheduled_end_time: day(1, 20, 0),
    skill_level: 'Intermediate',
    max_players: 10,
    description: 'Weeknight run. We play full court if we get 10.',
    status: 'open',
    created_at: day(-2, 20),
  },
  {
    game_id: 'g_005',
    host_id: 'u_006',
    court_id: 'c_005',
    scheduled_start_time: day(3, 11, 0),
    scheduled_end_time: day(3, 13, 0),
    skill_level: 'Intermediate',
    max_players: 8,
    description: 'Saturday morning run. 4v4 half-court.',
    status: 'open',
    created_at: day(0, 7),
  },
  {
    game_id: 'g_006',
    host_id: 'u_003',
    court_id: 'c_006',
    scheduled_start_time: day(0, 15, 0),
    scheduled_end_time: day(0, 16, 30),
    skill_level: 'Beginner',
    max_players: 6,
    description: 'Casual shootaround that usually turns into 3v3.',
    status: 'open',
    created_at: day(-1, 9),
  },
  {
    game_id: 'g_007',
    host_id: 'u_002',
    court_id: 'c_001',
    scheduled_start_time: day(4, 17, 0),
    scheduled_end_time: day(4, 19, 0),
    skill_level: 'Advanced',
    max_players: 10,
    description: 'Midweek competitive run. Fast pace, no excuses.',
    status: 'open',
    created_at: day(0, 12),
  },
  {
    game_id: 'g_008',
    host_id: 'u_005',
    court_id: 'c_003',
    scheduled_start_time: day(-1, 10, 0),
    scheduled_end_time: day(-1, 12, 0),
    skill_level: 'Intermediate',
    max_players: 10,
    description: 'Good run yesterday. Marking attendance.',
    status: 'completed',
    created_at: day(-3, 14),
  },
];

export const GAME_PARTICIPANTS = [
  // g_001 — Marcus hosting, Vishwa + others joined
  { game_id: 'g_001', user_id: 'u_001', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_001', user_id: 'u_003', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_001', user_id: 'u_006', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_001', user_id: 'u_007', role: 'player', join_status: 'pending', attendance_status: 'unknown' },
  { game_id: 'g_001', user_id: 'u_008', role: 'player', join_status: 'approved', attendance_status: 'unknown' },

  // g_002 — Devon hosting
  { game_id: 'g_002', user_id: 'u_002', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_002', user_id: 'u_008', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_002', user_id: 'u_001', role: 'player', join_status: 'pending', attendance_status: 'unknown' },

  // g_003 — Vishwa hosting
  { game_id: 'g_003', user_id: 'u_004', role: 'player', join_status: 'pending', attendance_status: 'unknown' },
  { game_id: 'g_003', user_id: 'u_007', role: 'player', join_status: 'approved', attendance_status: 'unknown' },

  // g_004 — Tyler hosting
  { game_id: 'g_004', user_id: 'u_001', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_004', user_id: 'u_003', role: 'player', join_status: 'approved', attendance_status: 'unknown' },
  { game_id: 'g_004', user_id: 'u_006', role: 'player', join_status: 'approved', attendance_status: 'unknown' },

  // g_005 — Priya hosting
  { game_id: 'g_005', user_id: 'u_001', role: 'player', join_status: 'approved', attendance_status: 'unknown' },

  // g_006 — Aiden hosting
  { game_id: 'g_006', user_id: 'u_004', role: 'player', join_status: 'approved', attendance_status: 'unknown' },

  // g_008 — completed game
  { game_id: 'g_008', user_id: 'u_001', role: 'player', join_status: 'approved', attendance_status: 'attended' },
  { game_id: 'g_008', user_id: 'u_003', role: 'player', join_status: 'approved', attendance_status: 'attended' },
  { game_id: 'g_008', user_id: 'u_006', role: 'player', join_status: 'approved', attendance_status: 'no_show' },
];

export const GAME_MESSAGES = {
  g_001: [
    { message_id: 'm_001', sender_user_id: 'u_002', message_type: 'user_message', message_body: 'Courts should be open. I checked earlier today.', created_at: day(-1, 11) },
    { message_id: 'm_002', sender_user_id: 'u_001', message_type: 'user_message', message_body: 'Bet. I\'ll be there right at 5:30.', created_at: day(-1, 12) },
    { message_id: 'm_003', sender_user_id: 'u_003', message_type: 'user_message', message_body: 'Might be 5 min late, coming from Soda Hall.', created_at: day(0, 14) },
    { message_id: 'm_004', sender_user_id: 'u_008', message_type: 'user_message', message_body: 'I got next. Bringing a ball just in case.', created_at: day(0, 15) },
    { message_id: 'm_005', sender_user_id: 'system', message_type: 'system_message', message_body: 'Priya was approved to join.', created_at: day(0, 15, 30) },
  ],
  g_003: [
    { message_id: 'm_010', sender_user_id: 'u_001', message_type: 'system_message', message_body: 'Game created! Looking for players.', created_at: day(0, 8) },
    { message_id: 'm_011', sender_user_id: 'u_007', message_type: 'user_message', message_body: 'Hey! This will be my first game, hope that\'s cool.', created_at: day(0, 9) },
    { message_id: 'm_012', sender_user_id: 'u_001', message_type: 'user_message', message_body: 'Absolutely, all levels welcome! See you there.', created_at: day(0, 9, 15) },
  ],
};

export const NOTIFICATIONS = [
  {
    notification_id: 'n_001',
    user_id: 'u_001',
    type: 'join_approved',
    title: 'Request Approved',
    body: 'Marcus approved your request to join the 5:30 PM run at RSF.',
    related_game_id: 'g_001',
    read_status: true,
    created_at: day(-1, 11),
  },
  {
    notification_id: 'n_002',
    user_id: 'u_001',
    type: 'join_request',
    title: 'New Join Request',
    body: 'Jasmine Torres requested to join your 3v3 at People\'s Park.',
    related_game_id: 'g_003',
    read_status: false,
    created_at: day(0, 10),
  },
  {
    notification_id: 'n_003',
    user_id: 'u_001',
    type: 'message',
    title: 'New Message',
    body: 'Aiden: "Might be 5 min late, coming from Soda Hall."',
    related_game_id: 'g_001',
    read_status: false,
    created_at: day(0, 14),
  },
  {
    notification_id: 'n_004',
    user_id: 'u_001',
    type: 'game_reminder',
    title: 'Game Starting Soon',
    body: 'Your run at RSF starts in 1 hour!',
    related_game_id: 'g_001',
    read_status: false,
    created_at: day(0, 16, 30),
  },
  {
    notification_id: 'n_005',
    user_id: 'u_001',
    type: 'join_approved',
    title: 'Request Approved',
    body: 'Tyler approved your request for the weeknight run at James Kenney.',
    related_game_id: 'g_004',
    read_status: true,
    created_at: day(-1, 21),
  },
];

// ─── Helper lookups ───
export const getUserById = (id) => USERS.find((u) => u.user_id === id);
export const getCourtById = (id) => COURTS.find((c) => c.court_id === id);
export const getGameById = (id) => GAMES.find((g) => g.game_id === id);

export const getGameParticipants = (gameId) =>
  GAME_PARTICIPANTS.filter((p) => p.game_id === gameId);

export const getApprovedCount = (gameId) =>
  GAME_PARTICIPANTS.filter(
    (p) => p.game_id === gameId && p.join_status === 'approved'
  ).length + 1; // +1 for host

export const getGameMessages = (gameId) =>
  GAME_MESSAGES[gameId] || [];

export const getUserGames = (userId) => {
  const joined = GAMES.filter(
    (g) =>
      g.status !== 'cancelled' &&
      GAME_PARTICIPANTS.some(
        (p) => p.game_id === g.game_id && p.user_id === userId && p.join_status === 'approved'
      )
  );
  const hosted = GAMES.filter((g) => g.host_id === userId && g.status !== 'cancelled');
  const pending = GAMES.filter(
    (g) =>
      GAME_PARTICIPANTS.some(
        (p) => p.game_id === g.game_id && p.user_id === userId && p.join_status === 'pending'
      )
  );
  return { joined, hosted, pending };
};
