import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../utils/theme';
import { formatMessageTime } from '../utils/helpers';
import { NOTIFICATIONS } from '../data/mockData';

const NOTIF_ICONS = {
  join_approved: { name: 'checkmark-circle', color: COLORS.green },
  join_request: { name: 'person-add', color: COLORS.blue },
  join_denied: { name: 'close-circle', color: COLORS.red },
  message: { name: 'chatbubble', color: COLORS.orangeLight },
  game_reminder: { name: 'alarm', color: COLORS.yellow },
  game_cancelled: { name: 'ban', color: COLORS.red },
};

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read_status: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read_status).length;

  const renderNotification = ({ item }) => {
    const icon = NOTIF_ICONS[item.type] || NOTIF_ICONS.message;

    return (
      <TouchableOpacity
        style={[styles.notifItem, !item.read_status && styles.notifUnread]}
        onPress={() => {
          // Mark as read
          setNotifications((prev) =>
            prev.map((n) =>
              n.notification_id === item.notification_id
                ? { ...n, read_status: true }
                : n
            )
          );
          if (item.related_game_id) {
            navigation.navigate('GameDetails', { gameId: item.related_game_id });
          }
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrap, { backgroundColor: `${icon.color}20` }]}>
          <Ionicons name={icon.name} size={20} color={icon.color} />
        </View>
        <View style={styles.notifContent}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
          <Text style={styles.notifTime}>{formatMessageTime(item.created_at)}</Text>
        </View>
        {!item.read_status && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.subtitle}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead} style={styles.markReadBtn}>
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={40} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  title: { color: COLORS.textPrimary, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },
  markReadBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.orangeMuted,
    marginTop: 6,
  },
  markReadText: { color: COLORS.orange, fontSize: 12, fontWeight: '600' },

  listContent: { paddingBottom: 100 },

  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notifUnread: {
    backgroundColor: COLORS.orangeDim,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifContent: { flex: 1 },
  notifTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '600' },
  notifBody: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 17, marginTop: 2 },
  notifTime: { color: COLORS.textTertiary, fontSize: 11, marginTop: 4 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orange,
  },

  empty: { alignItems: 'center', paddingTop: 80, gap: SPACING.sm },
  emptyText: { color: COLORS.textSecondary, fontSize: 16, fontWeight: '600' },
});
