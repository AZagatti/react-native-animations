import React, {useState} from 'react';

import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import User from './components/User';

const {width} = Dimensions.get('window');

interface User {
  id: number;
  name: string;
  description: string;
  avatar: string;
  thumbnail: string;
  likes: number;
  color: string;
}

const App: React.FC = () => {
  const scrollOffset = new Animated.Value(0);
  const listProgress = new Animated.Value(0);
  const userInfoProgress = new Animated.Value(0);
  const [userSelected, setUserSelected] = useState<User>({} as User);
  const [userInfoVisible, setuserInfoVisible] = useState(false);
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Diego Fernandes',
      description: 'Head de programação!',
      avatar: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4',
      thumbnail:
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
      likes: 200,
      color: '#57BCBC',
    },
    {
      id: 2,
      name: 'Robson Marques',
      description: 'Head de empreendedorismo!',
      avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
      thumbnail:
        'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
      likes: 350,
      color: '#E75A63',
    },
    {
      id: 3,
      name: 'Cleiton Souza',
      description: 'Head de mindset!',
      avatar: 'https://avatars0.githubusercontent.com/u/4669899?s=460&v=4',
      thumbnail:
        'https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80',
      likes: 250,
      color: '#2E93E5',
    },
    {
      id: 4,
      name: 'Robson Marques',
      description: 'Head de empreendedorismo!',
      avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
      thumbnail:
        'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
      likes: 350,
      color: '#E75A63',
    },
  ]);

  const selectUser = (selectedUser: User) => {
    setUserSelected(selectedUser);

    Animated.sequence([
      Animated.timing(listProgress, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(userInfoProgress, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => setuserInfoVisible(true));
  };

  const renderDetail = () => (
    <View>
      <User user={userSelected} onPress={() => {}} />
    </View>
  );

  const renderList = () => (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: listProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
              }),
            },
          ],
        },
      ]}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollOffset},
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}>
        {users.map((user) => (
          <User key={user.id} user={user} onPress={() => selectUser(user)} />
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.header,
          {
            height: scrollOffset.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.Image
          style={[
            styles.headerImage,
            {
              opacity: userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            },
          ]}
          source={userSelected && {uri: userSelected.thumbnail}}
        />

        <Animated.Text
          style={[
            styles.headerText,
            {
              fontSize: scrollOffset.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, width],
                  }),
                },
              ],
            },
          ]}>
          GoNative
        </Animated.Text>

        <Animated.Text
          style={[
            styles.headerText,
            {
              transform: [
                {
                  translateX: userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-width, 0],
                  }),
                },
              ],
            },
          ]}>
          {userSelected.name}
        </Animated.Text>
      </Animated.View>
      {userInfoVisible ? renderDetail() : renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: '#2E93E5',
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});

export default App;
