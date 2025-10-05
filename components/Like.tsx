import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type LikeProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Filter(props: LikeProps) {
  return <GenericIcon iconName="thumbs-up" {...props} />;
}
