import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type FilterProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Filter(props: FilterProps) {
  return <GenericIcon iconName="filter" {...props} />;
}
