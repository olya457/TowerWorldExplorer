import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import { getStructureById } from '../data/structures';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TowerDetail'>;
type Rt = RouteProp<RootStackParamList, 'TowerDetail'>;

const Stat = ({ value, label, icon }: { value: string; label: string; icon: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TowerDetailScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const s = getStructureById(route.params.structureId);
  const [showMap, setShowMap] = useState(false);

  if (!s) {
    return (
      <BackgroundWrapper>
        <SafePadding>
          <ScreenHeader onBack={() => navigation.goBack()} />
          <Text style={styles.missing}>Structure not found</Text>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  const share = async () => {
    try {
      await Share.share({
        message: `${s.name} — ${s.location}. Height: ${s.height}m. Built in ${s.year}.\n\n${s.description}`,
      });
    } catch {}
  };

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={s.image} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(11,23,51,0.4)', 'transparent', 'rgba(11,23,51,0.85)']}
            style={styles.heroOverlay}
          />
          <SafePadding top bottom={false}>
            <ScreenHeader onBack={() => navigation.goBack()} />
          </SafePadding>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{s.name}</Text>
          <Text style={styles.location}>{'\uD83D\uDCCD '}{s.location}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowMap(v => !v)}
              style={styles.mapBtn}>
              <LinearGradient
                colors={[colors.accentAlt, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mapFill}>
                <View style={styles.mapInner}>
                  <Text style={styles.mapIcon}>{'\uD83D\uDCCD'}</Text>
                  <Text style={styles.mapText}>
                    {showMap ? 'Hide Map' : 'View on Map'}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={share} style={styles.shareBtn}>
              <Text style={styles.shareIcon}>{'\u27A4'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <Stat value={`${s.height}m`} label="Height" icon={'\uD83D\uDCCF'} />
            <Stat
              value={s.floors ? `${s.floors}` : '\u2014'}
              label="Floors"
              icon={'\uD83C\uDFE2'}
            />
            <Stat value={`${s.year}`} label="Built" icon={'\uD83D\uDCC5'} />
          </View>

          <Text style={styles.section}>About</Text>
          <Text style={styles.description}>{s.description}</Text>

          <Text style={styles.section}>Key Details</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Category" value={s.category} />
            <InfoRow label="City" value={s.city} />
            <InfoRow label="Country" value={s.country} />
            <InfoRow label="Height" value={`${s.height} meters`} />
            {s.floors ? <InfoRow label="Floors" value={`${s.floors}`} /> : null}
            <InfoRow label="Completed" value={`${s.year}`} />
            <InfoRow
              label="Coordinates"
              value={`${s.latitude.toFixed(4)}, ${s.longitude.toFixed(4)}`}
            />
          </View>

          {showMap ? (
            <View style={styles.mapContainer}>
              <View style={styles.mapHeader}>
                <Text style={styles.mapHeaderText}>Location</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setShowMap(false)}
                  style={styles.closeBtn}>
                  <Text style={styles.closeText}>{'\u2715'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mapInline}>
                <MapView
                  style={StyleSheet.absoluteFill}
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                  initialRegion={{
                    latitude: s.latitude,
                    longitude: s.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}>
                  <Marker
                    coordinate={{ latitude: s.latitude, longitude: s.longitude }}
                    title={s.name}
                    description={s.location}
                    pinColor={colors.accent}
                  />
                </MapView>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  hero: {
    height: 320,
    backgroundColor: colors.card,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    marginTop: -24,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  location: {
    color: colors.yellow,
    fontWeight: '700',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  mapBtn: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: 54,
    marginRight: 10,
  },
  mapFill: {
    flex: 1,
  },
  mapInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapIcon: {
    color: colors.text,
    fontSize: 14,
    marginRight: 8,
  },
  mapText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  shareBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
  },
  statIcon: {
    fontSize: 18,
    color: colors.accentAlt,
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 22,
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 10,
  },
  mapContainer: {
    marginTop: 22,
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mapHeaderText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  mapInline: {
    height: 260,
  },
  missing: {
    color: colors.text,
    textAlign: 'center',
    padding: 24,
  },
});

export default TowerDetailScreen;
