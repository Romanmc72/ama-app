import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type RightProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Right(props: RightProps) {
  return <GenericIcon iconName="chevron-right" {...props} />;
}
