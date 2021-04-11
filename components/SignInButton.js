import React from "react";
import { Button } from "react-native";
import SignInScreen from "../components/SignInScreen";
import firebase from "../shared/firebase";

const SignInButton = ({ navigation, user }) =>
  user && user.uid ? (
    <Button
      title="Logout"
      color="#00bfff"
      onPress={() => firebase.auth().signOut()}
    />
  ) : (
    <Button
      title="Sign In"
      color="#00bfff"
      onPress={() => navigation.navigate("SignInScreen")}
    />
  );

export default SignInButton;