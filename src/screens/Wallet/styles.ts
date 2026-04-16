import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 18,
  },
  qrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  copyButton: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  copyButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
});
