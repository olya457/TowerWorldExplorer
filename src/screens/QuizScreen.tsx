import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const CheckItem = ({ text }: { text: string }) => (
  <View style={styles.checkRow}>
    <View style={styles.checkDot}>
      <Text style={styles.checkIcon}>{'\u2713'}</Text>
    </View>
    <Text style={styles.checkText}>{text}</Text>
  </View>
);

const QuizScreen = () => {
  const navigation = useNavigation<Nav>();

  const start = () => navigation.navigate('QuizGame');

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.center}>
          <View style={styles.trophyWrap}>
            <Text style={styles.trophy}>{'\uD83C\uDFC6'}</Text>
          </View>

          <Text style={styles.title}>Quiz Challenge</Text>
          <Text style={styles.subtitle}>
            Test your knowledge about the world's tallest structures!
          </Text>

          <View style={styles.infoCard}>
            <CheckItem text="5 questions" />
            <CheckItem text="60 seconds to complete" />
            <CheckItem text="4 options per question" />
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={start} style={styles.startBtn}>
            <LinearGradient
              colors={[colors.accent, colors.yellow]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startFill}>
              <Text style={styles.startText}>Start Quiz</Text>
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
  trophyWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(250,204,21,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  trophy: {
    fontSize: 62,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.accentAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: colors.accentAlt,
    fontSize: 14,
    fontWeight: '800',
  },
  checkText: {
    color: colors.text,
    fontSize: 15,
  },
  startBtn: {
    width: '100%',
    marginTop: 28,
    borderRadius: 20,
    overflow: 'hidden',
  },
  startFill: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default QuizScreen;
