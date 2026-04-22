import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rt = RouteProp<RootStackParamList, 'QuizResult'>;

const getLabel = (pct: number) => {
  if (pct >= 80) {
    return 'Amazing!';
  }
  if (pct >= 60) {
    return 'Great work!';
  }
  if (pct >= 40) {
    return 'Keep going!';
  }
  return 'Keep learning!';
};

const QuizResultScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { correct, total } = route.params;
  const pct = Math.round((correct / total) * 100);

  const share = async () => {
    try {
      await Share.share({
        message: `I scored ${correct}/${total} (${pct}%) on the Tower World Explorer Quiz!`,
      });
    } catch {}
  };

  const again = () => {
    navigation.replace('QuizGame');
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.center}>
          <Text style={styles.trophy}>{'\uD83C\uDFC6'}</Text>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.subtitle}>Here's how you did</Text>

          <View style={styles.scoreCard}>
            <Text style={styles.score}>
              <Text style={styles.scoreBig}>{correct}</Text>
              <Text style={styles.scoreSmall}>/{total}</Text>
            </Text>
            <Text style={styles.pct}>{pct}%</Text>
            <Text style={styles.label}>{getLabel(pct)}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={again} style={styles.againBtn}>
            <LinearGradient
              colors={[colors.accentAlt, colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fill}>
              <Text style={styles.againIcon}>{'\u21BB'}</Text>
              <Text style={styles.againText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={share} style={styles.shareBtn}>
            <LinearGradient
              colors={[colors.accentAlt, colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fill}>
              <Text style={styles.againIcon}>{'\u27A4'}</Text>
              <Text style={styles.againText}>Share</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 120,
  },
  trophy: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  score: {
    textAlign: 'center',
  },
  scoreBig: {
    color: colors.accentAlt,
    fontSize: 56,
    fontWeight: '800',
  },
  scoreSmall: {
    color: colors.textMuted,
    fontSize: 28,
    fontWeight: '700',
  },
  pct: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  label: {
    color: colors.textMuted,
    marginTop: 4,
  },
  againBtn: {
    width: '100%',
    marginTop: 18,
    borderRadius: 16,
    overflow: 'hidden',
  },
  shareBtn: {
    width: '100%',
    marginTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  fill: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  againIcon: {
    color: colors.text,
    fontSize: 16,
  },
  againText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default QuizResultScreen;
