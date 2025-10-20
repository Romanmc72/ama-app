import { Href, useRouter } from 'expo-router';
import { Br, Button, ThemedText, ThemedView } from '@/components';
import { routeTree } from '@/constants/Routes';
import { useUserContext } from '@/contexts';
import { viewStyles } from '@/styles/view';
import { Row } from '@/components';
import { RowProps } from '@/components/Row';

interface Setting {
  text: string;
  action: Href | (() => void);
}

export default function Settings() {
  const router = useRouter();
  const { user, logOut } = useUserContext();
  const settings: Setting[] = [
    { text: 'Account', action: '/user/editAccount' },
    { text: 'Appearance', action: '/user/appearanceSettings' },
    { text: 'Language', action: '/user/languageSettings' },
  ];
  const actions: Setting[] = [{ text: 'LogOut', action: logOut }];

  const SettingsRow = (props: Omit<RowProps, 'id' | 'text' | 'href' | 'onPress'> & Setting) => {
    if (typeof props.action === 'function') {
      return (
        <Row
          key={props.text}
          id={props.text}
          index={props.index}
          totalItems={props.totalItems}
          text={props.text}
          onPress={props.action}
        />
      );
    }
    return (
      <Row
        key={props.text}
        id={props.text}
        index={props.index}
        totalItems={props.totalItems}
        text={props.text}
        href={props.action}
      />
    );
  };

  return (
    <ThemedView style={viewStyles.view}>
      <ThemedText type="subtitle">Welcome, {user?.name}</ThemedText>
      <Br />
      {settings.map((s, index) => (
        <SettingsRow {...s} index={index} totalItems={settings.length} />
      ))}
      <Br />
      {actions.map((s, index) => (
        <SettingsRow {...s} index={index} totalItems={actions.length} />
      ))}
    </ThemedView>
  );
}
