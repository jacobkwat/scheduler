import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SchedulerScreen from "./SchedulerScreen";
import CourseDetailScreen from "./components/CourseDetailScreen";
import UserContext from "./components/UserContext";
import CourseEditScreen from "./components/CourseEditScreen";
import SignInScreen from "./components/SignInScreen"
import firebase from './shared/firebase';
import SignInButton from './components/SignInButton';


const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  // const addUserData = (data) => {
  //   setCurrentUser((currentUser) => ({
  //     ...currentUser,
  //     ...data,
  //   }));
  // };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const db = firebase.database().ref("users").child(currentUser.uid);
      const handleData = (snap) => {
        setUser({ uid: currentUser.uid, ...snap.val() });
      };
      db.on("value", handleData, (error) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    } else {
      setUser(null);
    }
  }, [currentUser]);

  // Authentication from firebase
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={SchedulerScreen}
            options={({ navigation }) => ({
              title: "CS Schedule",
              headerRight: () => (
                <SignInButton navigation={navigation} user={user} />
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
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ title: "Sign In" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
