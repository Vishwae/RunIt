import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Alert, StatusBar, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { CURRENT_USER } from '../data/mockData';
import Avatar from '../components/Avatar';
import { SkillBadge, ReliabilityBadge } from '../components/Badges';

function StatBox({ label, value, icon }) {
  return (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={18} color={COLORS.orange} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const user = CURRENT_USER;
  const [pushEnabled, setPushEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <Avatar name={user.full_name} size={80} />
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}

          <View style={styles.badgeRow}>
            <SkillBadge level={user.skill_level} />
            <ReliabilityBadge badge={user.reliability_badge} score={user.reliability_score} />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatBox label="Attended" value={user.games_attended_count} icon="basketball-outline" />
          <StatBox label="Hosted" value={user.games_hosted_count} icon="megaphone-outline" />
          <StatBox label="Reliability" value={`${user.reliability_score}%`} icon="shield-checkmark-outline" />
        </View>

        {/* Reliability explanation */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons name="shield-checkmark" size={18} color={COLORS.green} />
            <Text style={styles.infoCardTitle}>Your Reliability Score</Text>
          </View>
          <Text style={styles.infoCardBody}>
            Your score is based on attendance history. Showing up to games you commit to increases your score. No-shows bring it down. Hosts can see this when reviewing your join requests.
          </Text>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: COLORS.bgElevated, true: COLORS.orangeMuted }}
              thumbColor={pushEnabled ? COLORS.orange : COLORS.textTertiary}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="location-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Location Access</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: COLORS.bgElevated, true: COLORS.orangeMuted }}
              thumbColor={locationEnabled ? COLORS.orange : COLORS.textTertiary}
            />
          </View>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Skill Level', 'Update your skill level from your profile editor.')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="fitness-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Change Skill Level</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => Alert.alert('Sign Out', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive' },
          ])}
        >
          <Ionicons name="log-out-outline" size={18} color={COLORS.red} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>RunIt! v1.0.0 — MVP</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingBottom: 40 },

  profileHeader: {
    alignItems: 'center',
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.xl,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginTop: SPACING.md,
    letterSpacing: -0.5,
  },
  email: {
    color: COLORS.textTertiary,
    fontSize: 13,
    marginTop: 2,
  },
  bio: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 19,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  infoCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.greenMuted,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.2)',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  infoCardTitle: { color: COLORS.green, fontSize: 14, fontWeight: '700' },
  infoCardBody: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 },

  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  sectionTitle: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  settingText: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '500' },

  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.redMuted,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  signOutText: { color: COLORS.red, fontSize: 15, fontWeight: '600' },

  version: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});
