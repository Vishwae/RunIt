import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SKILL_COLORS, BADGE_COLORS } from '../utils/theme';

export function SkillBadge({ level, small = false }) {
  const config = SKILL_COLORS[level] || SKILL_COLORS.Intermediate;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, small && styles.badgeSmall]}>
      <Text style={[styles.badgeText, { color: config.text }, small && styles.badgeTextSmall]}>
        {config.label}
      </Text>
    </View>
  );
}

export function ReliabilityBadge({ badge, score }) {
  const config = BADGE_COLORS[badge] || BADGE_COLORS.New;
  const label = badge === 'Reliable' && score ? `${score}%` : badge;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.badgeText, { color: config.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    gap: SPACING.xs,
  },
  badgeSmall: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  badgeTextSmall: {
    fontSize: 11,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
