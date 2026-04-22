import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import TabIcon from './TabIcon';

const iconMap: Record<string, 'home' | 'map' | 'blog' | 'facts' | 'quiz'> = {
  Home: 'home',
  Map: 'map',
  Blog: 'blog',
  Facts: 'facts',
  Quiz: 'quiz',
};

const FloatingTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? insets.bottom + 20 : 30;

  return (
    <View style={[styles.wrap, { bottom: bottomOffset }]} pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.item}>
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <TabIcon name={iconMap[route.name] || 'home'} active={isFocused} />
              </View>
              <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'stretch',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(11,23,51,0.92)',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    width: 42,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: colors.tabActiveBg,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.accentAlt,
    fontWeight: '700',
  },
});

export default FloatingTabBar;
