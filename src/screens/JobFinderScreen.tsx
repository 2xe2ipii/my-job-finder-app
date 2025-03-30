import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SIZES, FONT } from '../constants';
import { useJobs } from '../context/JobsContext';
import { useTheme } from '../context/ThemeContext';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import ApplicationForm from '../components/ApplicationForm';
import DarkModeToggle from '../components/DarkModeToggle';
import Logo from '../components/Logo';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
};

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const JobFinderScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { isDarkMode } = useTheme();
  const {
    jobs,
    savedJobs,
    isLoading,
    error,
    searchTerm,
    searchResults,
    saveJob,
    removeJob,
    setSearchTerm,
    submitApplication,
    fetchJobs,
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSaveJob = (job: Job) => {
    if (isJobSaved(job.id)) {
      removeJob(job.id);
    } else {
      saveJob(job);
    }
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

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some(job => job.id === jobId);
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
        <Logo isDarkMode={isDarkMode} />
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.savedJobsButton}
            onPress={() => navigation.navigate('SavedJobs')}
          >
            <Ionicons
              name="bookmark"
              size={24}
              color={isDarkMode ? COLORS.primary : COLORS.primaryDark}
            />
            {savedJobs.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{savedJobs.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <DarkModeToggle />
        </View>
      </View>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={handleClearSearch}
      />

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text
            style={[
              styles.loadingText,
              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light },
            ]}
          >
            Loading jobs...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text
            style={[
              styles.errorText,
              { color: isDarkMode ? COLORS.danger : COLORS.danger },
            ]}
          >
            {error}
          </Text>
        </View>
      ) : searchResults.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text
            style={[
              styles.noJobsText,
              { color: isDarkMode ? COLORS.text.dark : COLORS.text.light },
            ]}
          >
            No jobs found matching your search.
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              isSaved={isJobSaved(item.id)}
              onSave={() => handleSaveJob(item)}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedJobsButton: {
    padding: 8,
    marginRight: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.xSmall,
    fontWeight: FONT.bold,
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
  loadingText: {
    marginTop: 12,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  errorText: {
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  noJobsText: {
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
});

export default JobFinderScreen; 