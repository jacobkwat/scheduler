import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SchedulerScreen from "./SchedulerScreen";
import CourseDetailScreen from "./components/CourseDetailScreen";
import UserContext from "./components/UserContext";
import CourseEditScreen from "./components/CourseEditScreen";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

// const SignInButton = ({ navigation, user }) => {
//   return (
//       <Text>Sign In</Text>
//   );
// };

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const addUserData = (data) => {
    setCurrentUser((currentUser) => ({
      ...currentUser,
      ...data,
    }));
  };

  useEffect(() => {
    if (currentUser && user.uid) {
      const db = firebase.database().ref("users").child(user.uid);
      const handleData = (snap) => {
        addUserData(snap.val());
      };
      db.on("value", handleData, (error) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={currentUser}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={SchedulerScreen}
            options={({ navigation }) => ({
              title: "Schedule",
              headerRight: () => (
                <Button navigation={navigation} user={currentUser} />
              ),
            })}
          />
          <Stack.Screen
            name="CourseEditScreen"
            component={CourseEditScreen}
            options={{ title: "Course Editor" }}
          />
          <Stack.Screen
            name="CourseDetailScreen"
            component={CourseDetailScreen}
            options={{ title: "Course detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
