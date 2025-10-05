import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type CancelProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Cancel(props: CancelProps) {
  return <GenericIcon iconName="x" {...props} />;
}
