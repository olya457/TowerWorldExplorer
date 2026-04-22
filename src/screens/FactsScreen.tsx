import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import FilterChips from '../components/FilterChips';
import RandomButton from '../components/RandomButton';
import { facts } from '../data/facts';
import { FactItem } from '../types/navigation';
import { colors } from '../theme/colors';

const factCategories = ['All', 'Skyscraper', 'Tower', 'Monument'] as const;

const FactsScreen = () => {
  const [filter, setFilter] = useState<string>('All');

  const items = useMemo<FactItem[]>(() => {
    if (filter === 'All') {
      return facts;
    }
    return facts.filter(f => f.category === filter);
  }, [filter]);

  const openRandom = () => {
    const pool = items.length ? items : facts;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    Share.share({ message: `${pick.topic}: ${pick.text}` }).catch(() => {});
  };

  const shareFact = (item: FactItem) => {
    Share.share({ message: `${item.topic}: ${item.text}` }).catch(() => {});
  };

  const renderItem = ({ item }: { item: FactItem }) => (
    <View style={styles.card}>
      <Text style={styles.topic}>{'\uD83D\uDCA1 '}{item.topic}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => shareFact(item)}
        style={styles.shareBtn}>
        <LinearGradient
          colors={[colors.accentAlt, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shareFill}>
          <View style={styles.shareInner}>
            <Text style={styles.shareIcon}>{'\u27A4'}</Text>
            <Text style={styles.shareText}>Share</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.title}>Fun Facts</Text>
          <Text style={styles.subtitle}>Discover interesting trivia</Text>
        </View>

        <FilterChips items={factCategories} active={filter} onChange={setFilter} />

        <View style={styles.randomWrap}>
          <RandomButton label="Random Fact" onPress={openRandom} />
        </View>

        <FlatList
          data={items}
          keyExtractor={f => f.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 14,
  },
  randomWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  topic: {
    color: colors.accentAlt,
    fontWeight: '700',
    fontSize: 13,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  shareBtn: {
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
    height: 44,
  },
  shareFill: {
    flex: 1,
  },
  shareInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: colors.text,
    fontSize: 14,
    marginRight: 8,
  },
  shareText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default FactsScreen;
