import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import MediaRenderer from '../../components/MediaRenderer';
import { course, getPrevNext } from '../../utils/data';
import { useProgress } from '../../context/ProgressContext';

export default function Lesson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = course.lessons.find(l => l.id === (id ?? '1')) ?? course.lessons[0];
  const { toggleBookmark, toggleComplete, bookmarkedIds, completedIds } = useProgress();
  const { prev, next } = getPrevNext(lesson.order);

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0d10' }}>
      <Stack.Screen options={{ title: lesson.title }} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {lesson.content.map((c, i) => (
          <MediaRenderer key={i} item={c} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, gap: 12 }}>
        <Pressable disabled={!prev} onPress={() => prev && router.push(`/lesson/${prev.id}`)} style={{ padding: 12, backgroundColor: '#ffffff14', borderRadius: 10, opacity: prev ? 1 : 0.4 }}>
          <Text style={{ color: 'white' }}>قبلی</Text>
        </Pressable>
        <Pressable onPress={() => toggleComplete(lesson.id)} style={{ padding: 12, backgroundColor: completedIds.has(lesson.id) ? '#32d583' : '#ffffff14', borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>{completedIds.has(lesson.id) ? 'تکمیل شد' : 'تکمیل'}</Text>
        </Pressable>
        <Pressable disabled={!next} onPress={() => next && router.push(`/lesson/${next.id}`)} style={{ padding: 12, backgroundColor: '#3a86ff', borderRadius: 10, opacity: next ? 1 : 0.4 }}>
          <Text style={{ color: 'white' }}>بعدی</Text>
        </Pressable>
        <Pressable onPress={() => toggleBookmark(lesson.id)} style={{ padding: 12, backgroundColor: '#ffffff14', borderRadius: 10 }}>
          <Text style={{ color: bookmarkedIds.has(lesson.id) ? '#ffd166' : '#a3d1ff' }}>علامت‌گذاری</Text>
        </Pressable>
      </View>
    </View>
  );
}


