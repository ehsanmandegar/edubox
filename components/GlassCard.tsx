import { BlurView } from 'expo-blur';
import { View, ViewProps } from 'react-native';

export default function GlassCard({ children, style, ...rest }: ViewProps & { children?: React.ReactNode }) {
  return (
    <BlurView intensity={40} tint="dark" style={[{ borderRadius: 16, overflow: 'hidden' }, style]} {...rest}>
      <View style={{ padding: 16 }}>{children}</View>
    </BlurView>
  );
}


