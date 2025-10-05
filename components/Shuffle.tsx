import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type ShuffleProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Filter(props: ShuffleProps) {
  return <GenericIcon iconName="shuffle" {...props} />;
}
