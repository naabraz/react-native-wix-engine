import React from 'react';
import { Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, Box, Text, Button } from '@gympass/yoga';

function HomeScreen({ navigation }) {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="neutral">
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </Box>
  );
}

function DetailsScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" bg="neutral">
      <Text>Details Screen</Text>
      <Button.Link
        marginTop="small"
        onPress={() =>
          engine.moduleRegistry.invoke('demo-module-b.some-method')
        }>
        Say Hello to module B
      </Button.Link>
    </Box>
  );
}

const Stack = createNativeStackNavigator();

class Screen extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <ThemeProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}

export default class DemoModuleA {
  tabs() {
    return [
      {
        id: 'demoModuleA',
        label: 'A',
        screen: 'demo-module-a.demoModuleA',
        icon: require('./home.png'),
        selectedIcon: require('./home_selected.png'),
      },
    ];
  }

  deepLinks() {
    return [
      {
        linkPattern: 'test/explicit/link/:parameter',
        externalPatterns: [
          'wix\\://explicit/external/link/:parameter',
          'wix\\://explicit/external/link/:metaSiteId/:parameter',
        ],
        screenId: 'demoModuleA',
      },
      {
        linkPattern: 'test/category/link',
        pushNotificationCategories: ['test/category'],
        screenId: 'demoModuleA',
      },
    ];
  }

  components() {
    return [
      {
        id: 'demo-module-a.demoModuleA',
        generator: () => Screen,
      },
    ];
  }

  methods() {
    return [
      {
        id: 'demo-module-a.some-method',
        generator: () => () => {
          Alert.alert('Alert', 'Hello from module A');
        },
      },
    ];
  }

  prefix() {
    return 'demo-module-a';
  }
}
