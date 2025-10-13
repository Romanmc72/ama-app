import { TextProps, TouchableOpacity, useColorScheme } from 'react-native';

import ThemedText from '@/components/ThemedText';
import { useFilterContext } from '@/contexts';
import { useCallback, useMemo } from 'react';
import { QuestionTagKey } from '@/shapes';

export interface TagProps extends TextProps {
  color?: string;
  onPress?: () => void;
}

export default function Tag({ color, onPress, ...props }: TagProps) {
  const tagText = props.children as QuestionTagKey;
  const theme = useColorScheme() ?? 'light';
  const { tags, addTag, removeTag } = useFilterContext();
  const tagExists = useMemo(() => tags.includes(tagText), [tags, tagText]);
  const onPressDefault = useCallback(
    () => (tagExists ? removeTag(tagText) : addTag(tagText)),
    [addTag, removeTag, tagExists, tagText],
  );
  const colorDefault = color ?? (tagExists ? 'red' : '#007bff');
  const onPressWithDefault = onPress ?? onPressDefault;
  return (
    <TouchableOpacity
      onPress={onPressWithDefault}
      style={{
        backgroundColor: colorDefault,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:
          theme === 'light' ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(255, 255, 255, 0.4)',
      }}>
      <ThemedText {...props} />
    </TouchableOpacity>
  );
}
