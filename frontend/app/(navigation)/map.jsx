import {Text,View} from "react-native";

const Map=()=>{
    return(
        <MapView
            provider={PROVIDER_DEFAULT} className="w-full h-full rounded-2xl"
        >
            <Text>Map</Text>
        </MapView>
    );
};

export default Map;