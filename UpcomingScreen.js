import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../utils/theme';
import { formatGameDate, getDistance } from '../utils/helpers';
import { getUserGames, getCourtById, getUserById, getApprovedCount, CURRENT_USER } from '../data/mockData';
import Avatar from '../components/Avatar';
import { SkillBadge } from '../components/Badges';

const TABS = ['Joined', 'Hosting', 'Pending'];

function MiniGameCard({ game, onPress, variant = 'default' }) {
  const court = getCourtById(game.court_id);
  const host = getUserById(game.host_id);
  const approved = getApprovedCount(game.game_id);

  const borderColor =
    variant === 'hosting' ? COLORS.orange :
    variant === 'pending' ? COLORS.yellow :
    COLORS.border;

  return (
    <TouchableOpacity
      style={[styles.miniCard, { borderLeftColor: borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.miniTop}>
        <Text style={styles.miniCourt} numberOfLines={1}>{court?.court_name}</Text>
        <Text style={styles.miniDistance}>{getDistance(game.court_id)}</Text>
      </View>
      <Text style={styles.miniDate}>{formatGameDate(game.scheduled_start_time)}</Text>
      <View style={styles.miniBottom}>
        <View style={styles.miniHostRow}>
          <Avatar name={host?.full_name} size={20} />
          <Text style={styles.miniHostName}>{host?.full_name}</Text>
        </View>
        <View style={styles.miniMeta}>
          <SkillBadge level={game.skill_level} small />
          <Text style={styles.miniSpots}>{approved}/{game.max_players}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function UpcomingScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Joined');
  const { joined, hosted, pending } = getUserGames(CURRENT_USER.user_id);

  const upcomingJoined = joined.filter((g) => g.status === 'open' && g.host_id !== CURRENT_USER.user_id);
  const upcomingHosted = hosted.filter((g) => g.status === 'open');

  const getData = () => {
    switch (activeTab) {
      case 'Joined': return upcomingJoined;
      case 'Hosting': return upcomingHosted;
      case 'Pending': return pending;
      default: return [];
    }
  };

  const getVariant = () => {
    switch (activeTab) {
      case 'Hosting': return 'hosting';
      case 'Pending': return 'pending';
      default: return 'default';
    }
  };

  const data = getData();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming</Text>
        <Text style={styles.subtitle}>Your scheduled games</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => {
          const count =
            tab === 'Joined' ? upcomingJoined.length :
            tab === 'Hosting' ? upcomingHosted.length :
            pending.length;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {count > 0 && (
                <View style={[styles.tabBadge, activeTab === tab && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, activeTab === tab && styles.tabBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {data.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name={
                activeTab === 'Hosting' ? 'megaphone-outline' :
                activeTab === 'Pending' ? 'hourglass-outline' :
                'basketball-outline'
              }
              size={40}
              color={COLORS.textTertiary}
            />
            <Text style={styles.emptyText}>
              {activeTab === 'Hosting'
                ? 'No games you\'re hosting'
                : activeTab === 'Pending'
                ? 'No pending requests'
                : 'No upcoming games'}
            </Text>
            <Text style={styles.emptySub}>
              {activeTab === 'Hosting'
                ? 'Create a game to get started!'
                : 'Browse the feed to find a game'}
            </Text>
          </View>
        ) : (
          data.map((game) => (
            <MiniGameCard
              key={game.game_id}
              game={game}
              variant={getVariant()}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.game_id })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },

  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabActive: {
    backgroundColor: COLORS.orangeMuted,
    borderColor: COLORS.orange,
  },
  tabText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: COLORS.orange },
  tabBadge: {
    backgroundColor: COLORS.bgElevated,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeActive: { backgroundColor: COLORS.orange },
  tabBadgeText: { color: COLORS.textTertiary, fontSize: 11, fontWeight: '700' },
  tabBadgeTextActive: { color: COLORS.white },

  listContent: { paddingHorizontal: SPACING.xl, paddingBottom: 100 },

  miniCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
  },
  miniTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniCourt: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '600', flex: 1 },
  miniDistance: { color: COLORS.textTertiary, fontSize: 12 },
  miniDate: { color: COLORS.orange, fontSize: 13, fontWeight: '600', marginTop: 4, marginBottom: SPACING.sm },
  miniBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniHostRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  miniHostName: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '500' },
  miniMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  miniSpots: { color: COLORS.textTertiary, fontSize: 12, fontWeight: '600' },

  empty: { alignItems: 'center', paddingTop: 60, gap: SPACING.sm },
  emptyText: { color: COLORS.textSecondary, fontSize: 16, fontWeight: '600' },
  emptySub: { color: COLORS.textTertiary, fontSize: 13 },
});
