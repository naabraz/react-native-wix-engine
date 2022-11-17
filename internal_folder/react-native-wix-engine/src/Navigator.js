import * as React from 'react';
import { Text, View } from 'react-native';

import { Navigation } from 'react-native-navigation';
import autobind from 'react-autobind';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const BOTTOM_TABS_ELEMENT_ID = 'BottomTabs';

export class Navigator {
  constructor({ moduleRegistry }) {
    this.moduleRegistry = moduleRegistry;
    autobind(this);
  }

  async startTabbedApp(tabs) {
    const convertedTabs = await this.convertTabs(tabs);
    await Navigation.setRoot({
      root: {
        bottomTabs: {
          id: BOTTOM_TABS_ELEMENT_ID,
          children: convertedTabs,
        },
      },
    });
  }

  async startEmptyApp() {
    Navigation.registerComponent(
      'engine.noModulesFoundsScreen',
      () => require('./Screens/NoModulesFoundsScreen').NoModuleFoundScreen,
    );
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'engine.noModulesFoundsScreen',
              },
            },
          ],
        },
      },
    });
  }

  async convertTabs(tabs) {
    const convertedTabs = tabs.map(async tab => {
      return {
        stack: {
          tab: tab.id,
          children: [
            {
              component: {
                name: tab.screen,
              },
            },
          ],
          options: {
            bottomTab: {
              icon: tab.icon,
              selectedIcon: tab.selectedIcon,
              iconColor: tab.iconColor,
              selectedIconColor: tab.selectedIconColor,
              text: tab.label,
            },
          },
        },
      };
    });
    return await Promise.all(convertedTabs);
  }
}
