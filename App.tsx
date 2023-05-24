import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
import PagePost, { PagePostProps } from './pages/PagePost';
import { UserContext, DatabaseContext } from './Contexts';
import { createClient } from '@supabase/supabase-js';

export type RootParamList = {
  Home: undefined,
  Post: PagePostProps
}

const Stack = createStackNavigator<RootParamList>();

export default function App() {
  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xpzwoocajtvcmkejafis.supabase.co'
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwendvb2NhanR2Y21rZWphZmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NjQ5NjksImV4cCI6MjAwMDQ0MDk2OX0.sXT-cd6-A8v9sTdjFspbJG0LIKAUuDV7-IqVNMaAofI'
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    
  })
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <DatabaseContext.Provider value={supabase}>
          <UserContext.Provider value=''>
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
            </Stack.Navigator>
          </UserContext.Provider>
        </DatabaseContext.Provider>
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
