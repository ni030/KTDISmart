import React from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Avatar, Card, IconButton, PaperProvider, Appbar, Tooltip, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Loader from '../root/Loader';

const categoryIcons = {
  Electrical: 'power-plug',
  "Pest Control": 'bug',
  Piping: 'water-pump',
  Sanitary: 'hand-wash',
  default: 'hammer-screwdriver',
};

const defectTypeMap = {
  blackout: 'Blackout/Trip',
  pestControl: 'Termites/Rat/Bat/Snakes/Caterpillar',
  showerHead: 'Shower Head Missing/Damage',
  noWater: 'Lost Water Supply',
  headPipe: 'Head Pipe Damage',
  toiletBowl: 'Toilet Bowl Clogged/Damage',
  sink: 'Sink Clogged/Damage/Leakage',
  cistern: 'Cistern Broke/Damage',
};

const HaveComplaint = ({ complaints = [] }) => {
  const [filteredComplaints, setFilteredComplaints] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState('No Filter');
  const [isAscending, setIsAscending] = React.useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = React.useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    const defaultSorted = [...complaints].sort(
      (a, b) => new Date(b.created_time) - new Date(a.created_time)
    );
    setFilteredComplaints(defaultSorted);
    setLoading(false);
  }, [complaints]);

  const applyFilterAndSort = (option, ascending) => {
    setLoading(true);
    let filtered = option === 'No Filter'
      ? complaints
      : complaints.filter((complaint) =>
          option === 'Completed'
            ? ['completed','rated'].includes(complaint.status)
            : option === 'Failed to Complete'
            ? complaint.status === 'incompleted'
            : ['submitted', 'staff reviewed', 'assigned constructor'].includes(complaint.status)
        );
    filtered.sort((a, b) =>
      ascending
        ? new Date(a.created_time) - new Date(b.created_time)
        : new Date(b.created_time) - new Date(a.created_time)
    );
    setFilteredComplaints(filtered);
    setSelectedFilter(option);
    setIsAscending(ascending);
    setFilterMenuVisible(false);
    setLoading(false);
  };

  const handleFilter = (option) => applyFilterAndSort(option, isAscending);
  const toggleSortOrder = () => applyFilterAndSort(selectedFilter, !isAscending);

  if (loading) {
    return <Loader />;
  }

  return (
    <PaperProvider>
      <View className="flex-1 ml-2 mr-2 bg-primary-500">
        <Appbar.Header theme={{ colors: '#902D53' }}>
          <Appbar.Content />
          <Menu
            visible={filterMenuVisible}
            onDismiss={() => setFilterMenuVisible(false)}
            anchor={
              <Appbar.Action
                icon="filter-menu"
                iconColor="white"
                onPress={() => setFilterMenuVisible(true)}
              />
            }
          >
            {['Completed', 'Failed to Complete', 'In Progress', 'No Filter'].map((option) => (
              <Menu.Item
                key={option}
                onPress={() => handleFilter(option)}
                title={option}
                leadingIcon={selectedFilter === option ? 'radiobox-marked' : 'radiobox-blank'}
              />
            ))}
          </Menu>
          <Tooltip title={`Sort complaints ${isAscending ? 'Descending' : 'Ascending'}`}>
            <Appbar.Action
              icon={isAscending ? 'sort-ascending' : 'sort-descending'}
              iconColor="white"
              onPress={toggleSortOrder}
            />
          </Tooltip>
          <Tooltip title="Report issues">
            <IconButton
              icon="file-document-edit"
              iconColor="white"
              onPress={() => navigation.navigate('category')}
            />
          </Tooltip>
        </Appbar.Header>

        <ScrollView className="mb-20">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint, index) => {
              const categoryIcon = categoryIcons[complaint.category] || categoryIcons.default;
              const defectDescription = defectTypeMap[complaint.defecttype] || complaint.defecttype;
              return (
                <Card key={index} className="mt-2 mb-2 p-4 bg-white rounded-lg shadow-md" onPress={() => navigation.navigate('progress',{complaint})}>
                  <Card.Title
                    title={`${complaint.category} - ${defectDescription}`}
                    titleNumberOfLines={2}
                    titleEllipsizeMode="tail"
                    left={(props) => (
                      <Avatar.Icon
                        {...props}
                        icon={categoryIcon}
                        style={{ backgroundColor: '#601E27' }}
                      />
                    )}
                    right={(props) => {
                      let iconName;
                      let color;
                      switch (complaint.status) {
                        case 'completed':
                        case 'rated':
                          iconName = 'check-circle-outline';
                          color = 'green';
                          break;
                        case 'incompleted':
                          iconName = 'alert-circle-outline';
                          color = 'red';
                          break;
                        default:
                          iconName = 'clock-time-five-outline';
                          color = 'grey';
                      }
                      return <IconButton {...props} icon={iconName} size={32} iconColor={color} />;
                    }}
                  />
                </Card>
              );
            })
          ) : (
            <View className="flex items-center justify-center h-full">
              <Text className="text-xl text-white text-center">No complaints match the selected filter.</Text>
              <Text className="text-sm text-gray-300 text-center">Try a different filter or create a new complaint.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default HaveComplaint;
