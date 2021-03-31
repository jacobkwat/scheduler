import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SchedulerScreen from './SchedulerScreen';
import CourseDetailScreen from './components/CourseDetailScreen';
import UserContext from './components/UserContext';
import CourseEditScreen from './components/CourseEditScreen';

const Stack = createStackNavigator();

const App = () => {
    const [user, setUser] = useState({ role: 'admin' });

    return (
        <UserContext.Provider value={user}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ScheduleScreen"
                        component={SchedulerScreen}
                        options={{ title: 'Schedule' }}
                    />
                    <Stack.Screen name="CourseEditScreen"
                        component={CourseEditScreen}
                        options={{ title: 'Course Editor' }}
                    />
                    <Stack.Screen name="CourseDetailScreen"
                        component={CourseDetailScreen}
                        options={{ title: 'Course detail' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};

export default App;