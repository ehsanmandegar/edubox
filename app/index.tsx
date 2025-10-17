import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ImageBackground, Text, View } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/splash-icon.png')}
      style={{ flex: 1, justifyContent: 'flex-end' }}
      imageStyle={{ opacity: 0.2 }}
    {
    >
      <BlurView intensity={40} tint="dark" style={{ margin: 24, borderRadius: 16, overflow: 'hidden' }}>
        <View style={{ padding: 20 }}>
          <Text style={{ color: 'white', fontSize: 22, marginBottom: 12 }}>آموزش</Text>
          <Link href="/learning/path" style={{ color: '#a3d1ff', fontSize: 18 }}>مسیر یادگیری</Link>
        </View>
      </BlurView>
    </ImageBackground>
  );
}


