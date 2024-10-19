import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// User's current location
const var_user_latitude = 26.08047;
const var_user_longitude = -80.23380;

// List of nearby events with coordinates, severity, and description
const events = [
  {
    latitude: 26.08147,
    longitude: -80.23480,
    severity: 'High',
    description: 'Shelter  Capacity 10/90',
  },
  {
    latitude: 26.07850,
    longitude: -80.23090,
    severity: 'Medium',
    description: 'Shelter  Capacity 50/100',
  },
  {
    latitude: 26.08200,
    longitude: -80.23100,
    severity: 'Low',
    description: 'Food Bank',
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Resources</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: var_user_latitude,
            longitude: var_user_longitude,
            latitudeDelta: 0.0001, // Zoom 
            longitudeDelta: 0.001, // Zoom l
          }}
          showsUserLocation={true} //
        >
          {/* User Location Marker */}
          <Marker
            coordinate={{
              latitude: var_user_latitude,
              longitude: var_user_longitude,
            }}
            title="You are here"
            description="This is your current location."
            pinColor="blue"
          />

          {/* Render Markers for Each Event */}
          {events.map((event, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: event.latitude, longitude: event.longitude }}
              title={`Severity: ${event.severity}`}
              description={event.description}
              pinColor={
                event.severity === 'High'
                  ? 'red'
                  : event.severity === 'Medium'
                  ? 'orange'
                  : 'green'
              }
            />
          ))}
        </MapView>
      </View>

      {/* Informative Section */}
      <ScrollView style={styles.infoContainer}>
        <ThemedText type="subtitle">Nearby Events</ThemedText>
        {events.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <ThemedText type="bold">{`Severity: ${event.severity}`}</ThemedText>
            <ThemedText>{event.description}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  mapContainer: {
    flex: 1,
    height: 300,
    marginTop: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
