import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type TrashProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Trash(props: TrashProps) {
  return <GenericIcon iconName="trash-2" color="red" {...props} />;
}
