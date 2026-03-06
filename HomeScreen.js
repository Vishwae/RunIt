import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,
  SafeAreaView, StatusBar, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../utils/theme';
import { GAMES, COURTS, getCourtById } from '../data/mockData';
import GameCard from '../components/GameCard';

const SKILL_FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function HomeScreen({ navigation }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [activeSkill, setActiveSkill] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredGames = useMemo(() => {
    return GAMES
      .filter((g) => g.status === 'open')
      .filter((g) => activeSkill === 'All' || g.skill_level === activeSkill)
      .filter((g) => {
        if (!searchText) return true;
        const court = getCourtById(g.court_id);
        const q = searchText.toLowerCase();
        return (
          court?.court_name.toLowerCase().includes(q) ||
          g.description?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.scheduled_start_time) - new Date(b.scheduled_start_time));
  }, [activeSkill, searchText]);

  const renderHeader = () => (
    <View style={styles.headerSection}>
      {/* Brand bar */}
      <View style={styles.brandRow}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>Run</Text>
          <Text style={styles.logoAccent}>It!</Text>
        </View>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'list' && styles.toggleActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list" size={18} color={viewMode === 'list' ? COLORS.orange : COLORS.textTertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'map' && styles.toggleActive]}
            onPress={() => setViewMode('map')}
          >
            <Ionicons name="map" size={18} color={viewMode === 'map' ? COLORS.orange : COLORS.textTertiary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={COLORS.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courts or games..."
          placeholderTextColor={COLORS.textTertiary}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textTertiary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Skill filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {SKILL_FILTERS.map((skill) => (
          <TouchableOpacity
            key={skill}
            style={[styles.filterChip, activeSkill === skill && styles.filterChipActive]}
            onPress={() => setActiveSkill(skill)}
          >
            <Text style={[styles.filterText, activeSkill === skill && styles.filterTextActive]}>
              {skill}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Count */}
      <Text style={styles.resultCount}>
        {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} nearby
      </Text>
    </View>
  );

  // Map placeholder view
  if (viewMode === 'map') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        {renderHeader()}
        <View style={styles.mapContainer}>
          {/* Map background */}
          <View style={styles.mapBg}>
            <Text style={styles.mapLabel}>Map View</Text>
            <Text style={styles.mapSub}>Berkeley, CA</Text>
          </View>

          {/* Court pins */}
          {COURTS.filter((c) => c.is_active).map((court, i) => {
            const gamesAtCourt = filteredGames.filter((g) => g.court_id === court.court_id);
            if (gamesAtCourt.length === 0) return null;

            // Position pins in a layout within the map
            const positions = [
              { top: '25%', left: '35%' },
              { top: '40%', left: '60%' },
              { top: '55%', left: '25%' },
              { top: '30%', left: '70%' },
              { top: '65%', left: '50%' },
              { top: '45%', left: '40%' },
            ];
            const pos = positions[i % positions.length];

            return (
              <TouchableOpacity
                key={court.court_id}
                style={[styles.mapPin, pos]}
                onPress={() => {
                  if (gamesAtCourt.length > 0) {
                    navigation.navigate('GameDetails', { gameId: gamesAtCourt[0].game_id });
                  }
                }}
              >
                <View style={styles.pinBubble}>
                  <Text style={styles.pinCount}>{gamesAtCourt.length}</Text>
                </View>
                <View style={styles.pinTail} />
                <Text style={styles.pinLabel} numberOfLines={1}>{court.court_name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.game_id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate('GameDetails', { gameId: item.game_id })}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="basketball-outline" size={48} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No games found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters or create a game!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  listContent: {
    paddingBottom: 100,
  },
  headerSection: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -1,
  },
  logoAccent: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.orange,
    letterSpacing: -1,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  toggleActive: {
    backgroundColor: COLORS.orangeDim,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgInput,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    paddingVertical: 2,
  },
  filterRow: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  filterChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.orangeMuted,
    borderColor: COLORS.orange,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.orange,
  },
  resultCount: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: SPACING.sm,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySub: {
    color: COLORS.textTertiary,
    fontSize: 13,
  },

  // Map styles
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapBg: {
    flex: 1,
    backgroundColor: '#1A2332',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLabel: {
    color: COLORS.textTertiary,
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.3,
  },
  mapSub: {
    color: COLORS.textTertiary,
    fontSize: 13,
    opacity: 0.2,
    marginTop: 4,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBubble: {
    backgroundColor: COLORS.orange,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  pinCount: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.orange,
    marginTop: -1,
  },
  pinLabel: {
    color: COLORS.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    maxWidth: 100,
  },
});
