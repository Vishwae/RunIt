import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, TextInput, Alert, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../utils/theme';
import { COURTS } from '../data/mockData';

const SKILL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];
const PLAYER_OPTIONS = [4, 6, 8, 10, 12];

export default function CreateGameScreen({ navigation }) {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(0); // days from today
  const [selectedHour, setSelectedHour] = useState(17);

  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      offset: i,
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      short: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const hourOptions = Array.from({ length: 12 }, (_, i) => {
    const h = i + 8; // 8 AM to 7 PM
    const label = h > 12 ? `${h - 12}:00 PM` : h === 12 ? '12:00 PM' : `${h}:00 AM`;
    return { hour: h, label };
  });

  const handlePublish = () => {
    if (!selectedCourt) {
      Alert.alert('Select a Court', 'Please choose a court for your game.');
      return;
    }
    Alert.alert(
      'Game Published! 🏀',
      `Your ${skillLevel.toLowerCase()} run at ${selectedCourt.court_name} is live. Players can now request to join.`,
      [{ text: 'Nice!', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create a Run</Text>
          <Text style={styles.subtitle}>Set up a game and let players find you</Text>
        </View>

        {/* Court Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Court</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.courtScroll}
          >
            {COURTS.filter((c) => c.is_active).map((court) => (
              <TouchableOpacity
                key={court.court_id}
                style={[
                  styles.courtCard,
                  selectedCourt?.court_id === court.court_id && styles.courtCardActive,
                ]}
                onPress={() => setSelectedCourt(court)}
              >
                <View style={styles.courtCardIcon}>
                  <Ionicons
                    name="location-sharp"
                    size={16}
                    color={
                      selectedCourt?.court_id === court.court_id
                        ? COLORS.orange
                        : COLORS.textTertiary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.courtCardName,
                    selectedCourt?.court_id === court.court_id && styles.courtCardNameActive,
                  ]}
                  numberOfLines={1}
                >
                  {court.court_name}
                </Text>
                <Text style={styles.courtCardType}>
                  {court.court_type} · {court.indoor_outdoor}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {dateOptions.map((opt) => (
              <TouchableOpacity
                key={opt.offset}
                style={[styles.chip, selectedDate === opt.offset && styles.chipActive]}
                onPress={() => setSelectedDate(opt.offset)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedDate === opt.offset && styles.chipTextActive,
                  ]}
                >
                  {opt.short}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Start Time</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipRow}
          >
            {hourOptions.map((opt) => (
              <TouchableOpacity
                key={opt.hour}
                style={[styles.chip, selectedHour === opt.hour && styles.chipActive]}
                onPress={() => setSelectedHour(opt.hour)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedHour === opt.hour && styles.chipTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Skill Level */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Skill Level</Text>
          <View style={styles.optionRow}>
            {SKILL_OPTIONS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.optionBtn, skillLevel === s && styles.optionBtnActive]}
                onPress={() => setSkillLevel(s)}
              >
                <Text
                  style={[styles.optionText, skillLevel === s && styles.optionTextActive]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Max Players */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Max Players</Text>
          <View style={styles.optionRow}>
            {PLAYER_OPTIONS.map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.optionBtn, maxPlayers === n && styles.optionBtnActive]}
                onPress={() => setMaxPlayers(n)}
              >
                <Text
                  style={[styles.optionText, maxPlayers === n && styles.optionTextActive]}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="e.g. Bring water, we're playing full court if enough show..."
            placeholderTextColor={COLORS.textTertiary}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Publish button */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <Ionicons name="basketball" size={20} color={COLORS.white} />
          <Text style={styles.publishText}>Publish Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingBottom: 40 },

  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: COLORS.textSecondary, fontSize: 14, marginTop: 4 },

  section: { marginBottom: SPACING.xl },
  sectionLabel: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },

  courtScroll: { paddingHorizontal: SPACING.xl, gap: SPACING.md },
  courtCard: {
    width: 140,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  courtCardActive: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orangeDim,
  },
  courtCardIcon: { marginBottom: SPACING.sm },
  courtCardName: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  courtCardNameActive: { color: COLORS.textPrimary },
  courtCardType: { color: COLORS.textTertiary, fontSize: 11 },

  chipRow: { paddingHorizontal: SPACING.xl, gap: SPACING.sm },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.orangeMuted,
    borderColor: COLORS.orange,
  },
  chipText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: COLORS.orange },

  optionRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  optionBtnActive: {
    backgroundColor: COLORS.orangeMuted,
    borderColor: COLORS.orange,
  },
  optionText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  optionTextActive: { color: COLORS.orange },

  notesInput: {
    backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    color: COLORS.textPrimary,
    fontSize: 14,
    marginHorizontal: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 80,
    textAlignVertical: 'top',
  },

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
  publishBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  publishText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
