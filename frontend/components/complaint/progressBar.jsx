import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const ProgressBar = ({ complaint }) => {

    // Map statuses to step indexes
    const statusToStep = {
        submitted: 0,
        'staff reviewed': 1,
        'constructor assigned': 2,
        completed: 3,
        rated: 3,
        expired: 3,
        'cancelled': 3,
    };

    // Determine the current step based on complaint status
    const currentStep = statusToStep[complaint?.status] || 0;

    // Determine if the status is incomplete
    const isIncomplete = complaint?.status === 'expired'|| complaint?.status === 'cancelled';

    // Labels for the steps, dynamically changing the last label based on status
    const labels = [
        'Submitted',
        'Staff Reviewed',
        'Constructor Assigned',
        complaint?.status === 'cancelled' ? 'Cancelled' : complaint?.status === 'expired' ? 'Expired' : 'Completed', // Dynamic label
    ];

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: isIncomplete ? 'red' : '#4caf50', // Red if incomplete, otherwise green
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: isIncomplete ? 'red' : '#4caf50', // Red for incomplete steps, green otherwise
        stepStrokeUnFinishedColor: '#aaaaaa', // Gray for unfinished steps
        separatorFinishedColor: isIncomplete ? 'red' : '#4caf50', // Red separator for incomplete, green otherwise
        separatorUnFinishedColor: '#aaaaaa', // Gray separator for unfinished
        stepIndicatorFinishedColor: isIncomplete ? 'red' : '#4caf50', // Red for incomplete steps, green otherwise
        stepIndicatorUnFinishedColor: '#ffffff', // White for unfinished steps
        stepIndicatorCurrentColor: isIncomplete ? 'red' : '#4caf50', // Red for incomplete current step
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#ffffff', // White label for current step
        stepIndicatorLabelFinishedColor: '#ffffff', // White label for finished steps
        stepIndicatorLabelUnFinishedColor: '#aaaaaa', // Gray label for unfinished steps
        labelColor: '#999999', // Default label color
        labelSize: 13,
        currentStepLabelColor: isIncomplete ? 'red' : '#4caf50', // Red for incomplete current step label
    };

    return (
        <View className="flex justify-center bg-[#f9f9f9] p-2 pt-6">
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentStep}
                labels={labels}
                stepCount={labels.length}
            />
        </View>
    );
};

export default ProgressBar;
