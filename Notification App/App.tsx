








import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { styles } from './styles/index.styles';


// Configure how notifications behave when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,  // Show notification banner
    shouldShowList: true,     // Show in notification list
    shouldPlaySound: true,    // Play notification sound
    shouldSetBadge: true,     // Update app badge (iOS)
  }),
});

export default function App() {
  const [permissionStatus, setPermissionStatus] = useState<string>('Checking...');

  // Request notification permissions when app starts
  useEffect(() => {
    requestPermissions();
  }, []);




  // Request notification permissions
  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status === 'granted') {
        setPermissionStatus('✅ Permission Granted');
        
        // Set up Android notification channel (required for Android)
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'Default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      } else {
        setPermissionStatus('❌ Permission Denied');
      }
    } catch (error) {
      setPermissionStatus('❌ Error requesting permission');
      Alert.alert('Error', 'Failed to request notification permission');
    }
  };






  // Send immediate notification
  const sendImmediateNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hello! 👋',
          body: 'This is an immediate notification',
          sound: true,
        },
        trigger: null, // null means show immediately
      });
      Alert.alert('Success', 'Notification sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification');
    }
  };








  // Schedule notification for 5 seconds from now
  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Scheduled Notification ⏰',
          body: 'This notification was scheduled 5 seconds ago',
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5, // Show after 5 seconds
        },
      });
      Alert.alert('Success', 'Notification scheduled for 5 seconds!');
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
    }
  };





  // Cancel all scheduled notifications
  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert('Success', 'All scheduled notifications cancelled');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel notifications');
    }
  };





  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />  
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Notification App</Text>    
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status: {permissionStatus}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Send Immediate Notification"
            onPress={sendImmediateNotification}
            color="#007AFF"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Schedule Notification (5s)"
            onPress={scheduleNotification}
            color="#34C759"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel All Notifications"
            onPress={cancelAllNotifications}
            color="#FF3B30"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            💡 Tip: Make sure to grant notification permissions when prompted!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}












