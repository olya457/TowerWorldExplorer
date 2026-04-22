import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  name: 'home' | 'map' | 'blog' | 'facts' | 'quiz';
  active: boolean;
  size?: number;
};

const symbolMap: Record<Props['name'], string> = {
  home: '\uD83C\uDFE0',
  map: '\uD83D\uDDFA',
  blog: '\uD83D\uDCD6',
  facts: '\uD83D\uDCA1',
  quiz: '\uD83C\uDFC6',
};

const TabIcon = ({ name, active, size = 20 }: Props) => {
  return (
    <View style={{ width: size + 6, height: size + 6, alignItems: 'center', justifyContent: 'center', opacity: active ? 1 : 0.55 }}>
      <Text style={{ color: colors.text, fontSize: size, lineHeight: size + 4 }}>
        {symbolMap[name]}
      </Text>
    </View>
  );
};

export default TabIcon;
