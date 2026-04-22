import React, { useRef, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { structures } from '../data/structures';
import { RootStackParamList, Structure } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePersistentAndroidInsets } from '../hooks/usePersistentInsets';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const INITIAL_REGION: Region = {
  latitude: 25,
  longitude: 20,
  latitudeDelta: 120,
  longitudeDelta: 120,
};

const MapScreen = () => {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const androidInsets = usePersistentAndroidInsets();
  const [selected, setSelected] = useState<Structure | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const regionRef = useRef<Region>(INITIAL_REGION);
  const topOffset = Platform.OS === 'android' ? androidInsets.top : insets.top;

  const share = async () => {
    if (!selected) {
      return;
    }
    try {
      await Share.share({
        message: `${selected.name} — ${selected.location}. Height: ${selected.height}m. Built in ${selected.year}.`,
      });
    } catch {}
  };

  const goDetails = () => {
    if (!selected) {
      return;
    }
    const id = selected.id;
    setSelected(null);
    navigation.navigate('TowerDetail', { structureId: id });
  };

  const onRegionChange = (region: Region) => {
    regionRef.current = region;
  };

  const zoomIn = () => {
    const r = regionRef.current;
    const next: Region = {
      latitude: r.latitude,
      longitude: r.longitude,
      latitudeDelta: Math.max(r.latitudeDelta / 2, 0.005),
      longitudeDelta: Math.max(r.longitudeDelta / 2, 0.005),
    };
    regionRef.current = next;
    mapRef.current?.animateToRegion(next, 300);
  };

  const zoomOut = () => {
    const r = regionRef.current;
    const next: Region = {
      latitude: r.latitude,
      longitude: r.longitude,
      latitudeDelta: Math.min(r.latitudeDelta * 2, 180),
      longitudeDelta: Math.min(r.longitudeDelta * 2, 180),
    };
    regionRef.current = next;
    mapRef.current?.animateToRegion(next, 300);
  };

  const resetView = () => {
    regionRef.current = INITIAL_REGION;
    mapRef.current?.animateToRegion(INITIAL_REGION, 500);
  };

  const fitAll = () => {
    mapRef.current?.fitToCoordinates(
      structures.map(s => ({ latitude: s.latitude, longitude: s.longitude })),
      {
        edgePadding: { top: 120, right: 80, bottom: 220, left: 80 },
        animated: true,
      },
    );
  };

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={onRegionChange}>
        {structures.map(item => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.name}
            description={item.location}
            onPress={() => setSelected(item)}
          />
        ))}
      </MapView>

      <View style={[styles.topBar, { paddingTop: topOffset }]} pointerEvents="box-none">
        <View style={styles.titleBox}>
          <Text style={styles.title}>Map</Text>
          <Text style={styles.subtitle}>Find towers around the globe</Text>
        </View>
      </View>

      <View style={styles.controls} pointerEvents="box-none">
        <TouchableOpacity activeOpacity={0.8} onPress={zoomIn} style={styles.ctrlBtn}>
          <Text style={styles.ctrlText}>{'\uFF0B'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={zoomOut} style={styles.ctrlBtn}>
          <Text style={styles.ctrlText}>{'\u2212'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={fitAll} style={styles.ctrlBtn}>
          <Text style={styles.ctrlIconSmall}>{'\u2922'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={resetView} style={styles.ctrlBtn}>
          <Text style={styles.ctrlIconSmall}>{'\uD83C\uDF0D'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}>
        <Pressable style={styles.backdrop} onPress={() => setSelected(null)}>
          <Pressable style={styles.cardWrap} onPress={() => {}}>
            {selected ? (
              <View style={styles.card}>
                <Image source={selected.image} style={styles.cardImage} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelected(null)}
                  activeOpacity={0.8}>
                  <Text style={styles.closeText}>{'\u2715'}</Text>
                </TouchableOpacity>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{selected.name}</Text>
                  <Text style={styles.cardLocation}>{selected.location}</Text>
                  <Text style={styles.cardMeta}>
                    {selected.height}m
                    {selected.floors ? `  \u2022  ${selected.floors} floors` : ''}
                    {`  \u2022  ${selected.year}`}
                  </Text>
                  <Text style={styles.cardDesc} numberOfLines={4}>
                    {selected.description}
                  </Text>
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={goDetails}
                      style={styles.primaryBtn}>
                      <Text style={styles.primaryBtnText}>Open details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={share}
                      style={styles.secondaryBtn}>
                      <Text style={styles.secondaryBtnText}>{'\u27A4'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  titleBox: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: 'rgba(11,23,51,0.85)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 13,
  },
  controls: {
    position: 'absolute',
    right: 14,
    top: '35%',
    alignItems: 'center',
  },
  ctrlBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(11,23,51,0.9)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  ctrlText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
  },
  ctrlIconSmall: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 22,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cardWrap: {
    width: '100%',
    maxWidth: 380,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  cardBody: {
    padding: 18,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  cardLocation: {
    color: colors.yellow,
    fontWeight: '700',
    marginTop: 2,
  },
  cardMeta: {
    color: colors.textMuted,
    marginTop: 6,
    fontSize: 12,
  },
  cardDesc: {
    color: colors.textMuted,
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  primaryBtnText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default MapScreen;
