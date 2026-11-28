import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const C = {
  bg: '#100D20', panel: '#1B1730', panel2: '#25203D',
  pink: '#F05AA8', purple: '#9B75FF', white: '#FFF9FF',
  muted: '#A9A2BD', line: '#342D4D', green: '#57D6A2'
};

const people = [
  { name: 'Mina', age: 21, city: 'Phnom Penh', color: '#9B75FF', online: true, tag: 'Music lover' },
  { name: 'Dara', age: 23, city: 'Siem Reap', color: '#E978A8', online: true, tag: 'Coffee & travel' },
  { name: 'Sophy', age: 20, city: 'Battambang', color: '#4CA8B8', online: false, tag: 'Good vibes' }
];

function Avatar({ name, color, size = 54 }) {
  return <View style={{ width: size, height: size, borderRadius: size/2, backgroundColor: color, alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:'#51416E' }}>
    <Text style={{ color: C.white, fontSize: size*.36, fontWeight:'800' }}>{name?.[0] || '?'}</Text>
  </View>;
}
function Header({ title, sub }) {
  return <View style={s.header}>
    <View><Text style={s.brand}>{title}</Text>{sub ? <Text style={s.sub}>{sub}</Text> : null}</View>
    <TouchableOpacity style={s.round}><Ionicons name="notifications-outline" size={21} color={C.white}/><View style={s.dot}/></TouchableOpacity>
  </View>;
}
function Primary({ title, onPress, icon }) {
  return <TouchableOpacity onPress={onPress} style={s.primary}>{icon ? <Ionicons name={icon} size={19} color="white" style={{marginRight:8}}/> : null}<Text style={s.primaryText}>{title}</Text></TouchableOpacity>;
}
function Home({ go }) {
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
    <Header title="LoveTalk" sub="A little hello can mean a lot ✨"/>
    <View style={s.hero}>
      <Text style={s.eyebrow}>YOUR NEXT CONNECTION</Text>
      <Text style={s.heroTitle}>Someone new{'\n'}is waiting to meet you.</Text>
      <Text style={s.heroSub}>Make friends, share moments and feel closer.</Text>
      <Primary title="Find your match" icon="heart" onPress={()=>go('Match')}/>
      <View style={s.heroOrb}><Ionicons name="heart" size={54} color="#FFD8EC"/></View>
    </View>
    <View style={s.sectionRow}><Text style={s.section}>People online</Text><TouchableOpacity onPress={()=>go('Discover')}><Text style={s.link}>See all</Text></TouchableOpacity></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {people.map(p=><TouchableOpacity key={p.name} style={s.personMini} onPress={()=>go('Discover')}>
        <View><Avatar name={p.name} color={p.color}/>{p.online && <View style={s.onlineDot}/>}</View>
        <Text style={s.personName}>{p.name}, {p.age}</Text><Text style={s.personCity}>{p.city}</Text>
      </TouchableOpacity>)}
    </ScrollView>
    <View style={s.sectionRow}><Text style={s.section}>Your space</Text></View>
    <TouchableOpacity style={s.feature} onPress={()=>go('Voice')}>
      <View style={[s.featureIcon,{backgroundColor:'#49316D'}]}><Ionicons name="mic" size={24} color="#E6D6FF"/></View>
      <View style={{flex:1}}><Text style={s.featureTitle}>Voice rooms</Text><Text style={s.featureSub}>Join a room and say hello</Text></View>
      <Ionicons name="chevron-forward" color={C.muted} size={20}/>
    </TouchableOpacity>
    <TouchableOpacity style={s.feature} onPress={()=>go('Messages')}>
      <View style={[s.featureIcon,{backgroundColor:'#63304F'}]}><Ionicons name="chatbubbles" size={24} color="#FFD9ED"/></View>
      <View style={{flex:1}}><Text style={s.featureTitle}>Private messages</Text><Text style={s.featureSub}>Keep the conversation going</Text></View>
      <Ionicons name="chevron-forward" color={C.muted} size={20}/>
    </TouchableOpacity>
  </ScrollView>;
}
function Match() {
  const [started,setStarted] = useState(false);
  return <ScrollView contentContainerStyle={s.content}>
    <Header title="Find a match" sub="Meet someone beyond your circle"/>
    <View style={s.matchCard}>
      <View style={s.matchGlow}><Ionicons name="heart" size={64} color={C.pink}/></View>
      <Text style={s.heroTitle}>Ready to say hello?</Text>
      <Text style={[s.heroSub,{textAlign:'center'}]}>We’ll help you discover people who are ready to connect.</Text>
      <View style={s.pills}><Text style={s.pill}>✦ Friendly chats</Text><Text style={s.pill}>♡ New people</Text></View>
      <Primary title={started ? 'Looking for people…' : 'Start matching'} icon="heart" onPress={()=>setStarted(true)}/>
      {started && <Text style={[s.personCity,{marginTop:14,textAlign:'center'}]}>Demo preview — matching needs a live backend to connect real users.</Text>}
    </View>
    <Text style={s.section}>A good connection starts with respect.</Text>
    <Text style={s.body}>Be kind, protect your personal information, and report anything that makes you uncomfortable.</Text>
  </ScrollView>;
}
function Discover() {
  return <ScrollView contentContainerStyle={s.content}>
    <Header title="Discover" sub="Find people and new conversations"/>
    <View style={s.search}><Ionicons name="search" size={19} color={C.muted}/><TextInput placeholder="Search people" placeholderTextColor={C.muted} style={s.searchInput}/></View>
    {people.map(p=><View key={p.name} style={s.personRow}>
      <Avatar name={p.name} color={p.color}/><View style={{flex:1,marginLeft:13}}><Text style={s.featureTitle}>{p.name}, {p.age}</Text><Text style={s.featureSub}>{p.city} · {p.tag}</Text></View>
      <TouchableOpacity style={s.smallButton}><Text style={s.smallButtonText}>Say hi</Text></TouchableOpacity>
    </View>)}
    <Text style={s.body}>Sample profiles for preview. Real profiles will appear after account and database setup.</Text>
  </ScrollView>;
}
function Messages() {
  const [message,setMessage] = useState('');
  return <View style={[s.content,{flex:1}]}>
    <Header title="Messages" sub="Your conversations"/>
    {people.slice(0,2).map((p,i)=><TouchableOpacity key={p.name} style={s.personRow}>
      <Avatar name={p.name} color={p.color}/><View style={{flex:1,marginLeft:13}}><Text style={s.featureTitle}>{p.name}</Text><Text style={s.featureSub}>{i===0?'Hey! How is your day?':'Nice to meet you 👋'}</Text></View><Text style={s.time}>10:{i===0?'24':'08'}</Text>
    </TouchableOpacity>)}
    <View style={{flex:1,justifyContent:'center',alignItems:'center',opacity:.8}}>
      <Ionicons name="chatbubble-ellipses-outline" size={44} color={C.purple}/><Text style={s.body}>Choose a conversation to start chatting.</Text>
    </View>
    <View style={s.composer}><TextInput value={message} onChangeText={setMessage} placeholder="Write a message…" placeholderTextColor={C.muted} style={s.searchInput}/><TouchableOpacity onPress={()=>setMessage('')}><Ionicons name="send" size={22} color={C.pink}/></TouchableOpacity></View>
  </View>;
}
function Voice() {
  return <ScrollView contentContainerStyle={s.content}>
    <Header title="Voice rooms" sub="Talk, listen and meet new friends"/>
    <View style={s.roomHero}><Ionicons name="radio" size={40} color="#E8D9FF"/><Text style={s.heroTitle}>Find your people</Text><Text style={s.heroSub}>Join friendly conversations by topic.</Text></View>
    {['Late night talks','Music & chill','Make new friends'].map((v,i)=><View key={v} style={s.feature}>
      <View style={[s.featureIcon,{backgroundColor:['#49316D','#63304F','#31566A'][i]}]}><Ionicons name="mic" size={23} color="white"/></View>
      <View style={{flex:1}}><Text style={s.featureTitle}>{v}</Text><Text style={s.featureSub}>{[12,8,5][i]} people · Public room</Text></View>
      <TouchableOpacity style={s.smallButton}><Text style={s.smallButtonText}>Join</Text></TouchableOpacity>
    </View>)}
    <Text style={s.body}>Voice rooms are visual previews. Live audio requires a voice service and backend integration.</Text>
  </ScrollView>;
}

function Party() {
  const [joined, setJoined] = useState({});
  const [active, setActive] = useState('All');
  const categories = ['All','Daily','Matching','Rewards','Ranking','Missions'];
  const events = [
    {id:'daily', emoji:'🎉', title:'Daily Party Festival', desc:'ចូលរួមសកម្មភាពពិសេសប្រចាំថ្ងៃ', type:'Daily', time:'Ends in 05:42:18', reward:'Daily gifts'},
    {id:'match', emoji:'❤️', title:'Find Your Match', desc:'ជួបមិត្តថ្មី និងចាប់គូស្វែងរកមិត្ត', type:'Matching', time:'Ends in 11:20:05', reward:'Friend badge'},
    {id:'gift', emoji:'🎁', title:'Gift Surprise', desc:'បំពេញសកម្មភាព ដើម្បីទទួលកាដូ', type:'Rewards', time:'Ends in 02:15:44', reward:'Special gifts'},
    {id:'rank', emoji:'🏆', title:'Party Ranking Challenge', desc:'ប្រកួតពិន្ទុ និងឡើងតារាង Ranking', type:'Ranking', time:'Ends in 1d 04h', reward:'Top rank rewards'},
    {id:'mission', emoji:'🎯', title:'Daily Missions', desc:'បំពេញបេសកកម្មប្រចាំថ្ងៃ ដើម្បីទទួលពិន្ទុ', type:'Missions', time:'Resets in 08:00:00', reward:'Mission points'}
  ];
  const filtered = active === 'All' ? events : events.filter(e=>e.type===active);
  return <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
    <Header title="Party" sub="Join events, play together & win rewards"/>
    <View style={s.partyBanner}>
      <Text style={{fontSize:34}}>🎊</Text>
      <Text style={s.partyBannerTitle}>LoveTalk Party</Text>
      <Text style={s.partyBannerSub}>Every day is a chance to connect, play and celebrate.</Text>
      <View style={s.partyBannerTag}><Text style={s.partyBannerTagText}>EVENTS • FRIENDS • REWARDS</Text></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:17}}>
      {categories.map(c=><TouchableOpacity key={c} onPress={()=>setActive(c)} style={[s.partyFilter,active===c && s.partyFilterActive]}>
        <Text style={[s.partyFilterText,active===c && {color:'#FFFFFF'}]}>{c}</Text>
      </TouchableOpacity>)}
    </ScrollView>
    <View style={s.partySectionRow}><Text style={s.section}>Featured events</Text><Text style={s.partyLive}>● LIVE</Text></View>
    {filtered.map((e,i)=><View key={e.id} style={s.eventCard}>
      <View style={s.eventTop}>
        <View style={s.eventEmoji}><Text style={{fontSize:27}}>{e.emoji}</Text></View>
        <View style={{flex:1,marginLeft:12}}>
          <Text style={s.eventType}>{e.type.toUpperCase()} EVENT</Text>
          <Text style={s.eventTitle}>{e.title}</Text>
          <Text style={s.eventDesc}>{e.desc}</Text>
        </View>
      </View>
      <View style={s.eventMeta}>
        <View><Text style={s.eventMetaLabel}>COUNTDOWN</Text><Text style={s.eventTime}>⏳ {e.time}</Text></View>
        <View><Text style={s.eventMetaLabel}>REWARD</Text><Text style={s.eventReward}>🎁 {e.reward}</Text></View>
      </View>
      <TouchableOpacity style={[s.eventJoin,joined[e.id] && s.eventJoined]} onPress={()=>setJoined(v=>({...v,[e.id]:!v[e.id]}))}>
        <Text style={s.eventJoinText}>{joined[e.id]?'Joined ✓':'Join Event'}</Text>
      </TouchableOpacity>
    </View>)}
    <View style={s.eventNote}><Ionicons name="information-circle-outline" size={17} color={C.muted}/><Text style={s.eventNoteText}>Event cards are a UI preview. Live countdowns, rewards, rankings and participation will need a connected server.</Text></View>
  </ScrollView>;
}

function Profile() {
  return <ScrollView contentContainerStyle={s.content}>
    <Header title="My profile" sub="Make your profile feel like you"/>
    <View style={s.profileBox}><Avatar name="You" color={C.purple} size={88}/><Text style={[s.heroTitle,{marginTop:14}]}>Your name</Text><Text style={s.heroSub}>Add a little about yourself</Text><TouchableOpacity style={s.edit}><Ionicons name="create-outline" color={C.white} size={17}/><Text style={s.editText}> Edit profile</Text></TouchableOpacity></View>
    {['Account settings','Privacy & safety','Blocked users','Help & support'].map((v,i)=><View key={v} style={s.feature}><Ionicons name={['person-outline','shield-checkmark-outline','ban-outline','help-circle-outline'][i]} size={22} color={C.pink}/><Text style={[s.featureTitle,{flex:1,marginLeft:13}]}>{v}</Text><Ionicons name="chevron-forward" color={C.muted} size={19}/></View>)}
  </ScrollView>;
}
const tabs = [
  ['Home','home-outline','home'],['Party','gift-outline','gift'],['Match','heart-outline','heart'],['Messages','chatbubble-ellipses-outline','chatbubble-ellipses'],['Profile','person-outline','person']
];
export default function App() {
  const [tab,setTab] = useState('Home');
  const screens = {Home:<Home go={setTab}/>,Discover:<Discover/>,Party:<Party/>,Match:<Match/>,Messages:<Messages/>,Profile:<Profile/>,Voice:<Voice/>};
  return <SafeAreaView style={s.safe}>
    <StatusBar barStyle="light-content" backgroundColor={C.bg}/>
    <View style={{flex:1}}>{screens[tab] || <Home go={setTab}/>}</View>
    <View style={s.tabBar}>
      {tabs.map(([name,outline,solid])=><TouchableOpacity key={name} style={s.tab} onPress={()=>setTab(name)}>
        <Ionicons name={tab===name?solid:outline} size={22} color={tab===name?C.pink:C.muted}/>
        <Text style={[s.tabText,{color:tab===name?C.pink:C.muted}]}>{name}</Text>
      </TouchableOpacity>)}
    </View>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:C.bg}, content:{padding:20,paddingBottom:30},
  header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:22},
  brand:{fontSize:27,fontWeight:'900',color:C.white,letterSpacing:-.7}, sub:{fontSize:12,color:C.muted,marginTop:4},
  round:{width:42,height:42,borderRadius:15,backgroundColor:C.panel,alignItems:'center',justifyContent:'center'},
  dot:{position:'absolute',right:10,top:9,width:7,height:7,borderRadius:4,backgroundColor:C.pink},
  hero:{backgroundColor:'#30234C',borderRadius:27,padding:22,overflow:'hidden',marginBottom:27,borderWidth:1,borderColor:'#59416D'},
  eyebrow:{color:'#E7B5DB',fontSize:10,fontWeight:'800',letterSpacing:1.5,marginBottom:12},
  heroTitle:{color:C.white,fontSize:27,fontWeight:'900',lineHeight:33},
  heroSub:{color:'#D0C6E0',fontSize:13,lineHeight:20,marginTop:9,marginBottom:17},
  primary:{height:49,borderRadius:16,backgroundColor:C.pink,alignItems:'center',justifyContent:'center',flexDirection:'row',paddingHorizontal:20,alignSelf:'flex-start'},
  primaryText:{color:'white',fontWeight:'800',fontSize:14},
  heroOrb:{position:'absolute',right:-10,bottom:15,width:112,height:112,borderRadius:56,backgroundColor:'#9B75FF',opacity:.38,alignItems:'center',justifyContent:'center'},
  sectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:15},
  section:{fontSize:18,fontWeight:'800',color:C.white,marginBottom:13}, link:{color:C.pink,fontWeight:'700'},
  personMini:{alignItems:'center',marginRight:22,marginBottom:24}, personName:{color:C.white,fontWeight:'700',marginTop:8,fontSize:12}, personCity:{color:C.muted,fontSize:11,marginTop:3},
  onlineDot:{position:'absolute',right:0,bottom:2,width:13,height:13,borderRadius:7,backgroundColor:C.green,borderWidth:2,borderColor:C.bg},
  feature:{backgroundColor:C.panel,borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',marginBottom:11,borderWidth:1,borderColor:C.line},
  featureIcon:{width:47,height:47,borderRadius:15,alignItems:'center',justifyContent:'center',marginRight:13},
  featureTitle:{color:C.white,fontSize:14,fontWeight:'800'}, featureSub:{color:C.muted,fontSize:11,marginTop:4},
  matchCard:{backgroundColor:C.panel,borderRadius:26,padding:23,alignItems:'center',borderWidth:1,borderColor:C.line,marginBottom:24},
  matchGlow:{width:125,height:125,borderRadius:63,backgroundColor:'#40264E',alignItems:'center',justifyContent:'center',marginVertical:20,borderWidth:1,borderColor:'#75436E'},
  pills:{flexDirection:'row',gap:8,marginBottom:22}, pill:{color:'#E7DDF6',backgroundColor:C.panel2,paddingHorizontal:12,paddingVertical:8,borderRadius:20,fontSize:11},
  body:{color:C.muted,fontSize:12,lineHeight:19,marginTop:9},
  search:{height:48,borderRadius:15,backgroundColor:C.panel,flexDirection:'row',alignItems:'center',paddingHorizontal:14,marginBottom:17,borderWidth:1,borderColor:C.line},
  searchInput:{flex:1,color:C.white,paddingHorizontal:10,fontSize:13},
  personRow:{flexDirection:'row',alignItems:'center',paddingVertical:14,borderBottomWidth:1,borderBottomColor:C.line},
  smallButton:{backgroundColor:'#57345D',paddingHorizontal:15,paddingVertical:9,borderRadius:13}, smallButtonText:{color:'#FFDDF0',fontSize:12,fontWeight:'800'},
  time:{color:C.muted,fontSize:10}, composer:{flexDirection:'row',alignItems:'center',backgroundColor:C.panel,borderRadius:17,paddingHorizontal:12,paddingVertical:6,marginTop:12},
  roomHero:{backgroundColor:'#33234F',padding:25,borderRadius:23,alignItems:'center',marginBottom:22},
  profileBox:{alignItems:'center',backgroundColor:C.panel,borderRadius:23,padding:24,marginBottom:20,borderWidth:1,borderColor:C.line},
  edit:{flexDirection:'row',alignItems:'center',backgroundColor:C.panel2,paddingHorizontal:14,paddingVertical:9,borderRadius:12,marginTop:15}, editText:{color:C.white,fontSize:12,fontWeight:'700'},

  partyBanner:{backgroundColor:'#39234F',borderRadius:23,padding:20,marginBottom:20,borderWidth:1,borderColor:'#765080'},
  partyBannerTitle:{fontSize:25,fontWeight:'900',color:C.white,marginTop:8},
  partyBannerSub:{fontSize:12,color:'#E1D4EC',lineHeight:18,marginTop:5,maxWidth:260},
  partyBannerTag:{alignSelf:'flex-start',backgroundColor:'#58345E',paddingHorizontal:11,paddingVertical:7,borderRadius:12,marginTop:13},
  partyBannerTagText:{fontSize:9,color:'#FFD8ED',fontWeight:'900',letterSpacing:1},
  partyFilter:{paddingHorizontal:15,paddingVertical:9,borderRadius:18,backgroundColor:C.panel,marginRight:8,borderWidth:1,borderColor:C.line},
  partyFilterActive:{backgroundColor:C.pink,borderColor:C.pink},
  partyFilterText:{fontSize:11,color:C.muted,fontWeight:'800'},
  partySectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  partyLive:{color:C.green,fontSize:10,fontWeight:'900',marginBottom:13},
  eventCard:{backgroundColor:C.panel,borderRadius:20,padding:15,marginBottom:13,borderWidth:1,borderColor:C.line},
  eventTop:{flexDirection:'row',alignItems:'center'},
  eventEmoji:{width:58,height:58,borderRadius:17,backgroundColor:'#382747',alignItems:'center',justifyContent:'center'},
  eventType:{fontSize:9,color:C.pink,fontWeight:'900',letterSpacing:1},
  eventTitle:{fontSize:15,color:C.white,fontWeight:'900',marginTop:4},
  eventDesc:{fontSize:11,color:C.muted,marginTop:4,lineHeight:16},
  eventMeta:{flexDirection:'row',justifyContent:'space-between',marginTop:15,paddingTop:12,borderTopWidth:1,borderTopColor:C.line},
  eventMetaLabel:{fontSize:8,color:C.muted,fontWeight:'900',letterSpacing:1,marginBottom:5},
  eventTime:{fontSize:10,color:'#F5D4E9',fontWeight:'700'},
  eventReward:{fontSize:10,color:'#E8D8FF',fontWeight:'700'},
  eventJoin:{height:40,backgroundColor:C.pink,borderRadius:13,alignItems:'center',justifyContent:'center',marginTop:13},
  eventJoined:{backgroundColor:'#315B51'},
  eventJoinText:{color:'white',fontSize:12,fontWeight:'900'},
  eventNote:{flexDirection:'row',alignItems:'flex-start',gap:8,marginTop:5,marginBottom:10},
  eventNoteText:{flex:1,color:C.muted,fontSize:10,lineHeight:16},
  tabBar:{height:69,backgroundColor:'#171329',borderTopWidth:1,borderTopColor:C.line,flexDirection:'row',justifyContent:'space-around',alignItems:'center',paddingBottom:5},
  tab:{alignItems:'center',justifyContent:'center',minWidth:55}, tabText:{fontSize:9,marginTop:4,fontWeight:'700'}
});
