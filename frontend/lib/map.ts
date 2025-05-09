const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;
  
  export const calculateRegion = ({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  }: {
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude?: number | null;
    destinationLongitude?: number | null;
  }) => {
    if (!userLatitude || !userLongitude) {
      return {
        latitude: 1.5591827612923925, 
        longitude: 103.63887682708778,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
  
    if (!destinationLatitude || !destinationLongitude) {
      return {
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
  
    const minLat = Math.min(userLatitude, destinationLatitude);
    const maxLat = Math.max(userLatitude, destinationLatitude);
    const minLng = Math.min(userLongitude, destinationLongitude);
    const maxLng = Math.max(userLongitude, destinationLongitude);
  
    const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
    const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding
  
    const latitude = (userLatitude + destinationLatitude) / 2;
    const longitude = (userLongitude + destinationLongitude) / 2;
  
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };