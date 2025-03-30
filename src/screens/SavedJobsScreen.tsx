import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONT } from '../constants';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import ApplicationForm from '../components/ApplicationForm';
import DarkModeToggle from '../components/DarkModeToggle';
import Logo from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';

const SavedJobsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { savedJobs, removeJob, submitApplication, fetchJobs } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRemoveJob = (job: Job) => {
    removeJob(job.id);
  };

  const handleApplyJob = (job: Job) => {
    setSelectedJob(job);
    setIsFormVisible(true);
  };

  const handleSubmitApplication = (values: {
    jobId: string;
    name: string;
    email: string;
    phone: string;
    whyHireYou: string;
  }) => {
    submitApplication(values);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.background.dark
            : COLORS.background.light,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? COLORS.background.dark : COLORS.background.light}
      />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? COLORS.text.dark : COLORS.text.light}
          />
        </TouchableOpacity>
        <Logo size="small" isDarkMode={isDarkMode} />
        <DarkModeToggle />
      </View>

      {savedJobs.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text
            style={[
              styles.noJobsText,
              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light },
            ]}
          >
            You haven't saved any jobs yet.
          </Text>
          <TouchableOpacity
            style={[styles.browseButton, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseButtonText}>Browse Jobs</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              isSaved={true}
              onSave={() => handleRemoveJob(item)}
              onApply={() => handleApplyJob(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={isDarkMode ? COLORS.text.dark : COLORS.primary}
              titleColor={isDarkMode ? COLORS.text.dark : COLORS.text.light}
            />
          }
        />
      )}

      {selectedJob && (
        <ApplicationForm
          job={selectedJob}
          isVisible={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          onSubmit={handleSubmitApplication}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: FONT.bold,
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noJobsText: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseButtonText: {
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: SIZES.medium,
  },
});

export default SavedJobsScreen; 