import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../constants';
import { Job } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface ApplicationFormProps {
  job: Job;
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (values: {
    jobId: string;
    name: string;
    email: string;
    phone: string;
    whyHireYou: string;
  }) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whyHireYou?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  job,
  isVisible,
  onClose,
  onSubmit,
}) => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whyHireYou, setWhyHireYou] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const containerStyle = {
    backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light,
  };

  const textStyle = {
    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
  };

  const inputStyle = {
    ...styles.input,
    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
    backgroundColor: isDarkMode ? '#2a2a2a' : COLORS.white,
    borderColor: isDarkMode ? COLORS.gray : COLORS.lightGray,
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10,15}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
      isValid = false;
    }

    // Why Hire You validation
    if (!whyHireYou.trim()) {
      newErrors.whyHireYou = 'Please tell us why we should hire you';
      isValid = false;
    } else if (whyHireYou.length < 50) {
      newErrors.whyHireYou = 'Your answer should be at least 50 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        jobId: job.id,
        name,
        email,
        phone,
        whyHireYou,
      });
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setWhyHireYou('');
    setErrors({});
    setSubmitted(false);
    onClose();
    
    // If the form was submitted, navigate to JobFinder screen
    if (submitted) {
      // Slight delay to allow modal to close
      setTimeout(() => {
        navigation.navigate('JobFinder' as never);
      }, 300);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={[styles.modalContainer, containerStyle]}>
        {!submitted ? (
          <ScrollView style={styles.scrollView}>
            <Text style={[styles.title, textStyle]}>Apply for {job.title}</Text>
            <Text style={[styles.subtitle, textStyle]}>at {job.company}</Text>

            <View style={styles.formField}>
              <Text style={[styles.label, textStyle]}>Full Name *</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.gray}
                value={name}
                onChangeText={setName}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.formField}>
              <Text style={[styles.label, textStyle]}>Email Address *</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.formField}>
              <Text style={[styles.label, textStyle]}>Phone Number *</Text>
              <TextInput
                style={inputStyle}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.gray}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.formField}>
              <Text style={[styles.label, textStyle]}>Why should we hire you? *</Text>
              <TextInput
                style={[inputStyle, styles.textArea]}
                placeholder="Tell us why you're a good fit for this position"
                placeholderTextColor={COLORS.gray}
                value={whyHireYou}
                onChangeText={setWhyHireYou}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              {errors.whyHireYou && (
                <Text style={styles.errorText}>{errors.whyHireYou}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit Application</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.successContainer}>
            <Text style={[styles.successTitle, textStyle]}>Application Submitted!</Text>
            <Text style={[styles.successMessage, textStyle]}>
              Thank you for applying to {job.title} at {job.company}. We will review your application and get back to you soon.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.okayButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 40,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: FONT.bold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.medium,
    marginBottom: 24,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.medium,
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: SIZES.medium,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: SIZES.small,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    width: '48%',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: '48%',
  },
  okayButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    marginTop: 24,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: SIZES.medium,
  },
  successContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: FONT.bold,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default ApplicationForm; 