import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { blogArticles, BlogArticleExt } from '../data/blog';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const BlogScreen = () => {
  const navigation = useNavigation<Nav>();

  const renderItem = ({ item }: { item: BlogArticleExt }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('BlogDetail', { articleId: item.id })}
      style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </View>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      <View style={styles.readMore}>
        <Text style={styles.readMoreText}>Read more</Text>
        <Text style={styles.readMoreArrow}>{'\u2192'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.title}>
            {'\uD83D\uDCDA '}Tourist Blog
          </Text>
          <Text style={styles.subtitle}>Stories and insights about tall structures</Text>
        </View>

        <FlatList
          data={blogArticles}
          keyExtractor={a => a.id}
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
    paddingBottom: 16,
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
  list: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 22,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  readMoreText: {
    color: colors.accentAlt,
    fontWeight: '700',
    marginRight: 6,
  },
  readMoreArrow: {
    color: colors.accentAlt,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BlogScreen;
