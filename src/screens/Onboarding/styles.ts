import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 72,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 12,
    textAlignVertical: 'top',
  },
  primaryButton: {
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f172a',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 15,
  },
});
