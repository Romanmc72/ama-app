import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type LeftProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Left(props: LeftProps) {
  return <GenericIcon iconName="chevron-left" {...props} />;
}
