import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Alert, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { formatGameDate, formatTimeRange, getDistance } from '../utils/helpers';
import {
  getGameById, getCourtById, getUserById,
  getGameParticipants, getApprovedCount, CURRENT_USER,
} from '../data/mockData';
import Avatar from '../components/Avatar';
import { SkillBadge, ReliabilityBadge } from '../components/Badges';

export default function GameDetailsScreen({ route, navigation }) {
  const { gameId } = route.params;
  const game = getGameById(gameId);
  const court = getCourtById(game?.court_id);
  const host = getUserById(game?.host_id);
  const participants = getGameParticipants(gameId);
  const approvedPlayers = participants.filter((p) => p.join_status === 'approved');
  const pendingPlayers = participants.filter((p) => p.join_status === 'pending');
  const approvedCount = getApprovedCount(gameId);
  const spotsLeft = game.max_players - approvedCount;

  const isHost = game.host_id === CURRENT_USER.user_id;
  const myParticipation = participants.find((p) => p.user_id === CURRENT_USER.user_id);
  const myStatus = myParticipation?.join_status;

  const [joinState, setJoinState] = useState(myStatus || 'none');

  const handleJoin = () => {
    if (spotsLeft <= 0) {
      Alert.alert('Game Full', 'This game is already full.');
      return;
    }
    setJoinState('pending');
    Alert.alert('Request Sent!', 'The host will review your request.');
  };

  const handleLeave = () => {
    Alert.alert('Leave Game', 'Are you sure you want to leave?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: () => setJoinState('none') },
    ]);
  };

  if (!game) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Court header */}
        <View style={styles.courtHeader}>
          <View style={styles.courtIconWrap}>
            <Ionicons name="basketball" size={24} color={COLORS.orange} />
          </View>
          <View style={styles.courtMeta}>
            <Text style={styles.courtName}>{court?.court_name}</Text>
            <Text style={styles.courtAddr}>
              {court?.address} · {getDistance(game.court_id)} · {court?.indoor_outdoor}
            </Text>
          </View>
        </View>

        {/* Date & time block */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.orange} />
            <Text style={styles.infoText}>{formatGameDate(game.scheduled_start_time)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={COLORS.orange} />
            <Text style={styles.infoText}>
              {formatTimeRange(game.scheduled_start_time, game.scheduled_end_time)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={18} color={COLORS.orange} />
            <Text style={styles.infoText}>
              {approvedCount} / {game.max_players} players
              {spotsLeft > 0 ? ` · ${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left` : ' · Full'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="fitness-outline" size={18} color={COLORS.orange} />
            <SkillBadge level={game.skill_level} />
          </View>
        </View>

        {/* Description */}
        {game.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this run</Text>
            <Text style={styles.descriptionText}>{game.description}</Text>
          </View>
        ) : null}

        {/* Host section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Host</Text>
          <TouchableOpacity style={styles.playerRow}>
            <Avatar name={host?.full_name} size={44} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{host?.full_name}</Text>
              <Text style={styles.playerSub}>
                {host?.games_hosted_count} games hosted
              </Text>
            </View>
            <ReliabilityBadge badge={host?.reliability_badge} score={host?.reliability_score} />
          </TouchableOpacity>
        </View>

        {/* Roster */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Players ({approvedPlayers.length})
          </Text>
          {approvedPlayers.map((p) => {
            const user = getUserById(p.user_id);
            return (
              <View key={p.user_id} style={styles.playerRow}>
                <Avatar name={user?.full_name} size={36} />
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{user?.full_name}</Text>
                  <Text style={styles.playerSub}>{user?.skill_level}</Text>
                </View>
                <ReliabilityBadge badge={user?.reliability_badge} score={user?.reliability_score} />
              </View>
            );
          })}
        </View>

        {/* Pending requests (host view only) */}
        {isHost && pendingPlayers.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pending Requests ({pendingPlayers.length})
            </Text>
            {pendingPlayers.map((p) => {
              const user = getUserById(p.user_id);
              return (
                <View key={p.user_id} style={styles.playerRow}>
                  <Avatar name={user?.full_name} size={36} />
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{user?.full_name}</Text>
                    <Text style={styles.playerSub}>{user?.skill_level} · {user?.reliability_badge}</Text>
                  </View>
                  <View style={styles.approvalBtns}>
                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() => Alert.alert('Approved', `${user?.full_name} has been approved!`)}
                    >
                      <Ionicons name="checkmark" size={18} color={COLORS.green} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.denyBtn}
                      onPress={() => Alert.alert('Denied', `${user?.full_name}'s request was denied.`)}
                    >
                      <Ionicons name="close" size={18} color={COLORS.red} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Court notes */}
        {court?.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Court Notes</Text>
            <Text style={styles.courtNotes}>{court.notes}</Text>
          </View>
        ) : null}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.actionBar}>
        {isHost ? (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={() => navigation.navigate('GameChat', { gameId })}
            >
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.orange} />
              <Text style={styles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryBtn, { flex: 1 }]}
              onPress={() => Alert.alert('Edit Game', 'Edit functionality coming soon.')}
            >
              <Text style={styles.primaryBtnText}>Edit Game</Text>
            </TouchableOpacity>
          </View>
        ) : joinState === 'approved' ? (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.chatBtn}
              onPress={() => navigation.navigate('GameChat', { gameId })}
            >
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.orange} />
              <Text style={styles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.leaveBtn, { flex: 1 }]} onPress={handleLeave}>
              <Text style={styles.leaveBtnText}>Leave Game</Text>
            </TouchableOpacity>
          </View>
        ) : joinState === 'pending' ? (
          <View style={styles.pendingBar}>
            <Ionicons name="hourglass-outline" size={20} color={COLORS.yellow} />
            <Text style={styles.pendingText}>Request pending — waiting for host approval</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.primaryBtn} onPress={handleJoin}>
            <Text style={styles.primaryBtnText}>
              {spotsLeft <= 0 ? 'Game Full' : 'Request to Join'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  backBtn: {
    position: 'absolute',
    top: 54,
    left: SPACING.lg,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: { paddingTop: 60, paddingBottom: 40 },

  courtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
  courtIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.orangeMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtMeta: { flex: 1 },
  courtName: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '700' },
  courtAddr: { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },

  infoCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  infoText: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '500' },

  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  descriptionText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  playerInfo: { flex: 1 },
  playerName: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '600' },
  playerSub: { color: COLORS.textTertiary, fontSize: 12, marginTop: 1 },

  approvalBtns: { flexDirection: 'row', gap: SPACING.sm },
  approveBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.greenMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  denyBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.redMuted,
    alignItems: 'center', justifyContent: 'center',
  },

  courtNotes: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 },

  // Action bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 34,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  primaryBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.glow,
  },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.orangeMuted,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  chatBtnText: { color: COLORS.orange, fontSize: 14, fontWeight: '600' },
  leaveBtn: {
    backgroundColor: COLORS.redMuted,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  leaveBtnText: { color: COLORS.red, fontSize: 16, fontWeight: '700' },
  pendingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.yellowMuted,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
  },
  pendingText: { color: COLORS.yellow, fontSize: 14, fontWeight: '600' },
});
