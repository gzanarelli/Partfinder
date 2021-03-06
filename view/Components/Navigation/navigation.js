import React from 'react';
import { View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import Signin from '../Screens/SigninScreen/signin';
import Signup from '../Screens/SignupScreen/signup';
import Home from '../Screens/HomeScreen/Home';
import Accueil from '../Screens/AccueilScreen/Accueil';
import Profil from '../Screens/ProfilScreen/Profil';
import Search from '../Screens/SearchScreen/search';
import Message from '../Screens/Message/message';
import Conversation from '../Screens/Message/Conversation';
import Statistic from '../Screens/statistic';
import EditProfil from'../Screens/EditProfilScreen/EditProfil';
import PartnerProfil from '../Screens/PartnerProfilScreen/PartnerProfil';
import { createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';


// Stack Profil & Edit Profil
const ProfilContainer = createStackNavigator({
  Profil: {
    screen: Profil,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Profil',
    },
  },
  EditProfil: {
    screen: EditProfil,
    navigationOptions: {
      title: 'Edit Profil'
    }
  }
});


// Stack Accueil & Profil Partner
const AccueilContainer = createStackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Accueil',
    },
  },
  PartnerProfil: {
    screen: PartnerProfil,
    navigationOptions: {
      title: 'Profil Partner'
    }
  }
})


// Stack Search & Profil Partner
const SearchContainer = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Search',
    },
  },
  PartnerProfil: {
    screen: PartnerProfil,
    navigationOptions: {
      title: 'Profil Partner'
    }
  }
})


// Stack Messagerie & Conversation
const MessageContainer = createStackNavigator({
  Message: {
    screen: Message,
    navigationOptions: {
      header: null,
      headerBackTitle: 'Message',
    },
  },
  Conversation: {
    screen: Conversation,
    navigationOptions: {
      title: 'Conversation'
    }
  }
})


// Top Bar Profil, Accueil, Search, Message & Statistic
const TopContainer = createMaterialTopTabNavigator({
  ProfilContainer: {
    screen: ProfilContainer,
    navigationOptions: {
      title: 'PROFIL',
      tabBarIcon: () => (
        <View>
          <Avatar 
            rounded
            // icon={{name: 'user', color: '#fff', type: 'font-awesome'}}
            source={require('../../img/profil.jpg')} 
            size={40} 
            overlayContainerStyle={{ backgroundColor: 'rgba(0,0,0, .5)' }}
            activeOpacity={0.1}
          />
          <Badge
          value={5}
          status="primary"
          size={10}
          containerStyle={{ position: 'absolute', top: 0, right: -5, }}
        />
      </View>
      )
    },
  },
  AccueilContainer: {
    screen: AccueilContainer,
    navigationOptions: {
      title: 'ACCUEIL',
      tabBarIcon: ({tintColor}) => (
        <Avatar 
          rounded
          icon={{name: 'home', color: '#fff', type: 'font-awesome',}}
          size={40} 
          overlayContainerStyle={{ backgroundColor: tintColor }}
          activeOpacity={0.1}
        />
      )
    }
  },
  SearchContainer: {
    screen: SearchContainer,
    navigationOptions: {
      title: 'SEARCH',
      tabBarIcon: ({tintColor}) => (
        <Avatar
          rounded
          size={40}
          icon={{name: 'search', color: '#fff', type: 'font-awesome'}}
          activeOpacity={0.1}
          overlayContainerStyle={{ backgroundColor: tintColor }}
        />
      )
    }
  },
  MessageContainer: {
    screen: MessageContainer,
    navigationOptions: {
      title: 'MESSAGE',
      tabBarIcon: ({tintColor}) => (
      <Avatar
        rounded
        size={40}
        icon={{name: 'wechat', type: 'font-awesome'}}
        activeOpacity={0.1}
        overlayContainerStyle={{ backgroundColor: tintColor }}
      />
    )
    }
  },
  Statistic: {
    screen: Statistic,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Avatar
          rounded
          size={40}
          icon={{name: 'bar-chart-o', color: '#fff', type: 'font-awesome'}}
          activeOpacity={0.1}
          overlayContainerStyle={{ backgroundColor: tintColor }}
        />
      )
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: '#4790ED',
    inactiveTintColor: 'rgba(0,0,0, .6)',
    style: { backgroundColor: '#fff', overflow: 'hidden', borderBottomWidth: 0.5, },
    labelStyle: { fontWeight: "bold", marginTop: 15, marginBottom: 5 },
    showIcon: true,
    scrollEnabled: true,
    indicatorStyle: {display: 'none'}
  }
});


// Navigation principal Home, Signin & Signup
const RootStack = createSwitchNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Signin: {
    screen: Signin,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  },
  TopContainer: TopContainer,
});

const AppContainer = createAppContainer(RootStack);

export default AppContainer