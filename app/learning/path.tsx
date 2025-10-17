import { Stack, useRouter } from 'expo-router';
import { View, Dimensions, Pressable, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useMemo } from 'react';
import { course } from '../../utils/data';
import { useProgress } from '../../context/ProgressContext';

const { width, height } = Dimensions.get('window');

function generateSpiral(numPoints: number) {
  const a = 8; // inner radius
  const b = 10; // growth per radian
  const step = 0.9; // radians per step
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = i * step;
    const r = a + b * angle;
    const x = width / 2 + r * Math.cos(angle);
    const y = height / 2 + r * Math.sin(angle);
    points.push({ x, y });
  }
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
  return { points, d };
}

export default function LearningPath() {
  const router = useRouter();
  const { completedIds } = useProgress();
  const numLessons = course.lessons.length;
  const { points, d } = useMemo(() => generateSpiral(Math.max(8, numLessons)), [numLessons]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0b0d10' }}>
      <Stack.Screen options={{ title: 'مسیر یادگیری' }} />
      <Svg width={width} height={height}>
        <Path d={d} stroke="#3a86ff44" strokeWidth={2} fill="none" />
        {points.slice(0, numLessons).map((p, idx) => {
          const lessonId = course.lessons[idx].id;
          const done = completedIds.has(lessonId);
          return (
            <Circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={12}
              fill={done ? '#32d58355' : '#ffffff22'}
              stroke={done ? '#32d583' : '#a3d1ff'}
              strokeWidth={2}
            />
          );
        })}
      </Svg>
      {/* tappable overlay for nodes */}
      {points.slice(0, numLessons).map((p, idx) => (
        <Pressable
          key={`btn-${idx}`}
          onPress={() => router.push(`/lesson/${course.lessons[idx].id}`)}
          style={{ position: 'absolute', width: 36, height: 36, borderRadius: 18, left: p.x - 18, top: p.y - 18 }}
        >
          <Text style={{ position: 'absolute', color: '#a3d1ff', left: 10, top: 6 }}>{idx + 1}</Text>
        </Pressable>
      ))}
    </View>
  );
}


