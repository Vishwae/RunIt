import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { formatGameDate, getDistance } from '../utils/helpers';
import { getCourtById, getUserById, getApprovedCount } from '../data/mockData';
import Avatar from './Avatar';
import { SkillBadge } from './Badges';

export default function GameCard({ game, onPress }) {
  const court = getCourtById(game.court_id);
  const host = getUserById(game.host_id);
  const approved = getApprovedCount(game.game_id);
  const spotsLeft = game.max_players - approved;
  const isFull = spotsLeft <= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Top row: court + distance */}
      <View style={styles.topRow}>
        <View style={styles.courtInfo}>
          <Ionicons name="location-sharp" size={14} color={COLORS.orange} />
          <Text style={styles.courtName} numberOfLines={1}>
            {court?.court_name}
          </Text>
        </View>
        <Text style={styles.distance}>{getDistance(game.court_id)}</Text>
      </View>

      {/* Date & time */}
      <Text style={styles.dateTime}>{formatGameDate(game.scheduled_start_time)}</Text>

      {/* Description */}
      {game.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {game.description}
        </Text>
      ) : null}

      {/* Bottom row: host, skill, spots */}
      <View style={styles.bottomRow}>
        <View style={styles.hostRow}>
          <Avatar name={host?.full_name} size={24} />
          <Text style={styles.hostName}>{host?.full_name}</Text>
        </View>

        <View style={styles.meta}>
          <SkillBadge level={game.skill_level} small />
          <View style={[styles.spotsBadge, isFull && styles.spotsFull]}>
            <Ionicons
              name="people"
              size={12}
              color={isFull ? COLORS.red : COLORS.textSecondary}
            />
            <Text style={[styles.spotsText, isFull && styles.spotsTextFull]}>
              {isFull ? 'Full' : `${approved}/${game.max_players}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  courtInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    flex: 1,
  },
  courtName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  distance: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: SPACING.sm,
  },
  dateTime: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    marginTop: 2,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  hostName: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  spotsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.bgElevated,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  spotsFull: {
    backgroundColor: COLORS.redMuted,
  },
  spotsText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  spotsTextFull: {
    color: COLORS.red,
  },
});
