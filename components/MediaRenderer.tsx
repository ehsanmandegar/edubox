import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Video, Audio } from 'expo-av';
import { LessonContent } from '../utils/data';
import { resolveAssetPath } from '../utils/data';

export default function MediaRenderer({ item }: { item: LessonContent }) {
  switch (item.type) {
    case 'text':
      return <Text style={{ color: 'white', lineHeight: 28 }}>{item.value}</Text>;
    case 'image':
      return <Image source={resolveAssetPath(item.value)} style={{ width: '100%', height: 220, borderRadius: 12 }} contentFit="cover" />;
    case 'audio':
      return <Text style={{ color: '#a3d1ff' }}>پخش صوت (افزودن کنترل‌ها در نسخه بعد)</Text>;
    case 'video':
      return (
        <Video
          source={resolveAssetPath(item.value)}
          style={{ width: '100%', height: 240, borderRadius: 12, backgroundColor: '#000' }}
          useNativeControls
          resizeMode="contain"
        />
      );
    default:
      return <View />;
  }
}


