import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import PagePost, { PagePostProps } from './pages/PagePost';
import { UserContext } from './Contexts';
import { createClient } from '@supabase/supabase-js';
import Auth from './pages/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ValidateAuthToken } from './lib/API';
import CreatePost from './components/CreatePost';

export type RootParamList = {
  Home: undefined,
  Post: PagePostProps,
  Auth: undefined,
  CreatePost: undefined
}

const Stack = createStackNavigator<RootParamList>();

export default function App() {
  const [storageToken, setStorageToken] = useState('')

  const loadStorage = async () => {
    let temp = await AsyncStorage.getItem("@token")
    let res = await ValidateAuthToken(temp ?? "")
    if (res.ok) {
      setStorageToken(temp!)
    }
  }

  useEffect(() => {
    loadStorage()
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
          <UserContext.Provider value={{
            user: storageToken,
            setUser: setStorageToken
          }}>
            <Stack.Navigator>
              <Stack.Screen options={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: 'white'
                }
              }} name="Home" component={Home} />
              <Stack.Screen name="Post" component={PagePost} initialParams={{
                id: ''
              }} />
              <Stack.Screen name="Auth" component={Auth} options={{
                title: "Login"
              }} />
              <Stack.Screen name="CreatePost" component={CreatePost} options={{
                title: "Create a new Post!"
              }} />
            </Stack.Navigator>
          </UserContext.Provider>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
