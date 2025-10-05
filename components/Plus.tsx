import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type PlusProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Filter(props: PlusProps) {
  return <GenericIcon iconName="plus" {...props} />;
}
