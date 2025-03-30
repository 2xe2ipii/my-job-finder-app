import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Job } from '../types';
import { COLORS, FONT, SIZES, SHADOWS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onSave: () => void;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSave, onApply }) => {
  const { isDarkMode } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  
  const cardStyle = {
    ...styles.card,
    backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.white,
    ...SHADOWS.medium
  };
  
  const textStyle = {
    color: isDarkMode ? COLORS.text.dark : COLORS.text.light
  };

  const title = job.title || 'Untitled Position';
  const company = job.company || 'Company Not Specified';
  const location = job.location || 'Location Not Specified';
  const salary = job.salary || 'Salary Not Specified';
  const jobType = job.jobType || 'Full-time';
  const postedDate = job.postedDate || new Date().toISOString().split('T')[0];
  const description = job.description || 'No description available for this position.';
  const requirements = job.requirements && job.requirements.length > 0 
    ? job.requirements 
    : ['No specific requirements listed.'];

  return (
    <>
      <TouchableOpacity
        style={cardStyle}
        activeOpacity={0.7}
        onPress={() => setShowDetails(true)}
      >
        <View style={styles.jobHeader}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, textStyle]}>{title}</Text>
            <Text style={[styles.company, textStyle]}>{company}</Text>
          </View>
          <View style={[styles.tagContainer, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.tagText}>{jobType}</Text>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color={isDarkMode ? COLORS.text.dark : COLORS.gray} />
            <Text style={[styles.detailText, textStyle]}>{location}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={16} color={isDarkMode ? COLORS.text.dark : COLORS.gray} />
            <Text style={[styles.detailText, textStyle]}>{salary}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={isDarkMode ? COLORS.text.dark : COLORS.gray} />
            <Text style={[styles.detailText, textStyle]}>Posted: {postedDate}</Text>
          </View>
        </View>
        
        <Text style={[styles.description, textStyle]} numberOfLines={3}>
          {description.split('\n')[0]}
        </Text>
        
        <View style={styles.tagsRow}>
          {requirements.slice(0, 3).map((req, index) => (
            <View key={index} style={[styles.miniTag, {
              backgroundColor: isDarkMode ? '#2a2a2a' : COLORS.secondary
            }]}>
              <Text style={[styles.miniTagText, {
                color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
              }]}>{req}</Text>
            </View>
          ))}
          {requirements.length > 3 && (
            <Text style={[styles.moreTagsText, textStyle]}>+{requirements.length - 3} more</Text>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: isSaved ? COLORS.gray : COLORS.primary }
            ]}
            onPress={onSave}
          >
            <Ionicons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={18} 
              color={COLORS.white} 
            />
            <Text style={styles.buttonText}>
              {isSaved ? 'Unsave' : 'Save Job'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: COLORS.primaryDark }]}
            onPress={onApply}
          >
            <Ionicons name="paper-plane-outline" size={18} color={COLORS.white} />
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={[styles.tapPrompt, textStyle]}>
            Tap to view details
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={16} 
            color={isDarkMode ? COLORS.text.dark : COLORS.gray} 
          />
        </View>
      </TouchableOpacity>

      {}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetails}
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={[styles.modalContainer, {
          backgroundColor: isDarkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'
        }]}>
          <ScrollView style={[styles.modalContent, {
            backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.white
          }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowDetails(false)}
              >
                <Ionicons 
                  name="close" 
                  size={24} 
                  color={isDarkMode ? COLORS.white : COLORS.black} 
                />
              </TouchableOpacity>
              <View style={[styles.tagContainer, { backgroundColor: COLORS.primary }]}>
                <Text style={styles.tagText}>{jobType}</Text>
              </View>
            </View>
            
            <Text style={[styles.modalTitle, textStyle]}>{title}</Text>
            <Text style={[styles.modalCompany, textStyle]}>{company}</Text>
            
            <View style={[styles.modalDetailsContainer, {
              backgroundColor: isDarkMode ? '#2a2a2a' : COLORS.secondary
            }]}>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={18} color={isDarkMode ? COLORS.primary : COLORS.primaryDark} />
                <Text style={[styles.modalDetailText, textStyle]}>{location}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={18} color={isDarkMode ? COLORS.primary : COLORS.primaryDark} />
                <Text style={[styles.modalDetailText, textStyle]}>{salary}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={18} color={isDarkMode ? COLORS.primary : COLORS.primaryDark} />
                <Text style={[styles.modalDetailText, textStyle]}>Posted: {postedDate}</Text>
              </View>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, textStyle]}>Description</Text>
              <View style={styles.descriptionContainer}>
                {description.split('\n\n').map((paragraph, i) => (
                  paragraph.trim() ? (
                    <Text key={i} style={[styles.sectionContent, textStyle, styles.paragraph]}>
                      {paragraph.trim().startsWith('•') ? paragraph.trim() : `${paragraph.trim()}`}
                    </Text>
                  ) : null
                ))}
              </View>
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, textStyle]}>Skills & Requirements</Text>
              <View style={styles.tagsContainer}>
                {requirements.map((req, index) => (
                  <View key={index} style={[styles.tag, {
                    backgroundColor: isDarkMode ? '#2a2a2a' : COLORS.secondary,
                    borderColor: COLORS.primary,
                    borderWidth: 1
                  }]}>
                    <Text style={[styles.tagText, {
                      color: isDarkMode ? COLORS.white : COLORS.text.light,
                      fontSize: SIZES.small
                    }]}>{req}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={[
                  styles.modalButton, 
                  { backgroundColor: isSaved ? COLORS.gray : COLORS.primary }
                ]}
                onPress={() => {
                  onSave();
                  setShowDetails(false);
                }}
              >
                <Ionicons 
                  name={isSaved ? "bookmark" : "bookmark-outline"} 
                  size={20} 
                  color={COLORS.white} 
                />
                <Text style={styles.modalButtonText}>
                  {isSaved ? 'Unsave' : 'Save Job'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: COLORS.primaryDark }]}
                onPress={() => {
                  onApply();
                  setShowDetails(false);
                }}
              >
                <Ionicons name="paper-plane-outline" size={20} color={COLORS.white} />
                <Text style={styles.modalButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: FONT.bold,
    marginBottom: 4,
  },
  company: {
    fontSize: SIZES.medium,
    fontWeight: FONT.medium,
    marginBottom: 8,
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: FONT.medium,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: SIZES.medium,
    marginLeft: 8,
  },
  description: {
    fontSize: SIZES.medium,
    marginBottom: 16,
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniTag: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  miniTagText: {
    fontSize: SIZES.small,
  },
  moreTagsText: {
    fontSize: SIZES.small,
    fontWeight: FONT.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 0.48,
  },
  buttonText: {
    color: COLORS.white,
    marginLeft: 6,
    fontWeight: FONT.medium,
    fontSize: SIZES.medium,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapPrompt: {
    fontSize: SIZES.small,
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '90%',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    ...SHADOWS.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: FONT.bold,
    marginBottom: 8,
  },
  modalCompany: {
    fontSize: SIZES.large,
    marginBottom: 16,
  },
  modalDetailsContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  modalDetailText: {
    fontSize: SIZES.medium,
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: FONT.bold,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: SIZES.medium,
    lineHeight: 24,
    textAlign: 'justify',
    letterSpacing: 0.3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  modalButtonContainer: {
    flexDirection: 'column',
    marginTop: 24,
    marginBottom: 40,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtonText: {
    color: COLORS.white,
    marginLeft: 8,
    fontWeight: FONT.bold,
    fontSize: SIZES.medium,
  },
  descriptionContainer: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 16,
  },
});

export default JobCard; 