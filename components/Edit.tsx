import GenericIcon, { GenericIconProps } from '@/components/GenericIcon';

export type EditProps = Pick<GenericIconProps, 'onPress' | 'disabled'>;

export default function Edit(props: EditProps) {
  return <GenericIcon iconName="edit" {...props} />;
}
