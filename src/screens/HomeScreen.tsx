import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import FilterChips from '../components/FilterChips';
import RandomButton from '../components/RandomButton';
import { structures, structureCategories } from '../data/structures';
import { RootStackParamList, Structure } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<Nav>();
  const [filter, setFilter] = useState<string>('All');

  const items = useMemo(() => {
    if (filter === 'All') {
      return structures;
    }
    return structures.filter(s => s.category === filter);
  }, [filter]);

  const openRandom = () => {
    const pool = items.length ? items : structures;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigation.navigate('TowerDetail', { structureId: pick.id });
  };

  const renderItem = ({ item }: { item: Structure }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('TowerDetail', { structureId: item.id })}
        style={styles.card}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.cardOverlay}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCity}>{item.location}</Text>
          <Text style={styles.cardMeta}>
            {item.height}m
            {item.floors ? `  \u2022  ${item.floors} floors` : ''}
            {`  \u2022  ${item.year}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.brand}>
            <Text style={styles.brandSky}>Sky</Text>
            <Text style={styles.brandGuide}>Guide</Text>
          </Text>
          <Text style={styles.subtitle}>Explore the world's tallest structures</Text>
        </View>

        <FilterChips items={structureCategories} active={filter} onChange={setFilter} />

        <View style={styles.randomWrap}>
          <RandomButton label="Open Random" onPress={openRandom} />
        </View>

        <FlatList
          data={items}
          keyExtractor={i => i.id}
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
  brand: {
    fontSize: 28,
    fontWeight: '800',
  },
  brandSky: {
    color: colors.accentAlt,
  },
  brandGuide: {
    color: colors.yellow,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 14,
  },
  randomWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 140,
  },
  card: {
    width: width - 40,
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  cardText: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  cardCity: {
    color: colors.yellow,
    fontWeight: '700',
    marginTop: 2,
  },
  cardMeta: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },
});

export default HomeScreen;
